"use client";

import { useEffect, useRef } from "react";

import { assets } from "@/lib/assets";
import { parseYandexMapWidgetUrl } from "@/lib/parse-yandex-map-url";
import { cn } from "@/lib/utils";

const SCRIPT_ID = "yandex-maps-api-script";
const DEFAULT_CENTER: [number, number] = [55.750145, 37.648259];
const DEFAULT_ZOOM = 17;

const GROUND_FILTER =
  "invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%)";

type CustomYandexMapProps = {
  embedUrl: string;
  className?: string;
  logoSrc?: string;
};

function parseCoords(embedUrl: string): { center: [number, number]; zoom: number } {
  try {
    const { lat, lon, zoom } = parseYandexMapWidgetUrl(embedUrl);
    return { center: [lat, lon], zoom };
  } catch {
    return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
  }
}

/** Yandex Maps must load the placemark image from an absolute same-origin URL */
function resolvePlacemarkIconUrl(logoSrc: string): string {
  if (logoSrc.startsWith("http://") || logoSrc.startsWith("https://")) {
    return logoSrc;
  }
  return new URL(logoSrc, window.location.origin).href;
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load placemark icon: ${src}`));
    img.src = src;
  });
}

function loadYandexMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Yandex Maps only loads in the browser"));
      return;
    }

    const ready = () => {
      window.ymaps.ready(() => resolve());
    };

    if (window.ymaps?.Map) {
      ready();
      return;
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.async = true;
      script.onload = () => ready();
      script.onerror = () => reject(new Error("Yandex Maps script failed to load"));
      document.head.appendChild(script);
      return;
    }

    if (window.ymaps) {
      ready();
    } else {
      script.addEventListener("load", () => ready(), { once: true });
      script.addEventListener("error", () => reject(new Error("Yandex Maps script failed")), {
        once: true,
      });
    }
  });
}

export function CustomYandexMap({
  embedUrl,
  className,
  logoSrc = assets.logo,
}: CustomYandexMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<ymaps.IMap | null>(null);

  useEffect(() => {
    const { center, zoom } = parseCoords(embedUrl);
    let cancelled = false;

    const initMap = async () => {
      if (cancelled || !mapContainerRef.current) return;

      const iconHref = resolvePlacemarkIconUrl(logoSrc);

      try {
        await preloadImage(iconHref);
      } catch (err) {
        console.warn(err);
      }

      if (cancelled || !mapContainerRef.current) return;

      mapContainerRef.current.innerHTML = "";

      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }

      const map = new ymaps.Map(
        mapContainerRef.current,
        {
          center,
          zoom,
          controls: ["zoomControl"],
        },
        {
          suppressMapOpenBlock: true,
        },
      );

      const placemark = new ymaps.Placemark(
        center,
        {
          hintContent: "Avulus Cyber Space",
          balloonContent: "Avulus Cyber Space",
        },
        {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: [60, 60],
          iconImageOffset: [-30, -30],
        },
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");

      window.setTimeout(() => {
        try {
          const groundPane = map.panes.get("ground")?.getElement();
          if (groundPane) {
            groundPane.style.filter = GROUND_FILTER;
          }
        } catch {
          /* pane not ready */
        }
      }, 50);

      mapRef.current = map;
    };

    void loadYandexMaps().then(() => {
      if (!cancelled) void initMap();
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [embedUrl, logoSrc]);

  return (
    <div
      ref={mapContainerRef}
      className={cn(
        "h-[278px] w-full max-w-[433px] overflow-hidden rounded-none bg-[#1a1a1a]",
        className,
      )}
    />
  );
}
