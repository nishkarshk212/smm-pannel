import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const amount = parseFloat(formData.get("amount") as string);
    const paymentMethod = formData.get("paymentMethod") as string;
    const transactionId = formData.get("transactionId") as string;
    const proof = formData.get("proof") as File | null;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!transactionId) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    // In a real app, you would upload the proof to cloud storage (S3, Cloudinary, etc.)
    // For now, we'll store it as base64 or just record the payment request
    
    // Create payment record with PENDING status
    const payment = await prisma.payment.create({
      data: {
        userId: (session.user as any).id,
        amount: amount,
        status: "PENDING", // PENDING, APPROVED, REJECTED
        provider: "MANUAL", // Manual bank/UPI transfer
        externalId: transactionId,
        // Store additional metadata
        metadata: JSON.stringify({
          paymentMethod,
          transactionId,
          proofFilename: proof?.name || null,
          submittedAt: new Date().toISOString(),
        }),
      },
    });

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        message: "Payment proof submitted. Waiting for admin approval.",
      },
    });
  } catch (err: any) {
    console.error("Manual payment error:", err);
    return NextResponse.json(
      { error: "Failed to submit payment proof" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get user's payment history
    const payments = await prisma.payment.findMany({
      where: {
        userId: (session.user as any).id,
        provider: "MANUAL",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(payments);
  } catch (err) {
    console.error("Get payments error:", err);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
