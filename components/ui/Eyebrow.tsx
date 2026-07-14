import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Drop } from "./Drop";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** light — на молочном (taupe-700), dark — на графите (taupe-500). */
  tone?: "light" | "dark";
  withDrop?: boolean;
  /** span — чтобы вкладывать внутрь заголовка (в <h1> нельзя класть <p>). */
  as?: "p" | "span";
}

export function Eyebrow({
  children,
  className,
  tone = "light",
  withDrop = false,
  as: Tag = "p",
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "text-eyebrow flex items-center gap-2.5",
        tone === "dark" ? "text-taupe-500" : "text-taupe-700",
        className,
      )}
    >
      {withDrop && <Drop className="h-3 w-auto opacity-80" />}
      <span>{children}</span>
    </Tag>
  );
}
