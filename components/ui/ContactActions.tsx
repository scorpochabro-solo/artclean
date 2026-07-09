"use client";

import type { ReactNode } from "react";
import { contacts } from "@/content/contacts";
import { trackPhoneClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const icons: Record<string, ReactNode> = {
  phone: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z"
      />
    </svg>
  ),
  tg: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.9 4.5 2.9 11.8c-.9.4-.9 1.6 0 1.9l4.8 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.6-2.6 4.7 3.5c.6.4 1.4.1 1.5-.6l3-14.8c.2-.9-.6-1.5-1.1-1.2zM9.7 14.6l-.3 3.6-1.1-3.8 9.2-6-7.8 6.2z"
      />
    </svg>
  ),
  max: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3C6.5 3 2 6.8 2 11.4c0 2.5 1.4 4.8 3.6 6.3L5 21.6l4-2c1 .3 2 .4 3 .4 5.5 0 10-3.8 10-8.6S17.5 3 12 3zm-4 10.2-.1-4.6 4 4 4-4-.1 4.6h1.6l.1-6.6-5.6 5.4L6.3 6.6l.1 6.6H8z"
      />
    </svg>
  ),
  sms: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        d="M4 5.5h16v9H9.5L5 18.5V5.5z"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 7.5 8 5 8-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
};

interface ActionItem {
  key: keyof typeof icons;
  label: string;
  href: string;
  ext?: boolean;
  onClick?: () => void;
}

const actions: ActionItem[] = [
  { key: "phone", label: "Позвонить", href: contacts.phoneHref, onClick: trackPhoneClick },
  { key: "tg", label: "Telegram", href: contacts.telegramHref, ext: true },
  { key: "max", label: "MAX", href: contacts.maxHref, ext: true },
  { key: "sms", label: "SMS", href: contacts.smsHref },
  { key: "mail", label: "Почта", href: contacts.emailHref },
  { key: "ig", label: "Instagram", href: contacts.instagram.href, ext: true },
];

export function ContactActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {actions.map((a) => (
        <a
          key={a.label}
          href={a.href}
          onClick={a.onClick}
          {...(a.ext
            ? { target: "_blank", rel: "noopener noreferrer nofollow" }
            : {})}
          className="group inline-flex items-center gap-2 rounded-full border border-milk-200 px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors duration-300 ease-quiet hover:border-ink-900 hover:bg-ink-900 hover:text-milk-100"
        >
          {icons[a.key]}
          {a.label}
        </a>
      ))}
    </div>
  );
}
