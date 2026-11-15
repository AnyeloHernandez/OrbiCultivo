import { create } from 'zustand';
import { CropId, SoilId, ObjectiveId, ClimateScenario, AgroAnalysisResult } from '../types/agro';

interface AgroState {
  // Session variables
  coords: { lat: number; lon: number };
  selectedCrop: CropId;
  soilType: SoilId;
  objective: ObjectiveId;
  climateScenario: ClimateScenario;
  radiusKm: number;

  // Data & loading state
  isLoading: boolean;
  error: string | null;
  analysisResult: AgroAnalysisResult | null;

  // Actions
  setCoords: (coords: { lat: number; lon: number }) => void;
  setSelectedCrop: (crop: CropId) => void;
  setSoilType: (soil: SoilId) => void;
  setObjective: (objective: ObjectiveId) => void;
  setClimateScenario: (scenario: ClimateScenario) => void;
  setRadiusKm: (radius: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setAnalysisResult: (result: AgroAnalysisResult | null) => void;
}

export const useAgroStore = create<AgroState>((set) => ({
  // Default coordinates centered in Guatemala (15.5° N, -90.3° W)
  coords: { lat: 15.5000, lon: -90.3000 },
  selectedCrop: 'maiz',
  soilType: 'franco',
  objective: 'soil_health',
  climateScenario: 'normal',
  radiusKm: 5,

  isLoading: false,
  error: null,
  analysisResult: null,

  setCoords: (coords) => set({ coords }),
  setSelectedCrop: (selectedCrop) => set({ selectedCrop }),
  setSoilType: (soilType) => set({ soilType }),
  setObjective: (objective) => set({ objective }),
  setClimateScenario: (climateScenario) => set({ climateScenario }),
  setRadiusKm: (radiusKm) => set({ radiusKm }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
}));
