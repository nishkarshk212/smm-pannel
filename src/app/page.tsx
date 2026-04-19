import Link from "next/link";
import Image from "next/image";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  MessageSquare,
  TrendingUp,
  BarChart3,
  Globe
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              S
            </div>
            <span className="text-xl font-black tracking-tight">
              SMM <span className="text-indigo-500">PANEL</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">How it Works</a>
            <a href="#faq" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">FAQ</a>
            <Link href="/api/auth/signin" className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-black hover:bg-slate-200 transition-all">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-violet-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 animate-bounce">
            <Zap size={14} className="text-indigo-400" />
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">✨ #1 Telegram SMM Panel</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Scale Your <br />
            <span className="text-gradient">Telegram Network</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-12">
            The professional choice for member mass adding, post views, and channel engagement. 
            Automated delivery, military-grade security, and 24/7 expert support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/api/auth/signin" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-lg font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
              Get Started Now
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-black border border-slate-800 transition-all">
              Live Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
            {[
              { label: "Active Users", value: "10K+", icon: Users },
              { label: "Orders Done", value: "500K+", icon: CheckCircle2 },
              { label: "Daily Views", value: "2M+", icon: TrendingUp },
              { label: "Uptime", value: "99.9%", icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group hover:border-indigo-500/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <stat.icon size={20} />
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Built for <span className="text-indigo-500">Performance</span></h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Our infrastructure is optimized for high-volume Telegram operations with zero downtime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Delivery",
                desc: "Our automated system starts processing your order immediately after payment.",
                icon: Zap
              },
              {
                title: "Safe & Secure",
                desc: "We use private proxies and advanced algorithms to ensure your channel's safety.",
                icon: ShieldCheck
              },
              {
                title: "24/7 Support",
                desc: "Expert team available around the clock to help with your campaigns.",
                icon: MessageSquare
              },
              {
                title: "Detailed Analytics",
                desc: "Track your growth with real-time stats and comprehensive reporting.",
                icon: BarChart3
              },
              {
                title: "Global Reach",
                desc: "Target members from specific regions or go global for maximum impact.",
                icon: Globe
              },
              {
                title: "Custom Solutions",
                desc: "Need something specific? We offer tailored packages for large scale operations.",
                icon: Settings
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-3xl bg-slate-900/30 border border-slate-900 hover:bg-slate-900/50 hover:border-slate-800 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8">Simple <br /><span className="text-indigo-500">3-Step</span> Process</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Create Account", desc: "Sign up and deposit funds using our secure payment methods." },
                  { step: "02", title: "Choose Service", desc: "Select the service and package that fits your growth needs." },
                  { step: "03", title: "Launch Growth", desc: "Enter your channel link and watch your network grow instantly." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-indigo-500/20">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-black mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-full bg-indigo-600/20 absolute blur-[100px] -z-10 animate-pulse"></div>
              <div className="glass-card p-8 bg-slate-900/80 border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth Analytics</div>
                </div>
                <div className="space-y-6">
                  <div className="h-4 w-3/4 bg-slate-800 rounded-full animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-slate-800 rounded-full animate-pulse delay-75"></div>
                  <div className="h-32 w-full bg-indigo-600/10 rounded-2xl border border-indigo-500/20 flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-16 bg-slate-800 rounded-full"></div>
                        <div className="h-2 w-12 bg-slate-800 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-indigo-500 font-black text-xl">+240%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16">Frequently Asked <span className="text-indigo-500">Questions</span></h2>
          <div className="space-y-4 text-left">
            {[
              { q: "Is it safe for my Telegram channel?", a: "Absolutely. We use legitimate methods and private proxies to ensure your channel remains 100% safe and compliant with Telegram terms." },
              { q: "How long does delivery take?", a: "Most orders start instantly and complete within minutes. For larger orders, we drip-feed the delivery to ensure natural growth patterns." },
              { q: "Do the members drop over time?", a: "We provide high-quality members with low drop rates. If any drops occur within the guarantee period, we refill them for free." },
              { q: "What payment methods do you accept?", a: "We accept Stripe, Razorpay, and manual payments including USDT and other cryptocurrencies." }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-900 cursor-pointer hover:bg-slate-900/50 transition-all">
                <summary className="list-none flex items-center justify-between font-black text-lg">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <Zap size={14} className="text-indigo-500" />
                  </div>
                </summary>
                <p className="mt-4 text-slate-400 font-medium leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-violet-900 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">Ready to dominate <br />Telegram?</h2>
          <p className="text-indigo-100 font-medium mb-12 max-w-xl mx-auto text-lg">Join 10,000+ happy customers and start your growth journey today.</p>
          <Link href="/api/auth/signin" className="inline-block px-12 py-6 bg-white text-indigo-600 rounded-2xl text-xl font-black shadow-2xl shadow-black/20 hover:scale-105 transition-all active:scale-95">
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
            <span className="text-lg font-black tracking-tight">SMM PANEL</span>
          </div>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">© 2026 SMM PANEL • Powering Telegram Growth</p>
          <div className="flex gap-6 text-slate-500 font-bold text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
