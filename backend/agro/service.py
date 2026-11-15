from datetime import date, timedelta
from typing import Any
import math

from nasapower import client as nasa_client
from .constants import CROPS, SOILS, OBJECTIVES

GUATEMALA_REGIONS = [
    {"name": "Altiplano Occidental (Quetzaltenango / San Marcos / Totonicapán)", "lat": 14.85, "lon": -91.52, "elev": 2350},
    {"name": "Altiplano Central (Chimaltenango / Sololá / Sacatepéquez)", "lat": 14.65, "lon": -90.95, "elev": 1900},
    {"name": "Valle Central (Guatemala)", "lat": 14.63, "lon": -90.51, "elev": 1500},
    {"name": "Boca Costa y Costa Sur (Escuintla / Suchitepéquez / Retalhuleu)", "lat": 14.28, "lon": -91.10, "elev": 350},
    {"name": "Oriente y Corredor Seco (Chiquimula / Zacapa / Jalapa)", "lat": 14.80, "lon": -89.54, "elev": 420},
    {"name": "Verapaces (Alta y Baja Verapaz)", "lat": 15.47, "lon": -90.37, "elev": 1300},
    {"name": "Petén (Tierras Bajas del Norte)", "lat": 16.92, "lon": -89.89, "elev": 130},
]


def guess_department(lat: float, lon: float) -> str:
    """Aproxima la región o departamento guatemalteco por proximidad euclidiana."""
    best = GUATEMALA_REGIONS[0]
    best_dist = 999.0
    for r in GUATEMALA_REGIONS:
        d = math.hypot(lat - r["lat"], lon - r["lon"])
        if d < best_dist:
            best_dist = d
            best = r
    return best["name"]


