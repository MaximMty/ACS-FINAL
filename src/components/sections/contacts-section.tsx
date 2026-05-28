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
        <h2 className="mb-10 text-3xl font-black uppercase text-white sm:text-4xl">
          контакты
        </h2>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <CustomYandexMap
            embedUrl={CONTACTS.mapEmbedUrl}
            className="mx-auto w-full lg:mx-0"
          />

          <div className="flex flex-col justify-center lg:pt-2">
            <a
              href={phoneHref}
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white"
            >
              {CONTACTS.phone}
            </a>

            <p className="mt-5 max-w-md text-sm font-medium uppercase leading-snug tracking-wide text-white sm:text-[15px]">
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

            <p className="mt-3 text-sm font-medium uppercase tracking-wide text-avulus-red">
              {CONTACTS.hours}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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
