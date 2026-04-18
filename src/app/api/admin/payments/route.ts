import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET - Fetch all pending manual payments (admin only)
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
  });

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  try {
    // Get all pending manual payments
    const payments = await prisma.payment.findMany({
      where: {
        provider: "MANUAL",
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(payments);
  } catch (err) {
    console.error("Get pending payments error:", err);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

// POST - Approve or reject payment
export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const admin = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
  });

  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  try {
    const { paymentId, action } = await req.json();

    if (!paymentId || !action) {
      return NextResponse.json(
        { error: "Payment ID and action are required" },
        { status: 400 }
      );
    }

    if (!["APPROVED", "REJECTED"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use APPROVED or REJECTED" },
        { status: 400 }
      );
    }

    // Update payment status
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.provider !== "MANUAL") {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx: any) => {
      // Update payment status
      await tx.payment.update({
        where: { id: paymentId },
        data: { status: action },
      });

      // If approved, add balance to user
      if (action === "APPROVED") {
        await tx.user.update({
          where: { id: payment.userId },
          data: { balance: { increment: payment.amount } },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: `Payment ${action.toLowerCase()} successfully`,
    });
  } catch (err: any) {
    console.error("Update payment error:", err);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}
