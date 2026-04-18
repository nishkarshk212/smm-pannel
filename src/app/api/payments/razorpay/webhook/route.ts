import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from 'crypto';

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature')!;

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Invalid Razorpay webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle payment captured event
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    
    try {
      const userId = payment.notes.userId;
      const amount = parseFloat(payment.notes.amount);
      
      if (!userId || !amount) {
        throw new Error('Missing metadata in payment');
      }

      // Create payment record and update user balance
      await prisma.$transaction(async (tx) => {
        // Create payment record
        await tx.payment.create({
          data: {
            userId: userId,
            amount: amount,
            status: "COMPLETED",
            provider: "RAZORPAY",
            externalId: payment.id,
          },
        });

        // Update user balance
        await tx.user.update({
          where: { id: userId },
          data: { balance: { increment: amount } },
        });
      });

      console.log(`Razorpay payment successful for user ${userId}, amount: ₹${amount}`);
    } catch (err) {
      console.error('Error processing Razorpay webhook:', err);
      return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
