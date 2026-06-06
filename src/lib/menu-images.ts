/** Digital menu page paths under /public/menu */

const MENU_EXT = "svg";
const PC_MENU_BASE = "/menu/Pc menu";

const restaurantFrames = [360, 371, 372, 373, 374, 375, 376] as const;
const barFrames = [369, 377, 378, 379, 380, 381, 383, 384] as const;

function restaurantPath(frame: number) {
  return `/menu/Restoraunt/Frame ${frame}.${MENU_EXT}`;
}

function barPath(frame: number) {
  return `/menu/Bar/Frame ${frame}.${MENU_EXT}`;
}

function pcMenuPath(filename: string) {
  return `${PC_MENU_BASE}/${filename}`;
}

/** Cover pages shared between mobile and desktop */
const restaurantCover = restaurantPath(360);
const barCover = barPath(369);

/** Full paginated menus for mobile */
export const menuImagesMobile = {
  restaurant: restaurantFrames.map(restaurantPath),
  bar: barFrames.map(barPath),
} as const;

/** Desktop: cover page + PC menu spreads */
export const menuImagesDesktop = {
  restaurant: [
    restaurantCover,
    pcMenuPath("menu-page-1-600dpi.png"),
    pcMenuPath("menu-page-2-600dpi.png"),
  ],
  bar: [
    barCover,
    pcMenuPath("menu-page-3-600dpi.png"),
    pcMenuPath("menu-page-4-600dpi.png"),
    pcMenuPath("5.jpg"),
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
