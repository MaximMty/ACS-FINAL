export type YandexMapCoords = {
  lon: number;
  lat: number;
  zoom: number;
};

/** Parses lon, lat, z from a Yandex map-widget embed URL (`ll=lon,lat`, optional `z`). */
export function parseYandexMapWidgetUrl(embedUrl: string): YandexMapCoords {
  const url = new URL(embedUrl);
  const ll = url.searchParams.get("ll");
  const pt = url.searchParams.get("pt");
  const z = url.searchParams.get("z");

  let lon: number | undefined;
  let lat: number | undefined;

  if (ll) {
    const [lonStr, latStr] = ll.split(",").map((part) => part.trim());
    lon = Number.parseFloat(lonStr);
    lat = Number.parseFloat(latStr);
  } else if (pt) {
    const [lonStr, latStr] = pt.split(",").map((part) => part.trim());
    lon = Number.parseFloat(lonStr);
    lat = Number.parseFloat(latStr);
  }

  if (
    lon === undefined ||
    lat === undefined ||
    Number.isNaN(lon) ||
    Number.isNaN(lat)
  ) {
    throw new Error("Yandex map-widget URL must include ll=lon,lat or pt=lon,lat,…");
  }

  const zoom = z ? Number.parseInt(z, 10) : 16;

  return {
    lon,
    lat,
    zoom: Number.isNaN(zoom) ? 16 : zoom,
  };
}
