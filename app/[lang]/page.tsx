import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { isLocale } from "@/lib/i18n";
import { metadataFor, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return metadataFor(lang);
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": new URL("/#organization", siteUrl).href, name: "Sparkbook", url: siteUrl.href, logo: new URL("/assets/sparkbook-mark.png", siteUrl).href },
      { "@type": "WebSite", name: "Sparkbook", url: new URL(lang, siteUrl).href, inLanguage: lang, publisher: { "@id": new URL("/#organization", siteUrl).href } }
    ]
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><Landing locale={lang} /></>;
}
