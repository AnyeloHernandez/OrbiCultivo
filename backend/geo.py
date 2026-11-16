import math


def bbox_from_point(lat: float, lon: float, radius_km: float) -> list[float]:
    """Devuelve [min_lon, min_lat, max_lon, max_lat] alrededor de un punto."""
    dlat = radius_km / 111.32
    dlon = radius_km / (111.32 * max(math.cos(math.radians(lat)), 0.01))
    return [lon - dlon, lat - dlat, lon + dlon, lat + dlat]
