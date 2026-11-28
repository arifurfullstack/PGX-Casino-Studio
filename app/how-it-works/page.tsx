import Link from "next/link";
import { Crown, Monitor, Layers, Send, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "How It Works",
  description:
    "Launch your branded white-label online casino in 3 simple turnkey steps — from theme selection to live players in 21–30 days.",
};

const STEP_ITEMS = [
  { key: "step1", step: "01", icon: Monitor },
  { key: "step2", step: "02", icon: Layers },
  { key: "step3", step: "03", icon: Send },
] as const;

export default async function HowItWorksPage() {
  const t = await getTranslations("pages.howItWorks");

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

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEP_ITEMS.map((s) => {
            const Icon = s.icon;
            const deliverables = t.raw(`steps.${s.key}.deliverables`) as string[];
            return (
              <div
                key={s.step}
                className="relative rounded-3xl bg-[#090214] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-[0_0_25px_rgba(168,85,247,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 text-yellow-400 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-3xl font-black text-purple-800/80">{s.step}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{t(`steps.${s.key}.title`)}</h3>
                    <p className="text-xs font-semibold text-yellow-400/90">{t(`steps.${s.key}.subtitle`)}</p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{t(`steps.${s.key}.description`)}</p>

                  <div className="space-y-2 pt-3 border-t border-purple-950/80">
                    {deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 size={13} className="text-yellow-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={13} className="text-purple-400" />
                    <span>{t(`steps.${s.key}.turnaround`)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#15042a] to-purple-950/80 border-2 border-yellow-400/60 p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-6 shadow-[0_0_40px_rgba(255,215,0,0.2)]">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
            {t("ctaTitle")}
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/designs"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center gap-2 transition-all"
            >
              <span>{t("ctaButton")}</span>
              <ArrowRight size={15} className="rtl-flip" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
