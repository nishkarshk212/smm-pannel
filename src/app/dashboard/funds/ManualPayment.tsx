"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Upload, DollarSign, IndianRupee } from "lucide-react";

export default function ManualPaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [uploadedProof, setUploadedProof] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState("");

  // Your payment details - UPDATE THESE WITH YOUR ACTUAL DETAILS
  const PAYMENT_DETAILS = {
    upi: {
      id: "nishkarshk46@oksbi", // Your UPI ID
      name: "Nishkarsh Kumar", // Your Name
    },
    qrCode: {
      // You can generate a QR code from your UPI ID using this URL format
      upiUrl: `upi://pay?pa=nishkarshk46@oksbi&pn=Nishkarsh%20Kumar&cu=INR`, // Your UPI URL
    },
    bank: {
      accountName: "Nishkarsh Kumar", // Your Name
      accountNumber: "", // Add your account number if you want bank transfers
      ifsc: "", // Add your IFSC code if you want bank transfers
      bankName: "State Bank of India", // Your Bank
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
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Add Funds</h1>
        <p className="text-slate-400 mb-8">Send payment using UPI/Bank Transfer and submit proof</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Details Card */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Payment Details</h2>

            {/* Payment Method Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  paymentMethod === "upi"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                UPI
              </button>
              <button
                onClick={() => setPaymentMethod("bank")}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  paymentMethod === "bank"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Bank Transfer
              </button>
            </div>

            {paymentMethod === "upi" ? (
              <div className="space-y-4">
                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                  <QRCodeSVG
                    value={PAYMENT_DETAILS.qrCode.upiUrl}
                    size={200}
                    level="H"
                  />
                </div>
                <p className="text-center text-sm text-slate-400">Scan QR code to pay</p>

                {/* UPI ID */}
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">UPI ID</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white font-mono">{PAYMENT_DETAILS.upi.id}</span>
                    <button
                      onClick={() => handleCopy(PAYMENT_DETAILS.upi.id, "upi")}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {copied === "upi" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* UPI Name */}
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">Name</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white">{PAYMENT_DETAILS.upi.name}</span>
                    <button
                      onClick={() => handleCopy(PAYMENT_DETAILS.upi.name, "name")}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {copied === "name" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Bank Details */}
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">Account Name</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white">{PAYMENT_DETAILS.bank.accountName}</span>
                    <button
                      onClick={() => handleCopy(PAYMENT_DETAILS.bank.accountName, "accName")}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {copied === "accName" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">Account Number</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white font-mono">{PAYMENT_DETAILS.bank.accountNumber}</span>
                    <button
                      onClick={() => handleCopy(PAYMENT_DETAILS.bank.accountNumber, "accNum")}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {copied === "accNum" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">IFSC Code</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white font-mono">{PAYMENT_DETAILS.bank.ifsc}</span>
                    <button
                      onClick={() => handleCopy(PAYMENT_DETAILS.bank.ifsc, "ifsc")}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {copied === "ifsc" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <label className="text-sm text-slate-400">Bank Name</label>
                  <p className="text-white mt-1">{PAYMENT_DETAILS.bank.bankName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Payment Proof Form */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Submit Payment Proof</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Amount Paid (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Transaction ID / Reference Number
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., UPI123456789"
                  required
                />
              </div>

              {/* Upload Screenshot */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Payment Screenshot (Optional but recommended)
                </label>
                <label className="flex items-center justify-center w-full h-32 px-4 transition bg-slate-700/50 border-2 border-slate-600 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-500 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-slate-400">
                      {uploadedProof ? uploadedProof.name : "Upload screenshot"}
                    </span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadedProof(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !amount || !transactionId}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <IndianRupee size={20} />
                    Submit Payment Proof
                  </>
                )}
              </button>

              {/* Instructions */}
              <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-xl mt-4">
                <h3 className="text-sm font-semibold text-indigo-300 mb-2">Instructions:</h3>
                <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside">
                  <li>Scan QR code or use bank details to make payment</li>
                  <li>Enter the exact amount you paid</li>
                  <li>Enter transaction ID from your payment app</li>
                  <li>Upload screenshot (optional but speeds up approval)</li>
                  <li>Wait for admin approval (usually within 1-2 hours)</li>
                </ol>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
