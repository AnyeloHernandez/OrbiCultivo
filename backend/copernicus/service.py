from statistics import mean
from geo import bbox_from_point
from . import client, auth


def zone_summary(lat: float, lon: float, radius_km: float, start: str, end: str, max_cloud: int = 30) -> dict:
    bbox = bbox_from_point(lat, lon, radius_km)
    scenes = client.search_scenes(bbox, start, end, max_cloud)
    clouds = [s["cloud_cover"] for s in scenes if s["cloud_cover"] is not None]
    out = {
        "source": "Copernicus Data Space",
        "bbox": bbox,
        "scenes_found": len(scenes),
        "avg_cloud_cover": round(mean(clouds), 2) if clouds else None,
        "latest_scene": scenes[0] if scenes else None,
        "ndvi": None,
    }
    if auth.has_credentials():
        try:
            out["ndvi"] = client.ndvi_stats(bbox, start, end)
        except Exception as e:  # no romper el resto de métricas
            out["ndvi_error"] = str(e)[:200]
    else:
        out["ndvi_note"] = "Define CDSE_CLIENT_ID / CDSE_CLIENT_SECRET en .env para obtener NDVI."
    return out


def print_console(lat: float, lon: float, summary: dict) -> None:
    print(f"\n=== COPERNICUS | lat={lat} lon={lon} ===")
    print(f"bbox={[round(x, 4) for x in summary['bbox']]}")
    print(f"escenas={summary['scenes_found']}  nubosidad_media={summary['avg_cloud_cover']}")
    if summary["latest_scene"]:
        print(f"última: {summary['latest_scene']['id']} ({summary['latest_scene']['datetime']})")
    if summary["ndvi"]:
        print(f"NDVI media={summary['ndvi']['mean']}")
