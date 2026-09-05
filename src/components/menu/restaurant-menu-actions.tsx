import { ExternalCta } from "@/components/ui/external-cta";
import {
  avulusButtonShadow,
  btnOutlineLightInteractive,
  figmaCtaCorners,
} from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  {
    id: "kitchen",
    label: "Меню кухни",
    href: "https://avulus.myresto.online/ru/category/zavtraki",
  },
  {
    id: "bar",
    label: "Барное меню",
    href: "https://avulus.myresto.online/ru/category/kofe",
  },
] as const;

type RestaurantMenuActionsProps = {
  className?: string;
};

export function RestaurantMenuActions({ className }: RestaurantMenuActionsProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:max-w-lg", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {MENU_LINKS.map((item) => (
          <ExternalCta
            key={item.id}
            href={item.href}
            className={cn(
              figmaCtaCorners,
              avulusButtonShadow,
              "flex min-h-[52px] w-full items-center justify-center",
              "border border-white/25 bg-white/5 px-5 py-2.5",
              btnOutlineLightInteractive,
              "text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm sm:min-h-[56px] sm:min-w-[160px] sm:flex-1 sm:text-sm",
            )}
          >
            {item.label}
          </ExternalCta>
        ))}
      </div>
    </div>
  );
}
