# OrbiCultivo · Plataforma de Resiliencia Agrícola
> **Olympus Forge** | Proyecto desarrollado para el reto *Field Shift: Adapting Farms with NASA Data* (NASA Space Apps Challenge).

---

## Propuesta de Valor y Contexto
OrbiCultivo actúa como un **traductor inteligente entre la ciencia de datos satelitales de la NASA (SMAP, POWER, ECOSTRESS, GPM) y la realidad cotidiana del campo**. 
A través de un diseño centrado en el agricultor (*Farmer-Centered Design*), la plataforma permite al productor seleccionar su parcela en un mapa interactivo de Guatemala y definir tres parámetros clave:
1. **Cultivo actual** (Maíz, Frijol, Café, Cardamomo, Hortalizas, Caña).
2. **Tipo de suelo** (Franco, Arcilloso, Arenoso, Volcánico / Andosol).
3. **Objetivo principal** (Salud del suelo, Resiliencia climática ante sequías, Estabilidad de ingresos).

El sistema procesa en tiempo real las observaciones satelitales para entregar:
- **Diagnóstico de Vulnerabilidad Climática**: Nivel de estrés hídrico, probabilidad y umbral de heladas, índice de humedad radicular SMAP y estrés térmico.
- **Dinámica Climática Estacional**: Gráficas de barras comparando precipitación vs demanda hídrica del cultivo y curvas de humedad de suelo y temperaturas.
- **Comparativa de 3 Estrategias de Rotación**:
  - **Línea Base (Monocultivo)**: Alertas sobre riesgos de agotamiento de nitrógeno, pérdida de retención hídrica y plagas recurrentes.
  - **Salud del Suelo**: Rotaciones con leguminosas de cobertura (*Canavalia*, *Mucuna*, frijol de abono) justificando fijación de nitrógeno (+65 kg N/ha), incremento de materia orgánica y retención de humedad (+32%).
  - **Resiliencia Climática**: Alternativas tolerantes a sequía extrema (sorgo forrajero, frijol tépari, agrosilvopastoreo) para blindar los ingresos de la familia campesina.

---

## Arquitectura del Sistema

```
OrbiCultivo/
├── docker-compose.yml           # Orquestación con Docker / Podman
├── backend/
│   ├── Dockerfile               # Contenedor de backend FastAPI
│   ├── main.py                  # API principal y montaje del frontend compilado
│   ├── agro/                    # Módulo agronómico y de resiliencia (Olympus Forge)
│   │   ├── constants.py         # Catálogo de cultivos, suelos y objetivos
│   │   ├── service.py           # Modelado científico, balance hídrico y 3 estrategias
│   │   └── router.py            # Endpoints POST /agro/evaluate y GET /agro/catalog
│   ├── nasapower/               # Cliente y servicios de NASA POWER API
│   ├── copernicus/              # Cliente STAC y estadísticas de Copernicus CDSE
│   └── metrics/                 # Métricas espaciales por zonas
└── frontend/
    ├── Dockerfile               # Multi-stage build (Dev & Nginx prod)
    ├── vite.config.ts           # Configuración de Vite con proxy hacia el backend
    ├── tailwind.config.js       # Paleta temática agronómica
    ├── src/
    │   ├── types/agro.ts        # Tipado estricto TypeScript
    │   ├── store/useAgroStore.ts# Estado global de sesión con Zustand
    │   ├── services/agroApi.ts  # Cliente API con fallback agronómico resiliente
    │   ├── hooks/useAgroData.ts # Custom hook reactivo con debounce
    │   └── components/
    │       ├── Header.tsx       # Barra de navegación con badges satelitales
    │       ├── LeftPanel/
    │       │   ├── PreferencesForm.tsx # Formulario con react-hook-form
    │       │   └── AgroMap.tsx         # Mapa interactivo Leaflet centrado en Guatemala
    │       ├── CenterRightPanel/
    │       │   ├── VulnerabilityCards.tsx # Tarjetas condicionales de estrés
    │       │   └── ClimaticCharts.tsx     # Gráficas Recharts (Balance hídrico & SMAP)
    │       └── BottomPanel/
    │           └── StrategyComparison.tsx # Comparativa de las 3 estrategias de rotación
```

---

## Puesta en Marcha

### Opción 1: Con Docker / Podman (Recomendado)
Levanta tanto el backend de FastAPI como el frontend con hot-reloading:

```bash
docker compose up --build
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API & Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Opción 2: Ejecución Local

#### 1. Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate       # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 2. Frontend (Vite + React + TypeScript)
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 Endpoints Principales
- `POST /agro/evaluate`: Evalúa vulnerabilidad climática y genera las 3 estrategias de rotación para las coordenadas y parámetros de la parcela.
- `GET /agro/catalog`: Lista los cultivos, tipos de suelo y objetivos disponibles.
- `GET /nasapower/daily`: Consulta directa de series temporales de NASA POWER.
- `GET /copernicus/summary`: Búsqueda de escenas Sentinel-2 y NDVI.
- `POST /metrics/zones`: Cálculo de métricas agregadas por zonas geográficas.
