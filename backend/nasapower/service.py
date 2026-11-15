from statistics import mean

SUM_PARAMS = {"PRECTOTCORR"}  # variables que tiene sentido acumular


def summarize(records: list[dict], parameters: list[str]) -> dict:
    out = {}
    for p in parameters:
        vals = [r[p] for r in records if r.get(p) is not None]
        if not vals:
            out[p] = None
            continue
        out[p] = {"mean": round(mean(vals), 3), "min": min(vals), "max": max(vals), "n": len(vals)}
        if p in SUM_PARAMS:
            out[p]["total"] = round(sum(vals), 2)
    return out


def print_console(result: dict, limit: int = 10) -> None:
    print(f"\n=== NASA POWER | lat={result['lat']} lon={result['lon']} elev={result['elevation']} m ===")
    cols = result["parameters"]
    print("date        " + " ".join(f"{c:>12}" for c in cols))
    for r in result["records"][:limit]:
        print(f"{r['date']}  " + " ".join(f"{str(r[c]):>12}" for c in cols))
    if len(result["records"]) > limit:
        print(f"... ({len(result['records'])} registros en total)")
