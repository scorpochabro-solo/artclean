import { SITE_URL, SITE_NAME, SITE_SLOGAN, AREA_SERVED } from "@/lib/constants";
import { services } from "@/content/services";
import { faq } from "@/content/faq";
import { contacts } from "@/content/contacts";

export const dynamic = "force-static";

// llms.txt (llmstxt.org) — краткая машиночитаемая справка о сайте для ИИ-ассистентов
// и LLM-поисковиков. Генерируется из тех же данных, что и сайт.
export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} — премиальная клининговая компания в Костроме. Слоган: «${SITE_SLOGAN}». Профессиональная уборка квартир, загородных домов, офисов и коммерческих пространств в Костроме и Костромской области.`,
    "",
    "Ключевые факты:",
    "- География: " + AREA_SERVED.join(", "),
    `- Телефон: ${contacts.phone}`,
    `- Instagram: ${contacts.instagram.href}`,
    "- Команда прошла многоступенчатое обучение (онлайн-программы и очные тренинги с приглашённым экспертом); работаем на профессиональной химии и профессиональном оборудовании; для baby-клининга — отдельная сертифицированная безопасная линейка средств.",
    "- Смета фиксируется до начала работ; приёмка результата вместе с клиентом.",
    "",
    "## Услуги",
    "",
    ...services.map((s) => `- ${s.title}: ${s.summary}`),
    "",
    "## Частые вопросы",
    "",
    ...faq.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Страницы",
    "",
    `- [Главная](${SITE_URL}/): услуги, подход, стандарты, отзывы, контакты и форма заявки`,
    `- [Политика конфиденциальности](${SITE_URL}/privacy/)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
