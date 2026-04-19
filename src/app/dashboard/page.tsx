import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PriceDisplay from "@/components/PriceDisplay";
import { 
  ShoppingCart, 
  Wallet, 
  Ticket, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any).id;
  
  const [orders, user, stats] = await Promise.all([
    (prisma as any).order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    (prisma as any).user.findUnique({
      where: { id: userId },
      select: { balance: true }
    }),
    (prisma as any).order.aggregate({
      where: { userId },
      _sum: { cost: true },
      _count: { id: true }
    })
  ]);

  const activeTickets = await (prisma as any).ticket.count({
    where: { userId, status: "OPEN" }
  });

  const cards = [
    {
      label: "Total Balance",
      value: user?.balance || 0,
      icon: Wallet,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      label: "Total Spent",
      value: stats._sum.cost || 0,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      label: "Total Orders",
      value: stats._count.id.toString(),
      icon: ShoppingCart,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      label: "Active Tickets",
      value: activeTickets.toString(),
      icon: Ticket,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/20"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome back, <span className="text-gradient">{session?.user?.name || "User"}</span>!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4 hover:translate-y-[-4px] transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{card.label}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {typeof card.value === 'number' ? <PriceDisplay amount={card.value} /> : card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Recent Orders
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                Your last 10 activities
              </p>
            </div>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View all
            </button>
          </div>
          <div className="px-0">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.length === 0 ? (
                <li className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic font-medium">
                  No orders yet. Start your first campaign!
                </li>
              ) : (
                orders.map((order: any) => (
                  <li key={order.id} className="px-6 py-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          order.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' :
                          order.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-600'
                        }`}>
                          {order.status === 'COMPLETED' ? <CheckCircle2 size={20} /> : 
                           order.status === 'PENDING' ? <Clock size={20} /> : 
                           <AlertCircle size={20} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                            {order.service}
                          </span>
                          <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate max-w-[200px] md:max-w-xs">
                            {order.target}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <PriceDisplay amount={order.cost} className="text-lg font-black text-slate-900 dark:text-white" />
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider ${
                          order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          order.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-4">
                        <span>Quantity: <span className="text-slate-900 dark:text-white">{order.quantity}</span></span>
                        <span>{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <span>ID: {order.id.slice(-8)}</span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={120} />
            </div>
            <h4 className="text-lg font-black mb-2 relative z-10">Quick Order</h4>
            <p className="text-indigo-100 text-sm mb-6 font-medium relative z-10">Get started with a new campaign instantly.</p>
            <a href="/dashboard/order" className="inline-block w-full py-3 px-6 bg-white text-indigo-600 font-black text-center rounded-xl hover:bg-indigo-50 transition-colors relative z-10">
              Create Campaign
            </a>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4">Support Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Live Support</span>
                </div>
                <span className="text-xs font-black text-green-600 uppercase">Online</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Our average response time is currently <span className="text-indigo-600 dark:text-indigo-400 font-bold">15 minutes</span>.
              </p>
              <a href="/dashboard/tickets" className="block text-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
