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
    balloonContentHeader?: string;
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

  interface IGeometry {
    getCoordinates(): number[];
  }

  interface IGeoObject {
    geometry: IGeometry;
  }

  interface IGeoObjectCollection {
    add(geoObject: Placemark): void;
    get(index: number): IGeoObject;
    getLength(): number;
  }

  interface IGeocodeResult {
    geoObjects: IGeoObjectCollection;
  }

  interface IPane {
    getElement(): HTMLElement | null;
  }

  interface IPaneManager {
    get(name: string): IPane;
  }

  interface IEventManager {
    add(
      types: string | string[],
      callback: (event: object) => void,
    ): IEventManager;
  }

  interface IMapContainer {
    fitToViewport(): void;
  }

  class Map {
    constructor(
      parentElement: HTMLElement | string,
      state: IMapState,
      options?: IMapOptions,
    );
    behaviors: IBehavior;
    container: IMapContainer;
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
    events: IEventManager;
  }

  function ready(callback: () => void): void;
  function geocode(query: string): Promise<IGeocodeResult>;
}

interface Window {
  ymaps?: typeof ymaps;
}
