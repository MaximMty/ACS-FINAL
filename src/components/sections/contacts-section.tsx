import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/avulus/container";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { CustomYandexMap } from "@/components/maps/custom-yandex-map";
import { assets } from "@/lib/assets";
import { ExternalCta } from "@/components/ui/external-cta";
import { CTAS } from "@/lib/ctas";
import { CONTACTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ContactsSection() {
  const routeHref = CONTACTS.mapRouteUrl;
  const phoneHref = CONTACTS.phoneHref;
  const currentYear = new Date().getFullYear();

  return (
    <section id="contacts" className="bg-black py-14 lg:py-20">
      <Container>
        <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:mb-10 sm:text-4xl lg:mb-10">
          контакты
        </h2>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="order-1 flex flex-col lg:order-2 lg:justify-center lg:pt-2">
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

            <Link
              href={routeHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                figmaCtaCorners,
                "mt-8 flex h-[60px] w-full items-center justify-center",
                "border border-white bg-transparent",
                "text-[21px] font-medium uppercase leading-none text-white",
                "transition-colors hover:bg-white/10",
                "lg:hidden",
              )}
            >
              {CONTACTS.routeLabel}
            </Link>

            <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
              <ExternalCta
                href={CONTACTS.telegramUrl}
                className={cn(
                  figmaCtaCorners,
                  "inline-flex h-[52px] min-w-[200px] items-center justify-center bg-avulus-red px-6 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-avulus-red-dark sm:text-sm",
                )}
              >
                {CTAS.telegram.label}
              </ExternalCta>
              <ExternalCta
                href={phoneHref}
                className={cn(
                  figmaCtaCorners,
                  "inline-flex h-[52px] min-w-[160px] items-center justify-center border border-white px-6 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black sm:text-sm",
                )}
              >
                {CTAS.phone.label}
              </ExternalCta>
              <Link
                href={routeHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  figmaCtaCorners,
                  "inline-flex h-[52px] min-w-[200px] items-center justify-center border border-white/50 px-6 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10 sm:text-sm",
                )}
              >
                {CONTACTS.routeLabel}
              </Link>
            </div>
          </div>

          <CustomYandexMap
            embedUrl={CONTACTS.mapEmbedUrl}
            className={cn(
              "order-2 mx-auto w-full lg:order-1 lg:mx-0",
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
              className="text-white transition-opacity hover:opacity-70"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/public-offer"
              className="text-white transition-opacity hover:opacity-70"
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
