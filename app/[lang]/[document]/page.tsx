import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { MotionEffects } from "@/components/motion-effects";
import { isLocale, translate } from "@/lib/i18n";
import { documentLabels, documentSlugs, getDocument, isDocumentSlug, supportEmail } from "@/lib/information";
import { indexable, metadataFor } from "@/lib/site";

type Props = { params: Promise<{ lang: string; document: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return documentSlugs.map(document => ({ document }));
}
export async function generateMetadata({ params }: Props) {
  const { lang, document: slug } = await params;
  if (!isLocale(lang) || !isDocumentSlug(slug)) notFound();
  const document = getDocument(lang, slug);
  const t = (key: string) => translate(lang, key);
  const title = (lang === "en" ? t(documentLabels[slug]) : document.title) + " — Sparkbook";
  const description = t(slug === "support" ? "Sparkbook қолдауы: кіру, сабақтар, тіл, еске салғыштар және аккаунт туралы сұрақтарға жауаптар. Бізге support@sparkbook.kz поштасына жазыңыз." : "Sparkbook құжаттары: сервис шарттары, деректерді өңдеу және аккаунтты басқару туралы ақпарат. Орысша және қазақша мәтіндер.");
  const base = metadataFor(lang);
  const canonical = "/" + (lang === "en" ? "ru" : lang) + "/" + slug;
  return {
    ...base, title, description,
    alternates: { canonical, languages: { kk: "/kk/" + slug, ru: "/ru/" + slug } },
    openGraph: { ...base.openGraph, title, description, url: canonical },
    twitter: { ...base.twitter, title, description },
    robots: { index: indexable && !document.draft && lang !== "en", follow: indexable }
  };
}

export default async function DocumentPage({ params }: Props) {
  const { lang, document: slug } = await params;
  if (!isLocale(lang) || !isDocumentSlug(slug)) notFound();
  const document = getDocument(lang, slug);
  const t = (key: string) => translate(lang, key);
  const title = lang === "en" ? t(documentLabels[slug]) : document.title;
  return <>
    <a className="skip-link" href="#main">{t("Мазмұнға өту")}</a>
    <Header locale={lang} pagePath={"/" + slug} />
    <main id="main" className="document-page">
      <header className="document-heading wrap">
        <a className="document-back text-link" href={"/" + lang}><Icon name="arrow-left" />{t("Басты бетке")}</a>
        <p className="eyebrow">{t("SPARKBOOK · КӨМЕК ЖӘНЕ ҚҰЖАТТАР")}</p>
        <h1>{title}</h1>
        {document.edition && <p className="document-edition" lang={lang === "kk" ? "kk" : "ru"}>{document.edition}</p>}
        {slug === "support" && <a className="support-email" href={"mailto:" + supportEmail} translate="no">{supportEmail}<Icon name="arrow-up-right" /></a>}
      </header>
      <div className="document-layout wrap">
        <aside className="document-sidebar">
          <nav aria-label={t("Көмек және құжаттар")}>
            {documentSlugs.map(item => <a key={item} href={"/" + lang + "/" + item} aria-current={slug === item ? "page" : undefined}>{t(documentLabels[item])}<Icon name={slug === item ? "arrow-up-right" : "arrow-right"} /></a>)}
          </nav>
          <p>{t("Сұрағың бар ма?")}</p>
          <a className="text-link" href={"mailto:" + supportEmail}>{t("Бізге жаз")}<Icon name="arrow-up-right" /></a>
        </aside>
        <article className="document-reader" aria-label={title}>
          {lang === "en" && <p className="document-language-note" lang="en">{t("Құжат мәтіні орысша көрсетілген. Қазақша нұсқа тіл ауыстырғышында қолжетімді.")}</p>}
          {document.draft && <div className="document-draft">
            <span>{t("Құжат жобасы")}</span>
            <p>{t("Түпнұсқада күн, деректемелер және кейбір шарттар әлі толтырылмаған. Жақшадағы өрістер сақталған; бұл соңғы редакция емес.")}</p>
          </div>}
          {document.toc.length > 0 && <details className="document-toc">
            <summary>{t("Мазмұны")}<Icon name="plus" /></summary>
            <ol lang={lang === "kk" ? "kk" : "ru"}>{document.toc.map(section => <li key={section.id}><a href={"#" + section.id}>{section.title}</a></li>)}</ol>
          </details>}
          {/* Build-time source markup: only vetted semantic tags, safe links and attributes are retained. */}
          <div className="document-body" lang={lang === "kk" ? "kk" : "ru"} dangerouslySetInnerHTML={{ __html: document.html }} />
        </article>
      </div>
    </main>
    <Footer locale={lang} />
    <MotionEffects />
  </>;
}
