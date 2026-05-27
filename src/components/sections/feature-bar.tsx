import { FigmaImage } from "@/components/ui/figma-image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

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
        className="object-cover object-center"
        sizes="100vw"
        loading="lazy"
      />
    </section>
  );
}
