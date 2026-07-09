export interface Messenger {
  label: string;
  href: string;
}

const PHONE = "79607410111";

export const contacts = {
  phone: "+7 (960) 741-01-11",
  phoneHref: `tel:+${PHONE}`,
  smsHref: `sms:+${PHONE}`,

  email: "Djulikin@mail.ru",
  emailHref: "mailto:Djulikin@mail.ru",

  city: "Кострома и область",

  // TODO (бриф 5.8): часы работы.
  hours: "",
  // TODO (бриф 5.8): адрес, если есть.
  address: "",

  instagram: {
    handle: "@art_cleaning_",
    href: "https://www.instagram.com/art_cleaning_",
  },
  telegramHref: `https://t.me/+${PHONE}`,
  // MAX (мессенджер). TODO: сверить формат ссылки по номеру, если чат не откроется.
  maxHref: `https://max.ru/+${PHONE}`,
};
