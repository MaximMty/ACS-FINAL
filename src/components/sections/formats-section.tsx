import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/avulus/container";
import { assets } from "@/lib/assets";
import type { FormatCard } from "@/lib/data";
import { FORMAT_CARDS } from "@/lib/data";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const patternStyle = {
  backgroundImage: `url(${assets.formatsSectionPattern})`,
} as const;

/** Shared title baseline on all four cards (318×548 Figma) */
const CARD_LAYOUT = {
  iconZone: 60,
  titleTop: 136,
} as const;

const GAP_AFTER_ICON = CARD_LAYOUT.titleTop - CARD_LAYOUT.iconZone;

export function FormatsSection() {
  return (
    <section id="formats" className="relative overflow-hidden bg-avulus-red py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center mix-blend-screen opacity-40"
        style={patternStyle}
      />

      <Container className="relative">
        <h2 className="mb-10 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          Выбирай свой формат
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FORMAT_CARDS.map((card) => (
            <FormatCardItem key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FormatCardItem({ card }: { card: FormatCard }) {
  const isHotel = card.variant === "hotel";
  const buttonVariant = card.buttonVariant ?? "outline";

  return (
    <article
      className={cn(
        "relative flex min-h-[548px] flex-col overflow-hidden rounded-sm text-center",
        isHotel ? "bg-avulus-hotel text-white" : "bg-white text-black",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[length:140%] bg-center",
          isHotel ? "mix-blend-soft-light opacity-50" : "opacity-[0.07]",
        )}
        style={patternStyle}
      />

      {/* Same top band on every card so titles line up */}
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ height: CARD_LAYOUT.iconZone }}
      >
        {!isHotel && (
          <Image
            src={assets.iconUser}
            alt=""
            width={102}
            height={102}
            className="size-[clamp(64px,16vw,102px)] object-contain opacity-10"
          />
        )}
      </div>

      <div
        className="relative flex flex-col items-center px-6 sm:px-8"
        style={{ marginTop: GAP_AFTER_ICON }}
      >
        <h3
          className={cn(
            "text-[clamp(2.25rem,4.5vw,3.25rem)] font-black uppercase leading-none tracking-tight",
            isHotel
              ? "text-stroke-white"
              : "[-webkit-text-stroke:2px_#e31e24] text-white",
          )}
        >
          {card.title}
        </h3>

        <p
          className={cn(
            "mt-3 text-xs font-bold uppercase tracking-wider",
            isHotel ? "text-white" : "text-black",
          )}
        >
          {card.subtitle}
        </p>

        <p
          className={cn(
            "mt-4 max-w-[240px] text-sm leading-relaxed",
            isHotel ? "text-white/90" : "text-black/90",
          )}
        >
          {card.description}
        </p>

        {card.price && (
          <p className="mt-6 flex items-baseline justify-center gap-1 text-avulus-red sm:mt-8">
            <span className="text-sm font-semibold">{card.price.prefix}</span>
            <span className="text-4xl font-black leading-none sm:text-5xl">
              {card.price.amount}
            </span>
            <span className="text-sm font-semibold">{card.price.suffix}</span>
          </p>
        )}
      </div>

      <div className="relative mt-auto flex flex-col gap-3 px-6 pb-6 pt-4 sm:px-8">
        {card.ctaPrimary && (
          <Link
            href={isHotel ? "/hotel#book" : "#rooms"}
            className={cn(
              figmaCtaCorners,
              "flex h-[60px] items-center justify-center text-sm font-medium uppercase transition-opacity hover:opacity-90",
              isHotel && "bg-white text-avulus-red",
              !isHotel &&
                buttonVariant === "filled" &&
                "bg-black text-white",
              !isHotel &&
                buttonVariant === "outline" &&
                "border-2 border-black bg-white text-black",
            )}
          >
            {card.ctaPrimary}
          </Link>
        )}
        {card.ctaSecondary && (
          <Link
            href="/hotel"
            className={cn(
              figmaCtaCorners,
              "flex h-[60px] items-center justify-center border-2 border-white bg-transparent text-sm font-medium uppercase text-white transition-opacity hover:bg-white/10",
            )}
          >
            {card.ctaSecondary}
          </Link>
        )}
      </div>
    </article>
  );
}
