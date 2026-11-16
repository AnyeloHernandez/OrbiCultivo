import { useEffect, useRef, useCallback } from 'react';
import { useAgroStore } from '../store/useAgroStore';
import { fetchAgroAnalysis } from '../services/agroApi';

export function useAgroData() {
  const {
    coords,
    selectedCrop,
    soilType,
    objective,
    climateScenario,
    setLoading,
    setError,
    setAnalysisResult,
  } = useAgroStore();

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAgroAnalysis(
        coords.lat,
        coords.lon,
        selectedCrop,
        soilType,
        objective,
        climateScenario
      );
      setAnalysisResult(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido al calcular métricas agroclimáticas';
      setError(message);
    } finally {
      // Simular un mínimo tiempo para mostrar transición fluida del skeleton si fue instantáneo
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  }, [coords.lat, coords.lon, selectedCrop, soilType, objective, climateScenario, setLoading, setError, setAnalysisResult]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce de 300ms para evitar spam al mover el mapa rápidamente
    debounceTimerRef.current = setTimeout(() => {
      executeFetch();
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [executeFetch]);

  return { refetch: executeFetch };
}
