from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from nasapower.router import router as nasa_router
from copernicus.router import router as cop_router
from metrics.router import router as metrics_router

app = FastAPI(title="Geo API: NASA POWER + Copernicus")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

app.include_router(nasa_router)
app.include_router(cop_router)
app.include_router(metrics_router)

FRONTEND = Path(__file__).resolve().parent.parent / "frontend"
app.mount("/", StaticFiles(directory=FRONTEND, html=True), name="frontend")
