import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const GROUND_FILTER =
  "invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%)";

type CustomYandexMapProps = {
  embedUrl: string;
  className?: string;
  logoSrc?: string;
};

export function CustomYandexMap({
  embedUrl,
  className,
  logoSrc = assets.logo,
}: CustomYandexMapProps) {
  return (
    <div
      className={cn(
        "relative h-[278px] w-full max-w-[433px] overflow-hidden rounded-none bg-[#1a1a1a]",
        className,
      )}
    >
      <iframe
        src={embedUrl}
        title="Карта Avulus"
        className="h-full w-full border-0"
        style={{ filter: GROUND_FILTER }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full"
        aria-hidden
      >
        <Image
          src={logoSrc}
          alt=""
          width={56}
          height={56}
          className="size-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
}
