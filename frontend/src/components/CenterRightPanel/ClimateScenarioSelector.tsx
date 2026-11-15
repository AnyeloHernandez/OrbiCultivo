import React from 'react';
import { CloudSun, SunMedium, CloudRain, Sliders, Info } from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { ClimateScenario } from '../../types/agro';

export const ClimateScenarioSelector: React.FC = () => {
  const { climateScenario, setClimateScenario, isLoading } = useAgroStore();

  const scenarios: {
    id: ClimateScenario;
    name: string;
    badge: string;
    desc: string;
    icon: React.ReactNode;
    colorActive: string;
  }[] = [
    {
      id: 'normal',
      name: 'Año Normal',
      badge: 'Promedio Satelital',
      desc: 'Histórico de precipitaciones y temperaturas de NASA POWER y SMAP.',
      icon: <CloudSun className="w-4 h-4 text-emerald-400" />,
      colorActive: 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500/40',
    },
    {
      id: 'drought',
      name: 'Sequía Fuerte ("El Niño")',
      badge: '-32% Lluvia | +1.8°C Calor',
      desc: 'Simula canícula prolongada y estrés hídrico severo en tu cultivo.',
      icon: <SunMedium className="w-4 h-4 text-amber-400" />,
      colorActive: 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/40',
    },
    {
      id: 'rainy',
      name: 'Muy Lluvioso ("La Niña")',
      badge: '+30% Lluvia',
      desc: 'Simula lluvias intensas con riesgo de saturación y hongos de raíz.',
      icon: <CloudRain className="w-4 h-4 text-cyan-400" />,
      colorActive: 'bg-cyan-500/20 border-cyan-500 text-white ring-1 ring-cyan-500/40',
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
            Simulador de Escenarios Climáticos
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">
          ¿Y si este año viene sequía o temporal?
        </span>
      </div>

      {/* 3 Botones de Escenario */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {scenarios.map((sc) => {
          const isSelected = climateScenario === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              disabled={isLoading}
              onClick={() => setClimateScenario(sc.id)}
              className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                isSelected
                  ? `${sc.colorActive} shadow-md`
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded-lg bg-slate-900/60">
                    {sc.icon}
                  </div>
                  <span className="font-bold text-xs">{sc.name}</span>
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                  isSelected ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-slate-800 text-slate-400 border-slate-700/60'
                }`}>
                  {sc.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {sc.desc}
              </p>
            </button>
          );
        })}
      </div>

      {climateScenario !== 'normal' && (
        <div className="flex items-start space-x-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <p className="leading-relaxed">
            {climateScenario === 'drought' ? (
              <span>
                <strong>Modo Simulación El Niño activo:</strong> El semáforo y la gráfica se han recalculado con un 32% menos de lluvia y mayor temperatura. Observa en el <strong>Paso 3</strong> cómo la rotación con abonos verdes o variedades resistentes amortigua la pérdida.
              </span>
            ) : (
              <span>
                <strong>Modo Simulación La Niña activo:</strong> Con un 30% más de precipitación, el estrés por sequía disminuye pero aumenta el riesgo de encharcamiento en tierras arcillosas.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
