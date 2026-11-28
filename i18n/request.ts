import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import {
  AppLocale,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isValidLocale,
  matchAcceptLanguage,
} from "./config";

type MessageRecord = Record<string, unknown>;

function deepMergeMessages(base: MessageRecord, override: MessageRecord): MessageRecord {
  const result: MessageRecord = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMergeMessages(base[key] as MessageRecord, value as MessageRecord);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

const loaders: Record<AppLocale, () => Promise<MessageRecord>> = {
  en: () => import("../messages/en.json").then((m) => m.default as MessageRecord),
  es: () => import("../messages/es.json").then((m) => m.default as MessageRecord),
  fr: () => import("../messages/fr.json").then((m) => m.default as MessageRecord),
  nl: () => import("../messages/nl.json").then((m) => m.default as MessageRecord),
  hi: () => import("../messages/hi.json").then((m) => m.default as MessageRecord),
  bn: () => import("../messages/bn.json").then((m) => m.default as MessageRecord),
  ar: () => import("../messages/ar.json").then((m) => m.default as MessageRecord),
};

export async function resolveServerLocale(): Promise<{
  locale: AppLocale;
  hasCookie: boolean;
}> {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (isValidLocale(cookieVal)) {
    return { locale: cookieVal, hasCookie: true };
  }

  const headerStore = await headers();
  const matched = matchAcceptLanguage(headerStore.get("accept-language"));
  return { locale: matched || DEFAULT_LOCALE, hasCookie: false };
}

export default getRequestConfig(async () => {
  const { locale } = await resolveServerLocale();
  const baseMessages = await loaders[DEFAULT_LOCALE]();
  const messages =
    locale === DEFAULT_LOCALE
      ? baseMessages
      : deepMergeMessages(baseMessages, await loaders[locale]());

  return {
    locale,
    messages,
  };
});
