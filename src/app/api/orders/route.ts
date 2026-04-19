import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { placeOrder, getServiceMapping } from "@/lib/airsmm";

// Force dynamic rendering to prevent build-time database access
export const dynamic = 'force-dynamic';

const PRICE_PER_UNIT = 0.01;

export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { service, target, quantity } = await req.json();

  if (!service || !target || !quantity || quantity < 100) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const cost = quantity * PRICE_PER_UNIT;

  // Check user balance
  const user = await prisma!.user.findUnique({
    where: { id: (session.user as any).id },
  });

  if (!user || user.balance < cost) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  try {
    const result = await prisma!.$transaction(async (tx: any) => {
      // Deduct balance
      await tx.user.update({
        where: { id: user.id },
        data: { balance: { decrement: cost } },
      });

      // Create order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          service,
          target,
          quantity,
          cost,
          status: "PENDING",
        },
      });

      return order;
    });

    // Send order to AirSMM API automatically
    try {
      const airsmmServiceId = getServiceMapping(result.service);
      const airsmmResponse = await placeOrder(
        airsmmServiceId,
        result.target,
        result.quantity
      );

      // Update order with AirSMM order ID
      await prisma!.order.update({
        where: { id: result.id },
        data: {
          status: "PROCESSING",
          // Store AirSMM order ID in a metadata field if you add one
        },
      });

      console.log(`Order ${result.id} sent to AirSMM. AirSMM Order ID: ${airsmmResponse.orderId}`);
    } catch (airsmmError: any) {
      console.error(`Failed to send order ${result.id} to AirSMM:`, airsmmError.message);
      // Keep order as PENDING if AirSMM fails, admin can retry manually
    }

    return NextResponse.json({
      ...result,
      message: "Order placed successfully. Processing will start shortly."
    });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
