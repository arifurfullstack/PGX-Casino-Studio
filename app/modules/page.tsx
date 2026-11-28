import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Video, Trophy, Sparkles, Dices } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Add-On Modules",
  description:
    "Expand your online casino with Live Dealer tables, Sportsbook odds engine, Multiplayer Poker, and Sweepstakes add-on modules.",
};

const MODULES = [
  { id: "live-dealer", price: "$10,000 USD", icon: Video, image: "/images/module-live-dealer.png" },
  { id: "sportsbook", price: "$10,000 USD", icon: Trophy, image: "/images/module-sportsbook.png" },
  { id: "poker", price: "$20,000 USD", icon: Sparkles, image: "/images/module-poker.png" },
  { id: "sweepstakes", price: "$25,000 USD", icon: Dices, image: "/images/module-sweepstakes.png" },
] as const;

export default async function ModulesPage() {
  const t = await getTranslations("pages.modules");

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20 bg-[#04010a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
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

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const title = t(`items.${mod.id}.title`);
            const description = t(`items.${mod.id}.description`);
            const features = t.raw(`items.${mod.id}.features`) as string[];

            return (
              <div
                key={mod.id}
                className="rounded-3xl bg-[#090214] border border-purple-900/60 hover:border-yellow-400/70 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(255,215,0,0.25)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-yellow-400 flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xl font-black text-white">{title}</h3>
                    </div>
                    <span className="text-base font-black text-yellow-400 shrink-0">{mod.price}</span>
                  </div>

                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-purple-500/40 bg-[#07010e]">
                    <Image
                      src={mod.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{description}</p>

                  <ul className="space-y-2 pt-2 border-t border-purple-950/80">
                    {features.map((f) => (
                      <li key={f} className="text-xs text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?module=${mod.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{t("addToPackage")}</span>
                    <ArrowRight size={13} className="rtl-flip" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
