import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { betId, cashOutMultiplier } = body;

    if (!betId || !cashOutMultiplier) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Get the bet
    const bet = await prisma.bet.findUnique({
      where: { id: betId },
      include: { round: true },
    });

    if (!bet || bet.userId !== user.id) {
      return NextResponse.json({ error: 'Bet not found' }, { status: 404 });
    }

    if (bet.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Bet is not active' }, { status: 400 });
    }

    // Calculate winnings
    const winnings = bet.amount * cashOutMultiplier;

    // Update bet
    await prisma.bet.update({
      where: { id: betId },
      data: {
        status: 'CASHED_OUT',
        cashedOutAt: cashOutMultiplier,
        potentialWin: winnings,
      },
    });

    // Add winnings to balance
    await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance + winnings },
    });

    // Create transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'WIN',
        amount: winnings,
        status: 'COMPLETED',
        description: `Won ₹${winnings.toFixed(2)} at ${cashOutMultiplier}x on round #${bet.round.roundNumber}`,
      },
    });

    return NextResponse.json({ 
      success: true, 
      winnings,
      newBalance: user.balance + winnings 
    });
  } catch (error) {
    console.error('Error cashing out:', error);
    return NextResponse.json({ error: 'Failed to cash out' }, { status: 500 });
  }
}
