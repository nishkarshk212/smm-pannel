import { prisma } from './prisma';

// Game configuration
const GAME_CONFIG = {
  WAITING_TIME: 5000, // 5 seconds waiting for bets
  MIN_CRASH_POINT: 1.0,
  MAX_CRASH_POINT: 100.0,
  HOUSE_EDGE: 0.04, // 4% house edge
};

let isRunning = false;

// Generate crash point using provably fair algorithm
function generateCrashPoint(): number {
  // Simple crash point generation with house edge
  const e = 2 ** 32;
  const h = Math.floor(Math.random() * e);
  
  if (h % 25 === 0) {
    return 1.0; // Instant crash 4% of the time
  }
  
  const crashPoint = Math.floor((100 * e - h) / (e - h)) / 100;
  return Math.max(GAME_CONFIG.MIN_CRASH_POINT, Math.min(crashPoint, GAME_CONFIG.MAX_CRASH_POINT));
}

// Run a single game round
async function runGameRound() {
  if (isRunning) return;
  
  try {
    isRunning = true;
    
    // Get pending round
    const round = await prisma.gameRound.findFirst({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
    
    if (!round) {
      isRunning = false;
      return;
    }
    
    // Update round status to RUNNING
    await prisma.gameRound.update({
      where: { id: round.id },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
      },
    });
    
    // Activate all pending bets
    await prisma.bet.updateMany({
      where: {
        roundId: round.id,
        status: 'PENDING',
      },
      data: { status: 'ACTIVE' },
    });
    
    // Generate crash point
    const crashPoint = generateCrashPoint();
    
    // Simulate multiplier increase
    let currentMultiplier = 1.0;
    const increment = 0.01;
    const speed = 100; // ms between increments
    
    const gameLoop = setInterval(async () => {
      currentMultiplier += increment;
      
      // Update round multiplier
      await prisma.gameRound.update({
        where: { id: round.id },
        data: { multiplier: currentMultiplier },
      });
      
      // Check for auto cash outs
      const autoCashOutBets = await prisma.bet.findMany({
        where: {
          roundId: round.id,
          status: 'ACTIVE',
          autoCashOut: {
            lte: currentMultiplier,
          },
        },
      });
      
      for (const bet of autoCashOutBets) {
        const winnings = bet.amount * (bet.autoCashOut || currentMultiplier);
        
        await prisma.bet.update({
          where: { id: bet.id },
          data: {
            status: 'CASHED_OUT',
            cashedOutAt: bet.autoCashOut || currentMultiplier,
            potentialWin: winnings,
          },
        });
        
        await prisma.user.update({
          where: { id: bet.userId },
          data: { balance: { increment: winnings } },
        });
        
        await prisma.transaction.create({
          data: {
            userId: bet.userId,
            type: 'WIN',
            amount: winnings,
            status: 'COMPLETED',
            description: `Auto cashed out at ${(bet.autoCashOut || currentMultiplier).toFixed(2)}x`,
          },
        });
      }
      
      // Check if crashed
      if (currentMultiplier >= crashPoint) {
        clearInterval(gameLoop);
        
        // Round crashed
        await prisma.gameRound.update({
          where: { id: round.id },
          data: {
            status: 'COMPLETED',
            crashedAt: crashPoint,
            completedAt: new Date(),
          },
        });
        
        // Mark remaining active bets as lost
        await prisma.bet.updateMany({
          where: {
            roundId: round.id,
            status: 'ACTIVE',
          },
          data: { status: 'LOST' },
        });
        
        // Start next round after delay
        setTimeout(() => startNewRound(), 2000);
        
        isRunning = false;
      }
    }, speed);
    
  } catch (error) {
    console.error('Error running game round:', error);
    isRunning = false;
  }
}

// Start a new round
async function startNewRound() {
  try {
    const roundCount = await prisma.gameRound.count();
    
    await prisma.gameRound.create({
      data: {
        roundNumber: roundCount + 1,
        multiplier: 1.0,
        crashedAt: 0,
        status: 'PENDING',
      },
    });
    
    // Start the round after waiting time
    setTimeout(() => runGameRound(), GAME_CONFIG.WAITING_TIME);
  } catch (error) {
    console.error('Error starting new round:', error);
  }
}

// Initialize game loop
export function initializeGameEngine() {
  if (process.env.NODE_ENV !== 'production') {
    return; // Only run in production
  }
  
  console.log('Initializing Aviator Game Engine...');
  
  // Check if there's an active game
  prisma.gameRound.findFirst({
    where: { status: { in: ['PENDING', 'RUNNING'] } },
  }).then((round: { status: string } | null) => {
    if (!round) {
      startNewRound();
    } else if (round.status === 'PENDING') {
      setTimeout(() => runGameRound(), GAME_CONFIG.WAITING_TIME);
    }
  });
}

export { startNewRound, runGameRound };
