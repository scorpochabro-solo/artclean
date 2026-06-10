export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Подход" },
  { href: "#standards", label: "Стандарты" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Контакты" },
];

export const ctaLink: NavLink = { href: "#contact", label: "Оставить заявку" };
