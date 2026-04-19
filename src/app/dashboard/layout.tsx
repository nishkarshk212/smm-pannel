import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-mesh dark:bg-slate-950">
      <nav className="glass-card sticky top-0 z-50 m-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="SMM Panel"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <Link href="/dashboard" className="text-2xl font-bold text-gradient">
                  SMM Panel
                </Link>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/order"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors"
                >
                  New Order
                </Link>
                <Link
                  href="/dashboard/funds"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors"
                >
                  Add Funds
                </Link>
                <Link
                  href="/dashboard/referrals"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors"
                >
                  Affiliates
                </Link>
                <Link
                  href="/dashboard/tickets"
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  ${session.user?.balance?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {session.user?.email}
                </span>
              </div>
              <Link
                href="/api/auth/signout"
                className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                Sign out
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className="sm:hidden pb-3">
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/dashboard/order"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                🛒 New Order
              </Link>
              <Link
                href="/dashboard/funds"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
              >
                💰 Add Funds
              </Link>
              <Link
                href="/dashboard/referrals"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              >
                👥 Affiliates
              </Link>
              <Link
                href="/dashboard/tickets"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
              >
                🎫 Support
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
