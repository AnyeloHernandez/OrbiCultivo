import React from 'react';
import { Header } from './Header';
import { PreferencesForm } from './LeftPanel/PreferencesForm';
import { AgroMap } from './LeftPanel/AgroMap';
import { ClimateScenarioSelector } from './CenterRightPanel/ClimateScenarioSelector';
import { VulnerabilityCards } from './CenterRightPanel/VulnerabilityCards';
import { ClimaticCharts } from './CenterRightPanel/ClimaticCharts';
import { StrategyComparison } from './BottomPanel/StrategyComparison';
import { MapPin, CloudSun, Sprout } from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-stone-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* ========================================================= */}
        {/* PASO 1: TU PARCELA (UBICACIÓN Y MAPA | CULTIVO Y TIERRA) */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
              1
            </span>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                Identifica tu Parcela
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              · Elige tu municipio de Guatemala y qué tienes sembrado en tu terreno
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
        <section className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
            <span className="w-8 h-8 rounded-full bg-sky-700 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
              2
            </span>
            <div className="flex items-center space-x-2">
              <CloudSun className="w-5 h-5 text-sky-700" />
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                Diagnóstico del Clima y Lluvias
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              · Respaldo con observaciones satelitales de la NASA para tus coordenadas
            </span>
          </div>

          {/* Simulador de Escenarios (El Niño / La Niña) */}
          <ClimateScenarioSelector />

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
        <section className="space-y-4 pt-2">
          <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
            <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
              3
            </span>
            <div className="flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                Recomendaciones para tu Siembra
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              · Decisiones agronómicas para ganar más, gastar menos abono químico y proteger tu tierra
            </span>
          </div>

          <StrategyComparison />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4 text-center text-xs text-stone-600 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} <span className="text-stone-900 font-bold">Olympus Forge</span> · Plataforma de Resiliencia Agrícola.
          </p>
          <p className="flex items-center gap-2">
            <span>Datos procesados con</span>
            <span className="text-emerald-700 font-bold">NASA POWER</span>
            <span>&</span>
            <span className="text-sky-700 font-bold">NASA SMAP</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
