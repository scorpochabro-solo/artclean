# Арт Клининг — сайт

Премиальный одностраничный лендинг клининговой компании «Арт Клининг» (Кострома и область)
+ страница `/privacy`. Слоган — «Чистота, как искусство». Арт-направление: editorial quiet
luxury («Галерея чистоты»).

## Стек

- **Next.js 15** (App Router) · **TypeScript** (strict)
- **Tailwind CSS v4** (токены в `app/globals.css`, `@theme`)
- **Framer Motion** (анимации) · **Lenis** (плавный скролл)
- **React Hook Form + Zod** (форма заявки)
- **Шрифты — self-hosted** через `@fontsource` (Cormorant, Manrope). Внешних запросов к
  Google Fonts нет (надёжно офлайн + лучше для Lighthouse).

## Запуск

```bash
npm install
npm run dev      # дев-сервер (по умолчанию http://localhost:3000)
npm run build    # продакшен-сборка
npm run start    # запуск собранного приложения
npm run lint     # проверка ESLint
```

> В этом рабочем окружении dev запускается через preview-конфиг `art-cleaning-dev`
> (порт 3050). Для обычной работы достаточно `npm run dev`.

## Где что менять

| Что | Файл |
|-----|------|
| **Тексты, услуги, FAQ, отзывы, факты, шаги, контакты** | `content/*.ts` |
| **Навигация и CTA** | `content/nav.ts` |
| **Цвета, типографика, отступы (токены)** | `app/globals.css` (`@theme`) — единственный источник |
| **Константы сайта** (название, описание, город) | `lib/constants.ts` |
| **Домен (канонический URL)** | `SITE_URL` в `lib/constants.ts` |
| **JSON-LD (SEO-разметка)** | `lib/jsonld.ts` |

### ID Яндекс.Метрики (и GA4)

В `lib/constants.ts` задайте `YM_ID` (и при желании `GA_ID`). Пока значение пустое —
скрипт аналитики **не рендерится**. После установки ID включается вебвизор; цели:
`lead_submit` (отправка формы) и `phone_click` (клик по телефону) — см. `lib/analytics.ts`.

### Доставка заявок

Сейчас форма валидируется на клиенте и сервере (`app/api/lead/route.ts`), но заявка только
логируется в консоль сервера. Чтобы подключить доставку (Telegram-бот / email), найдите
комментарий `// TODO: подключить доставку заявок` в `app/api/lead/route.ts` и добавьте отправку.

### Замена фото-плейсхолдеров

Сейчас на местах фотографий — нейтральные плейсхолдеры в молочной гамме
(`components/ui/Placeholder.tsx`). Чтобы поставить реальные фото:

1. Положите изображения в `public/photos/`.
2. Замените `<Placeholder … />` на `next/image`:
   ```tsx
   import Image from "next/image";
   <Image src="/photos/hero-foam.jpg" alt="…" width={1200} height={1500}
          className="rounded-[20px] object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
   ```
3. Для hero-изображения добавьте `priority`.

Список нужных фото — в `TODO.md` (раздел 4): макро-пена, интерьер, текстиль/гардероб,
газон/участок, команда за работой.

### Логотип и бренд

`public/brand/`: `logo-dark.png`, `logo-light.png` (подготовлены из исходников),
`drop.svg` (фирменная капля). Логотип монохромный, **не перекрашивать**. Favicon-набор
(`app/icon.svg`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`) и
`public/og.png` сгенерированы из капли/логотипа.

## Структура

```
app/            layout, page, privacy, api/lead, sitemap, robots, manifest, icon
components/
  sections/     Header Hero About Services Process Standards Reviews Faq Contact Footer
  ui/           Container Drop Eyebrow SectionHead Button TextLink Logo
                Reveal Collapse Counter Marquee Placeholder Field
  providers/    SmoothScroll (Lenis) · Preloader
  Analytics.tsx (Яндекс.Метрика, рендер по YM_ID)
content/        services process faq reviews facts contacts standards nav
lib/            constants utils scroll analytics jsonld
public/brand/   логотипы + капля
```

## Заглушки

Все незаполненные данные (реквизиты, телефон, мессенджеры, цифры, фото, ID аналитики,
домен) собраны в `TODO.md` с указанием файлов.

## Доступность и производительность

- Семантическая разметка, `lang="ru"`, видимые focus-стили, aria для меню/аккордеонов/слайдера.
- Полная поддержка `prefers-reduced-motion` (анимации и Lenis отключаются).
- Анимируются только `transform`/`opacity`; изображения через `next/image`.

## Деплой на GitHub Pages

Проект настроен на статический экспорт под project-site (подпуть `/artclean`):
в `next.config.ts` — `output: "export"`, `basePath: "/artclean"`, `images.unoptimized`.
На статике **форма заявки не отправляет данные** (нет backend) — после валидации
предлагает позвонить. Сборку и публикацию выполняет GitHub Actions
(`.github/workflows/deploy.yml`), не нужно коммитить `out/`.

Шаги:

1. Создайте на GitHub пустой репозиторий `artclean` (владелец `scorpochabro-solo`).
2. В папке `clining`:
   ```bash
   git init
   git add -A
   git commit -m "Арт Клининг — сайт"
   git branch -M main
   git remote add origin git@github.com:scorpochabro-solo/artclean.git
   git push -u origin main
   ```
3. На GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Каждый пуш в `main` собирает и публикует сайт на
   `https://scorpochabro-solo.github.io/artclean/`.

Свой домен / Vercel вместо Pages: в `next.config.ts` убрать `output`/`basePath`/
`trailingSlash` и вернуть оптимизацию картинок; в `app/fonts.css` убрать префикс
`/artclean`; в `lib/constants.ts` обновить `SITE_URL`. На Vercel (`npm i -g vercel && vercel`)
форма и серверная часть работают без ограничений.
