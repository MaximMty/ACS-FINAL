"use client";

import Image from "next/image";

import { Container } from "@/components/avulus/container";
import { HeroMobileMenu } from "@/components/layout/hero-mobile-menu";
import { LogoHomeLink } from "@/components/layout/logo-home-link";
import { NavSectionLink } from "@/components/layout/nav-section-link";
import { assets } from "@/lib/assets";
import {
  avulusButtonShadow,
  btnFilledInteractive,
  btnOpacityInteractive,
  figmaCtaCorners,
} from "@/lib/cta-styles";
import { ExternalCta } from "@/components/ui/external-cta";
import { CTAS } from "@/lib/ctas";
import { NAV_LINKS } from "@/lib/data";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  variant?: "hero" | "solid";
  logoSuffix?: string;
};

export function SiteHeader({
  variant = "hero",
  logoSuffix,
}: SiteHeaderProps) {
  const { isPastThreshold, isVisible } = useScrollDirection();

  const isHero = variant === "hero";
  const isSolid = variant === "solid";
  const showBackground = isSolid || (isHero && isPastThreshold);

  const backgroundClass = isSolid
    ? "border-b border-white/10 bg-avulus-black"
    : showBackground
      ? "bg-avulus-black/95 backdrop-blur-sm"
      : "bg-transparent";

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out",
        isHero ? "fixed" : "sticky",
        !isVisible && isPastThreshold && "-translate-y-full",
        backgroundClass,
      )}
    >
      <Container className="flex h-[clamp(72px,7.15vw,103px)] items-center justify-between gap-4 lg:gap-6">
        <LogoHomeLink className="flex shrink-0 items-center gap-3">
          <Image
            src={assets.logo}
            alt="AVULUS"
            width={103}
            height={103}
            className="size-[72px] object-contain sm:size-[103px]"
            priority
          />
          {logoSuffix ? (
            <span className="text-sm font-medium uppercase tracking-wide text-white/90">
              {logoSuffix}
            </span>
          ) : null}
        </LogoHomeLink>

        <nav
          aria-label="Основная навигация"
          className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(12px,2.5vw,40px)] lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavSectionLink
              key={link.href}
              href={link.href}
              className="shrink-0 text-[clamp(13px,1.46vw,21px)] font-medium uppercase leading-6 tracking-normal text-white"
            >
              {link.label}
            </NavSectionLink>
          ))}
        </nav>

        {variant === "hero" ? <HeroMobileMenu /> : null}

        <ExternalCta
          href={CTAS.book.url}
          className={cn(
            figmaCtaCorners,
            avulusButtonShadow,
            variant === "hero" ? btnOpacityInteractive : btnFilledInteractive,
            "inline-flex shrink-0 items-center justify-center uppercase leading-none",
            variant === "hero"
              ? "hidden h-[clamp(48px,4.17vw,60px)] w-[clamp(140px,18.6vw,268px)] bg-white px-4 text-[clamp(12px,1.46vw,21px)] font-bold tracking-normal text-[#db0032] lg:inline-flex"
              : "h-[60px] w-[268px] bg-avulus-red text-[21px] font-medium text-white max-lg:h-[48px] max-lg:w-[140px] max-lg:text-xs",
          )}
        >
          {CTAS.book.label}
        </ExternalCta>
      </Container>
    </header>
  );
}
