import Link from "next/link";
import { Crown, ShieldCheck, Server, Globe2, Award, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | All I Gaming Turnkey Solutions",
  description: "Learn about All I Gaming, the premier B2B online casino software provider delivering robust turnkey iGaming infrastructure.",
};

const STATS = [
  { label: "Uptime SLA", value: "99.99%", desc: "Enterprise cloud hosting" },
  { label: "Turnkey Themes", value: "12+", desc: "Customizable high-converting UI" },
  { label: "Delivery Time", value: "21-30 Days", desc: "Turnkey launch schedule" },
  { label: "Global Reach", value: "40+ Countries", desc: "Multi-currency & crypto ready" },
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Licensed Game Aggregation",
    desc: "Seamless single-wallet integration with over 5,000+ certified slots, live dealer tables, and sports feeds from top tier gaming studios.",
  },
  {
    icon: Server,
    title: "High-Availability Infrastructure",
    desc: "Distributed microservices deployed across low-latency edge servers with automated DDoS mitigation and multi-datacenter redundancy.",
  },
  {
    icon: Globe2,
    title: "Global Fiat & Crypto Wallets",
    desc: "Built-in support for Visa, Mastercard, instant bank transfers, Apple Pay, and leading cryptocurrencies (BTC, ETH, USDT, TRX).",
  },
  {
    icon: Users,
    title: "Dedicated B2B Partnership",
    desc: "We don't operate consumer casinos; our entire focus is empowering B2B operators with software reliability, backoffice tools, and scale.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              About All I Gaming
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Architecting The Future of <span className="text-[#FFD700]">iGaming</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            All I Gaming is a specialized B2B technology provider dedicated to lowering the barriers of launching, operating, and scaling modern online casino brands.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-[#090214] border border-purple-900/60 p-5 text-center space-y-1 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <div className="text-2xl sm:text-3xl font-black text-yellow-400">{s.value}</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">{s.label}</div>
              <p className="text-[11px] text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              Our Core Engineering Pillars
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              Built by senior distributed systems architects and seasoned iGaming industry veterans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl bg-[#090214] border border-purple-900/60 p-6 space-y-3 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-yellow-400/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-yellow-400 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-purple-900/60 space-y-4">
          <h3 className="text-xl font-bold text-white">Partner with All I Gaming</h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Schedule an introductory consultation with our platform architecture team today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
          >
            <span>Contact Enterprise Sales</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </main>
  );
}
