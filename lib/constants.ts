// Канонический URL и базовый путь. Управляются env-переменными сборки:
//   NEXT_PUBLIC_SITE_URL=https://art-cleaning44.ru NEXT_PUBLIC_BASE_PATH= npm run build
// Дефолты — текущий GitHub Pages (project site). См. README, раздел «Переезд на домен».
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://scorpochabro-solo.github.io/artclean";

// next/image с unoptimized НЕ добавляет basePath к src, поэтому подставляем его
// вручную к локальным картинкам (логотип, фото).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/artclean";

export const SITE_NAME = "Арт Клининг";
export const SITE_SLOGAN = "Чистота, как искусство";
export const SITE_TITLE =
  "Клининговая компания в Костроме — уборка квартир, домов и офисов | Арт Клининг";
export const SITE_DESCRIPTION =
  "Профессиональная уборка в Костроме и области: генеральная, после ремонта, поддерживающая, baby-клининг, офисы и загородные дома. Обученная команда, профессиональная химия и оборудование, смета до начала работ.";

// Аналитика. Рендерится только если ID задан. TODO: вставить идентификаторы.
export const YM_ID = "110736068";
export const GA_ID = "";

// География
export const CITY = "Кострома";
export const AREA_SERVED = ["Кострома", "Костромская область"];

// Контакты-заглушки на уровне констант (полные данные — в content/contacts.ts)
export const PRICE_RANGE = "₽₽";
