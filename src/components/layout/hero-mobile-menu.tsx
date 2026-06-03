"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { NavSectionLink } from "@/components/layout/nav-section-link";
import { ExternalCta } from "@/components/ui/external-cta";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { CTAS } from "@/lib/ctas";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

type HeroMobileMenuProps = {
  className?: string;
};

export function HeroMobileMenu({ className }: HeroMobileMenuProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

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

  return (
    <div className={cn("relative lg:hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="hero-mobile-nav"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="flex size-11 items-center justify-center text-white transition-opacity hover:opacity-70"
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
          className="absolute right-0 top-full z-50 mt-2 min-w-[min(100vw-2.5rem,280px)] rounded-sm border border-white/15 bg-black/95 p-4 shadow-xl backdrop-blur-md"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavSectionLink
                  href={link.href}
                  onClick={close}
                  className="block py-2.5 text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-70"
                >
                  {link.label}
                </NavSectionLink>
              </li>
            ))}
          </ul>
          <ExternalCta
            href={CTAS.langame.url}
            className={cn(
              figmaCtaCorners,
              "mt-4 inline-flex h-12 w-full items-center justify-center bg-white text-sm font-bold uppercase tracking-normal text-[#db0032] transition-opacity hover:opacity-90",
            )}
          >
            {CTAS.langame.label}
          </ExternalCta>
        </nav>
      ) : null}
    </div>
  );
}
