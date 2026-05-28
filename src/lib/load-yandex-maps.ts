const YMAPS_SCRIPT_SRC = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

let loadPromise: Promise<typeof ymaps> | null = null;

/** Loads the Yandex Maps JS runtime once (no REST/geocoder API). */
export function loadYandexMaps(): Promise<typeof ymaps> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Yandex Maps can only be loaded in the browser"),
    );
  }

  if (window.ymaps) {
    return new Promise((resolve) => {
      window.ymaps!.ready(() => resolve(window.ymaps!));
    });
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src^="https://api-maps.yandex.ru/2.1/"]`,
      );

      const onReady = () => {
        if (!window.ymaps) {
          reject(new Error("Yandex Maps script loaded but ymaps is missing"));
          return;
        }
        window.ymaps.ready(() => resolve(window.ymaps));
      };

      if (existing) {
        if (window.ymaps) {
          onReady();
        } else {
          existing.addEventListener("load", onReady, { once: true });
          existing.addEventListener(
            "error",
            () => reject(new Error("Failed to load Yandex Maps")),
            { once: true },
          );
        }
        return;
      }

      const script = document.createElement("script");
      script.src = YMAPS_SCRIPT_SRC;
      script.async = true;
      script.onload = onReady;
      script.onerror = () => {
        loadPromise = null;
        reject(new Error("Failed to load Yandex Maps"));
      };
      document.head.appendChild(script);
    });
  }

  return loadPromise;
}
