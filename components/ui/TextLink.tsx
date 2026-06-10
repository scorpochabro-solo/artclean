"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll";

interface TextLinkProps {
  children: ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
  tone?: "light" | "dark";
}

/** Текстовая ссылка с подчёркиванием, выезжающим слева направо. */
export function TextLink({
  children,
  href,
  onClick,
  className,
  tone = "light",
}: TextLinkProps) {
  const isHash = href.startsWith("#");
  return (
    <a
      href={href}
      onClick={
        isHash
          ? (e) => {
              e.preventDefault();
              scrollToHash(href);
              onClick?.();
            }
          : onClick
      }
      className={cn(
        "group relative inline-block text-sm font-medium",
        tone === "dark" ? "text-milk-100" : "text-ink-900",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-0 transition-[width] duration-[450ms] ease-quiet group-hover:w-full",
          tone === "dark" ? "bg-milk-100" : "bg-ink-900",
        )}
      />
    </a>
  );
}
