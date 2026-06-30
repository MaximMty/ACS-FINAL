import Image from "next/image";
import { Check } from "lucide-react";

import { Container } from "@/components/avulus/container";
import { ExternalCta } from "@/components/ui/external-cta";
import { HotelGallery } from "@/components/hotel/hotel-gallery";
import { FloatingActions } from "@/components/layout/floating-actions";
import { HotelHeader, HotelPageIntro } from "@/components/layout/hotel-header";
import { BookingSection } from "@/components/sections/booking-section";
import { ContactsSection } from "@/components/sections/contacts-section";
import { assets } from "@/lib/assets";
import { CTAS } from "@/lib/ctas";
import { avulusCardShadow, bookButtonFullClass } from "@/lib/cta-styles";
import {
  HOTEL_DESCRIPTION,
  HOTEL_LOCATION,
  HOTEL_PRICE_DISCLAIMER,
  HOTEL_ROOM_CARDS,
  HOTEL_SPACE,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export default function HotelPage() {
  return (
    <>
      <HotelHeader />
      <FloatingActions />

      <main className="bg-black">
        <HotelPageIntro />
        <Container className="bg-black">
          <HotelGallery
            main={assets.hotelGallery.main}
            thumbs={assets.hotelGallery.thumbs}
            extra={assets.hotelGallery.extra}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-4 text-sm leading-relaxed text-white/80 lg:col-span-5">
              {HOTEL_DESCRIPTION.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <div
              className={cn(
                "rounded-sm border border-white/10 bg-white/5 p-6 lg:col-span-3",
                avulusCardShadow,
              )}
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                пространство
              </h3>
              <ul className="space-y-3">
                {HOTEL_SPACE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-avulus-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "rounded-sm border border-white/10 bg-white/5 p-6 lg:col-span-4",
                avulusCardShadow,
              )}
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                расположение
              </h3>
              <ul className="space-y-3">
                {HOTEL_LOCATION.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
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
              {HOTEL_ROOM_CARDS.map((room, index) => {
                const image =
                  index === 0
                    ? assets.hotelGallery.main
                    : assets.hotelGallery.thumbs[1];

                return (
                  <article
                    key={room.id}
                    className={cn(
                      "flex flex-col overflow-hidden bg-white text-black",
                      avulusCardShadow,
                    )}
                  >
                    <div className="relative aspect-[670/400] shrink-0">
                      <Image
                        src={image}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="text-4xl font-black uppercase">
                        {room.name}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/70">
                        {room.description}
                      </p>
                      <div className="mt-auto pt-6">
                        <p className="flex items-baseline gap-2">
                          <span className="text-sm font-medium uppercase text-black/60">
                            от
                          </span>
                          <span className="relative inline-block text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-none text-avulus-red">
                            {room.priceAmount}
                            {room.priceFootnote ? (
                              <sup className="absolute -right-3 -top-0.5 text-[0.5em] font-bold leading-none">
                                *
                              </sup>
                            ) : null}
                          </span>
                          <span className="text-sm font-medium uppercase text-black/60">
                            / сутки
                          </span>
                        </p>
                        <ExternalCta
                          href={CTAS.hotelBook.url}
                          className={cn(bookButtonFullClass, "mt-6 text-sm")}
                        >
                          {CTAS.hotelBook.label}
                        </ExternalCta>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-white/70">{HOTEL_PRICE_DISCLAIMER}</p>
          </Container>
        </section>

        <BookingSection
          rooms={HOTEL_ROOM_CARDS.map((room) => ({
            id: room.id,
            name: room.name,
          }))}
          title="бронирование номера"
          subtitle="Выберите номер, дату и время. Мы подтвердим бронь по телефону или в Telegram."
          telegramBotUrl={CTAS.hotelBook.url}
        />

        <ContactsSection />
      </main>
    </>
  );
}
