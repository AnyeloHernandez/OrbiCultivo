import React from 'react';
import { Header } from './Header';
import { PreferencesForm } from './LeftPanel/PreferencesForm';
import { AgroMap } from './LeftPanel/AgroMap';
import { VulnerabilityCards } from './CenterRightPanel/VulnerabilityCards';
import { ClimaticCharts } from './CenterRightPanel/ClimaticCharts';
import { StrategyComparison } from './BottomPanel/StrategyComparison';
import { MapPin, CloudSun, Sprout } from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* ========================================================= */}
        {/* PASO 1: TU PARCELA (50% UBICACIÓN Y MAPA | 50% CULTIVO Y TIERRA) */}
        {/* ========================================================= */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-sm flex items-center justify-center border border-emerald-500/40">
              1
            </span>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Identifica tu Parcela
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · Elige tu municipio de Guatemala y qué tienes sembrado
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Mitad Izquierda: Buscador de Municipio y Mapa */}
            <AgroMap />

            {/* Mitad Derecha: Selección de Cultivo, Tipo de Tierra y Objetivo */}
            <PreferencesForm />
          </div>
        </section>

        {/* ========================================================= */}
        {/* PASO 2: EL CLIMA EN TU ZONA (SEMÁFORO + CALENDARIO DE LLUVIAS) */}
        {/* ========================================================= */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold text-sm flex items-center justify-center border border-cyan-500/40">
              2
            </span>
            <div className="flex items-center space-x-2">
              <CloudSun className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Diagnóstico del Clima y Lluvias
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · Respaldo con observaciones satelitales de la NASA para tus coordenadas
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Semáforo del Clima (5 columnas en pantallas grandes) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <VulnerabilityCards />
            </div>

            {/* Calendario de Lluvias (7 columnas en pantallas grandes) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <ClimaticCharts />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PASO 3: RECOMENDACIÓN DE ROTACIÓN (EL RESULTADO PRINCIPAL) */}
        {/* ========================================================= */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-sm flex items-center justify-center border border-amber-500/40">
              3
            </span>
            <div className="flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-amber-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Recomendaciones para tu Siembra
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · Decisiones agronómicas para ganar más, gastar menos abono y cuidar tu tierra
            </span>
          </div>

          <StrategyComparison />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">Olympus Forge</span> · Plataforma de Resiliencia Agrícola.
          </p>
          <p className="flex items-center gap-2">
            <span>Datos procesados con</span>
            <span className="text-emerald-400 font-medium">NASA POWER</span>
            <span>&</span>
            <span className="text-cyan-400 font-medium">NASA SMAP</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
