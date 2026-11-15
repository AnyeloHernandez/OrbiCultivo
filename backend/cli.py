"""Uso: python cli.py 14.6349 -90.5069 [YYYYMMDD YYYYMMDD]"""
import sys
from datetime import date, timedelta

from nasapower import client as nasa, service as nasa_svc
from copernicus import service as cop_svc

lat, lon = float(sys.argv[1]), float(sys.argv[2])
end = sys.argv[4] if len(sys.argv) > 4 else (date.today() - timedelta(days=5)).strftime("%Y%m%d")
start = sys.argv[3] if len(sys.argv) > 3 else (date.today() - timedelta(days=35)).strftime("%Y%m%d")

nasa_svc.print_console(nasa.fetch_daily(lat, lon, start, end))
iso = lambda s: f"{s[:4]}-{s[4:6]}-{s[6:]}"
cop_svc.print_console(lat, lon, cop_svc.zone_summary(lat, lon, 5, iso(start), iso(end)))
