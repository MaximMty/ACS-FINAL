"use client";

import { useEffect, useRef, useState } from "react";

import { avulusCardShadow } from "@/lib/cta-styles";
import { assets } from "@/lib/assets";
import { loadYandexMaps } from "@/lib/load-yandex-maps";
import { parseYandexMapWidgetUrl } from "@/lib/parse-yandex-map-url";
import { cn } from "@/lib/utils";

const LOGO_SIZE: [number, number] = [60, 60];
const LOGO_OFFSET: [number, number] = [-30, -30];

/** Dark basemap via ground-pane tile inversion (keeps markers/controls normal). */
const GROUND_PANE_FILTER =
  "invert(100%) hue-rotate(180deg) brightness(90%) contrast(110%)";

type CustomYandexMapProps = {
  embedUrl: string;
  className?: string;
  logoHref?: string;
};

function toAbsoluteAssetUrl(href: string): string {
  if (/^https?:\/\//i.test(href)) {
    return href;
  }
  return new URL(href, window.location.origin).href;
}

function applyDarkGroundPane(map: ymaps.Map): void {
  const ground = map.panes.get("ground").getElement();
  if (ground) {
    ground.style.filter = GROUND_PANE_FILTER;
  }
}

export function CustomYandexMap({
  embedUrl,
  className,
  logoHref = assets.logo,
}: CustomYandexMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<ymaps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        setError(null);
        const { lon, lat, zoom } = parseYandexMapWidgetUrl(embedUrl);
        const ymapsApi = await loadYandexMaps();

        if (cancelled) {
          return;
        }

        mapRef.current?.destroy();
        mapRef.current = null;

        const map = new ymapsApi.Map(
          container,
          {
            center: [lat, lon],
            zoom,
            controls: ["zoomControl"],
          },
          {
            suppressMapOpenBlock: true,
          },
        );

        applyDarkGroundPane(map);

        const placemark = new ymapsApi.Placemark(
          [lat, lon],
          {},
          {
            iconLayout: "default#image",
            iconImageHref: toAbsoluteAssetUrl(logoHref),
            iconImageSize: LOGO_SIZE,
            iconImageOffset: LOGO_OFFSET,
            openBalloonOnClick: false,
          },
        );

        map.geoObjects.add(placemark);
        mapRef.current = map;
      } catch (cause) {
        if (!cancelled) {
          setError(
            cause instanceof Error ? cause.message : "Не удалось загрузить карту",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [embedUrl, logoHref]);

  return (
    <div
      className={cn(
        "relative h-[min(100%,320px)] min-h-[240px] w-full max-w-[518px] overflow-hidden bg-[#1a1a1a]",
        avulusCardShadow,
        className,
      )}
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
        role="application"
        aria-label="Карта расположения Avulus Cyber Space"
      />
      {error ? (
        <p className="absolute inset-0 flex items-center justify-center bg-black/80 px-4 text-center text-sm text-white/80">
          {error}
        </p>
      ) : null}
    </div>
  );
}
