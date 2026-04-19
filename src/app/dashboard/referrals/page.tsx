"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  Copy, 
  Check, 
  Gift, 
  Zap,
  Loader2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function ReferralsPage() {
  const [data, setData] = useState({
    referralCode: "",
    referralEarnings: 0,
    referrals: [],
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referrals")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500 w-12 h-12" />
      </div>
    );
  }

  const referralLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/auth/signin?ref=${data.referralCode}`
    : "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Affiliate <span className="text-gradient">Program</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Invite friends and earn lifetime commissions on every deposit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Gift size={160} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4">Invite & Earn 10% Commission</h2>
              <p className="text-indigo-100 font-medium mb-8 max-w-lg leading-relaxed">
                Every time someone joins using your link and makes a deposit, 
                you'll receive <span className="font-black text-white">10%</span> of their deposit amount instantly.
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-indigo-200">Your Referral Link</label>
                <div className="flex items-center gap-2 p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 bg-transparent px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-white/50"
                  />
                  <button
                    onClick={() => handleCopy(referralLink)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm shadow-xl transition-all hover:bg-indigo-50 active:scale-95"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recent Referrals
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Users who joined through your link
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-xs font-black text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                {data.referrals.length} TOTAL
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Referral Info</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {data.referrals.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic font-medium">
                        You haven't referred anyone yet. Start sharing!
                      </td>
                    </tr>
                  ) : (
                    data.referrals.map((ref: any) => (
                      <tr key={ref.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black text-xs uppercase">
                              {ref.email?.charAt(0) || "U"}
                            </div>
                            <span className="text-sm font-black text-slate-900 dark:text-white">
                              {ref.email?.split('@')[0]}...
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                          {new Date(ref.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">Total Earnings</h3>
            <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              ${data.referralEarnings.toFixed(2)}
            </div>
            <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Available in Balance</p>
            
            <a href="/dashboard/order" className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all active:scale-[0.98]">
              Use Earnings
            </a>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap size={20} className="text-indigo-500" />
              Quick Tips
            </h4>
            <div className="space-y-6">
              {[
                { title: "Share on Telegram", desc: "Share your link in relevant Telegram groups and channels." },
                { title: "Use Social Media", desc: "Post your referral link on Twitter, Reddit, and Facebook." },
                { title: "Direct Invites", desc: "Personally invite friends who are looking to grow their network." }
              ].map((tip, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-black text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900 dark:text-white mb-1">{tip.title}</h5>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
