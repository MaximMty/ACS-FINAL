import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container } from "@/components/avulus/container";
import {
  avulusButtonShadow,
  avulusCardShadow,
  btnFilledInteractive,
  btnOutlineLightInteractive,
  figmaCtaCorners,
  linkInteractive,
} from "@/lib/cta-styles";
import { CustomYandexMap } from "@/components/maps/custom-yandex-map";
import { assets } from "@/lib/assets";
import { ExternalCta } from "@/components/ui/external-cta";
import { CTAS } from "@/lib/ctas";
import { CONTACTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const contactButtonBase = cn(
  figmaCtaCorners,
  avulusButtonShadow,
  "flex w-full items-center justify-center px-4 text-center text-xs font-medium uppercase leading-tight tracking-wide sm:text-[13px]",
);

const contactButtonClass = cn(contactButtonBase, "h-[56px]");

export function ContactsSection() {
  const routeHref = CONTACTS.mapRouteUrl;
  const phoneHref = CONTACTS.phoneHref;
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contacts"
      className="scroll-mt-[clamp(72px,7.15vw,103px)] bg-black py-14 lg:py-20"
    >
      <Container>
        <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:mb-10 sm:text-4xl lg:mb-10">
          контакты
        </h2>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="order-1 flex flex-col lg:order-2 lg:justify-center">
            <a
              href={phoneHref}
              className="text-[clamp(2rem,9vw,2.75rem)] font-bold leading-none text-white lg:text-[clamp(1.75rem,4vw,2.75rem)] lg:leading-tight"
            >
              {CONTACTS.phone}
            </a>

            <p
              className={cn(
                "mt-5 max-w-md text-sm font-medium uppercase leading-snug tracking-wide text-white",
                "sm:text-[15px]",
              )}
            >
              {CONTACTS.address}
            </p>

            <ul className="mt-4 space-y-2">
              {CONTACTS.locationHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium uppercase tracking-wide text-white/90"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-avulus-red"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2.5">
              <Image
                src={assets.iconParking}
                alt=""
                aria-hidden
                width={22}
                height={22}
                className="size-[22px] shrink-0"
              />
              <p className="text-sm font-medium uppercase tracking-wide text-white">
                {CONTACTS.parking}
              </p>
            </div>

            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-avulus-red">
              {CONTACTS.hours}
            </p>

            <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              <ExternalCta
                href={CONTACTS.telegramUrl}
                className={cn(
                  contactButtonClass,
                  btnFilledInteractive,
                  "bg-avulus-red text-white",
                )}
              >
                {CTAS.telegram.botLabel}
              </ExternalCta>
              <Link
                href={routeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  contactButtonClass,
                  btnFilledInteractive,
                  "border border-white/20 bg-white/10 text-white",
                )}
              >
                {CONTACTS.placeReviewsLabel}
              </Link>
              <ExternalCta
                href={phoneHref}
                className={cn(
                  contactButtonClass,
                  btnOutlineLightInteractive,
                  "hidden border border-white bg-transparent text-white lg:flex",
                )}
              >
                {CTAS.phone.label}
              </ExternalCta>
              <Link
                href={routeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  contactButtonClass,
                  btnOutlineLightInteractive,
                  "border border-white/50 bg-transparent text-white sm:col-span-2 lg:col-span-1",
                )}
              >
                {CONTACTS.routeLabel}
              </Link>
            </div>
          </div>

          <CustomYandexMap
            embedUrl={CONTACTS.mapEmbedUrl}
            placeUrl={CONTACTS.mapRouteUrl}
            placeButtonLabel={CONTACTS.placeReviewsLabel}
            placeName={CONTACTS.placeName}
            placeAddress={CONTACTS.address}
            placeHours={CONTACTS.hours}
            geocodeQuery={CONTACTS.mapGeocodeQuery}
            className={cn(
              avulusCardShadow,
              "order-2 mx-auto w-full lg:order-1 lg:mx-0 lg:h-full lg:min-h-0",
              "max-lg:-mx-5 max-lg:max-w-none max-lg:w-[calc(100%+2.5rem)]",
              "sm:max-lg:-mx-8 sm:max-lg:w-[calc(100%+4rem)]",
              "max-lg:min-h-[420px] max-lg:h-[min(75vw,520px)]",
            )}
          />
        </div>

        <footer className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className={cn("text-white", linkInteractive)}
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/public-offer"
              className={cn("text-white", linkInteractive)}
            >
              Публичная оферта
            </Link>
          </div>
          <p className="text-white sm:text-right">© {currentYear} Avulus</p>
        </footer>
      </Container>
    </section>
  );
}
