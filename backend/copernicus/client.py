import requests
from config import CDSE_STAC_URL, CDSE_STATS_URL
from .auth import get_token

NDVI_EVALSCRIPT = """//VERSION=3
function setup() {
  return {
    input: [{ bands: ["B04", "B08", "dataMask"] }],
    output: [{ id: "ndvi", bands: 1 }, { id: "dataMask", bands: 1 }]
  };
}
function evaluatePixel(s) {
  return { ndvi: [(s.B08 - s.B04) / (s.B08 + s.B04)], dataMask: [s.dataMask] };
}
"""


def search_scenes(bbox: list[float], start: str, end: str, max_cloud: int = 30, limit: int = 10) -> list[dict]:
    """Busca escenas Sentinel-2 L2A vía STAC (no requiere autenticación). Fechas YYYY-MM-DD."""
    body = {
        "collections": ["sentinel-2-l2a"],
        "bbox": bbox,
        "datetime": f"{start}T00:00:00Z/{end}T23:59:59Z",
        "limit": limit,
        "query": {"eo:cloud_cover": {"lt": max_cloud}},
        "sortby": [{"field": "properties.datetime", "direction": "desc"}],
    }
    r = requests.post(CDSE_STAC_URL, json=body, timeout=60)
    r.raise_for_status()
    return [{
        "id": f["id"],
        "datetime": f["properties"].get("datetime"),
        "cloud_cover": f["properties"].get("eo:cloud_cover"),
        "bbox": f.get("bbox"),
    } for f in r.json().get("features", [])]


def ndvi_stats(bbox: list[float], start: str, end: str) -> dict | None:
    """NDVI medio/mín/máx de la zona con Sentinel Hub Statistical API (requiere OAuth client)."""
    body = {
        "input": {
            "bounds": {"bbox": bbox, "properties": {"crs": "http://www.opengis.net/def/crs/EPSG/0/4326"}},
            "data": [{"type": "sentinel-2-l2a", "dataFilter": {"mosaickingOrder": "leastCC"}}],
        },
        "aggregation": {
            "timeRange": {"from": f"{start}T00:00:00Z", "to": f"{end}T23:59:59Z"},
            "aggregationInterval": {"of": "P30D"},
            "evalscript": NDVI_EVALSCRIPT,
            "resx": 0.0005, "resy": 0.0005,
        },
    }
    r = requests.post(CDSE_STATS_URL, json=body, timeout=120,
                      headers={"Authorization": f"Bearer {get_token()}"})
    r.raise_for_status()
    intervals = r.json().get("data", [])
    if not intervals:
        return None
    stats = intervals[-1]["outputs"]["ndvi"]["bands"]["B0"]["stats"]
    return {"mean": stats.get("mean"), "min": stats.get("min"), "max": stats.get("max"),
            "stDev": stats.get("stDev"), "from": intervals[-1]["interval"]["from"],
            "to": intervals[-1]["interval"]["to"]}
