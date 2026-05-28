"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

import { assets } from "@/lib/assets";
import { CONTACTS } from "@/lib/data";
import { parseYandexMapWidgetUrl } from "@/lib/parse-yandex-map-url";
import { cn } from "@/lib/utils";

const GROUND_FILTER =
  "invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%)";

type CustomYandexMapProps = {
  embedUrl?: string;
  className?: string;
  logoSrc?: string;
};

function buildBalloonHtml() {
  return [
    '<div style="font-family:system-ui,sans-serif;line-height:1.4;max-width:240px">',
    '<strong style="display:block;margin-bottom:6px;font-size:15px">AVULUS</strong>',
    `<p style="margin:0 0 12px;font-size:13px;color:#333">${CONTACTS.address}</p>`,
    `<a href="${CONTACTS.mapRouteUrl}" target="_blank" rel="noopener noreferrer" style="color:#c00;font-size:13px;text-decoration:underline">Построить маршрут</a>`,
    ' · ',
    `<a href="${CONTACTS.mapRouteUrl}" target="_blank" rel="noopener noreferrer" style="color:#c00;font-size:13px;text-decoration:underline">Открыть в Яндекс Картах</a>`,
    "</div>",
  ].join("");
}

function YandexMapFallback({
  zoom,
  lon,
  lat,
  className,
}: {
  zoom: number;
  lon: number;
  lat: number;
  className?: string;
}) {
  const oid = CONTACTS.mapOrgOid;
  const src = `https://yandex.ru/map-widget/v1/?oid=${oid}&ll=${lon}%2C${lat}&z=${zoom}`;

  return (
    <div
      className={cn(
        "relative h-[278px] w-full max-w-[433px] overflow-hidden rounded-none bg-[#1a1a1a]",
        className,
      )}
    >
      <iframe
        src={src}
        title="Карта Avulus"
        className="h-full w-full border-0"
        style={{ filter: GROUND_FILTER }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function CustomYandexMap({
  embedUrl = CONTACTS.mapEmbedUrl,
  className,
  logoSrc = assets.logo,
}: CustomYandexMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<ymaps.Map | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const { lon, lat, zoom } = parseYandexMapWidgetUrl(embedUrl);
  const balloonBody = useMemo(() => buildBalloonHtml(), []);

  useEffect(() => {
    if (!apiKey || !apiLoaded || !containerRef.current || !window.ymaps) {
      return;
    }

    let cancelled = false;

    window.ymaps.ready(() => {
      if (cancelled || !containerRef.current) return;

      mapRef.current?.destroy();

      const map = new window.ymaps.Map(
        containerRef.current,
        {
          center: [lat, lon],
          zoom,
          controls: ["zoomControl"],
        },
        { suppressMapOpenBlock: true },
      );

      map.behaviors.disable("scrollZoom");

      const iconHref = logoSrc.startsWith("http")
        ? logoSrc
        : `${window.location.origin}${logoSrc}`;

      const placemark = new window.ymaps.Placemark(
        [lat, lon],
        {
          balloonContentBody: balloonBody,
          hintContent: "AVULUS CYBER HOTEL",
        },
        {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: [56, 56],
          iconImageOffset: [-28, -56],
          openBalloonOnClick: true,
        },
      );

      map.geoObjects.add(placemark);
      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [apiKey, apiLoaded, lat, lon, zoom, logoSrc, balloonBody]);

  if (!apiKey) {
    return (
      <YandexMapFallback zoom={zoom} lon={lon} lat={lat} className={className} />
    );
  }

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`}
        strategy="lazyOnload"
        onLoad={() => setApiLoaded(true)}
      />
      <div
        ref={containerRef}
        className={cn(
          "h-[278px] w-full max-w-[433px] overflow-hidden rounded-none bg-[#1a1a1a]",
          className,
        )}
        style={{ filter: GROUND_FILTER }}
        role="application"
        aria-label="Интерактивная карта Avulus"
      />
    </>
  );
}
