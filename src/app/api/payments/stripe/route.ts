import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// In a real app, you would use Stripe SDK:
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amount } = await req.json();

  if (!amount || amount < 5) {
    return NextResponse.json({ error: "Minimum amount is $5" }, { status: 400 });
  }

  try {
    // SIMULATION: In a real app, you'd create a Stripe Checkout Session here
    // and return the URL. For this demo, we'll just simulate a successful top-up.
    
    const result = await prisma.$transaction(async (tx) => {
      // Create payment record
      const payment = await tx.payment.create({
        data: {
          userId: (session.user as any).id,
          amount,
          status: "COMPLETED", // Simulated success
          provider: "STRIPE",
          externalId: "sim_" + Math.random().toString(36).substring(7),
        },
      });

      // Update user balance
      await tx.user.update({
        where: { id: (session.user as any).id },
        data: { balance: { increment: amount } },
      });

      return payment;
    });

    // Return a dummy URL to simulate redirection, or just success
    return NextResponse.json({ 
      message: "Funds added successfully (Simulated)", 
      url: "/dashboard?success=true" 
    });

  } catch (err) {
    console.error("Payment error:", err);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
}
