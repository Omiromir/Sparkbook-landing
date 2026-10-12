"use client";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { translate, type Locale } from "@/lib/i18n";
import { Icon } from "./icon";

const views = ["courses", "quiz", "progress"] as const;
type View = (typeof views)[number];
const steps = [
  ["Ретімен оқы", "Тақырыпты таңда. Келесі сабағың анық."],
  ["Біліміңді тексер", "Пән немесе тақырып бойынша сынақ."],
  ["Ілгерілеуіңді көр", "Оқу белсенділігі мен пәндер прогресі."]
];
const questions = [
  { text: "90 минут — бұл неше сағат?", answers: ["1 сағат", "1,5 сағат", "2 сағат"] },
  { text: "12 × 5 қанша болады?", answers: ["50", "60", "70"] }
];

export function FeatureShowcase({ locale, courses, progress }: { locale: Locale; courses: ReactNode; progress: ReactNode }) {
  const t = (key: string) => translate(locale, key);
  const [view, setView] = useState<View>("courses");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const question = questions[questionIndex];
  const selectView = useCallback((value: View, writeUrl = true) => {
    setView(value);
    if (writeUrl) {
      const url = new URL(location.href);
      if (value === "courses") url.searchParams.delete("view");
      else url.searchParams.set("view", value);
      history.replaceState(null, "", url);
    }
  }, []);
  useEffect(() => {
    const sync = () => {
      const value = new URL(location.href).searchParams.get("view");
      setView(views.includes(value as View) ? value as View : "courses");
    };
    const click = (event: MouseEvent) => {
      if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-open-view]");
      const value = link?.dataset.openView;
      if (views.includes(value as View)) selectView(value as View);
    };
    const initial = setTimeout(sync, 0);
    addEventListener("popstate", sync);
    document.addEventListener("click", click);
    return () => { clearTimeout(initial); removeEventListener("popstate", sync); document.removeEventListener("click", click); };
  }, [selectView]);
  useEffect(() => {
    if (!panel.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = panel.current.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "ease-out" });
    return () => animation.cancel();
  }, [view]);
  function tabKey(event: KeyboardEvent, index: number) {
    const keys: Record<string, number> = { ArrowDown: (index + 1) % 3, ArrowRight: (index + 1) % 3, ArrowUp: (index + 2) % 3, ArrowLeft: (index + 2) % 3, Home: 0, End: 2 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    selectView(views[keys[event.key]]);
    tabs.current[keys[event.key]]?.focus();
  }
  function nextQuestion() {
    const next = (questionIndex + 1) % questions.length;
    setQuestionIndex(next);
    setAnswer(null);
    setAnnouncement(t("{number}-сұрақ ашылды").replace("{number}", String(next + 1)));
    requestAnimationFrame(() => questionHeading.current?.focus({ preventScroll: true }));
  }
  const panels = [courses, <div className="quiz-demo" role="group" aria-label={t("Сынақ интерфейсінің интерактивті үлгісі")} key="quiz">
    <div className="demo-top"><span><Icon name="calculator" /> {t("Математикалық сауаттылық")}</span><span id="demo-count">{questionIndex + 1} / 2</span></div>
    <div className="demo-progress"><span id="demo-progress" style={{ width: `${(questionIndex + 1) * 50}%` }} /></div>
    <div className="question-content" key={questionIndex}>
      <p className="demo-kicker">{t("ҮЛГІ СҰРАҚ")}</p><h3 id="demo-question" ref={questionHeading} tabIndex={-1}>{t(question.text)}</h3>
      <div className="demo-options" role="group" aria-label={t("Жауап нұсқалары")}>{question.answers.map((text, index) => <button type="button" className="demo-option" key={text} aria-pressed={answer === index} onClick={() => { setAnswer(index); setAnnouncement(t("{answer} таңдалды").replace("{answer}", t(text))); }}><span className="option-label">{t(text)}</span><span className="option-check" aria-hidden="true"><Icon name="check" /></span></button>)}</div>
    </div>
    <button className="button button-dark demo-next" id="demo-next" type="button" disabled={answer === null} onClick={nextQuestion}>{t("Келесі сұрақ")} <Icon name="arrow-right" /></button>
    <p className="demo-caption">{t("Sparkbook сынағының интерактивті үлгісі")}</p><p className="sr-only" id="demo-announcement" aria-live="polite">{announcement}</p>
  </div>, progress];
  const captions = ["Өткенің мен келесі сабағың — бір жерде.", "Жауапты таңда. Бір сұрақтан бастап көр.", "Кішкентай қадамдар. Көрінетін ілгерілеу."];
  return <section className="app-section section" id="app" aria-labelledby="app-title">
    <div className="feature-showcase wrap">
      <div className="showcase-copy reveal" id="method"><p className="eyebrow">{t("ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ")}</p><h2 id="app-title">{t("Бір қадамнан.")}<br /><span>{t("Үлкен мақсатқа.")}</span></h2><p className="section-lead">{t("Сабақтан сынаққа.")}<br />{t("Әр қадамың өз орнында.")}</p>
        <div className="app-tabs" role="tablist" aria-orientation="vertical" aria-label={t("Қосымшаның мүмкіндіктері")}>{views.map((value, index) => <button type="button" role="tab" key={value} id={`tab-${value}`} aria-controls={`panel-${value}`} aria-selected={view === value} tabIndex={view === value ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => selectView(value)} onKeyDown={event => tabKey(event, index)}><span className="step-marker" aria-hidden="true">0{index + 1}</span><span className="step-copy"><strong>{t(steps[index][0])}</strong><span>{t(steps[index][1])}</span></span><Icon name="arrow-up-right" /></button>)}</div>
      </div>
      <div className="app-panels reveal">{views.map((value, index) => <div className="app-panel" id={`panel-${value}`} key={value} role="tabpanel" tabIndex={0} aria-labelledby={`tab-${value}`} hidden={view !== value} ref={view === value ? panel : undefined}><div className="app-preview">{panels[index]}</div><p className="panel-caption">{t(captions[index])}</p></div>)}</div>
    </div>
  </section>;
}
