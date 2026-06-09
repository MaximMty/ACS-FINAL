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

type LightboxState = {
  images: readonly string[];
  page: number;
};

export function HotelGallery({ main, thumbs, extra }: HotelGalleryProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [mounted, setMounted] = useState(false);

  const extraTotal = extra.length;
  const extraLabel = `+${extraTotal} фото`;
  const isCarousel = lightbox !== null && lightbox.images.length > 1;
  const page = lightbox?.page ?? 0;
  const total = lightbox?.images.length ?? 0;

  const close = useCallback(() => {
    setLightbox(null);
  }, []);

  const openSingle = useCallback((src: string) => {
    setLightbox({ images: [src], page: 0 });
  }, []);

  const openCarousel = useCallback(() => {
    setLightbox({ images: extra, page: 0 });
  }, [extra]);

  const setPage = useCallback((next: number | ((current: number) => number)) => {
    setLightbox((current) => {
      if (!current) return current;

      const pageValue =
        typeof next === "function" ? next(current.page) : next;

      return {
        ...current,
        page: Math.max(0, Math.min(current.images.length - 1, pageValue)),
      };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    return lockBodyScroll();
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox || !isCarousel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") setPage((p) => p - 1);
      if (event.key === "ArrowRight") setPage((p) => p + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isCarousel, lightbox, setPage]);

  useEffect(() => {
    if (!lightbox || isCarousel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isCarousel, lightbox]);

  const goPrev = () => setPage((p) => p - 1);
  const goNext = () => setPage((p) => p + 1);

  const thumbCellClass = "relative min-h-0 overflow-hidden";
  const imageButtonClass = cn(
    thumbCellClass,
    btnOutlineLightInteractive,
    "size-full",
  );

  return (
    <>
      <div className="grid gap-2 lg:grid-cols-2 lg:gap-2">
        <button
          type="button"
          onClick={() => openSingle(main)}
          className={cn(imageButtonClass, "relative aspect-[668/533]")}
          aria-label="Открыть фото номера"
        >
          <Image
            src={main}
            alt="Номер AVULUS HOTEL"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </button>

        <div className="relative aspect-[668/533] overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2">
            {thumbs.map((src, index) => {
              const isMoreTrigger = index === thumbs.length - 1;

              if (isMoreTrigger) {
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={openCarousel}
                    className={imageButtonClass}
                    aria-label={`Показать ещё ${extraTotal} фото`}
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
                <button
                  key={src}
                  type="button"
                  onClick={() => openSingle(src)}
                  className={imageButtonClass}
                  aria-label="Открыть фото номера"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {mounted && lightbox
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-black/95"
              role="dialog"
              aria-modal="true"
              aria-label="Галерея номеров AVULUS HOTEL"
            >
              <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
                {isCarousel ? (
                  <p className="text-sm font-medium uppercase tracking-wide text-white/80">
                    {page + 1} / {total}
                  </p>
                ) : (
                  <span aria-hidden="true" />
                )}
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
                {isCarousel ? (
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
                ) : null}

                <div className="relative h-full w-full max-h-[min(72vh,820px)] max-w-5xl">
                  {/* eslint-disable-next-line @next/next/no-img-element -- gallery includes JPG paths with encoded Cyrillic filenames */}
                  <img
                    src={lightbox.images[page]}
                    alt="Фото номера AVULUS HOTEL"
                    className="size-full object-contain"
                  />
                </div>

                {isCarousel ? (
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
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
