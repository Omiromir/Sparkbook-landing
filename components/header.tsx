"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { locales, translate, type Locale } from "@/lib/i18n";
import { Icon } from "./icon";

function subscribeMobile(callback: () => void) {
  const query = matchMedia("(max-width: 850px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeScroll(callback: () => void) {
  addEventListener("scroll", callback, { passive: true });
  return () => removeEventListener("scroll", callback);
}
const sections = [["subjects", "Пәндер"], ["app", "Қалай жұмыс істейді"], ["features", "Артықшылықтар"], ["faq", "Сұрақтар"]] as const;
const localeLabels = { kk: ["ҚАЗ", "Қазақша"], ru: ["РУС", "Русский"], en: ["ENG", "English"] };

export function Header({ locale, pagePath = "" }: { locale: Locale; pagePath?: string }) {
  const home = pagePath ? "/" + locale : "";
  const t = (key: string) => translate(locale, key);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const mobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 850px)").matches, () => false);
  const scrolled = useSyncExternalStore(subscribeScroll, () => scrollY > 60, () => false);
  const nav = useRef<HTMLElement>(null);
  const languageMenu = useRef<HTMLDetailsElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    if (languageMenu.current) languageMenu.current.open = false;
  }, []);
  useEffect(() => {
    const click = (event: globalThis.MouseEvent) => {
      if (!nav.current?.contains(event.target as Node)) close();
    };
    const key = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (languageMenu.current?.open) {
        languageMenu.current.open = false;
        languageMenu.current.querySelector("summary")?.focus();
      } else {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("click", click);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("click", click); document.removeEventListener("keydown", key); };
  }, [close]);
  useEffect(() => {
    if (pagePath) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    for (const id of ["top", ...sections.map(([id]) => id), "download"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pagePath]);
  function changeLanguage(event: MouseEvent<HTMLAnchorElement>, lang: Locale) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(location.href);
    url.pathname = "/" + lang + pagePath;
    url.searchParams.delete("lang");
    location.assign(url);
  }
  return <header className={`site-header${scrolled ? " scrolled" : ""}`}>
    <nav className="nav" aria-label={t("Негізгі навигация")} ref={nav}>
      <a className="brand" translate="no" href={home + "#top"} aria-label={t("Sparkbook — басты бет")}><span className="brand-mark" aria-hidden="true"><Image src="/assets/sparkbook-mark.png" alt="" width={96} height={96} sizes="34px" /></span><span>Spark<span>book</span></span></a>
      <div className={`nav-links${open ? " open" : ""}`} id="nav-links" inert={mobile && !open}>
        {sections.map(([id, label]) => <a key={id} href={home + "#" + id} aria-current={!pagePath && activeSection === id ? "location" : undefined} onClick={close}>{t(label)}</a>)}
        <a className="button button-dark nav-cta" href={home + "#download"} onClick={close}>{t("Қосымша")} <Icon name="arrow-down" /></a>
      </div>
      <div className="nav-actions">
        <details className="language-switch" ref={languageMenu}>
          <summary aria-label={localeLabels[locale][0] + " — " + t("Тілді таңдау")}><span translate="no">{localeLabels[locale][0]}</span><Icon name="arrow-down" /></summary>
          <div className="language-options">{locales.map(lang => <a href={"/" + lang + pagePath} hrefLang={lang} lang={lang} translate="no" key={lang} aria-current={locale === lang ? "page" : undefined} onClick={event => changeLanguage(event, lang)}>{localeLabels[lang][1]}{locale === lang && <Icon name="check" />}</a>)}</div>
        </details>
        <button ref={menuButton} className="menu-toggle" type="button" aria-controls="nav-links" aria-expanded={open} aria-label={t(open ? "Мәзірді жабу" : "Мәзірді ашу")} onClick={() => setOpen(value => !value)}><Icon name={open ? "x" : "menu"} /></button>
      </div>
    </nav>
  </header>;
}
