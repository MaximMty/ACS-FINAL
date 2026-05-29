import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container } from "@/components/avulus/container";
import { FigmaImage } from "@/components/ui/figma-image";
import { assets } from "@/lib/assets";
import { CTAS } from "@/lib/ctas";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { CONTACTS } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Figma Frame 7 — # МЕНЮ: AVULUS + ОТЕЛЬ wordmarks */
export function HotelHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black">
      <Container className="flex h-[102px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-[clamp(12px,2vw,20px)]"
          aria-label="AVULUS — на главную"
        >
          <FigmaImage
            src={assets.hotelNavAvulus}
            alt=""
            width={175}
            height={33}
            className="h-[clamp(24px,3.2vw,33px)] w-auto"
            priority
          />
          <FigmaImage
            src={assets.hotelNavOtel}
            alt="ОТЕЛЬ"
            width={436}
            height={102}
            className="h-[clamp(24px,3.2vw,33px)] w-auto"
            priority
          />
        </Link>

        <Link
          href="#book"
          className={cn(
            figmaCtaCorners,
            "inline-flex shrink-0 items-center justify-center uppercase leading-none transition-opacity hover:opacity-90",
            "h-[clamp(48px,4.17vw,60px)] w-[clamp(140px,18.6vw,268px)] bg-white px-4",
            "text-[clamp(12px,1.46vw,21px)] font-bold tracking-normal text-[#db0032]",
          )}
        >
          {CTAS.langame.label}
        </Link>
      </Container>
    </header>
  );
}

export function HotelPageIntro() {
  return (
    <Container className="bg-black pb-6 pt-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-70"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        НАЗАД
      </Link>
      <p className="mt-4 text-sm font-medium uppercase leading-snug tracking-wide text-white/90">
        {CONTACTS.address}
      </p>
    </Container>
  );
}
