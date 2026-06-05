import { FigmaImage } from "@/components/ui/figma-image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const FEATURE_BAR_W = 1440;
const FEATURE_BAR_H = 99;

type FeatureBarProps = {
  className?: string;
};

/** Figma Group 383 — full chevron step bar exported as one asset */
export function FeatureBar({ className }: FeatureBarProps) {
  return (
    <section
      className={cn("relative w-full bg-black", className)}
      style={{ height: "var(--feature-height, clamp(72px, 6.74vw, 97px))" }}
      aria-label="Шаги бронирования"
    >
      <FigmaImage
        src={assets.featureBarBg}
        alt=""
        fill
        className="hidden object-cover object-center lg:block"
        sizes="100vw"
        loading="lazy"
      />

      <div
        className={cn(
          "h-full w-full overflow-x-auto overflow-y-hidden overscroll-x-contain lg:hidden",
          "[scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div
          className="relative h-full shrink-0"
          style={{ aspectRatio: `${FEATURE_BAR_W} / ${FEATURE_BAR_H}` }}
        >
          <FigmaImage
            src={assets.featureBarBg}
            alt=""
            fill
            className="object-contain object-left"
            sizes="1440px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
