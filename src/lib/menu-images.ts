/** Digital menu page paths under /public/menu */

const MENU_EXT = "svg";
const PC_MENU_BASE = "/menu/Pc menu";

const restaurantFrames = [371, 372, 373, 374, 375, 376] as const;
const barFrames = [377, 378, 379, 380, 381, 383, 384] as const;

function restaurantPath(frame: number) {
  return `/menu/Restoraunt/Frame ${frame}.${MENU_EXT}`;
}

function barPath(frame: number) {
  return `/menu/Bar/Frame ${frame}.${MENU_EXT}`;
}

function pcMenuPath(filename: string) {
  return `${PC_MENU_BASE}/${filename}`;
}

/** Full paginated menus for mobile */
export const menuImagesMobile = {
  restaurant: [
    "/menu/Restoraunt/01.webp",
    "/menu/Restoraunt/02.webp",
    "/menu/Restoraunt/03.webp",
    "/menu/Restoraunt/04.webp",
    "/menu/Restoraunt/05.webp",
    "/menu/Restoraunt/06.webp",
    "/menu/Restoraunt/07.webp",
    "/menu/Restoraunt/9.webp",
  ],
  bar: [
    "/menu/Bar/Frame 396.webp",
    "/menu/Bar/Frame 397.webp",
    "/menu/Bar/Frame 398.webp",
    "/menu/Bar/Frame 399.webp",
    "/menu/Bar/Frame 400.webp",
    "/menu/Bar/Frame 405.webp",
    "/menu/Bar/Frame 406.webp",
    "/menu/Bar/Frame 402.webp",
  ],
} as const;

/** Desktop PC menu spreads */
export const menuImagesDesktop = {
  restaurant: [
    "/menu/Mobile menu/AVULUS меню 1.webp",
    "/menu/Mobile menu/AVULUS меню 2.webp",
    "/menu/Mobile menu/AVULUS меню 6.webp",
  ],
  bar: [
    "/menu/Mobile menu/AVULUS меню 3.webp",
    "/menu/Mobile menu/AVULUS меню 4.webp",
  ],
} as const;

/** @deprecated Use getMenuImages — kept for imports that expect mobile set */
export const menuImages = menuImagesMobile;

export type MenuImageSet = keyof typeof menuImagesMobile;

export function getMenuImages(
  set: MenuImageSet,
  isDesktop: boolean,
): readonly string[] {
  return isDesktop ? menuImagesDesktop[set] : menuImagesMobile[set];
}
