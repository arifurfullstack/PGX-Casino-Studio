import Link from "next/link";
import { CheckCircle2, Crown, ArrowRight, ShieldCheck } from "lucide-react";
import { DEFAULT_STARTER_PACKAGE, DEFAULT_ADDON_MODULES } from "@/config/default-package";

export const metadata = {
  title: "Pricing & Packages | All I Gaming",
  description: "Transparent turnkey casino package pricing. Starter package from $15,000 USD with slots and table games.",
};

export default function PackagesPage() {
  const starter = DEFAULT_STARTER_PACKAGE;

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              Transparent Turnkey Investment
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Simple, Transparent <span className="text-[#FFD700]">Pricing</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Everything you need to launch a high-converting global online casino. No hidden development fees, certified games, and flexible modular upgrades.
          </p>
        </div>

        {/* Featured Package Hero Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#130526] to-[#070110] border-2 border-yellow-400/80 p-6 sm:p-10 shadow-[0_0_50px_rgba(255,215,0,0.25)] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-900/60 pb-8">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-yellow-400 text-black">
                Most Popular • Turnkey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white">
                {starter.subtitle}
              </h2>
              <p className="text-sm text-gray-300 max-w-lg">
                {starter.description}
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-3xl sm:text-5xl font-black text-yellow-400">
                ${starter.basePrice.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mt-1">USD One-Time Setup</p>
              <p className="text-[11px] text-green-400 font-bold mt-0.5">$500 Refundable Reservation</p>
            </div>
          </div>

          {/* Included Features Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200">
              What&apos;s Included In Starter Package:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {starter.includes.map((feat) => (
                <div key={feat.title} className="flex items-start gap-2.5 p-2 rounded-lg bg-purple-950/30">
                  <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm text-gray-200 font-medium">{feat.title}</span>
                    {feat.sub && <p className="text-[11px] text-gray-400">{feat.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Guarantees */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-900/60">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={16} className="text-green-400" />
              <span>Full source deployment, 99.99% uptime guarantee</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/designs"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <span>Browse Designs &amp; Reserve</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

        {/* Addons Grid */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              Modular Expansion Add-Ons
            </h3>
            <p className="text-xs text-gray-400">Add any engine dynamically to your platform at setup or post-launch</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_ADDON_MODULES.map((addon) => (
              <div
                key={addon.id}
                className="rounded-2xl bg-[#090214] border border-purple-900/60 p-5 space-y-3 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                    <span className="text-xs font-black text-yellow-400">${addon.price.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{addon.description}</p>
                </div>
                <Link
                  href={`/contact?module=${addon.id}`}
                  className="w-full py-1.5 rounded-lg text-center text-xs font-semibold text-purple-200 bg-purple-950/50 hover:bg-purple-900 border border-purple-600/40 transition-colors"
                >
                  Configure
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
