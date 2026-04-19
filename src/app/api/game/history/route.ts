import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
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

    // Get user's bets with round info
    const bets = await prisma.bet.findMany({
      where: { userId: user.id },
      include: {
        round: {
          select: {
            roundNumber: true,
            crashedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Get transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Calculate stats
    const totalBets = await prisma.bet.count({
      where: { userId: user.id },
    });

    const totalWins = await prisma.bet.count({
      where: {
        userId: user.id,
        status: 'CASHED_OUT',
      },
    });

    const totalWagered = await prisma.bet.aggregate({
      where: { userId: user.id },
      _sum: { amount: true },
    });

    const totalWon = await prisma.bet.aggregate({
      where: {
        userId: user.id,
        status: 'CASHED_OUT',
      },
      _sum: { potentialWin: true },
    });

    return NextResponse.json({
      balance: user.balance,
      bets,
      transactions,
      stats: {
        totalBets,
        totalWins,
        totalWagered: totalWagered._sum.amount || 0,
        totalWon: totalWon._sum.potentialWin || 0,
      },
    });
  } catch (error) {
    console.error('Error getting user game data:', error);
    return NextResponse.json({ error: 'Failed to get game data' }, { status: 500 });
  }
}
