"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { NavSectionLink } from "@/components/layout/nav-section-link";
import { ExternalCta } from "@/components/ui/external-cta";
import { useDigitalMenuOpen } from "@/contexts/digital-menu-context";
import {
  avulusButtonShadow,
  btnOpacityInteractive,
  figmaCtaCorners,
  linkInteractive,
} from "@/lib/cta-styles";
import { CTAS } from "@/lib/ctas";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

type HeroMobileMenuProps = {
  className?: string;
};

export function HeroMobileMenu({ className }: HeroMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { isOpen: isDigitalMenuOpen } = useDigitalMenuOpen();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (isDigitalMenuOpen) {
      setOpen(false);
    }
  }, [isDigitalMenuOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (isDigitalMenuOpen) {
    return null;
  }

  return (
    <div className={cn("relative lg:hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="hero-mobile-nav"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className={cn("flex size-11 items-center justify-center text-white", linkInteractive)}
      >
        {open ? (
          <X className="size-7" strokeWidth={1.75} aria-hidden />
        ) : (
          <Menu className="size-7" strokeWidth={1.75} aria-hidden />
        )}
      </button>

      {open ? (
        <nav
          id="hero-mobile-nav"
          aria-label="Мобильная навигация"
          className="absolute right-0 top-full z-50 mt-2 min-w-[min(100vw-2.5rem,280px)] rounded-sm border border-white/15 bg-black/95 p-4 shadow-avulus-float backdrop-blur-md"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavSectionLink
                  href={link.href}
                  onClick={close}
                  className="block py-2.5 text-sm font-medium uppercase tracking-wide text-white"
                >
                  {link.label}
                </NavSectionLink>
              </li>
            ))}
          </ul>
          <ExternalCta
            href={CTAS.book.url}
            className={cn(
              figmaCtaCorners,
              avulusButtonShadow,
              btnOpacityInteractive,
              "mt-4 inline-flex h-12 w-full items-center justify-center bg-white text-sm font-bold uppercase tracking-normal text-[#db0032]",
            )}
          >
            {CTAS.book.label}
          </ExternalCta>
        </nav>
      ) : null}
    </div>
  );
}
