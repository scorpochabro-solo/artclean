import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "dark", className, priority = false }: LogoProps) {
  const src = variant === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png";
  return (
    <Image
      src={src}
      alt={SITE_NAME}
      width={1600}
      height={335}
      priority={priority}
      sizes="200px"
      className={cn("w-auto select-none", className)}
    />
  );
}
