import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get current game round
    let currentRound = await prisma.gameRound.findFirst({
      where: { status: { in: ['PENDING', 'RUNNING'] } },
      orderBy: { createdAt: 'desc' },
    });

    // Get recent history (last 10 completed rounds)
    const history = await prisma.gameRound.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        crashedAt: true,
        roundNumber: true,
      },
    });

    return NextResponse.json({
      currentRound: currentRound || null,
      history: history.map(h => h.crashedAt),
    });
  } catch (error) {
    console.error('Error getting game state:', error);
    return NextResponse.json({ error: 'Failed to get game state' }, { status: 500 });
  }
}
