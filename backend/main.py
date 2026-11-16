from pathlib import Path
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from nasapower.router import router as nasa_router
from copernicus.router import router as cop_router
from metrics.router import router as metrics_router
from agro.router import router as agro_router

app = FastAPI(
    title="OrbiCultivo Geo API · NASA POWER + Copernicus + Agro Resilience",
    description="API para la plataforma de resiliencia agrícola desarrollada por Olympus Forge",
    version="2.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API router con prefijo /api para Vercel y clientes estándar
api_router = APIRouter(prefix="/api")
api_router.include_router(nasa_router)
api_router.include_router(cop_router)
api_router.include_router(metrics_router)
api_router.include_router(agro_router)
app.include_router(api_router)

# También incluir directamente para compatibilidad hacia atrás y local
app.include_router(nasa_router)
app.include_router(cop_router)
app.include_router(metrics_router)
app.include_router(agro_router)

# Endpoint de salud y diagnóstico
@app.get("/api/health")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "OrbiCultivo Backend API",
        "version": "2.0.0",
    }

# Buscar rutas posibles para servir el frontend si se ejecuta de forma unificada fuera de Vercel
CANDIDATE_PATHS = [
    Path(__file__).resolve().parent.parent / "frontend" / "dist",
    Path("/frontend/dist"),
    Path("/app/frontend/dist"),
    Path(__file__).resolve().parent.parent / "frontend",
    Path("/frontend"),
]

for p in CANDIDATE_PATHS:
    if p.exists() and (p / "index.html").exists():
        app.mount("/", StaticFiles(directory=p, html=True), name="frontend")
        break
