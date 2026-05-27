import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft } from "lucide-react";

import { Container } from "@/components/avulus/container";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactsSection } from "@/components/sections/contacts-section";
import { assets } from "@/lib/assets";
import { bookButtonFullClass } from "@/lib/cta-styles";
import {
  CONTACTS,
  HOTEL_DESCRIPTION,
  HOTEL_LOCATION,
  HOTEL_SERVICES,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HotelPage() {
  return (
    <>
      <SiteHeader variant="solid" logoSuffix="ОТЕЛЬ" />
      <FloatingActions />

      <main className="bg-avulus-black pt-8">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm uppercase text-white/80 hover:text-white"
            >
              <ChevronLeft className="size-4" />
              Назад
            </Link>
            <p className="flex items-baseline gap-2 text-white">
              <span className="text-sm font-medium uppercase">от</span>
              <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-black text-avulus-red">299₽</span>
              <span className="text-sm font-medium uppercase text-white/70">/ час</span>
            </p>
          </div>

          <p className="mb-8 text-sm text-white/70">{CONTACTS.address}</p>

          {/* Gallery */}
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="relative aspect-[668/533] overflow-hidden lg:col-span-7">
              <Image
                src={assets.hotelGallery.main}
                alt="Номер AVULUS HOTEL"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized
              />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
              {assets.hotelGallery.thumbs.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[325/256] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    unoptimized
                  />
                  {i === 3 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-medium text-white">
                      +15 фото
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-4 text-sm leading-relaxed text-white/80 lg:col-span-5">
              {HOTEL_DESCRIPTION.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-6 lg:col-span-3">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                услуги
              </h3>
              <ul className="space-y-3">
                {HOTEL_SERVICES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-avulus-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/5 p-6 lg:col-span-4">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                локация
              </h3>
              <ul className="space-y-3">
                {HOTEL_LOCATION.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-avulus-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        {/* Room picker */}
        <section className="mt-16 bg-avulus-red py-14 lg:py-20">
          <Container>
            <h2 className="mb-10 text-3xl font-black uppercase text-white sm:text-4xl">
              выбирайте свой номер
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { image: assets.roomPrivate },
                { image: assets.hotelPrivate },
              ].map(({ image }, n) => (
                <article
                  key={n}
                  className="overflow-hidden bg-white text-black"
                >
                  <div className="relative aspect-[670/400]">
                    <Image
                      src={image}
                      alt="PRIVATE"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-4xl font-black uppercase">PRIVATE</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/70">
                      В номерах в Salute Premium Hotel &amp; Spa установлен
                      кондиционер, сейф и телевизор с плоским экраном. Среди
                      прочих удобств — письменный стол, чайник, холодильник и
                      мини-бар, а также собственная ванная комната.
                    </p>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="text-sm font-medium uppercase text-black/60">от</span>
                      <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-black text-avulus-red">8500₽</span>
                      <span className="text-sm font-medium uppercase text-black/60">/ сутки</span>
                    </p>
                    <Link
                      href="#book"
                      className={cn(bookButtonFullClass, "mt-6 text-sm")}
                    >
                      Забронировать
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <ContactsSection />
      </main>
    </>
  );
}
