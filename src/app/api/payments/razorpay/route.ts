import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amount } = await req.json();

  if (!amount || amount < 100) { // Minimum ₹100 INR
    return NextResponse.json({ error: "Minimum amount is ₹100" }, { status: 400 });
  }

  try {
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: (session.user as any).id,
        amount: amount.toString(),
      },
    });

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error("Razorpay error:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
