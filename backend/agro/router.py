from fastapi import APIRouter, Query
from pydantic import BaseModel, Field

from .constants import CROPS, SOILS, OBJECTIVES
from . import service

router = APIRouter(prefix="/agro", tags=["Resiliencia Agronómica"])


class AgroEvaluationRequest(BaseModel):
    lat: float = Field(..., ge=-90, le=90, description="Latitud")
    lon: float = Field(..., ge=-180, le=180, description="Longitud")
    crop_id: str = Field(default="maiz", description="Identificador del cultivo actual")
    soil_id: str = Field(default="franco", description="Identificador del tipo de suelo")
    objective_id: str = Field(default="soil_health", description="Objetivo principal del agricultor")
    scenario: str = Field(default="normal", description="Escenario climático: normal, drought o rainy")
    start_date: str | None = None
    end_date: str | None = None


@router.get("/catalog")
def get_catalog():
    """Devuelve el catálogo de cultivos, tipos de suelos y objetivos agronómicos."""
    return {
        "crops": list(CROPS.values()),
        "soils": list(SOILS.values()),
        "objectives": list(OBJECTIVES.values()),
    }


@router.post("/evaluate")
def evaluate_parcel(req: AgroEvaluationRequest):
    """Calcula la vulnerabilidad climática y las 3 estrategias de rotación para la parcela."""
    result = service.evaluate_crop_resilience(
        lat=req.lat,
        lon=req.lon,
        crop_id=req.crop_id,
        soil_id=req.soil_id,
        objective_id=req.objective_id,
        scenario=req.scenario,
        start_date=req.start_date,
        end_date=req.end_date,
    )
    return result


@router.get("/evaluate")
def evaluate_parcel_get(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    crop_id: str = "maiz",
    soil_id: str = "franco",
    objective_id: str = "soil_health",
    scenario: str = "normal",
):
    """Versión GET para consultas rápidas vía URL."""
    return service.evaluate_crop_resilience(
        lat=lat,
        lon=lon,
        crop_id=crop_id,
        soil_id=soil_id,
        objective_id=objective_id,
        scenario=scenario,
    )
