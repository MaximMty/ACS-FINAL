import { cn } from "@/lib/utils";

/** Figma button shape — curved TL/BR, square TR/BL */
export const figmaCtaCorners = "rounded-figma-cta";

/** Subtle elevation tokens for cards, buttons, and floating controls */
export const avulusCardShadow = "shadow-avulus-card";
export const avulusButtonShadow = "shadow-avulus-button";
export const avulusFloatShadow = "shadow-avulus-float";

export const bookButtonClass = cn(
  figmaCtaCorners,
  avulusButtonShadow,
  "inline-flex items-center justify-center bg-avulus-red text-[21px] font-medium uppercase leading-none text-white transition-colors hover:bg-avulus-red-dark",
);

export const bookButtonMdClass = cn(bookButtonClass, "h-[60px]");

export const bookButtonFullClass = cn(bookButtonMdClass, "w-full");
