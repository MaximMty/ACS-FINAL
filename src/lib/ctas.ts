/** Primary & secondary CTA URLs and labels (single source of truth). */
export const CTAS = {
  telegram: {
    url: "https://t.me/AVULUSbot",
    label: "Написать в Telegram",
    labelShort: "Telegram",
    botLabel: "Написать в Telegram-бот для бронирования",
  },
  phone: {
    href: "tel:+74959212221",
    display: "+7 495 921-22-21",
    label: "Позвонить",
    labelShort: "Звонок",
  },
  vk: {
    url: "https://vk.me/avuluscyberspace",
    label: "Посмотреть меню",
  },
  menu: {
    url: "https://telegra.ph/Menyu-02-27-15",
    label: "Посмотреть меню",
  },
  book: {
    url: "https://t.me/AVULUSbot",
    label: "Забронировать",
  },
} as const;

export function externalLinkProps() {
  return { target: "_blank" as const, rel: "noopener noreferrer" };
}

export type TelegramBookingFields = {
  room?: string;
  date?: string;
  time?: string;
  name?: string;
  contact?: string;
};

export function buildTelegramBookingMessage(fields: TelegramBookingFields): string {
  const lines = [
    "Здравствуйте! Хочу забронировать.",
    fields.room && `Комната: ${fields.room}`,
    fields.date && `Дата: ${fields.date}`,
    fields.time && `Время: ${fields.time}`,
    fields.name && `Имя: ${fields.name}`,
    fields.contact && `Контакт: ${fields.contact}`,
  ].filter(Boolean) as string[];

  return lines.join("\n");
}

export function telegramBookingUrl(fields: TelegramBookingFields): string {
  const text = buildTelegramBookingMessage(fields);
  return `${CTAS.telegram.url}?text=${encodeURIComponent(text)}`;
}
