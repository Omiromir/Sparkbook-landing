import content from "./information.json";
import type { Locale } from "./i18n";

export const supportEmail = "support@sparkbook.kz";
export const documentSlugs = ["privacy", "terms", "consent", "delete-account", "support"] as const;
export type DocumentSlug = (typeof documentSlugs)[number];
export const documentLabels: Record<DocumentSlug, string> = {
  privacy: "Құпиялылық саясаты",
  terms: "Пайдаланушы келісімі",
  consent: "Дербес деректерді өңдеуге келісім",
  "delete-account": "Аккаунтты жою",
  support: "Қолдау"
};
export function isDocumentSlug(value: string): value is DocumentSlug {
  return documentSlugs.some(slug => slug === value);
}
export function getDocument(locale: Locale, slug: DocumentSlug) {
  // The supplied documents exist in Kazakh and Russian; English UI shows the labelled Russian source.
  return content[locale === "kk" ? "kk" : "ru"][slug];
}
