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
    icon: React.ReactNode;
    colorActive: string;
  }[] = [
    {
      id: 'normal',
      name: 'Año Normal',
      badge: 'Lluvia habitual',
      icon: <CloudSun className="w-4 h-4 text-emerald-700" />,
      colorActive: 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/30',
    },
    {
      id: 'drought',
      name: 'Año Seco (El Niño)',
      badge: '-32% lluvia',
      icon: <SunMedium className="w-4 h-4 text-amber-700" />,
      colorActive: 'bg-amber-50 border-amber-600 text-amber-950 ring-2 ring-amber-600/30',
    },
    {
      id: 'rainy',
      name: 'Año Lluvioso (La Niña)',
      badge: '+30% lluvia',
      icon: <CloudRain className="w-4 h-4 text-sky-700" />,
      colorActive: 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-600/30',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 border-b border-stone-200 pb-2.5">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-sky-700" />
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight">
            Simulador de Clima para tu Planificación
          </h3>
        </div>
        <span className="text-[11px] text-stone-500">
          ¿Y si este año viene sequía o temporal?
        </span>
      </div>

      {/* 3 Botones de Escenario Limpios */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {scenarios.map((sc) => {
          const isSelected = climateScenario === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              disabled={isLoading}
              onClick={() => setClimateScenario(sc.id)}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? `${sc.colorActive} shadow-xs`
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  {sc.icon}
                </div>
                <span className="font-bold text-xs">{sc.name}</span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                  isSelected
                    ? 'bg-white border-stone-300 text-stone-900 shadow-2xs'
                    : 'bg-stone-200/60 text-stone-600 border-stone-300'
                }`}
              >
                {sc.badge}
              </span>
            </button>
          );
        })}
      </div>

      {climateScenario !== 'normal' && (
        <div className="flex items-start space-x-2 text-xs text-amber-950 bg-amber-50 border border-amber-300 p-2.5 rounded-xl">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
          <p className="leading-relaxed">
            {climateScenario === 'drought' ? (
              <span>
                <strong>Modo Sequía activo:</strong> Calculado con 32% menos lluvia. Revisa abajo cómo la rotación con Canavalia retiene el agua en el suelo.
              </span>
            ) : (
              <span>
                <strong>Modo Lluvioso activo:</strong> Calculado con 30% más precipitación. Precaución con encharcamientos en tierra de barro.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
