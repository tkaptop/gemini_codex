import { Pathnames } from "next-intl/routing";

export const locales = ["en"];

export const localeNames: any = {
  en: "🇺🇸 English",
  zh: "🇨🇳 中文",
  ko: "🇰🇷 한국어",
  ja: "🇯🇵 日本語",
  es: "🇪🇸 Español",
  de: "🇩🇪 Deutsch",
  fr: "🇫🇷 Français",
  ru: "🇷🇺 Русский",
  ar: "🇸🇦 العربية",
  pt: "🇧🇷 Português",
  it: "🇮🇹 Italiano",
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection =
  process.env.NEXT_PUBLIC_LOCALE_DETECTION === "true";
