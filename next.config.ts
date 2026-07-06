import type { NextConfig } from "next";

// Статический экспорт. Базовый путь управляется env (см. README «Переезд на домен»):
// GitHub Pages project-site → basePath /artclean (дефолт);
// свой домен (art-cleaning44.ru) → NEXT_PUBLIC_BASE_PATH= (пусто).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/artclean";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
