export interface Messenger {
  label: string;
  href: string;
}

export const contacts = {
  // TODO (бриф 5.8): тестовый номер — заменить на реальный.
  phone: "+7 (4942) 00-00-00",
  phoneHref: "tel:+74942000000",

  city: "Кострома и область",

  // TODO (бриф 5.8): часы работы.
  hours: "",

  // TODO (бриф 5.8): адрес, если есть.
  address: "",

  instagram: {
    handle: "@art_cleaning_",
    href: "https://www.instagram.com/art_cleaning_",
  },

  // TODO (бриф 5.8): WhatsApp / Telegram.
  messengers: [] as Messenger[],
};
