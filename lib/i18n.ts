import copy from "./copy.json";
export const locales = ["kk", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some(locale => locale === value);
}
export function translate(locale: Locale, key: string): string {
  return locale === "kk" ? key : (copy as Record<string, string[]>)[key]?.[locale === "ru" ? 0 : 1] ?? key;
}
