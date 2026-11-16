import requests
from config import NASA_POWER_URL, DEFAULT_NASA_PARAMS

MISSING = -999


def fetch_daily(lat: float, lon: float, start: str, end: str, parameters: list[str] | None = None) -> dict:
    """start/end en formato YYYYMMDD. Devuelve lat, lon, elevación y registros diarios."""
    parameters = parameters or DEFAULT_NASA_PARAMS
    params = {
        "parameters": ",".join(parameters),
        "community": "AG",
        "latitude": lat,
        "longitude": lon,
        "start": start,
        "end": end,
        "format": "JSON",
    }
    r = requests.get(NASA_POWER_URL, params=params, timeout=60)
    r.raise_for_status()
    data = r.json()

    lon_r, lat_r, elev = data["geometry"]["coordinates"]
    series = data["properties"]["parameter"]
    dates = sorted(next(iter(series.values())).keys())

    records = []
    for d in dates:
        row = {"date": f"{d[:4]}-{d[4:6]}-{d[6:]}"}
        for p in parameters:
            v = series[p][d]
            row[p] = None if v == MISSING else v
        records.append(row)

    return {"source": "NASA POWER", "lat": lat_r, "lon": lon_r, "elevation": elev,
            "parameters": parameters, "records": records}
