import { BASE_PATH } from "./constants";

interface LenisLike {
  scrollTo: (
    target: string | HTMLElement | number,
    opts?: { offset?: number },
  ) => void;
}

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

const HEADER_OFFSET = -76;

export function scrollToHash(hash: string): void {
  if (typeof document === "undefined") return;
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) {
    window.location.href = BASE_PATH + "/" + hash;
    return;
  }

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: HEADER_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  history.replaceState(null, "", hash);
}

export {};
