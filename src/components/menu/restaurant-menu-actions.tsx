"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { figmaCtaCorners } from "@/lib/cta-styles";
import { menuImages, type MenuImageSet } from "@/lib/menu-images";
import { cn } from "@/lib/utils";

const DigitalMenuModal = dynamic(
  () =>
    import("@/components/menu/digital-menu-modal").then((m) => ({
      default: m.DigitalMenuModal,
    })),
  { ssr: false },
);

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

function preloadMenuImages(id: MenuImageSet) {
  for (const url of menuImages[id]) {
    const img = new Image();
    img.src = url;
  }
}

export function RestaurantMenuActions({ className }: RestaurantMenuActionsProps) {
  const [activeMenu, setActiveMenu] = useState<MenuImageSet | null>(null);

  const warmMenu = useCallback((id: MenuImageSet) => {
    preloadMenuImages(id);
  }, []);

  return (
    <>
      <div className={cn("flex flex-col gap-3 sm:max-w-lg", className)}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {MENU_BUTTONS.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => setActiveMenu(button.id)}
            onMouseEnter={() => warmMenu(button.id)}
            onFocus={() => warmMenu(button.id)}
            aria-label={`${button.labelEn} — ${button.labelRu}`}
            className={cn(
              figmaCtaCorners,
              "flex min-h-[52px] w-full flex-col items-center justify-center gap-0.5",
              "border border-white/25 bg-white/5 px-5 py-2.5",
              "text-white backdrop-blur-sm transition-all",
              "hover:border-white hover:bg-white/15 hover:text-white",
              "sm:min-h-[56px] sm:min-w-[160px] sm:flex-1",
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