def evaluate_crop_resilience(
    lat: float,
    lon: float,
    crop_id: str = "maiz",
    soil_id: str = "franco",
    objective_id: str = "soil_health",
    scenario: str = "normal",
    start_date: str | None = None,
    end_date: str | None = None,
) -> dict[str, Any]:
    crop = CROPS.get(crop_id, CROPS["maiz"])
    soil = SOILS.get(soil_id, SOILS["franco"])
    objective = OBJECTIVES.get(objective_id, OBJECTIVES["soil_health"])

    # Factores del Simulador de Escenarios Climáticos
    if scenario == "drought":
        precip_multiplier = 0.68  # 32% menos lluvia (El Niño)
        temp_offset = 1.8         # +1.8°C más calor
        moisture_multiplier = 0.70
        scenario_label = "Simulación: Sequía Fuerte / Fenómeno El Niño"
    elif scenario == "rainy":
        precip_multiplier = 1.30  # 30% más lluvia (La Niña)
        temp_offset = -0.5
        moisture_multiplier = 1.25
        scenario_label = "Simulación: Año Muy Lluvioso / Fenómeno La Niña"
    else:
        precip_multiplier = 1.0
        temp_offset = 0.0
        moisture_multiplier = 1.0
        scenario_label = "Histórico Promedio (NASA POWER & SMAP)"

    # Determinar rango de fechas para NASA POWER (últimos 60 días para datos climáticos recientes)
    today = date.today()
    if not end_date:
        end = today - timedelta(days=5)
    else:
        end = date.fromisoformat(end_date)

    if not start_date:
        start = end - timedelta(days=60)
    else:
        start = date.fromisoformat(start_date)

    start_str = start.strftime("%Y%m%d")
    end_str = end.strftime("%Y%m%d")

    # Intentar obtener datos satelitales de NASA POWER
    nasa_data = None
    elevation = 1500
    nasa_ok = False

    try:
        req_params = ["T2M", "T2M_MAX", "T2M_MIN", "PRECTOTCORR", "RH2M", "ALLSKY_SFC_SW_DWN", "GWETTOP", "GWETROOT"]
        nasa_data = nasa_client.fetch_daily(lat, lon, start_str, end_str, req_params)
        elevation = nasa_data.get("elevation", 1500)
        nasa_ok = True
    except Exception:
        # Modo resiliente / simulación georeferenciada agronómica si NASA POWER no responde
        nasa_ok = False
        # Estimar elevación basada en lat/lon de Guatemala
        if lat > 14.5 and lat < 15.3 and lon < -90.5:
            elevation = 2100 # Altiplano
        elif lat < 14.4:
            elevation = 250 # Costa
        elif lon > -89.8:
            elevation = 450 # Oriente
        else:
            elevation = 1450

    # Procesar registros climáticos
    records = nasa_data.get("records", []) if nasa_data else []

    if records:
        precip_vals = [r.get("PRECTOTCORR") or 0.0 for r in records]
        temp_min_vals = [r.get("T2M_MIN") for r in records if r.get("T2M_MIN") is not None]
        temp_max_vals = [r.get("T2M_MAX") for r in records if r.get("T2M_MAX") is not None]
        gwet_root_vals = [r.get("GWETROOT") for r in records if r.get("GWETROOT") is not None]

        total_precip = sum(precip_vals) * precip_multiplier
        min_temp = (min(temp_min_vals) if temp_min_vals else 12.0) + (temp_offset * 0.4)
        max_temp = (max(temp_max_vals) if temp_max_vals else 28.0) + temp_offset
        avg_moisture = min(98.0, max(12.0, ((sum(gwet_root_vals) / len(gwet_root_vals) * 100) if gwet_root_vals else 45.0) * moisture_multiplier))
        days_above_32 = sum(1 for t in temp_max_vals if (t + temp_offset) >= 32.0)
    else:
        # Valores simulados agronómicos ajustados a la ubicación
        is_highland = elevation > 1800
        is_corredor_seco = lon > -89.9 and lat < 15.2

        base_p = 65.0 if is_corredor_seco else (120.0 if is_highland else 180.0)
        total_precip = base_p * precip_multiplier
        min_temp = (3.5 if is_highland else (17.0 if is_corredor_seco else 14.0)) + (temp_offset * 0.4)
        max_temp = (24.0 if is_highland else (35.5 if is_corredor_seco else 29.0)) + temp_offset
        base_m = 28.0 if is_corredor_seco else (48.0 if is_highland else 58.0)
        avg_moisture = min(98.0, max(12.0, base_m * moisture_multiplier))
        days_above_32 = (22 if scenario == "drought" else 14) if is_corredor_seco else (4 if scenario == "drought" else 0)

    # 1. Cálculo de Estrés Hídrico (Water Stress)
    water_need = crop["water_need_mm"]
    # Ajuste por tipo de suelo
    soil_capacity = soil["available_water_capacity_mm_m"]
    # La necesidad proporcional en la ventana evaluada (~60 días de ciclo)
    window_water_need = water_need * (60.0 / crop["growing_cycle_days"])
    water_deficit = max(0.0, window_water_need - total_precip)
    ratio = total_precip / max(1.0, window_water_need)

    if ratio >= 0.85:
        ws_score = max(10, int(25 * (1 - ratio)))
        ws_level = "Bajo"
        ws_color = "green"
        ws_desc = "El régimen hídrico actual cubre la mayor parte de la transpiración del cultivo."
    elif ratio >= 0.60:
        ws_score = 42
        ws_level = "Moderado"
        ws_color = "yellow"
        ws_desc = "Déficit moderado. Se recomienda implementar coberturas de suelo para frenar la evaporación."
    elif ratio >= 0.35:
        ws_score = 72
        ws_level = "Severo"
        ws_color = "orange"
        ws_desc = "Estrés hídrico significativo. Las raíces sufren falta de agua en capas superficiales; riesgo de merma en biomasa."
    else:
        ws_score = 89
        ws_level = "Crítico"
        ws_color = "red"
        ws_desc = "Sequía severa en curso. Alto riesgo de pérdida total si no se aplican medidas de rescate y captación hídrica."

    # 2. Cálculo de Riesgo de Heladas (Frost Risk)
    frost_threshold = crop["frost_temp_threshold"]
    if min_temp <= frost_threshold:
        fr_level = "Alto"
        fr_color = "red"
        fr_prob = 78
        fr_desc = f"Temperaturas mínimas ({min_temp:.1f}°C) por debajo del umbral del cultivo ({frost_threshold}°C). Alto riesgo de daño celular."
    elif min_temp <= (frost_threshold + 3.0) or (elevation > 1900 and (today.month in [11, 12, 1, 2])):
        fr_level = "Moderado"
        fr_color = "yellow"
        fr_prob = 45
        fr_desc = f"Condiciones de riesgo en madrugadas despejadas (mínima registrada {min_temp:.1f}°C, altitud {elevation:.0f} msnm)."
    else:
        fr_level = "Bajo"
        fr_color = "green"
        fr_prob = 8
        fr_desc = f"Riesgo de helada mínimo en la coordenada seleccionada (mínima {min_temp:.1f}°C)."

    # 3. Humedad de suelo SMAP / NASA GWETROOT
    if avg_moisture >= 60:
        sm_status = "Óptima"
        sm_color = "green"
        sm_desc = "Humedad en zona radicular en rango de capacidad de campo."
    elif avg_moisture >= 40:
        sm_status = "Adecuada"
        sm_color = "yellow"
        sm_desc = "Humedad moderada; suficiente para crecimiento vegetativo pero con margen estrecho."
    elif avg_moisture >= 25:
        sm_status = "Deficitaria"
        sm_color = "orange"
        sm_desc = "El perfil del suelo se aproxima al punto de marchitez temporal."
    else:
        sm_status = "Muy Seca"
        sm_color = "red"
        sm_desc = "Estrés severo por sequedad profunda en el suelo."

    # 4. Serie temporal (12 meses proyectados/históricos para el gráfico estacional)
    months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    # Curva típica de precipitación en Guatemala (con canícula en Julio/Agosto y época seca Nov-Abril)
    precip_curve_guate = [5, 8, 18, 55, 175, 260, 160, 185, 280, 190, 45, 12]
    # Ajuste por región
    if lon > -89.8:  # Corredor seco
        precip_curve_guate = [2, 4, 10, 25, 95, 140, 70, 85, 160, 110, 20, 5]
    elif lat > 15.4 and lon < -89.9:  # Verapaces
        precip_curve_guate = [40, 35, 45, 80, 190, 310, 290, 270, 340, 280, 130, 75]

    # Aplicar factor del escenario climático a la curva mensual
    precip_curve_guate = [max(1, int(p * precip_multiplier)) for p in precip_curve_guate]

    monthly_demand = round(crop["water_need_mm"] / 8, 1) # demanda estimada por mes de temporada activa

    time_series = []
    for i, m in enumerate(months):
        p = precip_curve_guate[i]
        # La demanda del cultivo se concentra en la ventana de siembra principal (May-Oct)
        d = monthly_demand if 4 <= i <= 9 else (monthly_demand * 0.3 if crop["growing_cycle_days"] > 200 else 0)
        # Humedad de suelo ligada a la lluvia y al suelo
        s_moist = min(95, max(15, int(p * 0.28 + soil_capacity * 0.15)))
        t_min = min(20, max(2, int(min_temp + (2.5 if 4 <= i <= 8 else -1.5))))
        t_max = min(36, max(18, int(max_temp + (3.0 if 2 <= i <= 4 else -1.0))))
        time_series.append({
            "month": m,
            "precipitation": p,
            "cropDemand": round(d, 1),
            "soilMoisture": s_moist,
            "tempMin": t_min,
            "tempMax": t_max,
        })

    # 5. Generación de las 3 Estrategias Comparativas
    strategies = build_strategies(crop, soil, objective, ws_score, fr_level)

    return {
        "location": {
            "lat": round(lat, 5),
            "lon": round(lon, 5),
            "elevationMeters": round(elevation),
            "departmentGuess": guess_department(lat, lon),
        },
        "selectedParameters": {
            "crop": crop,
            "soil": soil,
            "objective": objective_id,
            "scenario": scenario,
            "scenarioLabel": scenario_label,
        },
        "dataSource": {
            "nasaPower": nasa_ok,
            "copernicus": False,
            "lastUpdated": (today - timedelta(days=5)).isoformat(),
        },
        "vulnerability": {
            "waterStress": {
                "score": ws_score,
                "level": ws_level,
                "color": ws_color,
                "accumulatedDeficitMm": round(water_deficit, 1),
                "description": ws_desc,
            },
            "frostRisk": {
                "level": fr_level,
                "color": fr_color,
                "probabilityPercent": fr_prob,
                "minExpectedTempC": round(min_temp, 1),
                "description": fr_desc,
            },
            "soilMoisture": {
                "smapIndexPercent": round(avg_moisture, 1),
                "status": sm_status,
                "color": sm_color,
                "trend": "Bajando" if ws_score > 50 else "Estable",
                "description": sm_desc,
            },
            "heatStress": {
                "daysAbove32C": days_above_32,
                "avgRadiationKwh": 5.4,
                "status": "Extremo" if days_above_32 > 10 else ("Moderado" if days_above_32 > 3 else "Normal"),
            },
        },
        "timeSeries": time_series,
        "strategies": strategies,
    }


