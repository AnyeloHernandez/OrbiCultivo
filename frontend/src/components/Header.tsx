import React from 'react';
import { Sprout, Satellite, MapPin, RefreshCw } from 'lucide-react';
import { useAgroStore } from '../store/useAgroStore';

export const Header: React.FC = () => {
  const { coords, isLoading, analysisResult } = useAgroStore();

  return (
    <header className="bg-slate-900 border-b border-emerald-950/60 sticky top-0 z-30 px-4 py-3 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Marca y Propósito Campesino */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <Sprout className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Orbi<span className="text-emerald-400">Cultivo</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Guía Agrícola
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Consejos del clima y rotación de siembra para cuidar tu tierra
            </p>
          </div>
        </div>

        {/* Indicadores claros y amigables */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Ubicación actual */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium">
              {analysisResult?.location.departmentGuess
                ? analysisResult.location.departmentGuess.split('(')[0].trim()
                : 'Guatemala'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({coords.lat.toFixed(2)}°, {coords.lon.toFixed(2)}°)
            </span>
          </div>

          {/* Respaldo satelital explicado simple */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300">
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            <span>Datos climáticos:</span>
            <span className="text-emerald-400 font-semibold">Satélites NASA</span>
          </div>

          {/* Indicador de carga */}
          {isLoading && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span className="font-semibold text-xs">Consultando el clima...</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
