import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Наши типографские классы (globals.css) начинаются с text-*, и стандартный
// twMerge принимает их за цвет текста: cn("text-eyebrow", "text-taupe-700")
// молча выкидывал text-eyebrow как «конфликтующий цвет». Объявляем их
// размерами шрифта, чтобы они не конфликтовали с text-<цвет>.
const twMergeX = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-eyebrow", "text-h1", "text-h2", "text-h3"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMergeX(clsx(inputs));
}

const NBSP = " ";

/**
 * Лёгкая русская типографская гигиена для рендера:
 * — неразрывный пробел перед длинным тире;
 * — привязка коротких предлогов/союзов (1–2 буквы) к следующему слову.
 * Кавычки-«ёлочки» и тире проставлены в текстах вручную.
 */
export function ruTypo(input: string): string {
  return input
    .replace(/ +—/g, NBSP + "—")
    .replace(/(^|[\s(«])([A-Za-zА-Яа-яЁё]{1,2}) +/g, "$1$2" + NBSP);
}
