"use client";

import { MapPin } from "lucide-react";
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
  /** Yandex Maps org card — used by the map overlay link */
  placeUrl?: string;
  placeButtonLabel?: string;
  placeName?: string;
  placeAddress?: string;
  placeHours?: string;
  geocodeQuery?: string;
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

/** Yandex still injects its own «В Карты» promo even with suppressMapOpenBlock. */
function suppressYandexOpenMapLink(container: HTMLElement): () => void {
  const hide = () => {
    container
      .querySelectorAll<HTMLElement>(
        '[class*="copyrights-promo"], [class*="open-block"], [class*="open-map"]',
      )
      .forEach((element) => {
        element.style.setProperty("display", "none", "important");
      });
  };

  hide();
  const observer = new MutationObserver(hide);
  observer.observe(container, { childList: true, subtree: true });
  return () => observer.disconnect();
}

async function resolveCoordinates(
  ymapsApi: typeof ymaps,
  geocodeQuery: string | undefined,
  fallback: { lat: number; lon: number },
): Promise<[number, number]> {
  if (!geocodeQuery) {
    return [fallback.lat, fallback.lon];
  }

  try {
    const result = await ymapsApi.geocode(geocodeQuery);
    const first = result.geoObjects.get(0);
    if (first) {
      const [lat, lon] = first.geometry.getCoordinates();
      return [lat, lon];
    }
  } catch {
    // Fall back to embed URL coordinates.
  }

  return [fallback.lat, fallback.lon];
}

function buildBalloonBody(address?: string, hours?: string): string {
  const lines = [address, hours].filter(Boolean);
  if (lines.length === 0) {
    return "";
  }

  return lines
    .map(
      (line) =>
        `<div style="margin:0 0 6px;font-size:13px;line-height:1.4;color:#222">${line}</div>`,
    )
    .join("");
}

export function CustomYandexMap({
  embedUrl,
  className,
  logoHref = assets.logo,
  placeUrl,
  placeButtonLabel = "В Карты",
  placeName = "Avulus Cyber Space",
  placeAddress,
  placeHours,
  geocodeQuery,
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
    let stopSuppressingOpenMap: (() => void) | undefined;
    let resizeObserver: ResizeObserver | undefined;

    void (async () => {
      try {
        setError(null);
        const { lon, lat, zoom } = parseYandexMapWidgetUrl(embedUrl);
        const ymapsApi = await loadYandexMaps();

        if (cancelled) {
          return;
        }

        const [markerLat, markerLon] = await resolveCoordinates(
          ymapsApi,
          geocodeQuery,
          { lat, lon },
        );

        if (cancelled) {
          return;
        }

        mapRef.current?.destroy();
        mapRef.current = null;

        const map = new ymapsApi.Map(
          container,
          {
            center: [markerLat, markerLon],
            zoom,
            controls: ["zoomControl"],
          },
          {
            suppressMapOpenBlock: true,
          },
        );

        applyDarkGroundPane(map);

        const placemark = new ymapsApi.Placemark(
          [markerLat, markerLon],
          {
            balloonContentHeader: placeName,
            balloonContentBody: buildBalloonBody(placeAddress, placeHours),
            hintContent: placeName,
          },
          {
            iconLayout: "default#image",
            iconImageHref: toAbsoluteAssetUrl(logoHref),
            iconImageSize: LOGO_SIZE,
            iconImageOffset: LOGO_OFFSET,
            openBalloonOnClick: true,
          },
        );

        map.geoObjects.add(placemark);
        mapRef.current = map;
        stopSuppressingOpenMap = suppressYandexOpenMapLink(container);

        resizeObserver = new ResizeObserver(() => {
          map.container.fitToViewport();
        });
        resizeObserver.observe(container);
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
      resizeObserver?.disconnect();
      stopSuppressingOpenMap?.();
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [
    embedUrl,
    geocodeQuery,
    logoHref,
    placeAddress,
    placeHours,
    placeName,
  ]);

  return (
    <div
      className={cn(
        "avulus-yandex-map relative h-full min-h-[240px] w-full overflow-hidden bg-[#1a1a1a]",
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
      {placeUrl ? (
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute bottom-3 left-3 z-10 inline-flex items-center gap-2",
            "rounded-md bg-white px-3 py-2 text-sm font-medium text-black shadow-md",
            "avulus-btn-opacity",
          )}
        >
          <MapPin className="size-4 text-[#e31e24]" strokeWidth={2} aria-hidden />
          <span>{placeButtonLabel}</span>
          <span aria-hidden>→</span>
        </a>
      ) : null}
      {error ? (
        <p className="absolute inset-0 flex items-center justify-center bg-black/80 px-4 text-center text-sm text-white/80">
          {error}
        </p>
      ) : null}
    </div>
  );
}
