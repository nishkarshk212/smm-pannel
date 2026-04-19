"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  Zap, 
  Users, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  DollarSign,
  IndianRupee
} from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

const services = [
  {
    id: "telegram_members",
    name: "Telegram Members (Mass Adding)",
    price: 0.01,
    min: 100,
    icon: Users,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    id: "telegram_views",
    name: "Telegram Post Views",
    price: 0.0005,
    min: 500,
    icon: Eye,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20"
  }
];

export default function OrderForm() {
  const router = useRouter();
  const { formatPrice, convertPrice, currency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedService, setSelectedService] = useState(services[0]);
  const [quantity, setQuantity] = useState(services[0].min);
  const [totalCost, setTotalCost] = useState(services[0].price * services[0].min);

  useEffect(() => {
    setTotalCost(selectedService.price * quantity);
  }, [selectedService, quantity]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = services.find(s => s.id === e.target.value) || services[0];
    setSelectedService(service);
    if (quantity < service.min) {
      setQuantity(service.min);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = {
      service: selectedService.id,
      target: (e.currentTarget.elements.namedItem("target") as HTMLInputElement).value,
      quantity: quantity,
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

      setSuccess("Order placed successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Select Service
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <selectedService.icon className={`h-5 w-5 ${selectedService.color}`} />
              </div>
              <select
                id="service"
                name="service"
                onChange={handleServiceChange}
                className="block w-full pl-12 pr-10 py-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-bold text-slate-900 dark:text-white"
                required
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="target" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Target Link / Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Zap className="h-5 w-5 text-indigo-500" />
              </div>
              <input
                type="text"
                name="target"
                id="target"
                className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-bold text-slate-900 dark:text-white"
                placeholder="@channelname or https://t.me/..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Order Quantity
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShoppingCart className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min={selectedService.min}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 pt-1">
              Minimum order: <span className="text-indigo-500">{selectedService.min.toLocaleString()}</span> units
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Service Rate</span>
                <span className="font-black text-slate-900 dark:text-white">{formatPrice(selectedService.price)} / unit</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Quantity</span>
                <span className="font-black text-slate-900 dark:text-white">{quantity.toLocaleString()} units</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="font-black text-slate-500 text-xs uppercase tracking-widest pb-1">Total Cost</span>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-3xl font-black text-indigo-600 dark:text-indigo-400">
                    {currency === "INR" ? <IndianRupee size={24} /> : <DollarSign size={24} />}
                    {convertPrice(totalCost).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 mb-8">
              <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-relaxed">
                <CheckCircle2 size={16} className="shrink-0" />
                Your campaign will start within 15 minutes of payment.
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 mb-6 flex items-center gap-3">
                <AlertCircle size={20} className="text-rose-500 shrink-0" />
                <p className="text-rose-600 dark:text-rose-400 text-sm font-bold">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 mb-6 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 ${loading ? "opacity-70 cursor-not-allowed" : "active:scale-95"}`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Confirm & Launch Campaign"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
