import os
from dotenv import load_dotenv

load_dotenv()

NASA_POWER_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"
CDSE_STAC_URL = "https://stac.dataspace.copernicus.eu/v1/search"
CDSE_TOKEN_URL = "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token"
CDSE_STATS_URL = "https://sh.dataspace.copernicus.eu/api/v1/statistics"

CDSE_CLIENT_ID = os.getenv("CDSE_CLIENT_ID", "")
CDSE_CLIENT_SECRET = os.getenv("CDSE_CLIENT_SECRET", "")

DEFAULT_NASA_PARAMS = ["T2M", "T2M_MAX", "T2M_MIN", "PRECTOTCORR", "RH2M", "WS2M", "ALLSKY_SFC_SW_DWN"]
