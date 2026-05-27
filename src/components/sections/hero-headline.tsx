"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** Figma frame 6 — full artboard + visible typography crop */
const CANVAS_W = 1440;
const CANVAS_H = 756;
const VIEW_X = 105;
const VIEW_Y = 197;
const VIEW_W = 1195;
const VIEW_H = 362;

type Layer = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  priority?: boolean;
};

const LAYERS: Layer[] = [
  { src: assets.hero247, x: 896, y: 197, w: 395, h: 203, z: 1, priority: true },
  { src: assets.heroAvulus, x: 105, y: 223, w: 738, h: 140, z: 2, priority: true },
  { src: assets.heroCyber, x: 357.65, y: 389.34, w: 436, h: 94.68, z: 3 },
  { src: assets.heroHotel, x: 838, y: 362, w: 457, h: 149, z: 4 },
  { src: assets.heroTagline, x: 105, y: 428, w: 249, h: 69, z: 5 },
  { src: assets.heroRestaurantBadge, x: 1034, y: 471, w: 266, h: 88, z: 6 },
];

type HeroHeadlineProps = {
  className?: string;
};

export function HeroHeadline({ className }: HeroHeadlineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      setScale(el.clientWidth / VIEW_W);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full max-w-[1195px]", className)}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          left: -VIEW_X * scale,
          top: -VIEW_Y * scale,
        }}
      >
        {LAYERS.map((layer) => (
          <div
            key={layer.src}
            className="absolute"
            style={{
              left: layer.x,
              top: layer.y,
              width: layer.w,
              height: layer.h,
              zIndex: layer.z,
            }}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              className="object-contain object-left-top"
              sizes="(max-width: 1195px) 95vw, 1195px"
              priority={layer.priority}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
