"use client";

import { useEffect } from "react";

/**
 * Warm the browser cache for image URLs (e.g. all menu pages when modal opens).
 */
export function usePreloadImages(urls: readonly string[], enabled: boolean) {
  const urlsKey = urls.join("|");

  useEffect(() => {
    if (!enabled || urls.length === 0) return;

    const links: HTMLLinkElement[] = [];
    const images: HTMLImageElement[] = [];

    urls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      images.push(img);

      if (index < 3) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
        links.push(link);
      }
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [enabled, urls, urlsKey]);
}
