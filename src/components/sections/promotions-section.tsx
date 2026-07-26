"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { Container } from "@/components/avulus/container";
import { ExternalCta } from "@/components/ui/external-cta";
import {
  avulusCardShadow,
  avulusButtonShadow,
  btnOutlineLightInteractive,
  figmaCtaCorners,
} from "@/lib/cta-styles";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const PROMOS = [
  {
    image: assets.promoHookah,
    tag: "АКЦИЯ",
    title: "Первое пополнение ×2",
    note: "Впервые в ACS? Пополни баланс, и мы удвоим сумму.",
    hasDetails: false,
  },
  {
    image: assets.promoHookah,
    tag: "АКЦИЯ",
    title: "Кальян + коктейль за 4 500 ₽",
    note: "Готовый сет для вечера в ACS.",
    hasDetails: false,
  },
  {
    image: assets.promoHookah,
    tag: "ПАКЕТ",
    title: "ГОТОВЫЙ ДЕНЬ РОЖДЕНИЯ В SUPER VIP",
    note: "Закрытая премиум VIP с топовыми ПК, едой, напитками и обслуживанием.",
    hasDetails: true,
  },
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
            Специальные предложения
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

        <div className="hidden gap-4 lg:grid lg:grid-cols-3 lg:items-start">
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("flex flex-col w-full", isMobile && "min-w-full shrink-0 snap-start")}>
      <article
        data-promo-card={isMobile ? true : undefined}
        className={cn(
          "group relative overflow-hidden bg-black",
          avulusCardShadow,
          isMobile
            ? "min-h-[420px] border border-white/80"
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
              : "(max-width: 1280px) 50vw, 33vw"
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

      {promo.hasDetails && (
        <>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              figmaCtaCorners,
              avulusButtonShadow,
              "mt-4 flex min-h-[50px] w-full items-center justify-center border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-black",
              btnOutlineLightInteractive
            )}
          >
            <span>{isExpanded ? "Скрыть" : "Подробнее"}</span>
            <ChevronDown className={cn("ml-2 size-4 transition-transform duration-300", isExpanded && "rotate-180")} />
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out border border-white/10 bg-[#0a0a0a] rounded-sm",
              isExpanded ? "max-h-[1200px] opacity-100 p-6 mt-3" : "max-h-0 opacity-0 p-0 mt-0 border-transparent"
            )}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-avulus-red">
              Что входит в пакет:
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>5 часов в Super VIP только для вашей компании</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>топовые игровые компьютеры</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>15 авторских коктейлей или 30 настоек</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>5 пицц</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>2 кальяна</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>обслуживание в течение всего праздника</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>вместительный стол для настольных игр и не только</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-avulus-red font-bold">—</span>
                <span>большой экран и отдельная зона для отдыха</span>
              </li>
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Пять часов праздника без подготовки, чужих людей и организационного бардака. Вы отмечаете день рождения — всё остальное мы берём на себя.
            </p>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5">
              <div className="text-lg font-black uppercase text-white">
                50 000 ₽ <span className="line-through text-sm text-white/40 ml-2 font-normal">81 000 ₽</span>
              </div>
              
              <ExternalCta
                href="https://t.me/AVULUSbot"
                className={cn(
                  figmaCtaCorners,
                  avulusButtonShadow,
                  "flex h-[52px] w-full items-center justify-center bg-avulus-red text-sm font-bold uppercase tracking-wider text-white hover:bg-avulus-red/90 transition-colors"
                )}
              >
                ПОДОБРАТЬ ДАТУ
              </ExternalCta>
            </div>
          </div>
        </>
      )}
    </div>
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
