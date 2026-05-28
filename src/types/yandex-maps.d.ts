declare namespace ymaps {
  interface IMapState {
    center?: number[];
    zoom?: number;
    controls?: string[];
  }

  interface IMapOptions {
    suppressMapOpenBlock?: boolean;
  }

  interface IPlacemarkProperties {
    balloonContentBody?: string;
    hintContent?: string;
  }

  interface IPlacemarkOptions {
    iconLayout?: string;
    iconImageHref?: string;
    iconImageSize?: number[];
    iconImageOffset?: number[];
    openBalloonOnClick?: boolean;
  }

  interface IBehavior {
    disable(behavior: string): void;
  }

  interface IGeoObjectCollection {
    add(geoObject: Placemark): void;
  }

  interface IPane {
    getElement(): HTMLElement | null;
  }

  interface IPaneManager {
    get(name: string): IPane;
  }

  class Map {
    constructor(
      parentElement: HTMLElement | string,
      state: IMapState,
      options?: IMapOptions,
    );
    behaviors: IBehavior;
    geoObjects: IGeoObjectCollection;
    panes: IPaneManager;
    destroy(): void;
  }

  class Placemark {
    constructor(
      geometry: number[],
      properties?: IPlacemarkProperties,
      options?: IPlacemarkOptions,
    );
  }

  function ready(callback: () => void): void;
}

interface Window {
  ymaps?: typeof ymaps;
}
