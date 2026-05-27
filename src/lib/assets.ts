import { ASSET_VERSION } from "./asset-version";

/** Normalized local /public asset URL */
export function assetUrl(path: string): string {
  void ASSET_VERSION;
  return path;
}

export const assets = {
  logo: assetUrl("/images/logo.png"),
  heroBg: assetUrl("/images/hero-bg.webp"),

  /** Frame 6 hero typography (exported from Figma — CoFo Weather / vector outlines) */
  heroAvulus: assetUrl("/images/hero-avulus.webp"),
  heroTitleComposite: assetUrl("/images/hero-title-composite.webp"),

  /** Figma Group 383 — chevron step bar background */
  featureBarBg: assetUrl("/images/feature-bar-bg.webp"),
  map: assetUrl("/images/hotel-map.webp"),
  hotelMap: assetUrl("/images/hotel-map.webp"),

  restaurantFood: assetUrl("/images/burger.svg"),
  restaurantDrink: assetUrl("/images/drink.svg"),

  promoHookah: assetUrl("/images/promo-hookah.webp"),
  promos: [
    assetUrl("/images/promo-1.webp"),
    assetUrl("/images/promo-2.webp"),
    assetUrl("/images/promo-3.webp"),
    assetUrl("/images/promo-4.webp"),
  ],

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
    private: assetUrl("/images/room-private.webp"),
    privatePlus: assetUrl("/images/room-private-plus.webp"),
    vip: assetUrl("/images/room-vip.webp"),
    stream: assetUrl("/images/room-stream.webp"),
    superVip: assetUrl("/images/room-super-vip.webp"),
  },

  roomPrivate: assetUrl("/images/room-private.webp"),
  hotelPrivate: assetUrl("/images/room-private-plus.webp"),

  stepIcons: {
    format: assetUrl("/images/icon-step-format.png"),
    room: assetUrl("/images/icon-step-room.png"),
    time: assetUrl("/images/icon-step-time.png"),
    play: assetUrl("/images/icon-step-play.png"),
  },

  iconUser: assetUrl("/images/logo.png"),
  iconPhone: assetUrl("/images/icon-phone.webp"),
  iconTelegram: assetUrl("/images/icon-telegram.webp"),
  iconParking: assetUrl("/images/icon-parking.svg"),
  iconCheck: assetUrl("/images/icon-check.webp"),
  iconMonitor: assetUrl("/images/icon-monitor.webp"),
  iconGpu: assetUrl("/images/icon-gpu.webp"),
  iconCpu: assetUrl("/images/icon-cpu.webp"),

  formatsSectionPattern: assetUrl("/images/formats-section-pattern.webp"),
} as const;
