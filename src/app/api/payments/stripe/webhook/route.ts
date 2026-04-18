import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from 'stripe';

// Only initialize Stripe if credentials are available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    })
  : null;

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  if (!prisma || !stripe) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      const userId = session.metadata?.userId;
      const amount = parseFloat(session.metadata?.amount || '0');
      
      if (!userId || !amount) {
        throw new Error('Missing metadata in session');
      }

      // Create payment record and update user balance
      await prisma!.$transaction(async (tx: any) => {
        // Create payment record
        await tx.payment.create({
          data: {
            userId: userId,
            amount: amount,
            status: "COMPLETED",
            provider: "STRIPE",
            externalId: session.id,
          },
        });

        // Update user balance
        await tx.user.update({
          where: { id: userId },
          data: { balance: { increment: amount } },
        });
      });

      console.log(`Payment successful for user ${userId}, amount: $${amount}`);
    } catch (err) {
      console.error('Error processing webhook:', err);
      return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
