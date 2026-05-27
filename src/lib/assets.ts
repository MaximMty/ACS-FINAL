import { ASSET_VERSION } from "./asset-version";

/** Normalized local /public asset URL */
export function assetUrl(path: string): string {
  void ASSET_VERSION;
  return path;
}

export const assets = {
  logo: assetUrl("/images/logo.png"),
  heroBg: assetUrl("/images/hero-bg.jpg"),

  /** Frame 6 hero typography (exported from Figma — CoFo Weather / vector outlines) */
  heroAvulus: assetUrl("/images/hero-avulus.png"),
  hero247: assetUrl("/images/hero-247.png"),
  heroCyber: assetUrl("/images/hero-cyber.png"),
  heroHotel: assetUrl("/images/hero-hotel.png"),
  heroTagline: assetUrl("/images/hero-tagline.png"),
  heroRestaurantBadge: assetUrl("/images/hero-restaurant-badge.png"),

  /** Figma Group 383 — chevron step bar background */
  featureBarBg: assetUrl("/images/feature-bar-bg.png"),
  map: assetUrl("/images/map.jpg"),
  hotelMap: assetUrl("/images/hotel-map.jpg"),

  restaurantFood: assetUrl("/images/burger.svg"),
  restaurantDrink: assetUrl("/images/drink.svg"),

  promoHookah: assetUrl("/images/promo-hookah.jpg"),
  promos: [
    assetUrl("/images/promo-1.jpg"),
    assetUrl("/images/promo-2.jpg"),
    assetUrl("/images/promo-3.jpg"),
    assetUrl("/images/promo-4.jpg"),
  ],

  hotelGallery: {
    main: assetUrl("/images/hotel-gallery-main.jpg"),
    thumbs: [
      assetUrl("/images/hotel-gallery-1.jpg"),
      assetUrl("/images/hotel-gallery-2.jpg"),
      assetUrl("/images/hotel-gallery-3.jpg"),
      assetUrl("/images/hotel-gallery-4.jpg"),
    ],
  },

  rooms: {
    pattern: assetUrl("/images/rooms-section-pattern.png"),
    private: assetUrl("/images/room-private.svg"),
    privatePlus: assetUrl("/images/room-private-plus.svg"),
    vip: assetUrl("/images/room-vip.svg"),
    stream: assetUrl("/images/room-stream.svg"),
    superVip: assetUrl("/images/room-super-vip.svg"),
  },

  roomPrivate: assetUrl("/images/room-private.svg"),
  hotelPrivate: assetUrl("/images/privat%20hotel.svg"),

  stepIcons: {
    format: assetUrl("/images/icon-step-format.png"),
    room: assetUrl("/images/icon-step-room.png"),
    time: assetUrl("/images/icon-step-time.png"),
    play: assetUrl("/images/icon-step-play.png"),
  },

  iconUser: assetUrl("/images/icon-user.png"),
  iconPhone: assetUrl("/images/icon-phone.png"),
  iconTelegram: assetUrl("/images/icon-telegram.png"),
  iconParking: assetUrl("/images/icon-parking.svg"),
  iconCheck: assetUrl("/images/icon-check.png"),
  iconMonitor: assetUrl("/images/icon-monitor.png"),
  iconGpu: assetUrl("/images/icon-gpu.png"),
  iconCpu: assetUrl("/images/icon-cpu.png"),

  formatsSectionPattern: assetUrl("/images/formats-section-pattern.png"),
} as const;
