"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/avulus/container";
import {
  avulusButtonShadow,
  avulusCardShadow,
  btnOutlineLightInteractive,
} from "@/lib/cta-styles";
import { assets } from "@/lib/assets";
import { ROOM_PROMO } from "@/lib/data";
import { cn } from "@/lib/utils";

const PROMOS = [
  {
    image: assets.promoHookah,
    title: ROOM_PROMO.title,
    tag: ROOM_PROMO.tag,
    note: ROOM_PROMO.note,
  },
  {
    image: assets.promoHookah,
    title: ROOM_PROMO.title,
    tag: ROOM_PROMO.tag,
    note: "При бронировании SUPER VIP.",
  },
  { image: assets.promoHookah, title: ROOM_PROMO.title, tag: ROOM_PROMO.tag, note: "" },
  { image: assets.promoHookah, title: ROOM_PROMO.title, tag: ROOM_PROMO.tag, note: "" },
];

const MOBILE_CARD_GAP = 16;

export function PromotionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPromo = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-promo-card]");
    if (!card) return;

    const step = card.offsetWidth + MOBILE_CARD_GAP;
    container.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="promotions"
      className="scroll-mt-[clamp(72px,7.15vw,103px)] bg-avulus-black py-14 lg:py-20"
    >
      <Container>
        <div className="mb-6 flex items-center justify-between gap-4 lg:mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            АКЦИИ И ПРЕДЛОЖЕНИЯ
          </h2>

          <div className="flex shrink-0 gap-1 lg:hidden">
            <PromoNavButton
              onClick={() => scrollPromo("prev")}
              aria-label="Предыдущая акция"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </PromoNavButton>
            <PromoNavButton
              onClick={() => scrollPromo("next")}
              aria-label="Следующая акция"
            >
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </PromoNavButton>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 lg:hidden",
            "overflow-x-auto overscroll-x-contain snap-x snap-mandatory",
            "scroll-smooth [-webkit-overflow-scrolling:touch]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {PROMOS.map((promo, i) => (
            <PromoCard key={i} promo={promo} variant="mobile" />
          ))}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
          {PROMOS.map((promo, i) => (
            <PromoCard key={i} promo={promo} variant="desktop" />
          ))}
        </div>
      </Container>
    </section>
  );
}

type Promo = (typeof PROMOS)[number];

function PromoCard({
  promo,
  variant,
}: {
  promo: Promo;
  variant: "mobile" | "desktop";
}) {
  const isMobile = variant === "mobile";

  return (
    <article
      data-promo-card={isMobile ? true : undefined}
      className={cn(
        "group relative overflow-hidden bg-black",
        avulusCardShadow,
        isMobile
          ? "min-h-[420px] w-full min-w-full shrink-0 snap-start border border-white/80"
          : "min-h-[632px] bg-[#111]",
      )}
    >
      <Image
        src={promo.image}
        alt=""
        fill
        className={cn(
          "object-cover",
          !isMobile && "transition-transform duration-500 group-hover:scale-105",
        )}
        sizes={
          isMobile
            ? "100vw"
            : "(max-width: 1280px) 50vw, 25vw"
        }
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black to-transparent",
          isMobile ? "via-black/50" : "via-black/40",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p
          className={cn(
            "text-xs uppercase tracking-widest",
            isMobile
              ? "font-bold text-avulus-red"
              : "text-white/70",
          )}
        >
          {promo.tag}
        </p>
        <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-white">
          {promo.title}
        </h3>
        {promo.note && (
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed",
              isMobile ? "text-white/80" : "text-white/70",
            )}
          >
            {promo.note}
          </p>
        )}
      </div>
    </article>
  );
}

function PromoNavButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        btnOutlineLightInteractive,
        "flex size-[50px] items-center justify-center border border-white/80 bg-black text-white shadow-avulus-button",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
