import { FigmaImage } from "@/components/ui/figma-image";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const DESKTOP_W = 1195;
const DESKTOP_H = 378;
const MOBILE_W = 355;
const MOBILE_H = 182;

type HeroHeadlineProps = {
  className?: string;
};

export function HeroHeadline({ className }: HeroHeadlineProps) {
  return (
    <>
      <div
        className={cn(
          "relative mx-auto w-full max-w-[355px] lg:hidden",
          className,
        )}
        style={{ aspectRatio: `${MOBILE_W} / ${MOBILE_H}` }}
        aria-hidden
      >
        <FigmaImage
          src={assets.heroTitleMobile}
          alt=""
          fill
          className="object-contain object-center"
          sizes="(max-width: 430px) 355px, 92vw"
          priority
          fetchPriority="high"
        />
      </div>

      <div
        className={cn(
          "relative hidden w-[min(100%,1195px)] lg:block",
          className,
        )}
        style={{ aspectRatio: `${DESKTOP_W} / ${DESKTOP_H}` }}
        aria-hidden
      >
        <FigmaImage
          src={assets.heroTitleComposite}
          alt=""
          fill
          className="object-contain object-left-top"
          sizes="(max-width: 1280px) 78vw, 1195px"
          priority
          fetchPriority="high"
        />
      </div>
    </>
  );
}
