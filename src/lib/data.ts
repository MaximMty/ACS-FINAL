import { assets } from "@/lib/assets";

export const NAV_LINKS = [
  { label: "Форматы", href: "/#formats" },
  { label: "Комнаты", href: "/#rooms" },
  { label: "Ресторан", href: "/#restaurant" },
  { label: "Акции", href: "/#promotions" },
  { label: "Контакты", href: "/#contacts" },
] as const;

export const FEATURE_STEPS = [
  { label: "Выбирай\nформат", icon: "grid" as const },
  { label: "Выбирай\nкомнату", icon: "box" as const },
  { label: "Выбирай\nвремя", icon: "clock" as const },
  { label: "Приезжай\nи играй", icon: "gamepad" as const },
];

export type FormatCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price?: {
    prefix: string;
    amount: string;
    suffix: string;
  };
  variant: "light" | "hotel";
  buttonVariant?: "filled" | "outline";
  ctaPrimary?: string;
  ctaSecondary?: string;
};

export const FORMAT_CARDS: FormatCard[] = [
  {
    id: "solo",
    title: "СОЛО",
    subtitle: "1 ИГРОК",
    description: "Для одиночной игры, фокуса или отдыха",
    price: { prefix: "от", amount: "299₽", suffix: "/час" },
    variant: "light",
    buttonVariant: "filled",
    ctaPrimary: "Выбрать комнату",
  },
  {
    id: "team",
    title: "ТИМ",
    subtitle: "2–5 ИГРОКОВ",
    description: "Для игры с друзьями и буткемпов",
    price: { prefix: "от", amount: "299₽", suffix: "/час" },
    variant: "light",
    buttonVariant: "outline",
    ctaPrimary: "Выбрать комнату",
  },
  {
    id: "stream",
    title: "СТРИМ",
    subtitle: "1–2 ИГРОКА",
    description: "Для стрима и записи контента",
    price: { prefix: "от", amount: "299₽", suffix: "/час" },
    variant: "light",
    buttonVariant: "outline",
    ctaPrimary: "Выбрать комнату",
  },
  {
    id: "hotel",
    title: "ОТЕЛЬ",
    subtitle: "МОЖНО ПРОСТО ОСТАТЬСЯ",
    description: "Без игрового тарифа — как обычный отель",
    variant: "hotel",
    ctaPrimary: "Забронировать",
    ctaSecondary: "Подробнее",
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
    price: { prefix: "от", amount: "3000₽", suffix: "/ час" },
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
    price: { prefix: "от", amount: "3000₽", suffix: "/ час" },
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
    price: { prefix: "от", amount: "3000₽", suffix: "/ час" },
  },
  {
    id: "stream",
    name: "STREAM",
    images: [assets.rooms.stream],
    specs: {
      monitor: '2x LG 27" 165Hz, 1x Samsung 24" 240Hz',
      gpu: "RTX 5070 - 4070 Super",
      cpu: "i5-13500",
    },
    price: { prefix: "от", amount: "3000₽", suffix: "/ час" },
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
    price: { prefix: "от", amount: "3000₽", suffix: "/ час" },
  },
];

export const ROOM_PROMO = {
  tag: "ПРОМО",
  title: "КАЛЬЯН БЕСПЛАТНО",
  note: "При бронировании SUPER VIP. Только до 10 мая.",
} as const;

export const MENU_ITEMS = [
  { name: "Острая мясная пицца", price: "890 ₽" },
  { name: "Бургер AVULUS", price: "690 ₽" },
  { name: "Крылья BBQ", price: "590 ₽" },
  { name: "Лимонад домашний", price: "290 ₽" },
  { name: "Эспрессо", price: "190 ₽" },
] as const;

export const HOTEL_SERVICES = [
  "Бесплатный Wi-Fi",
  "Круглосуточная стойка регистрации",
  "Доставка еды в номер",
  "Бесплатная парковка",
] as const;

export const HOTEL_LOCATION = [
  "Рядом с НИУ ВШЭ",
  "Удобный выезд в центр города",
  "Магазины и сервисы поблизости",
  "Транспортная доступность",
] as const;

export const CONTACTS = {
  phone: "+7 (495) 157-39-92",
  address: "Москва, Серебрянический переулок, 12с1",
  parking: "Бесплатная парковка",
  hours: "Открыты 24/7",
  routeLabel: "построить маршрут",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?ll=37.648259%2C55.750145&z=17&pt=37.648259%2C55.750145%2Cpm2rdm",
  mapRouteUrl:
    "https://yandex.com/maps/org/avulus_cyber_space/71331203438/?ll=37.648259%2C55.750145&z=17",
};

export const HOTEL_DESCRIPTION = [
  "AVULUS HOTEL — это cyber hotel в центре Москвы с круглосуточным форматом размещения и современной digital atmosphere. Гости могут остановиться на несколько часов, остаться на ночь или провести полноценный stay с доступом ко всей инфраструктуре комплекса.",
  "На территории работает ресторан с возможностью доставки еды и напитков прямо в номер, а также доступен бесплатный Wi-Fi на всей территории отеля. Для гостей предусмотрена бесплатная парковка и круглосуточная стойка регистрации.",
  "Отель расположен рядом с НИУ ВШЭ и подходит как для отдыха, так и для комфортного размещения после работы, учебы, игр или ночных встреч.",
];
