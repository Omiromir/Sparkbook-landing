import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { documentSlugs, getDocument } from "@/lib/information";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map(lang => [lang, new URL(lang, siteUrl).href]));
  const landing = locales.map(lang => ({ url: new URL(lang, siteUrl).href, alternates: { languages } }));
  const documents = (["kk", "ru"] as const).flatMap(lang =>
    documentSlugs.filter(slug => !getDocument(lang, slug).draft).map(slug => ({
      url: new URL(lang + "/" + slug, siteUrl).href,
      alternates: { languages: Object.fromEntries(["kk", "ru"].map(language => [language, new URL(language + "/" + slug, siteUrl).href])) }
    }))
  );
  return [...landing, ...documents];
}
