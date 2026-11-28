"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Crown, Globe, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  AppLocale,
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_METADATA,
} from "@/i18n/config";
import {
  hasLocalLocalePreference,
  persistLocalePreference,
} from "@/i18n/client";

interface LanguageWelcomeModalProps {
  hasSavedLocale: boolean;
}

const emptySubscribe = () => () => {};

export default function LanguageWelcomeModal({
  hasSavedLocale,
}: LanguageWelcomeModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeLocale = useLocale() as AppLocale;
  const t = useTranslations("languageModal");

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isExcludedRoute =
    pathname?.startsWith("/admin") || pathname?.startsWith("/portal");

  const [dismissed, setDismissed] = useState(false);
  const [selectedPending, setSelectedPending] = useState<AppLocale | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  const isOpen =
    isHydrated &&
    !isExcludedRoute &&
    !hasSavedLocale &&
    !dismissed &&
    !hasLocalLocalePreference();

  const handleDismissDefault = useCallback(() => {
    const fallback = LOCALES.includes(activeLocale)
      ? activeLocale
      : DEFAULT_LOCALE;
    persistLocalePreference(fallback);
    setDismissed(true);
    router.refresh();
  }, [activeLocale, router]);

  const handleSelectLocale = useCallback(
    (locale: AppLocale) => {
      setSelectedPending(locale);
      persistLocalePreference(locale);
      setDismissed(true);
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismissDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleDismissDefault]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-[#04010a]/85 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      aria-describedby="language-modal-desc"
    >
      {/* Ambient Royal Spotlight Behind Modal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full bg-purple-700/20 blur-[140px]"
      />

      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#17062d] via-[#0e0320] to-[#080114] border-2 border-[#f5c451]/65 shadow-[0_0_60px_rgba(168,85,247,0.35),0_0_40px_rgba(245,196,81,0.2)] overflow-hidden">
        {/* Top Gold Hairline */}
        <div
          aria-hidden="true"
          className="h-1 w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
        />

        {/* Close / Continue with Default */}
        <button
          type="button"
          onClick={handleDismissDefault}
          aria-label={t("closeLabel")}
          className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-purple-950/70 border border-purple-500/40 text-gray-300 hover:text-[#FFD700] hover:border-[#FFD700]/70 flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={17} />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Brand & Title Header */}
          <div className="text-center space-y-2.5 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-[#f5c451]/45 text-[#FFD700] text-[11px] font-bold uppercase tracking-[0.2em]">
              <Crown size={13} className="fill-[#FFD700]/30" />
              <span>Royal Casino Club</span>
              <Sparkles size={12} />
            </div>

            <h2
              id="language-modal-title"
              className="font-philosopher text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white"
            >
              {t("titlePrefix")}{" "}
              <span className="gold-text">{t("titleHighlight")}</span>
            </h2>

            <p
              id="language-modal-desc"
              className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </p>
          </div>

          {/* 7-Language Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LOCALES.map((code, index) => {
              const meta = LOCALE_METADATA[code];
              const isSelected = (selectedPending || activeLocale) === code;

              return (
                <button
                  key={code}
                  ref={index === 0 ? firstButtonRef : undefined}
                  type="button"
                  onClick={() => handleSelectLocale(code)}
                  dir={meta.dir}
                  className={`group relative flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border text-start transition-all duration-200 cursor-pointer ${
                    code === "ar" ? "sm:col-span-2" : ""
                  } ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-900/75 to-[#1d0938] border-[#FFD700] shadow-[0_0_22px_rgba(255,215,0,0.28)]"
                      : "bg-[#0a0218]/90 border-purple-700/45 hover:border-[#f5c451]/80 hover:bg-purple-950/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black tracking-wider shrink-0 border transition-colors ${
                        isSelected
                          ? "bg-gradient-to-b from-[#FFE259] to-[#FFA700] text-black border-[#FFD700]"
                          : "bg-purple-950/80 text-[#FFD700] border-purple-500/40 group-hover:border-[#f5c451]/60"
                      }`}
                    >
                      {meta.shortCode}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-[15px] font-bold text-white leading-tight truncate group-hover:text-[#ffe28a] transition-colors">
                        {meta.nativeName}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {meta.englishName} &bull; {meta.regionLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {meta.dir === "rtl" && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/35 text-[10px] font-bold uppercase tracking-wider text-purple-200">
                        RTL
                      </span>
                    )}
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-[#FFD700] border-[#FFD700] text-black"
                          : "border-purple-600/50 text-transparent group-hover:border-[#f5c451]/70"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Hint */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-purple-900/50 text-[11px] text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Globe size={13} className="text-[#f5c451]" />
              <span>{t("hint")}</span>
            </span>
            <button
              type="button"
              onClick={handleDismissDefault}
              className="text-gray-300 hover:text-[#FFD700] font-semibold underline-offset-4 hover:underline cursor-pointer"
            >
              {t("continueDefault")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
