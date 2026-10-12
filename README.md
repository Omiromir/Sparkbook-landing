# Sparkbook landing

Production: https://sparkbook-landing.vercel.app

Next.js App Router, TypeScript, локальный Onest, Anime.js и Motion.
Сохранён утверждённый дизайн; страницы `/kk`, `/ru`, `/en` рендерятся на сервере.

## Запуск

```sh
npm ci
npm run dev
```

## Проверки

```sh
npm run build
npm run lint
npm run typecheck
npm run start
python scripts/check.py
```

Последняя команда использует установленный Python Playwright и Chromium.
Проверяет 3 языка на 375/768/1440 px, метаданные, PNG-превью, ссылки,
клавиатуру, демонстрационный квиз и reduce motion. Снимки: `output/playwright/`.
Для проверки опубликованного сайта передайте его URL последним аргументом.

## SEO и публикация

На Vercel основной домен берётся из `VERCEL_PROJECT_PRODUCTION_URL`.
Для собственного домена задайте `NEXT_PUBLIC_SITE_URL=https://ваш-домен` и пересоберите.
Canonical, hreflang, Open Graph, Twitter, sitemap.xml, robots.txt и JSON-LD
формируются автоматически. Preview и localhost закрыты от индексации.
Тексты: `lib/copy.json`; SEO: `lib/site.ts`; токены/адаптивность: `app/globals.css`.

```sh
npx vercel deploy --yes --prod --project sparkbook-landing
```

QR Google Play — явно подписанный нерабочий макет. Когда приложение будет
опубликовано, замените SVG настоящим QR и добавьте ссылку на карточку приложения.
Демо квиза и прогресса иллюстрируют продукт, данные не отправляются на сервер.
Источники изображений и лицензии сохранены в `public/assets/sources.json`
и `public/licenses/`. Предыдущие версии лендинга остались в исходном проекте.
## Фактически проверено

- `lint`, `typecheck`, production build — успешно.
- Playwright: kk/ru/en, 375/768/1440 px; клавиатура, якоря и фокус,
  меню, квиз, переключение языков, reduce motion, HTML без JavaScript.
- Публичный домен: правильные canonical/hreflang/OG, PNG 1200×630,
  robots и sitemap, редирект `/` → `/kk`.
- Lighthouse mobile (previous deployment) по production URL: Performance 92, Accessibility 100,
  Best Practices 100, SEO 100; CLS 0. Это лабораторный замер, показатели зависят
  от условий сети. Отчёт: `output/lighthouse-mobile-final.report.html`.
- Google PageSpeed API вернул HTTP 429; его результат не подменён баллами Lighthouse.

Применены skills: frontend-skill, Frontend Developer, UI Designer, playwright,
web-design-guidelines. Инструменты: Playwright/Chromium, Lighthouse, Vercel CLI.
## Поддержка и документы

В общий футер добавлены support@sparkbook.kz, поддержка, удаление аккаунта,
политика конфиденциальности, пользовательское соглашение и согласие на обработку данных.
Лендинг дополнен возможностями из копии: офлайн-уроки, языки приложения,
дневной план, календарь, напоминания и отсутствие рекламы.

Страницы: /{kk|ru|en}/{privacy|terms|consent|delete-account|support}.
Тексты из http://192.168.0.10:8000 сохранены в lib/information.json.
Исходник содержит только русские и казахские документы. В английском интерфейсе
показан русский оригинал с заметной подписью и корректным атрибутом lang.

Юридические страницы и инструкция удаления содержат незаполненные поля исходника.
Они явно помечены как проекты, имеют noindex и исключены из sitemap.
Чтобы выпустить окончательную редакцию, заполните фактические реквизиты, дату,
сроки и остальные отмеченные поля, затем установите draft: false в соответствующем документе.
Сервис отправки почты и удаление аккаунта на сайте не реализованы: перенесены инструкции,
а ссылки mailto открывают почтовое приложение пользователя.

Проверка scripts/check.py дополнительно проверяет все 15 страниц на 375/1440 px,
сохранность текста, языковой контекст, содержание и фокус, активный пункт меню,
таблицы, клавиатурные FAQ, 404 и исключение черновиков из sitemap.

## Обновление секции преимуществ и навигации

«Всё для учёбы»: портрет на кремовой арке, два аккуратных акцента и шесть пунктов
со знаком проверки; на телефоне — последовательная компоновка.
Нативные якоря меню идут по секциям: subjects → app → features → faq → download.
Текущая секция обозначается через aria-current; выбор языка сохраняет страницу.
В футере оставлены email, поддержка, удаление аккаунта и три юридических документа.

Новый asset: public/assets/benefits-student.png. Создан встроенным image_gen;
полный финальный промпт сохранён в public/assets/sources.json → generated_images.
Фотография декоративная, подписи не содержат выдуманных метрик.

Проверено: 3 языка, 375/768/1440 px, меню на 320 и 900 px, 44 px цели,
якоря и фокус, активная секция, клавиатура, reduce motion и страницы документов.

## ??????? ???????? ? ????

? ????????????? ????????? ???? ????????? ????????? 3D PNG ??? ?????:
public/assets/hero-book.png, hero-tools.png, hero-math.png ? hero-140.png.
140 ? ???????????? ???? ?? ?????? ???, ?? ???????? ??????????.
??? ?????? ??????????? ??????? ?????????? image_gen. ?????? ????????? ???????
? ???????? ???? ????????? ? public/assets/sources.json ? generated_images.

??????? ??????????? CSS transform; ?? ????????? ???????? ????? ? 140.
?????? ????? ???????? ? ??????????, prefers-reduced-motion ????????? ????????.
IntersectionObserver ? visibilitychange ???????????????? ???? ??? ??????
? ? ??????? ???????. ??? JavaScript ???????? ????????, ?????? ??????.

???????? scripts/check.py ????????? ?????/?????????????, ????????? ??? ??????,
reduce motion ? HTML ??? JavaScript ?????? ? ????????????? ??????????.
????????? frontend-skill, imagegen, playwright, web-design-guidelines
? vercel:deployments-cicd. ????? ???????????? ???.
