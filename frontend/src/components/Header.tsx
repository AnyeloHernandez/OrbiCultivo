import React, { useState } from 'react';
import { Sprout, Satellite, MapPin, RefreshCw, BookOpen } from 'lucide-react';
import { useAgroStore } from '../store/useAgroStore';
import { NasaScienceModal } from './Common/NasaScienceModal';

export const Header: React.FC = () => {
  const { coords, isLoading, analysisResult } = useAgroStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

          {/* Indicadores claros y Botón Educativo NASA */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Botón Educativo: ¿Cómo lee la NASA tu parcela? */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-emerald-500/50 text-slate-200 transition text-xs font-semibold shadow-sm group"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition" />
              <span>¿Cómo lee la NASA tu parcela?</span>
            </button>

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

            {/* Respaldo satelital */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>Satélites:</span>
              <span className="text-emerald-400 font-semibold">SMAP & POWER</span>
            </div>

            {/* Indicador de carga */}
            {isLoading && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="font-semibold text-xs">Consultando...</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal Educativo Científico */}
      <NasaScienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
