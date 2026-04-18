import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-mesh flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      <div className="z-10 max-w-5xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="SMM Panel Logo"
            width={120}
            height={120}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-indigo-100 dark:border-slate-700 shadow-sm animate-bounce">
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            ✨ #1 Telegram SMM Panel
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Grow Your <br />
          <span className="text-gradient">Telegram Network</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          The ultimate platform for member mass adding, post views, and channel engagement. 
          Instant delivery, secure payments, and 24/7 support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/api/auth/signin" className="btn-primary py-4 px-10 text-lg">
            Start Growing Now
          </Link>
          <Link href="/dashboard" className="px-10 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-900/50 transition-all">
            View Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Orders Done", value: "500K+" },
            { label: "Accounts", value: "50K+" },
            { label: "Success Rate", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-8 text-sm font-bold text-slate-400 dark:text-slate-600">
        © 2026 SMM Panel. Powered by GramJS & Next.js
      </footer>
    </main>
  );
}
