"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Wallet, 
  Users, 
  Ticket, 
  Menu, 
  X,
  LogOut,
  Settings,
  HelpCircle,
  PackageSearch,
  Globe,
  Gamepad2
} from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCurrency } from "@/components/CurrencyProvider";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Play Aviator", href: "/dashboard/game", icon: Gamepad2 },
  { name: "New Order", href: "/dashboard/order", icon: ShoppingCart },
  { name: "Add Funds", href: "/dashboard/funds", icon: Wallet },
  { name: "Services", href: "/dashboard/services", icon: PackageSearch },
  { name: "Affiliates", href: "/dashboard/referrals", icon: Users },
  { name: "Support", href: "/dashboard/tickets", icon: Ticket },
];

export default function Sidebar({ userEmail, balance }: { userEmail: string; balance: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { currency, setCurrency, formatPrice } = useCurrency();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg text-slate-600 dark:text-slate-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/20">
              A
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              AVIATOR <span className="text-green-500">GAME</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                    isActive 
                      ? "bg-green-600 text-white shadow-lg shadow-green-500/25" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-500 dark:text-slate-500"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Footer */}
          <div className="mt-auto space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            {/* Currency Selector */}
            <div className="px-2 mb-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block px-1">Display Currency</label>
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setCurrency("USD")}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-lg text-[10px] font-black transition-all",
                    currency === "USD" 
                      ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency("INR")}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-lg text-[10px] font-black transition-all",
                    currency === "INR" 
                      ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            <div className="glass-card p-4 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Balance</span>
                <Link href="/dashboard/funds" className="p-1 rounded-md bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors">
                  <Wallet size={14} />
                </Link>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {formatPrice(balance)}
              </div>
            </div>

            <div className="px-2">
              <div className="text-xs font-bold text-slate-400 truncate mb-4">
                {userEmail}
              </div>
              <Link
                href="/api/auth/signout"
                className="flex items-center gap-3 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                <LogOut size={18} />
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
