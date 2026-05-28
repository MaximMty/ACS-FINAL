"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/avulus/container";
import { assets } from "@/lib/assets";
import { ROOM_CARDS, ROOM_PROMO, type RoomCard } from "@/lib/data";
import { bookButtonFullClass } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const patternStyle = {
  backgroundImage: `url(${assets.rooms.pattern})`,
} as const;

export function RoomsSection() {
  return (
    <section
      id="rooms"
      className="relative overflow-hidden bg-black py-14 lg:py-20"
    >
      <SectionPattern />

      <Container className="relative">
        <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:mb-10 sm:text-4xl lg:text-[51px] lg:leading-none">
          Выбирай свою комнату
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ROOM_CARDS.map((room) => (
            <RoomCardItem key={room.id} room={room} />
          ))}
          <PromoCard />
        </div>
      </Container>
    </section>
  );
}

function SectionPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[length:140%] bg-center opacity-[0.28] mix-blend-screen hue-rotate-[95deg] saturate-[1.4]"
      style={patternStyle}
    />
  );
}

function RoomCardItem({ room }: { room: RoomCard }) {
  const [index, setIndex] = useState(0);
  const images = room.images.length > 0 ? room.images : [assets.rooms.private];
  const activeImage = images[index % images.length]!;

  const goPrev = () =>
    setIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () => setIndex((current) => (current + 1) % images.length);

  return (
    <article className="flex flex-col border border-white/80 bg-black">
      <div className="relative aspect-[433/278] w-full shrink-0 overflow-hidden bg-black">
        <Image
          src={activeImage}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 433px"
          loading="lazy"
          fetchPriority="low"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            <CarouselButton onClick={goPrev} aria-label="Предыдущее фото">
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </CarouselButton>
            <CarouselButton onClick={goNext} aria-label="Следующее фото">
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </CarouselButton>
          </div>
        )}
      </div>

      <div
        className="relative flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6"
        style={patternStyle}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[length:160%] bg-center opacity-40 mix-blend-screen"
          style={patternStyle}
        />

        <div className="relative flex flex-1 flex-col">
          <h3 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
            {room.name}
          </h3>

          <ul className="mt-4 space-y-2 text-xs font-medium uppercase leading-snug text-white sm:text-sm">
            <SpecRow icon={assets.iconMonitor} label={room.specs.monitor} />
            <SpecRow icon={assets.iconGpu} label={room.specs.gpu} />
            <SpecRow icon={assets.iconCpu} label={room.specs.cpu} />
          </ul>

          <p className="mt-6 flex items-baseline gap-2 text-white">
            <span className="text-sm font-semibold uppercase">
              {room.price.prefix}
            </span>
            <span className="text-3xl font-black leading-none sm:text-4xl">
              {room.price.amount}
            </span>
            <span className="text-sm font-semibold uppercase">
              {room.price.suffix}
            </span>
          </p>

          <Link href="#book" className={cn(bookButtonFullClass, "mt-4")}>
            Забронировать
          </Link>
        </div>
      </div>
    </article>
  );
}

function PromoCard() {
  return (
    <article className="relative flex min-h-[585px] flex-col overflow-hidden border border-white/80 bg-black">
      <Image
        src={assets.promoHookah}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 50vw, 433px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="relative mt-auto p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-avulus-red">
          {ROOM_PROMO.tag}
        </p>
        <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          {ROOM_PROMO.title}
        </h3>
        <p className="mt-3 max-w-[360px] text-sm leading-relaxed text-white/80">
          {ROOM_PROMO.note}
        </p>
      </div>
    </article>
  );
}

function SpecRow({ icon, label }: { icon: string; label: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="relative mt-0.5 size-5 shrink-0">
        <Image src={icon} alt="" fill sizes="20px" className="object-contain" />
      </span>
      <span>{label}</span>
    </li>
  );
}

function CarouselButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "flex size-[50px] items-center justify-center border border-white/80 bg-black/60 text-white backdrop-blur-[2px] transition-colors hover:bg-black/80",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
