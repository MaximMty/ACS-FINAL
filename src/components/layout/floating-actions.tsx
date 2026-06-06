"use client";

import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { useDigitalMenuOpen } from "@/contexts/digital-menu-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { avulusFloatShadow } from "@/lib/cta-styles";
import { assets } from "@/lib/assets";
import { CTAS } from "@/lib/ctas";
import { CONTACTS } from "@/lib/data";
import { cn } from "@/lib/utils";

function FloatingIcon({ src, alt, compact }: { src: string; alt: string; compact?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size icons in flex buttons
    <img
      src={src}
      alt={alt}
      width={compact ? 32 : 42}
      height={compact ? 32 : 42}
      className={cn(
        "w-auto object-contain",
        compact ? "h-8 max-w-8" : "h-[42px] max-w-[42px]",
      )}
      loading="lazy"
      decoding="async"
    />
  );
}

type ActionButtonProps = {
  href: string;
  label: string;
  compact?: boolean;
  external?: boolean;
  children: React.ReactNode;
};

function ActionButton({
  href,
  label,
  compact,
  external,
  children,
}: ActionButtonProps) {
  const className = cn(
    "avulus-float-btn flex items-center justify-center rounded-full bg-white",
    avulusFloatShadow,
    compact ? "size-11" : "size-[clamp(48px,4.5vw,64px)] lg:size-[clamp(56px,4.86vw,70px)]",
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={label}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isOpen: isDigitalMenuOpen } = useDigitalMenuOpen();

  const close = useCallback(() => setExpanded(false), []);
  const toggle = useCallback(() => setExpanded((value) => !value), []);

  if (isDigitalMenuOpen) {
    return null;
  }

  const showActions = isDesktop || expanded;

  return (
    <aside
      className={cn(
        "fixed z-40 flex flex-col items-end gap-2",
        "max-lg:right-[max(20px,env(safe-area-inset-right))]",
        "lg:right-[max(10px,env(safe-area-inset-right))]",
        "max-lg:bottom-[max(24px,env(safe-area-inset-bottom))]",
        "lg:bottom-[max(env(safe-area-inset-bottom),calc(var(--feature-height,97px)+clamp(12px,2vh,24px)))]",
      )}
      aria-label="Быстрые действия"
    >
      <div
        className={cn(
          "flex flex-col items-end gap-2 transition-[opacity,transform] duration-200 ease-out",
          showActions
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
        aria-hidden={!showActions}
      >
        <ActionButton
          href={CONTACTS.phoneHref}
          label={CTAS.phone.label}
          compact={!isDesktop}
        >
          <FloatingIcon src={assets.iconPhone} alt="" compact={!isDesktop} />
        </ActionButton>

        <ActionButton
          href={CONTACTS.telegramUrl}
          label={CTAS.telegram.labelShort}
          compact={!isDesktop}
          external
        >
          <FloatingIcon src={assets.iconTelegram} alt="" compact={!isDesktop} />
        </ActionButton>
      </div>

      {!isDesktop ? (
        <button
          type="button"
          onClick={showActions ? close : toggle}
          className={cn(
            "avulus-float-btn flex size-11 items-center justify-center rounded-full bg-white text-avulus-red",
            avulusFloatShadow,
          )}
          aria-expanded={showActions}
          aria-label={
            showActions ? "Скрыть быстрые действия" : "Показать звонок и Telegram"
          }
        >
          {showActions ? (
            <X className="size-5" strokeWidth={2} aria-hidden />
          ) : (
            <MessageCircle className="size-5" strokeWidth={2} aria-hidden />
          )}
        </button>
      ) : null}
    </aside>
  );
}
