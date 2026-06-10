"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/content/nav";
import { contacts } from "@/content/contacts";
import { scrollToHash } from "@/lib/scroll";
import { trackPhoneClick } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="on-dark bg-ink-900 text-milk-100">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo variant="light" className="h-8" />
            <p className="measure mt-6 text-sm leading-[1.7] text-milk-200">
              Чистота, как искусство. Премиальный уход за домом, офисом и
              пространством для событий в Костроме и области.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Подвал">
            <p className="text-eyebrow text-taupe-500">Навигация</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(l.href);
                    }}
                    className="text-milk-200 transition-colors hover:text-milk-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-eyebrow text-taupe-500">Контакты</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={contacts.phoneHref}
                  onClick={() => trackPhoneClick()}
                  className="text-milk-200 transition-colors hover:text-milk-50"
                >
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={contacts.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-milk-200 transition-colors hover:text-milk-50"
                >
                  {contacts.instagram.handle}
                  <span aria-hidden="true">*</span>
                </a>
              </li>
              <li className="text-milk-200">{contacts.city}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-milk-100/15 py-8 text-sm text-milk-200 md:flex-row md:items-center md:justify-between">
          <p>© 2026 «Арт Клининг»</p>
          <Link
            href="/privacy"
            className="text-milk-200 underline-offset-4 transition-colors hover:text-milk-50 hover:underline"
          >
            Политика конфиденциальности
          </Link>
        </div>

        <div className="space-y-3 pb-10 text-xs leading-relaxed text-taupe-500">
          <p>
            * Instagram принадлежит Meta Platforms Inc., признанной экстремистской
            организацией; её деятельность запрещена на территории РФ.
          </p>
          {/* TODO (бриф 5.9): реквизиты — ИП/ООО, ИНН/ОГРН. */}
          <p>TODO: реквизиты — ИП/ООО, ИНН, ОГРН.</p>
        </div>
      </Container>
    </footer>
  );
}
