"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { lockBodyScroll } from "@/lib/body-scroll-lock";
import { btnOutlineLightInteractive } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type HotelGalleryProps = {
  main: string;
  thumbs: readonly string[];
  extra: readonly string[];
};

export function HotelGallery({ main, thumbs, extra }: HotelGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [mounted, setMounted] = useState(false);

  const total = extra.length;
  const extraLabel = `+${total} фото`;

  const close = useCallback(() => {
    setIsOpen(false);
    setPage(0);
  }, []);

  const open = useCallback(() => {
    setPage(0);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
      if (event.key === "ArrowRight") setPage((p) => Math.min(total - 1, p + 1));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isOpen, total]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(total - 1, p + 1));

  const thumbCellClass = "relative min-h-0 overflow-hidden";

  return (
    <>
      <div className="grid gap-2 lg:grid-cols-2 lg:gap-2">
        <div className="relative aspect-[668/533] overflow-hidden">
          <Image
            src={main}
            alt="Номер AVULUS HOTEL"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="relative aspect-[668/533] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2">
            {thumbs.map((src, index) => {
              const isMoreTrigger = index === thumbs.length - 1;

              if (isMoreTrigger) {
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={open}
                    className={cn(
                      thumbCellClass,
                      btnOutlineLightInteractive,
                      "size-full",
                    )}
                    aria-label={`Показать ещё ${total} фото`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-medium text-white transition-colors hover:bg-black/60">
                      {extraLabel}
                    </span>
                  </button>
                );
              }

              return (
                <div key={src} className={thumbCellClass}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {mounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-black/95"
              role="dialog"
              aria-modal="true"
              aria-label="Галерея номеров AVULUS HOTEL"
            >
              <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <p className="text-sm font-medium uppercase tracking-wide text-white/80">
                  {page + 1} / {total}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className={cn(
                    btnOutlineLightInteractive,
                    "flex size-11 items-center justify-center rounded-full border border-white/40 text-white",
                  )}
                  aria-label="Закрыть галерею"
                >
                  <X className="size-5" strokeWidth={2} />
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={page === 0}
                  className={cn(
                    btnOutlineLightInteractive,
                    "absolute left-2 z-10 flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white disabled:pointer-events-none disabled:opacity-30 sm:left-4",
                  )}
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="size-5" strokeWidth={2} />
                </button>

                <div className="relative h-full w-full max-h-[min(72vh,820px)] max-w-5xl">
                  {/* eslint-disable-next-line @next/next/no-img-element -- extra gallery includes JPG paths with encoded Cyrillic filenames */}
                  <img
                    src={extra[page]}
                    alt={`Фото номера ${page + 1}`}
                    className="size-full object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={page === total - 1}
                  className={cn(
                    btnOutlineLightInteractive,
                    "absolute right-2 z-10 flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white disabled:pointer-events-none disabled:opacity-30 sm:right-4",
                  )}
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="size-5" strokeWidth={2} />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
