import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

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
    <div className="min-h-screen bg-gradient-mesh dark:bg-slate-950 flex">
      <Sidebar 
        userEmail={session.user?.email || ""} 
        balance={session.user?.balance || 0} 
      />
      
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 h-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:hidden">
          {/* Mobile Header Only */}
          <div className="flex items-center justify-center h-full">
            <span className="text-xl font-black text-gradient">SMM PANEL</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="p-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            © 2026 SMM PANEL • Powering Growth
          </p>
        </footer>
      </div>
    </div>
  );
}
