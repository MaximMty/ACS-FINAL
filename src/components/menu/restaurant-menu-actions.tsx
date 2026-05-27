"use client";

import { useState } from "react";

import { DigitalMenuModal } from "@/components/menu/digital-menu-modal";
import { menuImages, type MenuImageSet } from "@/lib/menu-images";
import { cn } from "@/lib/utils";

const MENU_BUTTONS = [
  {
    id: "restaurant" as const,
    labelEn: "Kitchen Menu",
    labelRu: "Меню кухни",
    imageBackgroundColor: "#ffffff",
  },
  {
    id: "bar" as const,
    labelEn: "Bar Menu",
    labelRu: "Барное меню",
    imageBackgroundColor: "transparent",
  },
] as const;

type RestaurantMenuActionsProps = {
  className?: string;
};

export function RestaurantMenuActions({ className }: RestaurantMenuActionsProps) {
  const [activeMenu, setActiveMenu] = useState<MenuImageSet | null>(null);

  return (
    <>
      <div className={cn("flex flex-wrap gap-3 sm:max-w-lg", className)}>
        {MENU_BUTTONS.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => setActiveMenu(button.id)}
            aria-label={`${button.labelEn} — ${button.labelRu}`}
            className={cn(
              "flex min-h-[52px] min-w-[140px] flex-1 flex-col items-center justify-center gap-0.5",
              "rounded-full border border-white/25 bg-white/5 px-5 py-2.5",
              "text-white backdrop-blur-sm transition-all",
              "hover:border-white hover:bg-white hover:text-black",
              "sm:min-h-[56px] sm:min-w-[160px]",
            )}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-80 sm:text-xs">
              {button.labelEn}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide sm:text-sm">
              {button.labelRu}
            </span>
          </button>
        ))}
      </div>

      {MENU_BUTTONS.map((button) => (
        <DigitalMenuModal
          key={button.id}
          isOpen={activeMenu === button.id}
          onClose={() => setActiveMenu(null)}
          images={menuImages[button.id]}
          imageBackgroundColor={button.imageBackgroundColor}
        />
      ))}
    </>
  );
}
