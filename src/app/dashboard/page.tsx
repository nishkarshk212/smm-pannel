import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  const orders = await (prisma as any).order.findMany({
    where: { userId: (session?.user as any).id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-8">
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time status of your member addition campaigns.
          </p>
        </div>
        <div className="px-0">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders.length === 0 ? (
              <li className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic">
                No orders yet. Start your first campaign!
              </li>
            ) : (
              orders.map((order: any) => (
                <li key={order.id} className="px-6 py-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {order.service}
                      </span>
                      <span className="text-base font-semibold text-slate-900 dark:text-white mt-1">
                        {order.target}
                      </span>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        order.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        ${order.cost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <span>Qty: <span className="text-slate-900 dark:text-white font-bold">{order.quantity}</span></span>
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span>ID: {order.id.slice(-8)}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
