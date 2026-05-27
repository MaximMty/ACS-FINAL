import Image from "next/image";
import { Container } from "@/components/avulus/container";
import { assets } from "@/lib/assets";
import { ROOM_PROMO } from "@/lib/data";

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

export function PromotionsSection() {
  return (
    <section id="promotions" className="bg-avulus-black py-14 lg:py-20">
      <Container>
        <h2 className="mb-10 text-3xl font-black uppercase text-white sm:text-4xl">
          Акции
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROMOS.map((promo, i) => (
            <article
              key={i}
              className="group relative min-h-[632px] overflow-hidden bg-[#111]"
            >
              <Image
                src={promo.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1280px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-widest text-white/70">
                  {promo.tag}
                </p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-white">
                  {promo.title}
                </h3>
                {promo.note && (
                  <p className="mt-3 text-sm text-white/70">{promo.note}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
