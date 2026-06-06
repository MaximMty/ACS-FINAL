import { cn } from "@/lib/utils";

/** Figma button shape — curved TL/BR, square TR/BL */
export const figmaCtaCorners = "rounded-figma-cta";

/** Subtle elevation tokens for cards, buttons, and floating controls */
export const avulusCardShadow = "shadow-avulus-card";
export const avulusButtonShadow = "shadow-avulus-button";
export const avulusFloatShadow = "shadow-avulus-float";

/** Shared interaction states — see globals.css (.avulus-*) */
export const tapInteractive = "avulus-tap";
export const linkInteractive = "avulus-link";
export const btnOpacityInteractive = "avulus-btn-opacity";
export const btnFilledInteractive = "avulus-btn-filled";
export const btnFilledDarkInteractive = "avulus-btn-filled-dark";
export const btnOutlineLightInteractive = "avulus-btn-outline-light";
export const floatBtnInteractive = "avulus-float-btn";

export const bookButtonClass = cn(
  figmaCtaCorners,
  avulusButtonShadow,
  btnFilledInteractive,
  "inline-flex items-center justify-center bg-avulus-red text-[21px] font-medium uppercase leading-none text-white",
);

export const bookButtonMdClass = cn(bookButtonClass, "h-[60px]");

export const bookButtonFullClass = cn(bookButtonMdClass, "w-full");
