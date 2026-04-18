"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Check, X, Clock, DollarSign, User, Hash } from "lucide-react";

interface Payment {
  id: string;
  amount: number;
  status: string;
  externalId: string;
  metadata: string;
  createdAt: string;
  user: {
    email: string;
    name: string | null;
  };
}

export default function AdminPaymentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (status === "authenticated") {
      fetchPayments();
    }
  }, [status, router]);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments");
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        alert("Access denied or error fetching payments");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (paymentId: string, action: "APPROVED" | "REJECTED") => {
    if (!confirm(`Are you sure you want to ${action.toLowerCase()} this payment?`)) {
      return;
    }

    setProcessing(paymentId);

    try {
      const response = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, action }),
      });

      if (response.ok) {
        alert(`Payment ${action.toLowerCase()} successfully!`);
        // Remove from list
        setPayments(payments.filter((p) => p.id !== paymentId));
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update payment");
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Failed to update payment");
    } finally {
      setProcessing(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Pending Payments
            </h1>
            <p className="text-slate-400">
              Approve or reject manual payment requests
            </p>
          </div>
          <button
            onClick={fetchPayments}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {payments.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-12 text-center">
            <Clock className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Pending Payments
            </h3>
            <p className="text-slate-400">
              All payments have been processed
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => {
              const metadata = JSON.parse(payment.metadata || "{}");
              return (
                <div
                  key={payment.id}
                  className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl hover:border-slate-600 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Payment Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-2 rounded-lg">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            ₹{payment.amount.toFixed(2)}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {new Date(payment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            {payment.user.name || payment.user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300 font-mono">
                            {payment.externalId}
                          </span>
                        </div>
                        <div className="text-sm text-slate-300">
                          Method: <span className="font-semibold capitalize">{metadata.paymentMethod}</span>
                        </div>
                        <div className="text-sm text-slate-300">
                          Email: <span className="font-semibold">{payment.user.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAction(payment.id, "APPROVED")}
                        disabled={processing === payment.id}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check size={20} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(payment.id, "REJECTED")}
                        disabled={processing === payment.id}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X size={20} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
