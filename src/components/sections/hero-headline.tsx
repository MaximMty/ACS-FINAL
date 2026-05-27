import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const VIEW_W = 1195;
const VIEW_H = 362;

type HeroHeadlineProps = {
  className?: string;
};

export function HeroHeadline({ className }: HeroHeadlineProps) {
  return (
    <div
      className={cn("relative w-full max-w-[1195px]", className)}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      aria-hidden
    >
      <Image
        src={assets.heroTitleComposite}
        alt=""
        fill
        className="object-contain object-left-top"
        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 78vw, 1195px"
        priority
      />
    </div>
  );
}
