import Link from "next/link";

import { assets } from "@/lib/assets";
import { CONTACTS } from "@/lib/data";

function FloatingIcon({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size icons in flex buttons; avoids Next Image aspect warnings
    <img
      src={src}
      alt={alt}
      width={42}
      height={42}
      className="h-[42px] w-auto max-w-[42px] object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

export function FloatingActions() {
  return (
    <aside
      className="fixed right-[clamp(10px,2.5vw,40px)] z-40 flex flex-col gap-3"
      style={{
        bottom:
          "max(env(safe-area-inset-bottom), calc(var(--feature-height, 97px) + clamp(16px, 3vh, 32px)))",
      }}
      aria-label="Быстрые действия"
    >
      <Link
        href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}
        className="flex size-[clamp(56px,4.86vw,70px)] items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
        aria-label="Позвонить"
      >
        <FloatingIcon src={assets.iconPhone} alt="" />
      </Link>
      <Link
        href={CONTACTS.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-[clamp(56px,4.86vw,70px)] items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
        aria-label="Telegram"
      >
        <FloatingIcon src={assets.iconTelegram} alt="" />
      </Link>
    </aside>
  );
}
