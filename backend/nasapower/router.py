from datetime import date, timedelta
from fastapi import APIRouter, HTTPException, Query
import requests

from . import client, service

router = APIRouter(prefix="/nasapower", tags=["NASA POWER"])


@router.get("/daily")
def daily(lat: float = Query(..., ge=-90, le=90), lon: float = Query(..., ge=-180, le=180),
          start: str | None = None, end: str | None = None, parameters: str | None = None):
    """Fechas en YYYYMMDD. Por defecto: últimos 30 días (con 5 de latencia)."""
    end = end or (date.today() - timedelta(days=5)).strftime("%Y%m%d")
    start = start or (date.today() - timedelta(days=35)).strftime("%Y%m%d")
    params = parameters.split(",") if parameters else None
    try:
        result = client.fetch_daily(lat, lon, start, end, params)
    except requests.HTTPError as e:
        raise HTTPException(502, f"NASA POWER error: {e.response.text[:300]}")
    service.print_console(result)
    result["summary"] = service.summarize(result["records"], result["parameters"])
    return result
