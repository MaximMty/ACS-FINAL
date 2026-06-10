import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/avulus/container";
import { ExternalCta } from "@/components/ui/external-cta";
import { assets } from "@/lib/assets";
import type { FormatCard } from "@/lib/data";
import { CTAS } from "@/lib/ctas";
import { FORMAT_CARDS } from "@/lib/data";
import {
  avulusButtonShadow,
  avulusCardShadow,
  btnFilledDarkInteractive,
  btnOpacityInteractive,
  btnOutlineLightInteractive,
  tapInteractive,
  figmaCtaCorners,
} from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const patternStyle = {
  backgroundImage: `url(${assets.formatsSectionPattern})`,
} as const;

/** Shared title baseline on all three cards (318×548 Figma) */
const CARD_LAYOUT = {
  iconZone: 60,
  titleTop: 136,
} as const;

const GAP_AFTER_ICON = CARD_LAYOUT.titleTop - CARD_LAYOUT.iconZone;

export function FormatsSection() {
  return (
    <section
      id="formats"
      className="relative scroll-mt-[clamp(72px,7.15vw,103px)] overflow-hidden bg-avulus-red py-14 lg:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center mix-blend-screen opacity-40"
        style={patternStyle}
      />

      <Container className="relative">
        <h2 className="mb-10 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          ВЫБЕРИ КАК ПРОВЕСТИ ВРЕМЯ
        </h2>

        <div
          className={cn(
            "flex gap-4",
            "max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:snap-x max-lg:snap-mandatory",
            "max-lg:scroll-smooth [-webkit-overflow-scrolling:touch]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "lg:grid lg:grid-cols-2 xl:grid-cols-4",
          )}
        >
          {FORMAT_CARDS.map((card) => (
            <FormatCardItem
              key={card.id}
              card={card}
              className="max-lg:w-[calc(100%-2.75rem)] max-lg:min-w-[calc(100%-2.75rem)] max-lg:shrink-0 max-lg:snap-start"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FormatCardItem({
  card,
  className,
}: {
  card: FormatCard;
  className?: string;
}) {
  const isHotel = card.variant === "hotel";
  const isRestaurant = card.variant === "restaurant";
  const isDark = isHotel || isRestaurant;
  const buttonVariant = card.buttonVariant ?? "outline";

  const primaryHref =
    card.ctaPrimaryHref ?? (isHotel ? CTAS.book.url : "/#rooms");
  const isExternalLink = card.ctaExternal ?? isHotel;

  const ctaClassName = cn(
    figmaCtaCorners,
    avulusButtonShadow,
    "flex h-[60px] items-center justify-center text-sm font-medium uppercase",
    isDark && cn(btnOpacityInteractive, "bg-white text-avulus-red"),
    !isDark &&
      buttonVariant === "filled" &&
      cn(btnFilledDarkInteractive, "bg-black text-white"),
    !isDark &&
      buttonVariant === "outline" &&
      cn(tapInteractive, "border-2 border-black bg-white text-black active:bg-black/5"),
  );

  return (
    <article
      className={cn(
        "relative flex min-h-[548px] flex-col overflow-hidden rounded-sm text-center",
        avulusCardShadow,
        isHotel && "bg-avulus-hotel text-white",
        isRestaurant && "bg-avulus-restaurant text-white",
        !isDark && "bg-white text-black",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[length:140%] bg-center",
          isRestaurant && "mix-blend-screen opacity-[0.22] brightness-75",
          isHotel && "mix-blend-soft-light opacity-50",
          !isDark && "opacity-[0.07]",
        )}
        style={patternStyle}
      />

      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ height: CARD_LAYOUT.iconZone }}
      >
        {!isDark && (
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
        className="relative flex flex-1 flex-col items-center px-6 sm:px-8"
        style={{ marginTop: GAP_AFTER_ICON }}
      >
        <h3
          className={cn(
            "text-[clamp(2.25rem,4.5vw,3.25rem)] font-black uppercase leading-none tracking-tight",
            isDark
              ? "text-stroke-white"
              : "[-webkit-text-stroke:2px_#e31e24] text-white",
          )}
        >
          {card.title}
        </h3>

        <p
          className={cn(
            "mt-3 text-xs font-bold uppercase tracking-wider",
            isDark ? "text-white" : "text-black",
          )}
        >
          {card.subtitle}
        </p>

        <p
          className={cn(
            "mt-4 max-w-[240px] flex-1 text-sm leading-relaxed",
            isDark ? "text-white/90" : "text-black/90",
          )}
        >
          {card.description}
        </p>

        {(card.status || card.price) && (
          <div className="flex w-full min-h-[5.5rem] shrink-0 flex-col justify-end pt-4 sm:min-h-[6rem] sm:pt-6">
            {card.status && (
              <p
                className={cn(
                  "font-bold uppercase tracking-[0.2em]",
                  isRestaurant
                    ? "text-[10px] text-white sm:text-[11px]"
                    : "text-xs text-avulus-red",
                )}
              >
                {card.status}
              </p>
            )}
            {card.price && (
              <p className="flex items-baseline justify-center gap-1 text-avulus-red">
                <span className="text-sm font-semibold">{card.price.prefix}</span>
                <span className="text-4xl font-black leading-none sm:text-5xl">
                  {card.price.amount}
                </span>
                <span className="text-sm font-semibold">{card.price.suffix}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="relative mt-auto flex flex-col gap-3 px-6 pb-6 pt-4 sm:px-8">
        {card.ctaPrimary &&
          (isExternalLink ? (
            <ExternalCta href={primaryHref} className={ctaClassName}>
              {card.ctaPrimary}
            </ExternalCta>
          ) : (
            <Link href={primaryHref} className={ctaClassName}>
              {card.ctaPrimary}
            </Link>
          ))}
        {card.ctaSecondary && (
          <Link
            href={card.ctaSecondaryHref ?? "/hotel"}
            className={cn(
              figmaCtaCorners,
              btnOutlineLightInteractive,
              "flex h-[60px] items-center justify-center border-2 border-white bg-transparent text-sm font-medium uppercase text-white",
            )}
          >
            {card.ctaSecondary}
          </Link>
        )}
      </div>
    </article>
  );
}
