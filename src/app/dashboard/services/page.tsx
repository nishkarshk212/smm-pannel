import PriceDisplay from "@/components/PriceDisplay";
import { 
  PackageSearch, 
  Zap, 
  Users, 
  Eye, 
  ShieldCheck, 
  Clock,
  CheckCircle2,
  TrendingUp,
  Info
} from "lucide-react";

const services = [
  {
    id: "telegram_members",
    name: "Telegram Members (Mass Adding)",
    category: "Members",
    price: 0.01,
    unit: "per member",
    min: 100,
    max: 100000,
    description: "High-quality members added directly to your group or channel using our advanced mass-adding system.",
    features: ["Real-looking accounts", "Low drop rate", "Instant start", "Safe for channels"],
    speed: "5k - 10k / day",
    icon: Users,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    id: "telegram_views",
    name: "Telegram Post Views",
    category: "Views",
    price: 0.0005,
    unit: "per view",
    min: 500,
    max: 1000000,
    description: "Increase your post reach and credibility with high-retention views from real users.",
    features: ["Auto-start", "Gradual delivery", "No drop", "Lifetime guarantee"],
    speed: "100k+ / day",
    icon: Eye,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20"
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Our <span className="text-gradient">Services</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Choose from our high-performance Telegram growth solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div key={i} className="glass-card overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-all duration-300">
            <div className="p-8 flex-1">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Starting from</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    <PriceDisplay amount={service.price} /> <span className="text-xs font-bold text-slate-500">/{service.unit}</span>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider ${service.bg} ${service.color}`}>
                  {service.category}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
                {service.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-indigo-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Min</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{service.min.toLocaleString()}</span>
                </div>
                <div className="text-center border-x border-slate-200 dark:border-slate-700">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Max</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{service.max.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Speed</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{service.speed}</span>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Clock size={14} />
                Average Start: 15 mins
              </div>
              <a href="/dashboard/order" className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all">
                Order Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 border-indigo-100 dark:border-indigo-900">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xl shadow-indigo-600/20">
            <Info size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">Need a Custom Solution?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              We offer wholesale pricing and custom API integrations for large-scale operations. 
              Contact our enterprise team for a tailored quote.
            </p>
          </div>
          <a href="/dashboard/tickets" className="px-8 py-4 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 rounded-2xl font-black hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all">
            Contact Enterprise
          </a>
        </div>
      </div>
    </div>
  );
}
