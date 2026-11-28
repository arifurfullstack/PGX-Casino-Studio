"use client";

import {
  AppLocale,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  getLocaleDir,
} from "./config";

/**
 * Persists the user's selected locale in both a first-party cookie (read by SSR)
 * and localStorage, and immediately updates <html lang/dir> for zero-flicker UX.
 */
export function persistLocalePreference(locale: AppLocale): void {
  if (typeof document !== "undefined") {
    const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(
      locale
    )}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secureFlag}`;

    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDir(locale);
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
  }
}

export function hasLocalLocalePreference(): boolean {
  if (typeof document !== "undefined") {
    const cookiePrefix = `${LOCALE_COOKIE_NAME}=`;
    if (document.cookie.split(";").some((c) => c.trim().startsWith(cookiePrefix))) {
      return true;
    }
  }
  if (typeof window !== "undefined") {
    try {
      return Boolean(window.localStorage.getItem(LOCALE_STORAGE_KEY));
    } catch {
      return false;
    }
  }
  return false;
}
