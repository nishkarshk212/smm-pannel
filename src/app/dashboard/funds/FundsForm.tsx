"use client";

import { useState } from "react";

export default function FundsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("10");

  const handleStripePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to initiate payment");
      }

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Recharge Amount (USD)
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 font-bold">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            className="input-field pl-8 py-3 text-lg font-bold"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="5"
            required
          />
        </div>
        <p className="text-xs text-slate-500 font-medium px-1">Min. deposit: $5.00</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={handleStripePayment}
          disabled={loading}
          className={`w-full btn-primary py-4 text-base ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Connecting to Stripe..." : "Top up with Stripe"}
        </button>
        
        <button
          disabled={true}
          className="w-full flex justify-center items-center py-4 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-400 bg-transparent cursor-not-allowed"
        >
          <span className="mr-2">⚡</span> Pay with Crypto (Soon)
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
          <p className="text-rose-600 dark:text-rose-400 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
