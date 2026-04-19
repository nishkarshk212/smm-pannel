'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AviatorGame from '@/components/AviatorGame';

export default function GamePage() {
  const { data: session } = useSession();
  const [gameState, setGameState] = useState({
    currentMultiplier: 1.0,
    gameStatus: 'waiting' as 'waiting' | 'running' | 'crashed',
    lastCrashedAt: 0,
    history: [] as number[],
  });
  const [balance, setBalance] = useState(0);
  const [activeBet, setActiveBet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch game state
  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const res = await fetch('/api/game/state');
        const data = await res.json();
        
        if (data.currentRound) {
          setGameState(prev => ({
            ...prev,
            currentMultiplier: data.currentRound.multiplier || 1.0,
            gameStatus: data.currentRound.status === 'PENDING' ? 'waiting' : 
                       data.currentRound.status === 'RUNNING' ? 'running' : 'crashed',
            lastCrashedAt: data.currentRound.crashedAt || 0,
          }));
        }
        
        if (data.history) {
          setGameState(prev => ({
            ...prev,
            history: data.history,
          }));
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    fetchGameState();
    const interval = setInterval(fetchGameState, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch user balance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/game/history');
        const data = await res.json();
        setBalance(data.balance || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const handleBet = async (amount: number, autoCashOut?: number) => {
    try {
      const res = await fetch('/api/game/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, autoCashOut }),
      });
      
      const data = await res.json();
      
      if (data.bet) {
        setActiveBet(data.bet);
        setBalance(prev => prev - amount);
      }
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const handleCashOut = async () => {
    if (!activeBet) return;

    try {
      const res = await fetch('/api/game/cashout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          betId: activeBet.id,
          cashOutMultiplier: gameState.currentMultiplier,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBalance(data.newBalance);
        setActiveBet(null);
      }
    } catch (error) {
      console.error('Error cashing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Your Balance</p>
            <p className="text-3xl font-bold text-white">₹{balance.toFixed(2)}</p>
          </div>
          <a
            href="/dashboard/funds"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Add Funds
          </a>
        </div>
      </div>

      {/* Aviator Game */}
      <AviatorGame
        onBet={handleBet}
        onCashOut={handleCashOut}
        currentMultiplier={gameState.currentMultiplier}
        gameStatus={gameState.gameStatus}
        balance={balance}
        lastCrashedAt={gameState.lastCrashedAt}
        history={gameState.history}
      />

      {/* Recent Bets */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-bold mb-4">How to Play</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-white text-sm font-bold">Place Bet</p>
            <p className="text-gray-400 text-xs mt-1">Choose your amount</p>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-white text-sm font-bold">Watch Rise</p>
            <p className="text-gray-400 text-xs mt-1">Multiplier increases</p>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <div className="text-2xl mb-2">💵</div>
            <p className="text-white text-sm font-bold">Cash Out</p>
            <p className="text-gray-400 text-xs mt-1">Before it crashes</p>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-white text-sm font-bold">Win Big</p>
            <p className="text-gray-400 text-xs mt-1">Up to 100x!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
