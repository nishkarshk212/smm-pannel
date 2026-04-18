"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FundsForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [amount, setAmount] = useState("10");
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for success or cancellation from Stripe redirect
    const successParam = searchParams.get('success');
    const canceledParam = searchParams.get('canceled');
    
    if (successParam === 'true') {
      setSuccess('Payment successful! Your wallet has been topped up.');
      // Refresh page after 3 seconds
      setTimeout(() => router.refresh(), 3000);
    } else if (canceledParam === 'true') {
      setError('Payment was canceled. No charges were made.');
    }
  }, [searchParams, router]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      // Initialize Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SMM Panel',
        description: `Wallet Top-up - ₹${amount}`,
        order_id: orderData.orderId,
        handler: function (response: any) {
          // Payment successful
          setSuccess('Payment successful! Your wallet has been topped up.');
          setTimeout(() => router.refresh(), 3000);
        },
        prefill: {
          name: (window as any).user?.name || '',
          email: (window as any).user?.email || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment was canceled. No charges were made.');
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          Recharge Amount (USD / INR)
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 font-bold">{paymentMethod === 'stripe' ? '$' : '₹'}</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            className="input-field pl-8 py-3 text-lg font-bold"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={paymentMethod === 'stripe' ? "5" : "100"}
            required
          />
        </div>
        <p className="text-xs text-slate-500 font-medium px-1">
          Min. deposit: {paymentMethod === 'stripe' ? '$5.00 USD' : '₹100 INR'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={`p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'stripe'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">💳</div>
              <div className="text-sm font-bold">Stripe</div>
              <div className="text-xs text-slate-500">Cards, International</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('razorpay')}
            className={`p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'razorpay'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">🇮🇳</div>
              <div className="text-sm font-bold">Razorpay</div>
              <div className="text-xs text-slate-500">UPI, Cards, NetBanking</div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paymentMethod === 'stripe' ? (
          <button
            onClick={handleStripePayment}
            disabled={loading}
            className={`w-full btn-primary py-4 text-base ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Connecting to Stripe..." : "Top up with Stripe"}
          </button>
        ) : (
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className={`w-full btn-primary py-4 text-base ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Connecting to Razorpay..." : "Top up with Razorpay"}
          </button>
        )}
        
        <button
          disabled={true}
          className="w-full flex justify-center items-center py-4 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-400 bg-transparent cursor-not-allowed"
        >
          <span className="mr-2">₿</span> Pay with Crypto (Soon)
        </button>
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
    </div>
  );
}
