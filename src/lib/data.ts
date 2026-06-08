import { assets } from "@/lib/assets";
import { CTAS } from "@/lib/ctas";

export const NAV_LINKS = [
  { label: "Отель", href: "/hotel" },
  { label: "Киберклуб", href: "/#rooms" },
  { label: "Ресторан", href: "/#restaurant" },
  { label: "Акции", href: "/#promotions" },
  { label: "Контакты", href: "/#contacts" },
] as const;

export const FEATURE_STEPS = [
  { label: "Выбирай\nсценарий", icon: "grid" as const },
  { label: "Выбирай\nкомнату", icon: "box" as const },
  { label: "Выбирай\nвремя", icon: "clock" as const },
  { label: "Приезжай\nи играй", icon: "gamepad" as const },
];

export type FormatCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  price?: {
    prefix: string;
    amount: string;
    suffix: string;
  };
  variant: "light" | "hotel" | "restaurant";
  buttonVariant?: "filled" | "outline";
  ctaPrimary?: string;
  ctaPrimaryHref?: string;
  ctaExternal?: boolean;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
};

export const FORMAT_CARDS: FormatCard[] = [
  {
    id: "solo",
    title: "СОЛО",
    subtitle: "1 ИГРОК",
    description: "Для одиночной игры, фулл-фокуса или отдыха",
    price: { prefix: "от", amount: "290", suffix: "/ час" },
    variant: "light",
    buttonVariant: "filled",
    ctaPrimary: "Выбрать комнату",
    ctaPrimaryHref: "/#rooms",
  },
  {
    id: "team",
    title: "ТИМ",
    subtitle: "2–5 ИГРОКОВ",
    description: "Для игры с друзьями и буткемпов",
    price: { prefix: "от", amount: "680", suffix: "/ час" },
    variant: "light",
    buttonVariant: "outline",
    ctaPrimary: "Выбрать комнату",
    ctaPrimaryHref: "/#rooms",
  },
  {
    id: "restaurant",
    title: "РЕСТОРАН",
    subtitle: "1-10 гостей",
    description: "Для завтрака, обеда, ужина или встречи",
    status: "ОТКРЫТО СЕЙЧАС",
    variant: "restaurant",
    ctaPrimary: CTAS.menu.label,
    ctaPrimaryHref: CTAS.menu.url,
    ctaExternal: true,
  },
  {
    id: "hotel",
    title: "ОТЕЛЬ",
    subtitle: "МОЖНО ПРОСТО ОСТАТЬСЯ",
    description: "Остановитесь на ночь или несколько дней",
    variant: "hotel",
    ctaPrimary: "Забронировать",
    ctaPrimaryHref: CTAS.book.url,
    ctaExternal: true,
    ctaSecondary: "Подробнее",
    ctaSecondaryHref: "/hotel",
  },
];

export type RoomCard = {
  id: string;
  name: string;
  images: string[];
  specs: { monitor: string; gpu: string; cpu: string };
  price: { prefix: string; amount: string; suffix: string };
};

export const ROOM_CARDS: RoomCard[] = [
  {
    id: "private",
    name: "PRIVATE",
    images: [assets.rooms.private],
    specs: {
      monitor: 'LG 27" 165Hz',
      gpu: "RTX 4060",
      cpu: "i5-12400F",
    },
    price: { prefix: "от", amount: "290", suffix: "/ час" },
  },
  {
    id: "private-plus",
    name: "PRIVATE+",
    images: [assets.rooms.privatePlus],
    specs: {
      monitor: 'Samsung 24" 240Hz',
      gpu: "RTX 5070",
      cpu: "i5-12400F",
    },
    price: { prefix: "от", amount: "410", suffix: "/ час" },
  },
  {
    id: "stream",
    name: "STREAM",
    images: [assets.rooms.stream],
    specs: {
      monitor: '2x LG 27" 165Hz, 1x Samsung 24" 240Hz',
      gpu: "RTX 4080 SUPER / RTX 5080",
      cpu: "Intel Core i7-14700KF",
    },
    price: { prefix: "от", amount: "525", suffix: "/ час" },
  },
  {
    id: "vip",
    name: "VIP",
    images: [assets.rooms.vip],
    specs: {
      monitor: 'Alienware 24" 360Hz',
      gpu: "RTX 4080 Super",
      cpu: "AMD Ryzen 7 9800x3d",
    },
    price: { prefix: "от", amount: "680", suffix: "/ час" },
  },
  {
    id: "super-vip",
    name: "SUPER VIP",
    images: [assets.rooms.superVip],
    specs: {
      monitor: 'Samsung 27" 360Hz',
      gpu: "RTX 5080",
      cpu: "i9-14900KF",
    },
    price: { prefix: "от", amount: "12500", suffix: "/ час" },
  },
];