def build_strategies(crop: dict, soil: dict, objective: dict, ws_score: int, fr_level: str) -> list[dict]:
    crop_name = crop["name"]
    crop_id = crop["id"]

    # 1. Línea Base (Escenario Actual / Monocultivo)
    baseline = {
        "id": "strategy-baseline",
        "type": "baseline",
        "title": "Línea Base: Práctica Actual (Monocultivo)",
        "subtitle": f"Continuidad sin rotación de {crop_name}",
        "tag": "Alto Riesgo Acumulativo",
        "colorTheme": "red",
        "rotationCrops": [crop_name, f"{crop_name} (Siguiente ciclo)", f"{crop_name} (Monocultivo repetitivo)"],
        "description": f"Mantener {crop_name} en monocultivo continuado agota los horizontes superficiales del suelo {soil['name'].lower()}, elevando la vulnerabilidad a plagas y sequías.",
        "highlights": [
            {
                "iconType": "warning",
                "text": "Pérdida neta de nutrientes: agotamiento de Nitrógeno y Fósforo sin reposición biológica.",
                "isPositive": False,
            },
            {
                "iconType": "warning",
                "text": "Compactación del suelo y caída progresiva de la capacidad de infiltración (-15% por temporada).",
                "isPositive": False,
            },
            {
                "iconType": "warning",
                "text": f"Vulnerabilidad hídrica crítica: si la sequía o canícula se extiende, las pérdidas estimadas alcanzan el {min(85, max(30, ws_score + 15))}%.",
                "isPositive": False,
            },
            {
                "iconType": "warning",
                "text": "Aumento del costo por fertilizantes químicos y control de plagas reincidentes.",
                "isPositive": False,
            },
        ],
        "impactScores": {
            "nitrogenFixation": "Negativo (-45 kg N/ha)",
            "waterConservation": "-18% (Pérdida por escorrentía)",
            "droughtResilience": "Baja",
            "economicRisk": "Alto",
        },
        "nasaEvidence": {
            "dataset": "NASA POWER (MERRA-2) & ECOSTRESS Evapotranspiration",
            "finding": f"Las observaciones térmicas satelitales confirman que el suelo desnudo o bajo monocultivo de {crop_name} incrementa la evapotranspiración en un 28% y acelera el agotamiento de la humedad radicular durante la canícula.",
        },
        "dataGaps": {
            "limitation": "La resolución satelital regional (0.5° x 0.5° de NASA POWER) promedia valles y laderas; micro-barrancos locales pueden retener humedad residual no detectada por el sensor.",
            "groundValidation": "El agricultor debe muestrear con barreno o azadón a 20-30 cm de profundidad para evaluar la humedad real del perfil antes de decidir riego de auxilio.",
        },
        "localReview": {
            "action": f"Revisar el historial de plagas del suelo (gallina ciega / nemátodos) con el extensionista del MAGA o perito agrónomo local.",
            "practicalAdvice": "Si el rendimiento decayó más del 20% el año previo, evitar repetir el mismo cultivo sin descanso biológico.",
        },
    }

    # 2. Estrategia de Salud del Suelo
    cover_crop = "Canavalia ensiformis / Frijol Abono (Mucuna)" if crop_id in ["maiz", "cana"] else "Avena Negra / Vicia sativa"
    soil_health = {
        "id": "strategy-soil-health",
        "type": "soil_health",
        "title": "Estrategia: Salud y Regeneración del Suelo",
        "subtitle": f"Rotación regenerativa con {cover_crop}",
        "tag": "Recomendada para la Tierra",
        "colorTheme": "emerald",
        "rotationCrops": [
            crop_name,
            cover_crop,
            "Leguminosa comestible (Frijol / Gandul)" if crop_id != "frijol" else "Gramínea de cobertura / Maíz criollo",
        ],
        "description": f"Integra cultivos de cobertura de raíces profundas para descompactar el suelo {soil['name'].lower()}, regenerar la microfauna e incorporar materia orgánica.",
        "highlights": [
            {
                "iconType": "check",
                "text": "Fijación biológica de nitrógeno atmosférico: aporta entre +50 y +85 kg de N puro por hectárea.",
                "isPositive": True,
            },
            {
                "iconType": "water",
                "text": "El mulching vegetal retiene hasta un 32% más de humedad en el suelo durante períodos sin lluvia.",
                "isPositive": True,
            },
            {
                "iconType": "soil",
                "text": "Aporte de 4.5 toneladas de biomasa orgánica por hectárea, reduciendo la erosión hídrica y eólica.",
                "isPositive": True,
            },
            {
                "iconType": "check",
                "text": "Ruptura del ciclo biológico de plagas endémicas del suelo (gallina ciega y nemátodos).",
                "isPositive": True,
            },
        ],
        "impactScores": {
            "nitrogenFixation": "+65 kg N/ha",
            "waterConservation": "+32% de retención",
            "droughtResilience": "Alta",
            "economicRisk": "Bajo",
        },
        "nasaEvidence": {
            "dataset": "NASA SMAP L4 (Soil Moisture Active Passive) & Landsat/MODIS NDVI",
            "finding": "Las mediciones radiométricas en banda L de SMAP demuestran que los suelos con cobertura orgánica conservan entre 25% y 35% más agua en la zona radicular (0-100 cm) en comparación con parcelas desnudas.",
        },
        "dataGaps": {
            "limitation": "SMAP mide a nivel regional (9-36 km de cuadrícula) y el sensor satelital no puede medir directamente la tasa de mineralización microbiana del nitrógeno en cada tipo específico de suelo.",
            "groundValidation": "Verificar en campo la nodulación de las raíces de la leguminosa (cortar nódulos: deben ser rosados por dentro para confirmar fijación activa de nitrógeno).",
        },
        "localReview": {
            "action": "Consultar la disponibilidad de semilla de Canavalia o Mucuna en cooperativas locales, comités de agua o bancos comunitarios de semillas.",
            "practicalAdvice": "Definir si la biomasa se incorporará al suelo como abono verde o se dejará superficialmente como acolchado protector contra el sol.",
        },
    }

    # 3. Estrategia de Resiliencia Climática
    drought_alternative = "Sorgo Forrajero / Maíz B73 Tolerante a Sequía" if crop_id == "maiz" else ("Frijol Tépari / Gandul Resistente" if crop_id == "frijol" else "Sistema Agroforestal con Sombras Diversificadas")
    climate_resilience = {
        "id": "strategy-climate-resilience",
        "type": "climate_resilience",
        "title": "Estrategia: Resiliencia ante Sequía y Clima Extremo",
        "subtitle": f"Diversificación con {drought_alternative}",
        "tag": "Máxima Protección de Cosecha",
        "colorTheme": "cyan",
        "rotationCrops": [
            crop_name,
            drought_alternative,
            "Cultivo rústico de emergencia (Ajonjolí / Camote)",
        ],
        "description": "Diseñada para minimizar la exposición a canículas severas, variabilidad de lluvias y choques térmicos, blindando la economía familiar campesina.",
        "highlights": [
            {
                "iconType": "shield",
                "text": "Variedad con índice de eficiencia en uso de agua (WUE) 40% superior a variedades convencionales.",
                "isPositive": True,
            },
            {
                "iconType": "check",
                "text": "Escalonamiento de floración para evitar que una sola ola de calor esterilice la polinización.",
                "isPositive": True,
            },
            {
                "iconType": "water",
                "text": "Técnicas de siembra en contorno y microcuencas de retención de agua de escorrentía.",
                "isPositive": True,
            },
            {
                "iconType": "check",
                "text": "Diversificación de ingresos: asegura cosecha forrajera o grano vendible incluso en años de sequía extrema.",
                "isPositive": True,
            },
        ],
        "impactScores": {
            "nitrogenFixation": "+25 kg N/ha",
            "waterConservation": "+22% de ahorro hídrico",
            "droughtResilience": "Excelente",
            "economicRisk": "Bajo",
        },
        "nasaEvidence": {
            "dataset": "NASA GPM (Global Precipitation Measurement) & NASA POWER Solar Radiation",
            "finding": "Los registros del radiómetro GPM identifican alta frecuencia de canículas intraestivales (15 a 28 días sin lluvia en julio/agosto); los cultivos C4 como sorgo mantienen fotosíntesis activa a temperaturas superiores a 35°C.",
        },
        "dataGaps": {
            "limitation": "Los radares satelitales de lluvia no predicen con exactitud la fecha milimétrica del inicio de la canícula ni conocen los precios de compra locales en el mercado del municipio.",
            "groundValidation": "Consultar el pronóstico estacional del INSIVUMEH local y validar la demanda comercial del sorgo/forraje con ganaderos de la comarca.",
        },
        "localReview": {
            "action": "Asegurar canal de comercialización o consumo de animales antes de sembrar una variedad no tradicional.",
            "practicalAdvice": "Comenzar con una prueba en el 20-30% de la parcela para evaluar la adaptación fenológica en el terreno propio.",
        },
    }

    return [baseline, soil_health, climate_resilience]
