from datetime import date, timedelta
from fastapi import APIRouter, HTTPException, Query
import requests

from . import service

router = APIRouter(prefix="/copernicus", tags=["Copernicus"])


@router.get("/summary")
def summary(lat: float = Query(..., ge=-90, le=90), lon: float = Query(..., ge=-180, le=180),
            radius_km: float = 5, start: str | None = None, end: str | None = None, max_cloud: int = 30):
    """Fechas en YYYY-MM-DD."""
    end = end or date.today().isoformat()
    start = start or (date.today() - timedelta(days=30)).isoformat()
    try:
        res = service.zone_summary(lat, lon, radius_km, start, end, max_cloud)
    except requests.HTTPError as e:
        raise HTTPException(502, f"Copernicus error: {e.response.text[:300]}")
    service.print_console(lat, lon, res)
    return {"lat": lat, "lon": lon, **res}
