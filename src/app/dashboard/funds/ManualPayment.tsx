"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { 
  Copy, 
  Check, 
  Upload, 
  DollarSign, 
  IndianRupee,
  Wallet,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Info,
  CheckCircle2
} from "lucide-react";

export default function ManualPaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [uploadedProof, setUploadedProof] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState("");

  const PAYMENT_DETAILS = {
    upi: {
      id: "nishkarshk46@oksbi",
      name: "Nishkarsh Kumar",
    },
    qrCode: {
      upiUrl: `upi://pay?pa=nishkarshk46@oksbi&pn=Nishkarsh%20Kumar&cu=INR`,
    },
    bank: {
      accountName: "Nishkarsh Kumar",
      accountNumber: "XXXXXXXXXXXX",
      ifsc: "SBIN000XXXX",
      bankName: "State Bank of India",
    },
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("paymentMethod", paymentMethod);
      formData.append("transactionId", transactionId);
      
      if (uploadedProof) {
        formData.append("proof", uploadedProof);
      }

      const response = await fetch("/api/payments/manual", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Payment proof submitted! Waiting for admin approval.");
        router.push("/dashboard/funds");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to submit payment proof");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to submit payment proof");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Add <span className="text-gradient">Funds</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Securely top up your balance using UPI or Bank Transfer.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 bg-white dark:bg-slate-900/50 border-indigo-100 dark:border-indigo-900/30">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Wallet className="text-indigo-500" />
              Payment Details
            </h2>

            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  paymentMethod === "upi"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                UPI Transfer
              </button>
              <button
                onClick={() => setPaymentMethod("bank")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  paymentMethod === "bank"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Bank Transfer
              </button>
            </div>

            {paymentMethod === "upi" ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 inline-block group">
                    <QRCodeSVG
                      value={PAYMENT_DETAILS.qrCode.upiUrl}
                      size={200}
                      level="H"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Scan QR Code to Pay</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "UPI ID", value: PAYMENT_DETAILS.upi.id, id: "upi" },
                    { label: "Account Name", value: PAYMENT_DETAILS.upi.name, id: "name" }
                  ].map((field) => (
                    <div key={field.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{field.label}</span>
                        <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{field.value}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(field.value, field.id)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-400 hover:text-indigo-500 transition-all shadow-sm"
                      >
                        {copied === field.id ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Bank Name", value: PAYMENT_DETAILS.bank.bankName, id: "bankName" },
                  { label: "Account Name", value: PAYMENT_DETAILS.bank.accountName, id: "accName" },
                  { label: "Account Number", value: PAYMENT_DETAILS.bank.accountNumber, id: "accNum" },
                  { label: "IFSC Code", value: PAYMENT_DETAILS.bank.ifsc, id: "ifsc" }
                ].map((field) => (
                  <div key={field.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">{field.label}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{field.value}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(field.value, field.id)}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-400 hover:text-indigo-500 transition-all shadow-sm"
                    >
                      {copied === field.id ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
            <div className="flex gap-4">
              <Info className="text-amber-600 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest">Important Notice</h4>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-500 leading-relaxed">
                  Please ensure you send the exact amount and submit the correct Transaction ID/Screenshot. 
                  Approvals typically take 15-60 minutes during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-indigo-100 dark:border-indigo-900/30">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="text-indigo-500" />
              Submit Payment Proof
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Deposit Amount (INR)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="number"
                    className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all font-black text-slate-900 dark:text-white"
                    placeholder="Enter amount in INR"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Transaction ID / UTR</label>
                <input
                  type="text"
                  className="block w-full px-4 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all font-black text-slate-900 dark:text-white"
                  placeholder="Enter 12-digit UTR or Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Upload Screenshot</label>
                <div className="relative group">
                  <input
                    type="file"
                    className="hidden"
                    id="proof-upload"
                    accept="image/*"
                    onChange={(e) => setUploadedProof(e.target.files ? e.target.files[0] : null)}
                  />
                  <label
                    htmlFor="proof-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 transition-all bg-slate-50 dark:bg-slate-800/50"
                  >
                    {uploadedProof ? (
                      <div className="flex items-center gap-3 text-emerald-500 font-black">
                        <CheckCircle2 size={32} />
                        <span>{uploadedProof.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload size={32} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                        <span className="text-sm font-black text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">Choose file or drag & drop</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PNG, JPG up to 5MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Submitting Proof...
                  </>
                ) : (
                  "Submit Deposit Request"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