export const ROOMS_PRICE_NOTE =
  "Цены игровых комнат заполнить отдельно по актуальному прайсу" as const;

export const ROOM_PROMO = {
  tag: "ПРОМО",
  title: "КАЛЬЯН БЕСПЛАТНО",
  note: "При бронировании SUPER VIP. Только до 10 мая.",
} as const;

export const MENU_ITEMS = [
  { name: "Острая мясная пицца", price: "890" },
  { name: "Бургер AVULUS", price: "690" },
  { name: "Крылья BBQ", price: "590" },
  { name: "Лимонад домашний", price: "290" },
  { name: "Эспрессо", price: "190" },
] as const;

export const HOTEL_SPACE = [
  "Отель внутри AVULUS CYBER SPACE",
  "Ресторан в здании комплекса с доставкой в номер",
  "Размещение от нескольких часов",
  "Бесплатная парковка для гостей",
] as const;

export const HOTEL_LOCATION = [
  "Центр Москвы",
  "Рядом с НИУ ВШЭ",
  "Удобный доступ к метро",
  "Круглосуточное заселение",
] as const;

export const HOTEL_PRICE_DISCLAIMER = "*Детали уточняйте заранее" as const;

export type HotelRoomCard = {
  id: string;
  name: string;
  description: string;
  priceAmount: string;
  priceFootnote?: boolean;
};

export const HOTEL_ROOM_CARDS: HotelRoomCard[] = [
  {
    id: "private",
    name: "PRIVATE",
    description:
      "Уютный номер с полуторной кроватью, собственной ванной комнатой и всем необходимым для спокойного отдыха: косметика, халат, тапочки, Wi-Fi и круглосуточный доступ к инфраструктуре AVULUS CYBER HOTEL. Подойдет, если нужно переночевать после работы, встречи, учебы или ночи в городе.",
    priceAmount: "8500",
  },
  {
    id: "private-pc",
    name: "PRIVATE + ПК",
    description:
      "Тот же комфортный соло номер, но с игровым компьютером внутри. Компьютер устанавливается по предварительному запросу, поэтому лучше уточнить доступность заранее при бронировании.",
    priceAmount: "10500",
    priceFootnote: true,
  },
];

export const CONTACTS = {
  phone: CTAS.phone.display,
  phoneHref: CTAS.phone.href,
  telegramUrl: CTAS.telegram.url,
  vkUrl: CTAS.vk.url,
  bookingUrl: CTAS.book.url,
  address: "Москва, Серебрянический переулок, 12с1",
  parking: "Бесплатная парковка",
  hours: "Открыты 24/7",
  routeLabel: "Открыть в Яндекс Картах",
  placeName: "Avulus Cyber Space",
  mapGeocodeQuery: "Москва, Серебрянический переулок, 12с1",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?ll=37.648259%2C55.750145&z=17",
  mapOrgOid: "71331203438",
  mapRouteUrl:
    "https://yandex.com/maps/org/avulus_cyber_space/71331203438/?ll=37.648259%2C55.750145&z=17",
};

export const HOTEL_DESCRIPTION = [
  "AVULUS HOTEL - отель в центре Москвы внутри экосистемы AVULUS CYBER SPACE.",
  "Здесь можно остановиться на несколько часов, переночевать или провести несколько дней с доступом ко всей инфраструктуре комплекса.",
  "Для гостей доступны ресторан с доставкой блюд и напитков в номер, бесплатный Wi-Fi, парковка и круглосуточная стойка регистрации.",
  "В каждом номере есть кондиционер, телевизор, высокоскоростной интернет, рабочая зона и собственная ванная комната. Все необходимое для комфортного отдыха и проживания в центре Москвы.",
];
