import time
import requests
from config import CDSE_TOKEN_URL, CDSE_CLIENT_ID, CDSE_CLIENT_SECRET

_cache = {"token": None, "exp": 0}


def has_credentials() -> bool:
    return bool(CDSE_CLIENT_ID and CDSE_CLIENT_SECRET)


def get_token() -> str:
    if _cache["token"] and time.time() < _cache["exp"] - 30:
        return _cache["token"]
    r = requests.post(CDSE_TOKEN_URL, data={
        "grant_type": "client_credentials",
        "client_id": CDSE_CLIENT_ID,
        "client_secret": CDSE_CLIENT_SECRET,
    }, timeout=30)
    r.raise_for_status()
    j = r.json()
    _cache["token"], _cache["exp"] = j["access_token"], time.time() + j["expires_in"]
    return _cache["token"]
