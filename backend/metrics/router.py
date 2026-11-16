from datetime import date, timedelta
from fastapi import APIRouter
from pydantic import BaseModel, Field

from nasapower import client as nasa_client, service as nasa_service
from copernicus import service as cop_service

router = APIRouter(prefix="/metrics", tags=["Métricas"])


class Zone(BaseModel):
    name: str = "Zona"
    lat: float = Field(ge=-90, le=90)
    lon: float = Field(ge=-180, le=180)
    radius_km: float = 5


class MetricsRequest(BaseModel):
    zones: list[Zone]
    start: str | None = None  # YYYY-MM-DD
    end: str | None = None


@router.post("/zones")
def zones_metrics(req: MetricsRequest):
    end = date.fromisoformat(req.end) if req.end else date.today() - timedelta(days=5)
    start = date.fromisoformat(req.start) if req.start else end - timedelta(days=30)
    results = []
    for z in req.zones:
        item = {"name": z.name, "lat": z.lat, "lon": z.lon, "radius_km": z.radius_km}
        try:
            nasa = nasa_client.fetch_daily(z.lat, z.lon, start.strftime("%Y%m%d"), end.strftime("%Y%m%d"))
            nasa_service.print_console(nasa, limit=5)
            item["nasa"] = nasa_service.summarize(nasa["records"], nasa["parameters"])
        except Exception as e:
            item["nasa_error"] = str(e)[:200]
        try:
            cop = cop_service.zone_summary(z.lat, z.lon, z.radius_km, start.isoformat(), end.isoformat())
            cop_service.print_console(z.lat, z.lon, cop)
            item["copernicus"] = cop
        except Exception as e:
            item["copernicus_error"] = str(e)[:200]
        results.append(item)
    return {"start": start.isoformat(), "end": end.isoformat(), "zones": results}
