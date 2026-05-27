import Image from "next/image";

import { RestaurantMenuActions } from "@/components/menu/restaurant-menu-actions";
import { assets } from "@/lib/assets";

const TICKER_PHRASE = "КРУГЛОСУТОЧНО   БЕЗ ВЫХОДНЫХ   ";

function RestaurantTicker() {
  const track = (
    <div className="flex shrink-0">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="shrink-0 px-8 text-[13px] font-bold uppercase tracking-[0.18em] text-white sm:text-sm"
        >
          {TICKER_PHRASE}
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="overflow-hidden border-t border-white/10 bg-black py-3.5"
    >
      <div className="flex w-max animate-restaurant-marquee">{track}</div>
    </div>
  );
}

export function RestaurantSection() {
  return (
    <section id="restaurant" className="bg-black">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={assets.restaurantFood}
            alt=""
            fill
            className="object-cover object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            fetchPriority="low"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[min(78%,560px)] bg-gradient-to-b from-black/55 via-[#1a0812]/25 to-transparent backdrop-blur-[2px]"
          />

          <div className="absolute inset-x-0 top-0 z-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black uppercase leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Ресторан и бар
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-[15px]">
              Открыт всегда. Можно просто зайти и вкусно провести время. Или
              можно заказать любое блюдо или напиток прямо в комнату.
            </p>
            <RestaurantMenuActions className="mt-8" />
          </div>
        </div>

        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={assets.restaurantDrink}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            fetchPriority="low"
          />
        </div>
      </div>

      <RestaurantTicker />
    </section>
  );
}
