import { FigmaImage } from "@/components/ui/figma-image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type FeatureBarProps = {
  className?: string;
};

export function FeatureBar({ className }: FeatureBarProps) {
  return (
    <section
      className={cn("relative shrink-0 bg-black w-full", className)}
      style={{ height: "var(--feature-height)" }}
      aria-label="Шаги бронирования"
    >
      {/* PC Version: Centered and responsive */}
      <div className="hidden lg:flex h-full w-full items-center justify-center px-4 max-w-[1234px] mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.featureBarBg}
          alt=""
          width={1234}
          height={101}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Mobile Version: Horizontal scrolling */}
      <div
        className={cn(
          "h-full w-full overflow-x-auto overflow-y-hidden overscroll-x-contain lg:hidden px-4 sm:px-6",
          "[scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <div
          className="relative h-full shrink-0"
          style={{ aspectRatio: "1234 / 101" }}
        >
          <FigmaImage
            src={assets.featureBarBg}
            alt=""
            fill
            className="object-contain object-left"
            sizes="1234px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
