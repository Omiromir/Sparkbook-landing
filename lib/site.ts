import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
export const siteUrl = new URL(publicUrl);
export const indexable = !["localhost", "127.0.0.1"].includes(siteUrl.hostname) && process.env.VERCEL_ENV !== "preview";
export const seo = {
  "kk": {
    "title": "Sparkbook — ҰБТ-ға онлайн дайындық",
    "description": "ҰБТ-ға Sparkbook-пен өз қарқыныңмен дайындал. Математикалық сауаттылық, оқу сауаттылығы және Қазақстан тарихы: сабақтар, сынақтар мен прогресі бір қосымшада.",
    "locale": "kk_KZ"
  },
  "ru": {
    "title": "Sparkbook — онлайн-подготовка к ЕНТ",
    "description": "Готовься к ЕНТ со Sparkbook в своём темпе. Математическая грамотность, грамотность чтения и история Казахстана: уроки, тесты и твой прогресс в одном приложении.",
    "locale": "ru_KZ"
  },
  "en": {
    "title": "Sparkbook — UNT exam preparation",
    "description": "Prepare for Kazakhstan’s UNT with Sparkbook at your own pace. Explore math, reading literacy and history through lessons, quizzes and clear learning progress.",
    "locale": "en_US"
  }
} satisfies Record<Locale, {title: string; description: string; locale: string}>;

export function metadataFor(locale: Locale): Metadata {
  const { title, description } = seo[locale];
  return {
    metadataBase: siteUrl,
    title,
    description,
    applicationName: "Sparkbook",
    category: "education",
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map(lang => [lang, `/${lang}`])), "x-default": "/kk" }
    },
    openGraph: {
      type: "website", siteName: "Sparkbook", title, description,
      url: `/${locale}`, locale: seo[locale].locale,
      alternateLocale: locales.filter(lang => lang !== locale).map(lang => seo[lang].locale),
      images: [{ url: `/assets/og-${locale}.png`, width: 1200, height: 630, alt: title }]
    },
    twitter: { card: "summary_large_image", title, description, images: [`/assets/og-${locale}.png`] },
    robots: { index: indexable, follow: indexable },
    icons: { icon: "/assets/sparkbook-mark.png", apple: "/assets/sparkbook-mark.png" }
  };
}
