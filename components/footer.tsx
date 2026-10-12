import Image from "next/image";
import { Icon } from "./icon";
import { translate, type Locale } from "@/lib/i18n";
import { documentLabels, supportEmail } from "@/lib/information";

export function Footer({ locale, onLanding = false }: { locale: Locale; onLanding?: boolean }) {
  const t = (key: string) => translate(locale, key);
  const home = onLanding ? "" : "/" + locale;
  return <footer className="site-footer">
    <div className="footer-main wrap">
      <div className="footer-brand">
        <a className="brand" translate="no" href={home + "#top"} aria-label={t("Sparkbook — басты бет")}>
          <span className="brand-mark" aria-hidden="true"><Image src="/assets/sparkbook-mark.png" alt="" width={96} height={96} sizes="34px" /></span>
          <span>Spark<span>book</span></span>
        </a>
        <p>{t("Оқу жолың өз қолыңда.")}<br />{t("ҰБТ-ға өз қарқыныңмен дайындал.")}</p>
        <a className="footer-email" href={"mailto:" + supportEmail} translate="no">{supportEmail}<Icon name="arrow-up-right" /></a>
      </div>
      <div className="footer-column footer-help">
        <strong>{t("Көмек")}</strong>
        <a href={"/" + locale + "/support"}>{t("Қолдау")}</a>
        <a href={"/" + locale + "/delete-account"}>{t("Аккаунтты жою")}</a>
      </div>
      <div className="footer-column footer-documents">
        <strong>{t("Құжаттар")}</strong>
        {(["privacy", "terms", "consent"] as const).map(slug =>
          <a key={slug} href={"/" + locale + "/" + slug}>{t(documentLabels[slug])}</a>
        )}
      </div>
    </div>
    <div className="footer-bottom wrap"><span translate="no">© 2026 Sparkbook</span><span>{t("Android үшін. Тегін және жарнамасыз.")}</span></div>
  </footer>;
}
