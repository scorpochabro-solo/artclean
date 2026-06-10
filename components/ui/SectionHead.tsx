import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeadProps {
  eyebrow: string;
  children: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHead({
  eyebrow,
  children,
  intro,
  tone = "light",
  className,
}: SectionHeadProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-h2 mt-5">{children}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <div
            className={cn(
              "measure mt-6 text-[1.0625rem] leading-[1.7]",
              tone === "dark" ? "text-milk-200" : "text-ink-700",
            )}
          >
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  );
}
