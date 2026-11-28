import Link from "next/link";
import { Crown, ShieldCheck, Server, Globe2, Users, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "About Us",
  description:
    "Discover Royal Casino Club — B2B turnkey online casino software delivering luxury designs, certified games, and 99.99% uptime infrastructure.",
};

const STAT_KEYS = ["uptime", "themes", "delivery", "reach"] as const;
const PILLAR_ITEMS = [
  { key: "games", icon: ShieldCheck },
  { key: "infra", icon: Server },
  { key: "wallets", icon: Globe2 },
  { key: "partnership", icon: Users },
] as const;

export default async function AboutPage() {
  const t = await getTranslations("pages.about");

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
            <Crown size={13} className="text-[#FFD700]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              {t("badge")}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {t("headingPrefix")} <span className="text-[#FFD700]">{t("headingHighlight")}</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl bg-[#090214] border border-purple-900/60 p-5 text-center space-y-1 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <div className="text-2xl sm:text-3xl font-black text-yellow-400">{t(`stats.${key}.value`)}</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">{t(`stats.${key}.label`)}</div>
              <p className="text-[11px] text-gray-400">{t(`stats.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLAR_ITEMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.key}
                  className="rounded-2xl bg-[#090214] border border-purple-900/60 p-6 space-y-3 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-yellow-400/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-yellow-400 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white">{t(`pillars.${p.key}.title`)}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{t(`pillars.${p.key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-purple-900/60 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/designs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
          >
            <span>{t("ctaDesigns")}</span>
            <ArrowRight size={14} className="rtl-flip" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 transition-all"
          >
            <span>{t("ctaQuote")}</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
