"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = {
      service: formData.get("service"),
      target: formData.get("target"),
      quantity: parseInt(formData.get("quantity") as string),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      setSuccess("Order placed successfully!");
      router.refresh();
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="service" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Service Type
        </label>
        <select
          id="service"
          name="service"
          className="input-field"
          required
        >
          <option value="telegram_members">Telegram Members (Mass Adding)</option>
          <option value="telegram_views">Telegram Post Views</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="target" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Target Link / Username
        </label>
        <input
          type="text"
          name="target"
          id="target"
          className="input-field"
          placeholder="@channelname or https://t.me/..."
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="100"
          step="100"
          className="input-field"
          placeholder="Min 100"
          required
        />
        <div className="flex justify-between items-center px-1">
          <p className="text-xs font-medium text-slate-500">Rate: $0.01 / member</p>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Total: ${ (0.01 * 100).toFixed(2) }+</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
          <p className="text-rose-600 dark:text-rose-400 text-sm font-medium">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">{success}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Processing Order..." : "Confirm & Launch Campaign"}
      </button>
    </form>
  );
}
