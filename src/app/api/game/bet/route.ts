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
    const { amount, autoCashOut } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 });
    }

    if (amount > user.balance) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Get or create current game round
    let currentRound = await prisma.gameRound.findFirst({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });

    if (!currentRound) {
      // Create new round
      const roundCount = await prisma.gameRound.count();
      currentRound = await prisma.gameRound.create({
        data: {
          roundNumber: roundCount + 1,
          multiplier: 1.0,
          crashedAt: 0,
          status: 'PENDING',
        },
      });
    }

    // Create bet
    const bet = await prisma.bet.create({
      data: {
        userId: user.id,
        roundId: currentRound.id,
        amount: amount,
        autoCashOut: autoCashOut || null,
        status: 'PENDING',
      },
    });

    // Deduct balance
    await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance - amount },
    });

    // Create transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'BET',
        amount: -amount,
        status: 'COMPLETED',
        description: `Bet placed on round #${currentRound.roundNumber}`,
      },
    });

    return NextResponse.json({ bet, round: currentRound });
  } catch (error) {
    console.error('Error placing bet:', error);
    return NextResponse.json({ error: 'Failed to place bet' }, { status: 500 });
  }
}
