from pathlib import Path
from fastapi import FastAPI
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
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nasa_router)
app.include_router(cop_router)
app.include_router(metrics_router)
app.include_router(agro_router)

# Mount frontend build if available, else frontend root
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
FRONTEND_SRC = Path(__file__).resolve().parent.parent / "frontend"

if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
elif FRONTEND_SRC.exists():
    app.mount("/", StaticFiles(directory=FRONTEND_SRC, html=True), name="frontend")
