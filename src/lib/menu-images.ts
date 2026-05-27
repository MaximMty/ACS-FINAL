/** Digital menu page paths under /public/menu */
const restaurantFrames = [360, 371, 372, 373, 374, 375, 376] as const;
const barFrames = [369, 377, 378, 379, 380, 381, 383, 384] as const;

function restaurantPath(frame: number) {
  return `/menu/Restoraunt/Frame ${frame}.webp`;
}

function barPath(frame: number) {
  return `/menu/Bar/Frame ${frame}.webp`;
}

export const menuImages = {
  restaurant: restaurantFrames.map(restaurantPath),
  bar: barFrames.map(barPath),
} as const;

export type MenuImageSet = keyof typeof menuImages;
