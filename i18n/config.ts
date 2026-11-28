export const LOCALES = ["en", "es", "fr", "nl", "hi", "bn", "ar"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";
export const LOCALE_COOKIE_NAME = "rcc_locale";
export const LOCALE_STORAGE_KEY = "rcc_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export interface LocaleMeta {
  code: AppLocale;
  nativeName: string;
  englishName: string;
  dir: "ltr" | "rtl";
  shortCode: string;
  regionLabel: string;
}

export const LOCALE_METADATA: Record<AppLocale, LocaleMeta> = {
  en: {
    code: "en",
    nativeName: "English",
    englishName: "English",
    dir: "ltr",
    shortCode: "EN",
    regionLabel: "International",
  },
  es: {
    code: "es",
    nativeName: "Español",
    englishName: "Spanish",
    dir: "ltr",
    shortCode: "ES",
    regionLabel: "España & LATAM",
  },
  fr: {
    code: "fr",
    nativeName: "Français",
    englishName: "French",
    dir: "ltr",
    shortCode: "FR",
    regionLabel: "France & Global",
  },
  nl: {
    code: "nl",
    nativeName: "Nederlands",
    englishName: "Dutch",
    dir: "ltr",
    shortCode: "NL",
    regionLabel: "Nederland & België",
  },
  hi: {
    code: "hi",
    nativeName: "हिन्दी",
    englishName: "Hindi",
    dir: "ltr",
    shortCode: "HI",
    regionLabel: "भारत",
  },
  bn: {
    code: "bn",
    nativeName: "বাংলা",
    englishName: "Bengali",
    dir: "ltr",
    shortCode: "BN",
    regionLabel: "বাংলাদেশ ও ভারত",
  },
  ar: {
    code: "ar",
    nativeName: "العربية",
    englishName: "Arabic",
    dir: "rtl",
    shortCode: "AR",
    regionLabel: "العالم العربي",
  },
};

export function isValidLocale(value: string | undefined | null): value is AppLocale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

export function getLocaleDir(locale: AppLocale): "ltr" | "rtl" {
  return LOCALE_METADATA[locale].dir;
}

/**
 * Matches a standard HTTP Accept-Language header against supported locales.
 */
export function matchAcceptLanguage(headerValue: string | null | undefined): AppLocale {
  if (!headerValue) return DEFAULT_LOCALE;
  const candidates = headerValue
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
      const base = (tag || "").trim().toLowerCase().split("-")[0];
      return { base, q: Number.isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const candidate of candidates) {
    if (isValidLocale(candidate.base)) {
      return candidate.base;
    }
  }
  return DEFAULT_LOCALE;
}
