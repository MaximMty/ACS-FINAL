import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/avulus/container";
import { NavSectionLink } from "@/components/layout/nav-section-link";
import { assets } from "@/lib/assets";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  variant?: "hero" | "solid";
  logoSuffix?: string;
};

export function SiteHeader({
  variant = "hero",
  logoSuffix,
}: SiteHeaderProps) {
  return (
    <header
      className={
        variant === "hero"
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-white/10 bg-avulus-black"
      }
    >
      <Container className="flex h-[103px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {logoSuffix ? (
            <>
              <div className="relative hidden h-[34px] w-[180px] sm:block">
                <Image
                  src={assets.heroAvulus}
                  alt="AVULUS"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              {/* mobile: compact logo emblem */}
              <Image
                src={assets.logo}
                alt="AVULUS"
                width={48}
                height={48}
                className="size-12 object-contain sm:hidden"
                priority
              />
              <span className="text-sm font-medium uppercase tracking-wide text-white/90">
                {logoSuffix}
              </span>
            </>
          ) : (
            <Image
              src={assets.logo}
              alt="AVULUS"
              width={103}
              height={103}
              className="size-[72px] object-contain sm:size-[103px]"
              priority
            />
          )}
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(12px,2.5vw,40px)] lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavSectionLink
              key={link.href}
              href={link.href}
              className="shrink-0 text-[clamp(13px,1.46vw,21px)] font-medium uppercase leading-6 tracking-normal text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </NavSectionLink>
          ))}
        </nav>

        <NavSectionLink
          href="/#book"
          className={cn(
            figmaCtaCorners,
            "inline-flex shrink-0 items-center justify-center uppercase leading-none transition-opacity hover:opacity-90",
            variant === "hero"
              ? "h-[clamp(48px,4.17vw,60px)] w-[clamp(140px,18.6vw,268px)] bg-white px-4 text-[clamp(12px,1.46vw,21px)] font-bold tracking-normal text-[#db0032]"
              : "h-[60px] w-[268px] bg-avulus-red text-[21px] font-medium text-white transition-colors hover:bg-avulus-red-dark max-lg:h-[48px] max-lg:w-[140px] max-lg:text-xs",
          )}
        >
          Забронировать
        </NavSectionLink>
      </Container>
    </header>
  );
}
