"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { navLinks, ctaLink } from "@/content/nav";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled && !open
          ? "border-milk-200 bg-milk-100/85 backdrop-blur-md"
          : "border-transparent",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          aria-label="Арт Клининг — наверх"
          className="relative z-50"
        >
          <Logo variant={open ? "light" : "dark"} className="h-7 md:h-8" priority />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <TextLink key={l.href} href={l.href}>
              {l.label}
            </TextLink>
          ))}
          <Button href={ctaLink.href} className="px-6 py-3">
            {ctaLink.label}
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          className={cn(
            "relative z-50 h-10 w-10 lg:hidden",
            open ? "text-milk-100" : "text-ink-900",
          )}
        >
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 bg-current transition-transform duration-300 ease-quiet",
              open ? "rotate-45" : "-translate-y-1",
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 bg-current transition-transform duration-300 ease-quiet",
              open ? "-rotate-45" : "translate-y-1",
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="on-dark fixed inset-0 z-40 bg-ink-900 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="container-x flex h-full flex-col justify-center gap-1 pb-10">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="font-display text-[2.5rem] leading-[1.25] text-milk-100"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.12 + i * 0.07,
                    duration: 0.5,
                    ease: EASE,
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                className="mt-8"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.12 + navLinks.length * 0.07,
                  duration: 0.5,
                  ease: EASE,
                }}
              >
                <Button href={ctaLink.href} tone="dark" onClick={() => setOpen(false)}>
                  {ctaLink.label}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
