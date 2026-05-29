import { ASSET_VERSION } from "./asset-version";

/** Normalized local /public asset URL */
export function assetUrl(path: string): string {
  void ASSET_VERSION;
  return path;
}

export const assets = {
  logo: assetUrl("/images/logo.png"),
  heroBg: assetUrl("/images/hero-bg.webp"),
  heroTitleComposite: assetUrl("/images/hero-title-composite-v4.webp"),

  /** Hotel page nav — AVULUS + ОТЕЛЬ (exported from Figma) */
  hotelNavAvulus: assetUrl("/images/hotel-nav-avulus.png"),
  hotelNavOtel: assetUrl("/images/hotel-nav-otel.png"),

  /** Figma Group 383 — chevron step bar background */
  featureBarBg: assetUrl("/images/feature-bar-bg.webp"),

  restaurantFood: assetUrl("/images/burger.webp"),
  restaurantDrink: assetUrl("/images/drink.webp"),

  promoHookah: assetUrl("/images/promo-hookah.webp"),

  hotelGallery: {
    main: assetUrl("/images/hotel-gallery-main.webp"),
    thumbs: [
      assetUrl("/images/hotel-gallery-1.webp"),
      assetUrl("/images/hotel-gallery-2.webp"),
      assetUrl("/images/hotel-gallery-3.webp"),
      assetUrl("/images/hotel-gallery-4.webp"),
    ],
  },

  rooms: {
    pattern: assetUrl("/images/rooms-section-pattern.webp"),
    private: assetUrl("/images/room-private-card.webp"),
    privatePlus: assetUrl("/images/room-private-plus-card.webp"),
    vip: assetUrl("/images/room-vip-card.webp"),
    stream: assetUrl("/images/room-stream-card.webp"),
    superVip: assetUrl("/images/room-super-vip-card.webp"),
  },

  roomPrivate: assetUrl("/images/room-private.webp"),
  hotelPrivate: assetUrl("/images/room-private-plus.webp"),

  iconUser: assetUrl("/images/logo.png"),
  iconPhone: assetUrl("/images/icon-phone.webp"),
  iconTelegram: assetUrl("/images/icon-telegram.webp"),
  iconParking: assetUrl("/images/icon-parking.svg"),
  iconMonitor: assetUrl("/images/icon-monitor.webp"),
  iconGpu: assetUrl("/images/icon-gpu.webp"),
  iconCpu: assetUrl("/images/icon-cpu.webp"),

  formatsSectionPattern: assetUrl("/images/formats-section-pattern.webp"),
} as const;
