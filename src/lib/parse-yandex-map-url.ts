export type YandexMapCoords = {
  lon: number;
  lat: number;
  zoom: number;
};

const DEFAULT_ZOOM = 17;

function parseCoordinatePair(value: string): { lon: number; lat: number } {
  const [lonStr, latStr] = decodeURIComponent(value).split(/[,;]/);
  const lon = Number.parseFloat(lonStr.trim());
  const lat = Number.parseFloat(latStr.trim());

  if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
    throw new Error(`Invalid coordinates: ${value}`);
  }

  return { lon, lat };
}

/**
 * Reads lon, lat, and zoom from Yandex map-widget or maps URLs.
 * Supports `ll` / `pt` query params (lon,lat) and optional `z`.
 */
export function parseYandexMapWidgetUrl(embedUrl: string): YandexMapCoords {
  let url: URL;

  try {
    url = new URL(embedUrl);
  } catch {
    throw new Error(`Invalid map URL: ${embedUrl}`);
  }

  const ll = url.searchParams.get("ll") ?? url.searchParams.get("pt");
  if (!ll) {
    throw new Error(
      `Map URL must include ll or pt (e.g. map-widget/v1/?ll=37.64,55.75&z=17): ${embedUrl}`,
    );
  }

  const { lon, lat } = parseCoordinatePair(ll);
  const zParam = url.searchParams.get("z");
  const parsedZoom = zParam ? Number.parseInt(zParam, 10) : DEFAULT_ZOOM;

  return {
    lon,
    lat,
    zoom: Number.isFinite(parsedZoom) ? parsedZoom : DEFAULT_ZOOM,
  };
}
