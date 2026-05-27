"use client";

import { Oswald } from "next/font/google";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const ZOOM_SCALE = 2.5;
const SWIPE_THRESHOLD = 48;
const DRAG_THRESHOLD = 6;

type DigitalMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: readonly string[];
  imageBackgroundColor: string;
};

export function DigitalMenuModal({
  isOpen,
  onClose,
  images,
  imageBackgroundColor,
}: DigitalMenuModalProps) {
  const [page, setPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showZoomHint, setShowZoomHint] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [slideEnabled, setSlideEnabled] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const swipeRef = useRef<{ startX: number; startY: number } | null>(null);

  const total = images.length;
  const isFirst = page === 0;
  const isLast = page === total - 1;

  const resetView = useCallback(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    panRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setPage(0);
    resetView();
    setShowZoomHint(true);
    setSlideEnabled(false);
  }, [isOpen, resetView]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const goToPage = useCallback(
    (next: number) => {
      if (next === page || next < 0 || next >= total) return;
      setSlideDirection(next > page ? 1 : -1);
      setSlideEnabled(true);
      resetView();
      setPage(next);
    },
    [page, resetView, total],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (isZoomed) return;
      if (event.key === "ArrowLeft" && page > 0) {
        event.preventDefault();
        goToPage(page - 1);
      }
      if (event.key === "ArrowRight" && page < total - 1) {
        event.preventDefault();
        goToPage(page + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToPage, isOpen, isZoomed, onClose, page, total]);

  const clampPan = useCallback((x: number, y: number) => {
    const el = viewportRef.current;
    if (!el) return { x, y };
    const maxX = (el.clientWidth * (ZOOM_SCALE - 1)) / 2;
    const maxY = (el.clientHeight * (ZOOM_SCALE - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  const applyPan = useCallback(
    (x: number, y: number) => {
      const next = clampPan(x, y);
      panRef.current = next;
      setPan(next);
    },
    [clampPan],
  );

  const handleImageClick = useCallback(() => {
    if (dragRef.current?.moved) return;
    if (isZoomed) {
      resetView();
    } else {
      setIsZoomed(true);
      setShowZoomHint(false);
    }
  }, [isZoomed, resetView]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (!isZoomed) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      dragRef.current = {
        active: true,
        moved: false,
        startX: event.clientX,
        startY: event.clientY,
        originX: panRef.current.x,
        originY: panRef.current.y,
      };
    },
    [isZoomed],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag?.active) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (
        !drag.moved &&
        Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD
      ) {
        drag.moved = true;
      }
      applyPan(drag.originX + dx, drag.originY + dy);
    },
    [applyPan],
  );

  const onPointerUp = useCallback(() => {
    if (dragRef.current) dragRef.current.active = false;
    setIsDragging(false);
  }, []);

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (isZoomed) return;
      const touch = event.touches[0];
      swipeRef.current = { startX: touch.clientX, startY: touch.clientY };
    },
    [isZoomed],
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (isZoomed || !swipeRef.current) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - swipeRef.current.startX;
      const dy = touch.clientY - swipeRef.current.startY;
      swipeRef.current = null;
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0 && !isLast) goToPage(page + 1);
      if (dx > 0 && !isFirst) goToPage(page - 1);
    },
    [goToPage, isFirst, isLast, isZoomed, page],
  );

  if (!isOpen || total === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col p-0 sm:p-3 md:p-5"
      role="dialog"
      aria-modal={true}
      aria-label="Digital menu"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden",
          "rounded-2xl border border-white/10 bg-[#0c0c0c]/95 shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-300",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header
          className={cn(
            "flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6",
            oswald.className,
          )}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">
            {page + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </header>

        <div
          className="relative flex min-h-0 flex-1 items-stretch"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <NavArrow
            direction="prev"
            disabled={isFirst}
            onClick={() => goToPage(page - 1)}
          />

          <div
            ref={viewportRef}
            className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
          >
            {!isZoomed && showZoomHint && (
              <p
                className={cn(
                  "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2",
                  "animate-bounce rounded-full bg-black/60 px-4 py-1.5 text-xs uppercase tracking-wider text-white/90",
                  "md:hidden",
                  oswald.className,
                )}
              >
                Tap to zoom
              </p>
            )}

            <div
              className="flex h-full w-full items-center justify-center p-3 sm:p-5 md:p-6"
              style={{ backgroundColor: imageBackgroundColor }}
            >
              <div
                key={page}
                className={cn(
                  "relative h-full w-full max-h-full max-w-full touch-none",
                  isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
                  slideEnabled &&
                    !isZoomed &&
                    (slideDirection === 1
                      ? "animate-menu-slide-next"
                      : "animate-menu-slide-prev"),
                )}
                style={{
                  transform: isZoomed
                    ? `translate(${pan.x}px, ${pan.y}px) scale(${ZOOM_SCALE})`
                    : undefined,
                  transition: isDragging ? "none" : "transform 0.25s ease-out",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onClick={handleImageClick}
              >
                <Image
                  src={images[page]}
                  alt={`Menu page ${page + 1} of ${total}`}
                  fill
                  className="object-contain select-none"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  unoptimized
                  draggable={false}
                  priority={page === 0}
                />
              </div>
            </div>
          </div>

          <NavArrow
            direction="next"
            disabled={isLast}
            onClick={() => goToPage(page + 1)}
          />
        </div>

        <footer className="flex shrink-0 items-center justify-between border-t border-white/10 px-4 py-3 md:hidden">
          <p className="text-sm text-white/70">
            Page {page + 1} of {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-80",
              oswald.className,
            )}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={cn(
        "flex w-9 shrink-0 items-center justify-center text-white/70 transition-colors sm:w-12",
        "hover:text-white disabled:pointer-events-none disabled:opacity-25",
        direction === "prev" ? "pl-0.5 sm:pl-1" : "pr-0.5 sm:pr-1",
      )}
    >
      <Icon className="size-7 sm:size-8" strokeWidth={1.5} />
    </button>
  );
}
