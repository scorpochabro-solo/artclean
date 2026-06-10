import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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
