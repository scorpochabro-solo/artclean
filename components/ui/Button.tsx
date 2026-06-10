"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll";

type Tone = "light" | "dark";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: Tone;
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
}

/**
 * Кнопка-капсула с обводкой и заливкой фона снизу вверх по hover.
 * tone="light" — тёмная обводка на молочном; tone="dark" — молочная на графите.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  tone = "light",
  className,
  arrow = true,
  disabled,
}: ButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-[450ms] ease-quiet disabled:pointer-events-none disabled:opacity-50",
    tone === "light"
      ? "border-ink-900 text-ink-900 hover:text-milk-100"
      : "border-milk-100 text-milk-100 hover:text-ink-900",
    className,
  );

  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[450ms] ease-quiet group-hover:scale-y-100",
          tone === "light" ? "bg-ink-900" : "bg-milk-100",
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {arrow && (
          <span
            aria-hidden="true"
            className="transition-transform duration-[450ms] ease-quiet group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    const isHash = href.startsWith("#");
    return (
      <a
        href={href}
        className={base}
        onClick={
          isHash
            ? (e) => {
                e.preventDefault();
                scrollToHash(href);
                onClick?.();
              }
            : onClick
        }
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {content}
    </button>
  );
}
