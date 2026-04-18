import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-2xl font-bold text-gradient">
                  SMM Panel
                </Link>
              </div>
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
            <div className="flex items-center space-x-6">
              <div className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
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
        </div>
      </nav>
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
