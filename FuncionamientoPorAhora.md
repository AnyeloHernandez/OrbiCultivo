# Geo API: NASA POWER + Copernicus

```
backend/
  main.py            # FastAPI (sirve también el frontend)
  nasapower/         # client.py, service.py, router.py
  copernicus/        # auth.py, client.py, service.py, router.py
  metrics/           # métricas por zonas seleccionadas
  cli.py             # salida por consola
frontend/index.html  # mapa Leaflet
```

## Uso
```bash
cd backend
python -m venv .venv

#linux
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # opcional, solo para NDVI

python cli.py 14.6349 -90.5069          # salida en consola (lat/lon + datos)
uvicorn main:app --reload               # API + mapa en http://localhost:8000
```

## Endpoints
- `GET /nasapower/daily?lat=..&lon=..&start=YYYYMMDD&end=YYYYMMDD`
- `GET /copernicus/summary?lat=..&lon=..&radius_km=5&start=YYYY-MM-DD&end=YYYY-MM-DD`
- `POST /metrics/zones` body: `{"zones":[{"name":"A","lat":14.6,"lon":-90.5,"radius_km":5}],"start":"2026-10-01","end":"2026-10-30"}`
- Docs interactivas: `/docs`

## Notas
- NASA POWER no requiere clave; tiene ~2-5 días de latencia.
- Copernicus: la búsqueda de escenas (STAC) no requiere clave. El NDVI usa la Statistical API y requiere un OAuth client (CDSE_CLIENT_ID/SECRET).
