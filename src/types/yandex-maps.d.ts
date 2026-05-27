declare namespace ymaps {
  interface IMap {
    destroy(): void;
    behaviors: { disable(behavior: string): void };
    geoObjects: { add(object: Placemark): void };
    panes: {
      get(name: string): { getElement(): HTMLElement | null } | null;
    };
  }

  class Map implements IMap {
    constructor(
      parentElement: HTMLElement | string,
      state: { center: number[]; zoom: number; controls?: string[] },
      options?: Record<string, unknown>,
    );
    destroy(): void;
    behaviors: { disable(behavior: string): void };
    geoObjects: { add(object: Placemark): void };
    panes: {
      get(name: string): { getElement(): HTMLElement | null } | null;
    };
  }

  class Placemark {
    constructor(
      geometry: number[],
      properties?: Record<string, unknown>,
      options?: Record<string, unknown>,
    );
  }

  function ready(callback: () => void): void;
}

interface Window {
  ymaps: typeof ymaps;
}
