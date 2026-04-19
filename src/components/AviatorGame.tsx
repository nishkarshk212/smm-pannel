'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface AviatorGameProps {
  onBet: (amount: number, autoCashOut?: number) => Promise<void>;
  onCashOut: () => Promise<void>;
  currentMultiplier: number;
  gameStatus: 'waiting' | 'running' | 'crashed';
  balance: number;
  lastCrashedAt: number;
  history: number[];
}

export default function AviatorGame({
  onBet,
  onCashOut,
  currentMultiplier,
  gameStatus,
  balance,
  lastCrashedAt,
  history,
}: AviatorGameProps) {
  const { data: session } = useSession();
  const [betAmount, setBetAmount] = useState(10);
  const [autoCashOut, setAutoCashOut] = useState(2.0);
  const [hasActiveBet, setHasActiveBet] = useState(false);
  const [currentBet, setCurrentBet] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Draw the aviator game graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    if (gameStatus === 'running' || gameStatus === 'crashed') {
      // Draw curve
      const maxMultiplier = Math.max(currentMultiplier, 2);
      const curveColor = gameStatus === 'crashed' ? '#ff4757' : '#00d26a';
      
      ctx.strokeStyle = curveColor;
      ctx.lineWidth = 3;
      ctx.beginPath();

      const startX = 50;
      const startY = height - 50;
      const endX = width - 50;
      const endY = height - 50 - ((currentMultiplier - 1) / (maxMultiplier - 1)) * (height - 100);

      // Draw exponential curve
      for (let t = 0; t <= 1; t += 0.01) {
        const x = startX + (endX - startX) * t;
        const y = startY - (startY - endY) * Math.pow(t, 2);
        
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw trail behind airplane
      ctx.strokeStyle = curveColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      const trailStart = 0.7;
      for (let t = trailStart; t <= 1; t += 0.01) {
        const x = startX + (endX - startX) * t;
        const y = startY - (startY - endY) * Math.pow(t, 2);
        
        if (t === trailStart) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Draw airplane
      const planeX = endX;
      const planeY = endY;
      
      // Draw airplane shape
      ctx.save();
      ctx.translate(planeX, planeY);
      
      // Airplane body
      ctx.fillStyle = curveColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Wings
      ctx.fillStyle = curveColor;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(5, -15);
      ctx.lineTo(15, -15);
      ctx.lineTo(5, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(5, 15);
      ctx.lineTo(15, 15);
      ctx.lineTo(5, 0);
      ctx.closePath();
      ctx.fill();
      
      // Tail
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-25, -10);
      ctx.lineTo(-20, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-25, 10);
      ctx.lineTo(-20, 0);
      ctx.closePath();
      ctx.fill();
      
      // Glow effect
      ctx.shadowColor = curveColor;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.restore();

      // Display multiplier
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${currentMultiplier.toFixed(2)}x`, width / 2, height / 2 - 50);

      if (gameStatus === 'crashed') {
        ctx.fillStyle = '#ff4757';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('CRASHED!', width / 2, height / 2 + 20);
      }
    } else {
      // Waiting state
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Next round starting...', width / 2, height / 2);
    }
  }, [currentMultiplier, gameStatus]);

  const handlePlaceBet = async () => {
    if (betAmount > balance) {
      alert('Insufficient balance!');
      return;
    }
    await onBet(betAmount, autoCashOut);
    setHasActiveBet(true);
  };

  const handleCashOut = async () => {
    await onCashOut();
    setHasActiveBet(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-6 shadow-2xl">
      {/* Game History */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {history.map((mult, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              mult >= 2.0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {mult.toFixed(2)}x
          </span>
        ))}
      </div>

      {/* Game Canvas */}
      <div className="relative mb-6 rounded-xl overflow-hidden border-2 border-blue-500/30">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Betting Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bet Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold mb-3">Place Bet</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1">Bet Amount (₹)</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min={1}
                max={balance}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              {[10, 50, 100, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setBetAmount(amount)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition-colors"
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-1">Auto Cash Out (x)</label>
              <input
                type="number"
                value={autoCashOut}
                onChange={(e) => setAutoCashOut(Number(e.target.value))}
                min={1.1}
                step={0.1}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handlePlaceBet}
              disabled={gameStatus !== 'waiting' || hasActiveBet || betAmount > balance}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {hasActiveBet ? 'Bet Placed' : 'Place Bet'}
            </button>
          </div>
        </div>

        {/* Cash Out Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <h3 className="text-white font-bold mb-3">Current Bet</h3>
          
          {hasActiveBet && gameStatus === 'running' ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Current Win</p>
                <p className="text-3xl font-bold text-green-400">
                  ₹{(betAmount * currentMultiplier).toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleCashOut}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-lg text-lg transition-all animate-pulse"
              >
                Cash Out @ {currentMultiplier.toFixed(2)}x
              </button>

              <div className="bg-gray-700/50 rounded-lg p-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Bet Amount:</span>
                  <span className="text-white">₹{betAmount}</span>
                </div>
                <div className="flex justify-between text-gray-400 mt-1">
                  <span>Auto Cash Out:</span>
                  <span className="text-white">{autoCashOut}x</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No active bet</p>
              <p className="text-sm mt-2">Place a bet to start playing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Game Status */}
      <div className="mt-4 text-center">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
            gameStatus === 'running'
              ? 'bg-green-500/20 text-green-400'
              : gameStatus === 'crashed'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {gameStatus === 'running'
            ? '🟢 Game in Progress'
            : gameStatus === 'crashed'
            ? `🔴 Crashed at ${lastCrashedAt.toFixed(2)}x`
            : '🔵 Waiting for bets...'}
        </span>
      </div>
    </div>
  );
}
