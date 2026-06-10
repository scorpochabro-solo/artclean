import type { NextConfig } from "next";

// Деплой на GitHub Pages (project site): статический экспорт + подпуть /artclean.
// Для кастомного домена/Vercel: убрать output/basePath/trailingSlash и вернуть
// оптимизацию изображений (images.unoptimized = false).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/artclean",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
