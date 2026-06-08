"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { useIsDesktopMenu } from "@/hooks/use-media-query";
import {
  avulusButtonShadow,
  btnOutlineLightInteractive,
  figmaCtaCorners,
} from "@/lib/cta-styles";
import { getMenuImages, type MenuImageSet } from "@/lib/menu-images";
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
    label: "Меню кухни",
    imageBackgroundColor: "#ffffff",
  },
  {
    id: "bar" as const,
    label: "Барное меню",
    imageBackgroundColor: "transparent",
  },
] as const;

type RestaurantMenuActionsProps = {
  className?: string;
};

function preloadMenuImages(id: MenuImageSet, isDesktop: boolean) {
  for (const url of getMenuImages(id, isDesktop)) {
    const img = new Image();
    img.src = url;
  }
}

export function RestaurantMenuActions({ className }: RestaurantMenuActionsProps) {
  const [activeMenu, setActiveMenu] = useState<MenuImageSet | null>(null);
  const isDesktopMenu = useIsDesktopMenu();

  const warmMenu = useCallback(
    (id: MenuImageSet) => {
      preloadMenuImages(id, isDesktopMenu);
    },
    [isDesktopMenu],
  );

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
            aria-label={button.label}
            className={cn(
              figmaCtaCorners,
              avulusButtonShadow,
              "flex min-h-[52px] w-full items-center justify-center",
              "border border-white/25 bg-white/5 px-5 py-2.5",
              btnOutlineLightInteractive,
              "text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm sm:min-h-[56px] sm:min-w-[160px] sm:flex-1 sm:text-sm",
            )}
          >
            {button.label}
          </button>
        ))}
        </div>
      </div>

      {MENU_BUTTONS.map((button) => (
        <DigitalMenuModal
          key={button.id}
          isOpen={activeMenu === button.id}
          onClose={() => setActiveMenu(null)}
          images={getMenuImages(button.id, isDesktopMenu)}
          imageBackgroundColor={button.imageBackgroundColor}
        />
      ))}
    </>
  );
}
