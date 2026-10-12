import type { ReactNode } from "react";
import type { Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";
import { siteUrl } from "@/lib/site";
export const metadata = { metadataBase: siteUrl };

const onest = localFont({
  src: "../fonts/onest.ttf", weight: "400 700", display: "swap", variable: "--font-onest"
});
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };
export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang}><body className={onest.variable}>{children}</body></html>;
}
