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
  Globe,
  Wallet,
  Rocket,
  ArrowRight,
  Star,
  DollarSign
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="text-xl font-black tracking-tight">
              AVIATOR <span className="text-green-500">EARNINGS</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#services" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Process</a>
            <a href="#faq" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/api/auth/signin" className="hidden sm:block text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/api/auth/signin" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
              Get 3% Bonus
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8 animate-bounce">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-black text-green-400 uppercase tracking-widest">🎖️ #1 Trusted Crash Game in India</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
              Earn Big with <br />
              <span className="text-gradient">Aviator Game</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed mb-12">
              India's most trusted aviator earning platform! Play smart, win big, and withdraw instantly.
              Join thousands of players earning real money every day with our provably fair crash game!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Link href="/dashboard" className="group w-full sm:w-auto px-12 py-6 bg-green-600 hover:bg-green-500 text-white rounded-2xl text-xl font-black shadow-2xl shadow-green-600/30 transition-all flex items-center justify-center gap-3">
                Start Earning <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xl font-black border border-slate-800 transition-all text-center">
                How It Works
              </Link>
            </div>

            {/* Live Achievement Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 p-8 rounded-[40px] bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl">
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-black text-slate-500 uppercase tracking-widest">Total Winnings</div>
                <div className="text-4xl font-black text-white">₹10L+</div>
                <div className="text-xs font-bold text-green-400">Paid out this month</div>
              </div>
              <div className="flex flex-col items-center gap-2 md:border-x border-slate-800">
                <div className="text-sm font-black text-slate-500 uppercase tracking-widest">Active Players</div>
                <div className="text-4xl font-black text-white">50K+</div>
                <div className="text-xs font-bold text-emerald-400">Growing daily</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-black text-slate-500 uppercase tracking-widest">Max Multiplier</div>
                <div className="text-4xl font-black text-white">100x</div>
                <div className="text-xs font-bold text-amber-400">Win big every round</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Why We Are <span className="text-indigo-500">Different?</span></h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-lg">We offer the cheapest SMM panel services without sacrificing quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Best Value Prices",
                desc: "We offer the most affordable rates in the industry while maintaining premium quality.",
                icon: DollarSign,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10"
              },
              {
                title: "Fastest Delivery",
                desc: "Our automated system ensures your orders are processed and delivered instantly.",
                icon: Zap,
                color: "text-indigo-500",
                bg: "bg-indigo-500/10"
              },
              {
                title: "Easy Account Funding",
                desc: "Adding money is quick with support for UPI, Cards, and Cryptocurrencies.",
                icon: Wallet,
                color: "text-amber-500",
                bg: "bg-amber-500/10"
              },
              {
                title: "Non-Drop Service",
                desc: "100% refill guarantee on our non-drop services for long-term growth.",
                icon: ShieldCheck,
                color: "text-rose-500",
                bg: "bg-rose-500/10"
              },
              {
                title: "Automated Orders",
                desc: "Drip-feed method allows you to automate growth naturally over time.",
                icon: Rocket,
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "24/7 Expert Support",
                desc: "Always here to assist you via Ticket or WhatsApp at any time of the day.",
                icon: MessageSquare,
                color: "text-violet-500",
                bg: "bg-violet-500/10"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-[32px] bg-slate-900/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section id="services" className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Our Best <span className="text-indigo-500">SMM Services</span></h2>
              <p className="text-slate-400 text-lg font-medium">We have thousands of services to help you grow your social media presence across all platforms.</p>
            </div>
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-black text-sm transition-all">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Telegram Premium Members",
                desc: "Enhance channel visibility in global search results with authentic-looking accounts featuring profiles, bios, and usernames.",
                price: "$0.01",
                icon: Users
              },
              {
                title: "Instagram Real Followers",
                desc: "High-retention followers that help boost your organic reach and credibility instantly.",
                price: "$0.005",
                icon: TrendingUp
              },
              {
                title: "YouTube Watch Time",
                desc: "Monetize your channel faster with our stable and safe watch time services.",
                price: "$2.50",
                icon: Zap
              },
              {
                title: "TikTok Engagement",
                desc: "Viral-ready views and likes to get your content on the 'For You' page.",
                price: "$0.0001",
                icon: Rocket
              }
            ].map((service, i) => (
              <div key={i} className="flex gap-8 p-8 rounded-[32px] bg-slate-950 border border-slate-900 hover:border-indigo-500/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black">{service.title}</h3>
                    <span className="text-indigo-500 font-black">from {service.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{service.desc}</p>
                  <Link href="/dashboard/order" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300">
                    Order Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Simple <span className="text-indigo-500">3-Step</span> Process</h2>
            <p className="text-slate-400 font-medium text-lg">Getting started with AirSMM is easier than ever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-900 -z-10"></div>
            {[
              { step: "01", title: "Create Account", desc: "Sign up and deposit funds using our 100% secure payment gateway." },
              { step: "02", title: "Select Service", desc: "Choose from 5000+ services and enter your target profile link." },
              { step: "03", title: "Instant Growth", desc: "Watch your social media metrics grow in real-time on the same day." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl font-black text-indigo-500 mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                  {item.step}
                </div>
                <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900/20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">FAQ<span className="text-indigo-500">s</span></h2>
          <div className="space-y-4">
            {[
              { q: "What is an SMM Panel?", a: "An SMM Panel is an online store that sells social media marketing services like followers, likes, and views for various platforms at wholesale prices." },
              { q: "Is it safe for my account?", a: "Yes, we use secure methods that comply with social media platform terms. We never ask for your passwords." },
              { q: "How long does delivery take?", a: "Most services are instant. Some may take 1-2 hours depending on the order size and current server load." },
              { q: "What are your payment methods?", a: "We accept all major Indian payment methods like UPI, Paytm, Cards, and also global options like Crypto." }
            ].map((faq, i) => (
              <details key={i} className="group p-8 rounded-3xl bg-slate-950 border border-slate-900 cursor-pointer hover:border-slate-800 transition-all">
                <summary className="list-none flex items-center justify-between font-black text-lg">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <Zap size={14} className="text-indigo-500" />
                  </div>
                </summary>
                <p className="mt-6 text-slate-400 font-medium leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-900 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-8 text-white">Unlock Your Digital <br />Potential Today</h2>
          <p className="text-indigo-100 font-medium mb-12 max-w-2xl mx-auto text-xl">Join 11,000+ happy clients and influencers who trust our panel for their social media growth.</p>
          <Link href="/api/auth/signin" className="inline-block px-12 py-6 bg-white text-indigo-600 rounded-2xl text-xl font-black shadow-2xl shadow-black/20 hover:scale-105 transition-all active:scale-95">
            Get Started & Claim 3% Bonus
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">S</div>
                <span className="text-xl font-black tracking-tight">SMM PANEL</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 text-sm">
                The world's most trusted and cheapest SMM panel. Providing premium services for Instagram, YouTube, and Telegram since 2020.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-6">Quick Links</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Services List</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-6">Services</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Telegram Services</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Instagram Services</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">YouTube Services</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">TikTok Services</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contact Us</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="flex items-center gap-3"><MessageSquare size={16} className="text-indigo-500" /> Support Ticket</li>
                <li className="flex items-center gap-3"><Globe size={16} className="text-indigo-500" /> 24/7 Live Assistance</li>
                <li className="pt-4 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all cursor-pointer">
                    <Zap size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all cursor-pointer">
                    <Users size={18} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-900 gap-6">
            <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">© 2026 SMM PANEL • All Rights Reserved</p>
            <div className="flex gap-8 text-slate-600 font-bold text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
              <a href="#" className="hover:text-white transition-colors">System</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
