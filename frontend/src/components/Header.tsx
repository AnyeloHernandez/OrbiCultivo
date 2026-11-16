import React, { useState } from 'react';
import { Sprout, Satellite, MapPin, RefreshCw, BookOpen } from 'lucide-react';
import { useAgroStore } from '../store/useAgroStore';
import { NasaScienceModal } from './Common/NasaScienceModal';

export const Header: React.FC = () => {
  const { coords, isLoading, analysisResult } = useAgroStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur border-b border-stone-200 sticky top-0 z-30 px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Marca Campesina y Propósito */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-900/10">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">
                  Orbi<span className="text-emerald-700">Cultivo</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Guía de Campo
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                Consejos del clima y rotación de siembra para cuidar tu tierra
              </p>
            </div>
          </div>

          {/* Acciones claras y ubicación del agricultor */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Botón Educativo: ¿Cómo lee la NASA tu parcela? */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/90 border border-stone-300 text-stone-800 transition text-xs font-semibold shadow-xs group"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition" />
              <span>¿Cómo lee la NASA tu parcela?</span>
            </button>

            {/* Ubicación actual en Guatemala */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="font-bold">
                {analysisResult?.location.departmentGuess
                  ? analysisResult.location.departmentGuess.split('(')[0].trim()
                  : 'Guatemala'}
              </span>
              <span className="text-[11px] text-emerald-700/80 font-mono">
                ({coords.lat.toFixed(2)}°, {coords.lon.toFixed(2)}°)
              </span>
            </div>

            {/* Respaldo satelital */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700">
              <Satellite className="w-3.5 h-3.5 text-sky-600" />
              <span>Satélites:</span>
              <span className="text-emerald-800 font-bold">SMAP & POWER</span>
            </div>

            {/* Indicador de consulta */}
            {isLoading && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                <span className="font-bold text-xs">Consultando el clima...</span>
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
