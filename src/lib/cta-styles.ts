import { cn } from "@/lib/utils";

/** Figma button shape — curved TL/BR, square TR/BL */
export const figmaCtaCorners = "rounded-figma-cta";

export const bookButtonClass = cn(
  figmaCtaCorners,
  "inline-flex items-center justify-center bg-avulus-red text-[21px] font-medium uppercase leading-none text-white transition-colors hover:bg-avulus-red-dark",
);

export const bookButtonMdClass = cn(bookButtonClass, "h-[60px]");

export const bookButtonFullClass = cn(bookButtonMdClass, "w-full");
