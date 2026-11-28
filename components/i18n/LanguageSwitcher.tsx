"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AppLocale, LOCALES, LOCALE_METADATA } from "@/i18n/config";
import { persistLocalePreference } from "@/i18n/client";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  onLocaleChanged?: () => void;
}

export default function LanguageSwitcher({
  variant = "desktop",
  onLocaleChanged,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const activeLocale = useLocale() as AppLocale;
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMeta = LOCALE_METADATA[activeLocale] || LOCALE_METADATA.en;

  useEffect(() => {
    if (!isOpen || variant !== "desktop") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, variant]);

  const handleChoose = (locale: AppLocale) => {
    persistLocalePreference(locale);
    setIsOpen(false);
    onLocaleChanged?.();
    router.refresh();
  };

  if (variant === "mobile") {
    return (
      <div className="pt-2 border-t border-purple-900/40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-gray-200 hover:text-[#FFD700] transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Globe size={16} className="text-[#f5c451]" />
            <span>
              {t("languageLabel")}:{" "}
              <strong className="text-[#FFD700]">{currentMeta.nativeName}</strong>
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`text-purple-300 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
            {LOCALES.map((code) => {
              const meta = LOCALE_METADATA[code];
              const isSelected = activeLocale === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleChoose(code)}
                  dir={meta.dir}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-purple-900/70 border-[#FFD700] text-[#FFD700]"
                      : "bg-[#0e0422] border-purple-800/50 text-gray-200 hover:border-[#f5c451]/60"
                  }`}
                >
                  <span className="truncate">{meta.nativeName}</span>
                  {isSelected && <Check size={13} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("languageLabel")}
        title={t("languageLabel")}
        className="btn-nav-portal inline-flex !px-3.5 text-[13px] cursor-pointer"
      >
        <Globe size={15} className="text-[#f5c451] shrink-0" />
        <span className="font-bold tracking-wide">{currentMeta.shortCode}</span>
        <ChevronDown
          size={14}
          className={`text-white/75 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("languageLabel")}
          className="absolute end-0 mt-2 w-60 rounded-2xl bg-[#0c031c]/98 border border-[#f5c451]/45 backdrop-blur-xl p-2 shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(168,85,247,0.28)] z-50"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5c451]/90 border-b border-purple-900/50 mb-1">
            {t("languageLabel")}
          </div>

          <div className="space-y-1">
            {LOCALES.map((code) => {
              const meta = LOCALE_METADATA[code];
              const isSelected = activeLocale === code;
              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleChoose(code)}
                  dir={meta.dir}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-purple-900/70 text-[#FFD700] border border-[#f5c451]/60 font-bold"
                      : "text-gray-200 hover:bg-purple-950/70 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-black tracking-wider text-[#f5c451] w-5 shrink-0">
                      {meta.shortCode}
                    </span>
                    <span className="truncate">{meta.nativeName}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {isSelected ? <Check size={13} className="text-[#FFD700]" /> : meta.englishName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
