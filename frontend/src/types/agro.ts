export type CropId = 'maiz' | 'frijol' | 'cafe' | 'cardamomo' | 'hortalizas' | 'cana';
export type SoilId = 'franco' | 'arcilloso' | 'arenoso' | 'volcanico';
export type ObjectiveId = 'soil_health' | 'climate_resilience' | 'yield_stability';

export interface CropInfo {
  id: CropId;
  name: string;
  scientificName: string;
  waterNeedMm: number; // mm por ciclo
  growingCycleDays: number;
  droughtTolerance: 'Baja' | 'Media' | 'Alta';
  frostTolerance: 'Baja' | 'Media' | 'Alta';
  description: string;
}

export interface SoilInfo {
  id: SoilId;
  name: string;
  description: string;
  waterRetention: 'Baja' | 'Media' | 'Alta' | 'Muy Alta';
  drainage: 'Rápido' | 'Moderado' | 'Lento';
  organicMatterTypical: string;
}

export interface VulnerabilityMetrics {
  waterStress: {
    score: number; // 0 - 100
    level: 'Bajo' | 'Moderado' | 'Severo' | 'Crítico';
    color: 'green' | 'yellow' | 'orange' | 'red';
    accumulatedDeficitMm: number;
    description: string;
  };
  frostRisk: {
    level: 'Bajo' | 'Moderado' | 'Alto';
    color: 'green' | 'yellow' | 'red';
    probabilityPercent: number;
    minExpectedTempC: number;
    description: string;
  };
  soilMoisture: {
    smapIndexPercent: number; // 0 - 100
    status: 'Óptima' | 'Adecuada' | 'Deficitaria' | 'Muy Seca';
    color: 'green' | 'yellow' | 'orange' | 'red';
    trend: 'Subiendo' | 'Estable' | 'Bajando';
    description: string;
  };
  heatStress: {
    daysAbove32C: number;
    avgRadiationKwh: number;
    status: 'Normal' | 'Moderado' | 'Extremo';
  };
}

export interface TimeSeriesPoint {
  month: string;
  precipitation: number; // mm
  cropDemand: number; // mm
  soilMoisture: number; // %
  tempMin: number; // °C
  tempMax: number; // °C
}

export interface StrategyHighlight {
  iconType: 'check' | 'warning' | 'water' | 'soil' | 'shield';
  text: string;
  isPositive: boolean;
}

export interface RotationStrategy {
  id: string;
  type: 'baseline' | 'soil_health' | 'climate_resilience';
  title: string;
  subtitle: string;
  tag: string;
  colorTheme: 'red' | 'emerald' | 'cyan';
  rotationCrops: string[];
  description: string;
  highlights: StrategyHighlight[];
  impactScores: {
    nitrogenFixation: string; // ej: "+60 kg N/ha" o "Negativo (-35 kg/ha)"
    waterConservation: string; // ej: "+28% retención"
    droughtResilience: 'Baja' | 'Media' | 'Alta' | 'Excelente';
    economicRisk: 'Alto' | 'Moderado' | 'Bajo';
  };
  nasaEvidence?: {
    dataset: string;
    finding: string;
  };
  dataGaps?: {
    limitation: string;
    groundValidation: string;
  };
  localReview?: {
    action: string;
    practicalAdvice: string;
  };
}

export interface AgroAnalysisResult {
  location: {
    lat: number;
    lon: number;
    elevationMeters: number;
    departmentGuess: string;
  };
  selectedParameters: {
    crop: CropInfo;
    soil: SoilInfo;
    objective: ObjectiveId;
  };
  dataSource: {
    nasaPower: boolean;
    copernicus: boolean;
    lastUpdated: string;
  };
  vulnerability: VulnerabilityMetrics;
  timeSeries: TimeSeriesPoint[];
  strategies: RotationStrategy[];
}
