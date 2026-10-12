import Image from "next/image";
import { Header } from "./header";
import { Footer } from "./footer";
import { Icon } from "./icon";
import { supportEmail } from "@/lib/information";
import { FeatureShowcase } from "./feature-showcase";
import { MotionEffects } from "./motion-effects";
import { translate, type Locale } from "@/lib/i18n";

export function Landing({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  return (<>

<a className="skip-link" href="#main">{t("Мазмұнға өту")}</a>
<Header locale={locale} />

<main id="main">
  <section className="hero" id="top" aria-labelledby="hero-title">
    <Image className="hero-atmosphere" src="/assets/hero-clouds-v2.jpg" alt="" width={1536} height={1024} loading="eager" fetchPriority="high" sizes="100vw" />
    <div className="hero-copy wrap">
      <p className="eyebrow hero-enter">{t("ҰБТ-ҒА ДАЙЫНДЫҚ · ӨЗ ҚАРҚЫНЫҢМЕН")}</p>
      <h1 className="hero-enter" id="hero-title"><span className="hero-tagline">{t("Дайындыққа жаңа көзқарас.")}</span><br /><span className="hero-brand" translate="no">Spark<span>book.</span></span></h1>
      <p className="hero-lead hero-enter">{t("Оқы. Біліміңді тексер. Алға жылжы.")}<br />{t("Бәрі бір түсінікті қосымшада.")}</p>
      <div className="hero-actions hero-enter"><a className="button button-dark" href="#app" data-open-view="quiz">{t("Байқап көру")} <span className="button-icon"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></span></a><a className="text-link" href="#app" data-open-view="courses">{t("Қосымшамен танысу")} <svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-down"></use></svg></a></div>
    </div>
    <div className="product-showcase hero-enter">
      <div className="hero-objects" aria-hidden="true">
        <span className="hero-object hero-object-score"><Image src="/assets/hero-140.png" alt="" width={1774} height={887} loading="eager" sizes="(max-width: 650px) 18vw, (max-width: 1100px) 124px, 168px" /></span>
        <span className="hero-object hero-object-book"><Image src="/assets/hero-book.png" alt="" width={1536} height={1024} loading="eager" sizes="(max-width: 650px) 18vw, (max-width: 1100px) 160px, 220px" /></span>
        <span className="hero-object hero-object-tools"><Image src="/assets/hero-tools.png" alt="" width={1254} height={1254} loading="eager" sizes="(max-width: 650px) 0px, (max-width: 1100px) 132px, 182px" /></span>
        <span className="hero-object hero-object-math"><Image src="/assets/hero-math.png" alt="" width={1254} height={1254} loading="eager" sizes="(max-width: 650px) 0px, (max-width: 1100px) 80px, 100px" /></span>
      </div>
      <div className="phone-wrap"><div className="phone" role="img" aria-label={t("Sparkbook басты бетінің үлгісі: пәндер, сабақ және оқу прогресі")}>
        <div className="phone-screen">
          <div className="phone-status"><strong>9:41</strong><span className="phone-status-icons" aria-hidden="true"><svg className="icon"><use href="/assets/icons.svg#signal"></use></svg><svg className="icon"><use href="/assets/icons.svg#wifi"></use></svg><svg className="icon"><use href="/assets/icons.svg#battery-full"></use></svg></span></div>
          <div className="phone-top"><span className="phone-mini-brand" translate="no">Spark<span>book</span></span><span className="phone-avatar" aria-hidden="true">D</span></div>
          <p className="phone-kicker">{t("Қайта оралуыңмен!")}</p><h2>{t("Бүгін нені оқимыз?")}</h2>
          <div className="phone-search"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#search"></use></svg><span>{t("Тақырыпты іздеу")}</span></div>
          <div className="phone-tabs" aria-hidden="true"><span className="active">{t("Тарих")}</span><span>{t("Математика")}</span><span>{t("Оқу")}</span></div>
          <div className="phone-course"><Image src="/assets/course-cover.jpg" alt="" width={768} height={384} sizes="320px" /><div className="phone-course-shade"></div><span className="phone-course-tag">{t("Қазақстан тарихы")}</span><strong>{t("Моңғол")}<br />{t("шапқыншылығы")}</strong><span className="phone-course-bottom">{t("Оқуды жалғастыру")} <svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-right"></use></svg></span></div>
          <div className="phone-next"><span className="phone-next-icon"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#clipboard-check"></use></svg></span><div><span>{t("Біліміңді тексер")}</span><strong>{t("Тақырып бойынша сынақ")}</strong></div><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></div>
          <div className="phone-bottom" aria-hidden="true"><span className="active"><svg className="icon"><use href="/assets/icons.svg#house"></use></svg></span><span><svg className="icon"><use href="/assets/icons.svg#book-open"></use></svg></span><span className="phone-play"><svg className="icon"><use href="/assets/icons.svg#play"></use></svg></span><span><svg className="icon"><use href="/assets/icons.svg#clipboard-check"></use></svg></span><span><svg className="icon"><use href="/assets/icons.svg#user-round"></use></svg></span></div><span className="phone-home-indicator" aria-hidden="true"></span>
        </div>
      </div></div></div>
    <button className="hero-motion-toggle" type="button" aria-pressed="false" aria-label={t("?????????? ???????")} title={t("?????????? ???????")}>
      <svg className="icon motion-pause" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5v14M15 5v14" /></svg>
      <span className="motion-play"><Icon name="play" /></span>
    </button>
  </section>

  <section className="subjects section wrap" id="subjects" aria-labelledby="subjects-title">
    <div className="section-heading reveal"><div><p className="eyebrow">{t("ҰБТ ПӘНДЕРІ")}</p><h2 id="subjects-title">{t("Үш пән.")}<br /><span>{t("Бір мақсат.")}</span></h2></div><p className="section-lead">{t("Өзіңе керек пәнді таңда.")}<br />{t("Әр тақырыпты ретімен меңгер.")}</p></div>
    <div className="subject-grid">
      <a className="subject-card subject-math reveal" id="math" href="#app" data-open-view="courses"><div className="subject-copy"><span className="subject-top"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#calculator"></use></svg><span className="subject-arrow"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></span></span><h3>{t("Математикалық сауаттылық")}</h3><p>{t("Логика. Есептер. Шешімдер.")}</p></div><div className="subject-art"><Image src="/assets/math.jpg" alt="" width={1000} height={667} loading="lazy" sizes="(max-width: 650px) 50vw, (max-width: 850px) 28vw, 350px" /></div></a>
      <a className="subject-card subject-reading reveal" id="reading" href="#app" data-open-view="courses"><div className="subject-copy"><span className="subject-top"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#book-open"></use></svg><span className="subject-arrow"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></span></span><h3>{t("Оқу сауаттылығы")}</h3><p>{t("Мәтін. Мағына. Түсіну.")}</p></div><div className="subject-art reading-art"><Image src="/assets/reading.jpg" alt="" width={1000} height={1498} loading="lazy" sizes="(max-width: 650px) 50vw, (max-width: 850px) 28vw, 350px" /></div></a>
      <a className="subject-card subject-history reveal" id="history" href="#app" data-open-view="courses"><div className="subject-copy"><span className="subject-top"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#landmark"></use></svg><span className="subject-arrow"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></span></span><h3>{t("Қазақстан тарихы")}</h3><p>{t("Оқиғалар. Тұлғалар. Байланыстар.")}</p></div><div className="subject-art history-art"><Image src="/assets/history.jpg" alt="" width={1000} height={1510} loading="lazy" sizes="(max-width: 650px) 50vw, (max-width: 850px) 28vw, 350px" /></div></a>
    </div>
  </section>

<FeatureShowcase locale={locale} courses={<CoursePreview locale={locale} />} progress={<ProgressPreview locale={locale} />} />
  <section className="benefits section wrap" id="features" aria-labelledby="benefits-title">
    <div className="benefits-inner">
      <div className="benefits-art reveal" aria-hidden="true">
        <div className="benefits-arch" />
        <Image className="benefits-portrait" src="/assets/benefits-student.png" alt="" width={1122} height={1402} loading="lazy" sizes="(max-width: 650px) 335px, (max-width: 900px) 500px, 490px" />
        <div className="benefit-chip benefit-chip-offline"><span><Icon name="wifi-off" /></span><div><strong>{t("Интернетсіз де")}</strong><small>{t("Ашылған сабақтар")}</small></div></div>
        <div className="benefit-chip benefit-chip-plan"><span><Icon name="calendar-days" /></span><div><small>{t("Күндік жоспар")}</small><strong>{t("Өз қарқыныңмен")}</strong></div></div>
      </div>
      <div className="benefits-copy">
        <div className="benefits-heading reveal"><p className="eyebrow">{t("ОҚУҒА ЫҢҒАЙЛЫ")}</p><h2 id="benefits-title">{t("Бәрі оқу үшін.")}</h2><p className="section-lead">{t("Дайындық күнделікті өміріңе сай.")}</p></div>
        <ul className="benefit-grid">
          {[
            ["Интернетсіз де", "Ашылған сабақтар, сұрақтар және тақырыптық тесттер телефонда сақталады."],
            ["Өзіңе ыңғайлы тілде", "Қолданбада қазақша және орысша оқы. Тілді баптаулардан ауыстыр."],
            ["Күндік жоспар", "Емтихан күні мен оқу мақсатыңды көрсетіп, өз қарқыныңмен дайындал."],
            ["Оқу күнтізбесі", "Қай күндері оқығаныңды және оқу ырғағыңды бір жерден көр."],
            ["Уақытында еске салу", "Сабаққа ыңғайлы уақытты таңда. Еске салғыштарды баптаулардан қос."],
            ["Тегін. Жарнамасыз.", "Сабақтар мен сынақтар қолжетімді. Оқудан ештеңе алаңдатпайды."]
          ].map(([title, description]) => <li className="benefit reveal" key={title}><span className="benefit-icon"><Icon name="check" /></span><div><h3>{t(title)}</h3><p>{t(description)}</p></div></li>)}
        </ul>
      </div>
    </div>
  </section>

  <section className="faq section wrap" id="faq" aria-labelledby="faq-title">
    <div className="faq-inner"><div className="faq-heading reveal"><p className="eyebrow">{t("СҰРАҚТАР МЕН ЖАУАПТАР")}</p><h2 id="faq-title">{t("Бәрі")}<br /><span>{t("түсінікті болсын.")}</span></h2><p className="section-lead">{t("Sparkbook туралы қысқаша.")}</p><a className="text-link" href="#app" data-open-view="quiz">{t("Өзің байқап көр")} <svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></a><p className="faq-contact"><a href={"/" + locale + "/support"}>{t("Қолдау")}</a><a href={"mailto:" + supportEmail} translate="no">{supportEmail}</a></p></div><div className="faq-list reveal">
      <details open><summary>{t("Қандай пәндер бар?")} <span><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#plus"></use></svg></span></summary><div className="faq-answer"><p>{t("Математикалық сауаттылық, оқу сауаттылығы және Қазақстан тарихы.")}</p></div></details>
      <details><summary>{t("Дайындық қалай ұйымдастырылған?")} <span><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#plus"></use></svg></span></summary><div className="faq-answer"><p>{t("Пәнді таңдап, тақырып сабақтарын ретімен оқисың. Кейін сынақ арқылы біліміңді бекітесің.")}</p></div></details>
      <details><summary>{t("Прогресімді қайдан көремін?")} <span><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#plus"></use></svg></span></summary><div className="faq-answer"><p>{t("Профильде оқу ырғағың және әр пән бойынша ілгерілеуің көрсетіледі.")}</p></div></details>
      <details><summary>{t("Қолданба интернетсіз жұмыс істей ме?")}<span><Icon name="plus" /></span></summary><div className="faq-answer"><p>{t("Иә, бұрын ашылған сабақтар, сұрақтар және тақырыптық тесттер телефонда сақталады. Тіркелу, пән бойынша сынақты бастау және аккаунтты жою үшін интернет қажет.")}</p></div></details>
    </div></div>
  </section>

  <section className="final-cta section wrap" id="download" aria-labelledby="final-title">
    <div className="start-panel reveal"><div className="start-copy"><p className="eyebrow">{t("БІР ҚАДАМНАН БАСТА")}</p><h2 id="final-title">{t("Бастаудың ең")}<br />{t("жақсы күні —")} <span>{t("бүгін.")}</span></h2><p className="section-lead">{t("Sparkbook-тың сынақ үлгісін байқап көр.")}</p><a className="button button-dark" href="#app" data-open-view="quiz">{t("Байқап көру")} <span className="button-icon"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-up-right"></use></svg></span></a><div className="download-preview"><div className="qr-placeholder"><Image src="/assets/google-play-qr-mock.svg" alt="" width={96} height={96} loading="lazy" unoptimized /></div><div className="download-copy"><p>{t("Телефоныңда. Жақында.")}</p><div className="store-badge" role="img" aria-label={t("Google Play жүктеу сілтемесі жақында пайда болады")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 2.6v18.8L14.5 12Z" fill="currentColor"></path><path d="m4.3 2 12.1 7.1-2 2L4.3 2Z" fill="currentColor" opacity=".6"></path><path d="m16.4 9.1 4.5 2.6a.35.35 0 0 1 0 .6l-4.5 2.6-2.9-2.9Z" fill="currentColor" opacity=".85"></path><path d="m14.4 12.9 2 2L4.3 22Z" fill="currentColor" opacity=".6"></path></svg><span><small>{t("Жақында")}</small><strong translate="no">Google Play</strong></span></div><span className="download-note">{t("QR үлгісі · Сілтеме жақында")}</span></div></div></div><div className="start-image"><Image src="/assets/student.jpg" alt={t("Жарық сыныпта дәптерге жазып отырған оқушы")} width={1200} height={800} loading="lazy" sizes="(max-width: 650px) 90vw, (max-width: 1100px) 40vw, 470px" /></div></div>
  </section>
</main>
<Footer locale={locale} onLanding /><MotionEffects />

</>);
}

export function CoursePreview({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  return (<>
<div className="course-preview" role="img" aria-label={t("Қазақстан тарихы оқу жолының үлгісі")}>
        <div className="course-cover"><Image src="/assets/course-cover.jpg" alt="" width={768} height={384} loading="lazy" sizes="320px" /><span>{t("Қазақстан тарихы")}</span></div>
        <div className="preview-content"><p className="preview-overline">{t("ОҚУ ЖОЛЫ")}</p><h3>{t("Моңғол")}<br />{t("шапқыншылығы")}</h3><div className="preview-progress-label"><span>{t("Сабақтар")}</span><strong>1 / 5</strong></div><div className="preview-progress"><span></span></div>
          <div className="lesson active"><span className="lesson-state"><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#play"></use></svg></span><div><strong>{t("Темучин Шыңғыс хан болады")}</strong><small>{t("Орындалуда")}</small></div><svg className="icon" aria-hidden="true"><use href="/assets/icons.svg#arrow-right"></use></svg></div>
          <div className="lesson"><span className="lesson-state">02</span><div><strong>{t("Әскер, «Яса» және империя құрылысы")}</strong><small>{t("Басталмаған")}</small></div></div>
          <div className="lesson"><span className="lesson-state">03</span><div><strong>{t("Жетісу шайқассыз берілді")}</strong><small>{t("Басталмаған")}</small></div></div>
        </div>
      </div>
</>);
}

export function ProgressPreview({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  return (<>
<div className="progress-visual" role="img" aria-label={t("Оқу прогресі экранының үлгісі")}>
      <div className="progress-head"><div><span className="preview-overline">{t("СЕНІҢ ПРОГРЕСІҢ")}</span><h3>{t("Әр күн — бір қадам.")}</h3></div><span className="progress-avatar" aria-hidden="true">D</span></div>
      <div className="progress-week"><span>{t("Осы апта")}</span><span>{t("Дс — Жк")}</span></div>
      <div className="week-dots" aria-hidden="true"><span className="done"><svg className="icon"><use href="/assets/icons.svg#check"></use></svg><small>{t("Дс")}</small></span><span className="done"><svg className="icon"><use href="/assets/icons.svg#check"></use></svg><small>{t("Сс")}</small></span><span className="done"><svg className="icon"><use href="/assets/icons.svg#check"></use></svg><small>{t("Ср")}</small></span><span><small>{t("Бс")}</small></span><span><small>{t("Жм")}</small></span><span><small>{t("Сн")}</small></span><span><small>{t("Жк")}</small></span></div>
      <div className="calendar-heading"><span>{t("Оқу белсенділігі")}</span><span>{t("Қаң — Нау")}</span></div><div className="heatmap" role="img" aria-label={t("Апталар бойынша оқу белсенділігінің күнтізбе үлгісі")}><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-3" aria-hidden="true"></span><span className="level-2" aria-hidden="true"></span><span className="level-1" aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></div>
      <div className="progress-subject"><span>{t("Математикалық сауаттылық")}</span><div className="mini-track"><i style={{"width": "48%"}}></i></div></div><div className="progress-subject"><span>{t("Оқу сауаттылығы")}</span><div className="mini-track"><i style={{"width": "31%"}}></i></div></div><div className="progress-subject"><span>{t("Қазақстан тарихы")}</span><div className="mini-track"><i style={{"width": "65%"}}></i></div></div><span className="visual-disclaimer">{t("Интерфейс үлгісі")}</span>
    </div>
</>);
}
