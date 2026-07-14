import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Drop } from "@/components/ui/Drop";
import { services } from "@/content/services";
import { servicePages, getServicePage } from "@/content/servicePages";
import { contacts } from "@/content/contacts";
import { SITE_URL, SITE_NAME, AREA_SERVED } from "@/lib/constants";
import { ruTypo } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/uslugi/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/uslugi/${slug}/`,
      type: "website",
    },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  const service = services.find((s) => s.slug === slug);
  if (!page || !service) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: page.metaDescription,
      url: `${SITE_URL}/uslugi/${slug}/`,
      provider: {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        telephone: contacts.phone,
      },
      areaServed: AREA_SERVED.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: service.title },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const others = servicePages.filter((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="max-w-[880px] pb-20 pt-[calc(var(--header-h)+2.5rem)] md:pb-28">
        <nav aria-label="Хлебные крошки" className="text-sm text-taupe-700">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:underline">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href="/#services" className="underline-offset-4 hover:underline">
                Услуги
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li aria-current="page" className="text-ink-900">
              {service.title}
            </li>
          </ol>
        </nav>

        <h1 className="mt-10">
          <Eyebrow as="span" withDrop>
            Услуги · Кострома и&nbsp;область
          </Eyebrow>
          <span className="text-h1 mt-5 block">{ruTypo(page.h1)}</span>
        </h1>

        <p className="measure mt-6 text-lg leading-[1.65] text-ink-700">
          {ruTypo(page.lead)}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href="/#contact" className="w-full justify-center sm:w-auto">
            Рассчитать уборку
          </Button>
          <a
            href={contacts.phoneHref}
            className="text-center font-display text-xl text-ink-900 underline-offset-4 hover:underline sm:text-left"
          >
            {contacts.phone}
          </a>
        </div>

        {(page.includes.length > 0 || service.bullets || service.steps) && (
          <section className="mt-16">
            <h2 className="text-h3">{ruTypo(page.includesTitle)}</h2>

            {page.includes.length > 0 && (
              <ul className="mt-7 space-y-4">
                {page.includes.map((item, i) => (
                  <li key={i} className="flex gap-3 leading-[1.6] text-ink-700">
                    <Drop className="mt-1.5 h-2.5 w-auto shrink-0 text-taupe-700" />
                    <span>{ruTypo(item)}</span>
                  </li>
                ))}
              </ul>
            )}

            {service.steps && (
              <ol className="mt-7 space-y-6">
                {service.steps.map((st, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-eyebrow shrink-0 pt-1 text-taupe-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-lg italic text-ink-900">
                        {st.title}
                      </p>
                      <p className="mt-1 leading-[1.6] text-ink-700">
                        {ruTypo(st.text)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {service.bullets && (
              <ul className="mt-7 space-y-4">
                {service.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 leading-[1.6] text-ink-700">
                    <Drop className="mt-1.5 h-2.5 w-auto shrink-0 text-taupe-700" />
                    <span>{ruTypo(b)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="mt-16 rounded-[20px] border border-milk-200 p-7 md:p-9">
          <h2 className="text-h3">Почему «Арт Клининг»</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Обученный персонал: технологии уборки, химия, типы поверхностей",
              "Стоимость фиксируем до начала работ — без доплат по факту",
              "Свой инвентарь и профессиональная химия, вам ничего не нужно готовить",
              "Выезжаем по Костроме и Костромской области",
            ].map((t, i) => (
              <li key={i} className="flex gap-3 text-sm leading-[1.6] text-ink-700">
                <Drop className="mt-1 h-2.5 w-auto shrink-0 text-taupe-700" />
                <span>{ruTypo(t)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-h3">Частые вопросы</h2>
          <div className="mt-6 flex flex-col gap-3">
            {page.faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-[16px] border border-milk-200 open:border-ink-900"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                  {ruTypo(f.q)}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-[1.65] text-ink-700">
                  {ruTypo(f.a)}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="on-dark mt-16 rounded-[20px] bg-ink-900 p-8 md:p-11">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] italic leading-[1.25] text-milk-50">
            Рассчитаем вашу уборку
          </h2>
          <p className="measure mt-3 text-milk-200">
            Опишите задачу — назовём стоимость и зафиксируем её до начала работ.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Button href="/#contact" tone="dark" className="w-full justify-center sm:w-auto">
              Оставить заявку
            </Button>
            <a
              href={contacts.phoneHref}
              className="text-center font-display text-xl text-milk-100 underline-offset-4 hover:underline"
            >
              {contacts.phone}
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-eyebrow text-taupe-700">Другие услуги</h2>
          <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/uslugi/${p.slug}/`}
                  className="text-sm font-medium text-ink-900 underline-offset-4 hover:underline"
                >
                  {services.find((s) => s.slug === p.slug)?.title ?? p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
