import React from 'react';
import {
  Wheat,
  Sprout,
  Coffee,
  Carrot,
  Trees,
  Leaf,
  Layers,
  Shovel,
  Sun,
  Mountain,
  Shield,
  Coins,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { CropId, SoilId, ObjectiveId } from '../../types/agro';

export const PreferencesForm: React.FC = () => {
  const {
    selectedCrop,
    soilType,
    objective,
    setSelectedCrop,
    setSoilType,
    setObjective,
    isLoading,
  } = useAgroStore();

  const crops: { id: CropId; icon: React.ReactNode; name: string; helper: string }[] = [
    {
      id: 'maiz',
      icon: <Wheat className="w-5 h-5 text-amber-700" />,
      name: 'Maíz',
      helper: 'Milpa tradicional',
    },
    {
      id: 'frijol',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      name: 'Frijol',
      helper: 'Leguminosa',
    },
    {
      id: 'cafe',
      icon: <Coffee className="w-5 h-5 text-amber-900" />,
      name: 'Café',
      helper: 'Cafetal de altura',
    },
    {
      id: 'hortalizas',
      icon: <Carrot className="w-5 h-5 text-rose-700" />,
      name: 'Hortalizas',
      helper: 'Papa, tomate, verdura',
    },
    {
      id: 'cardamomo',
      icon: <Trees className="w-5 h-5 text-teal-700" />,
      name: 'Cardamomo',
      helper: 'Bosque húmedo',
    },
    {
      id: 'cana',
      icon: <Leaf className="w-5 h-5 text-lime-700" />,
      name: 'Caña',
      helper: 'Costa y valles',
    },
  ];

  const soils: { id: SoilId; icon: React.ReactNode; name: string; desc: string }[] = [
    {
      id: 'franco',
      icon: <Layers className="w-5 h-5 text-stone-700" />,
      name: 'Tierra Negra',
      desc: 'Suelta, rica y equilibrada',
    },
    {
      id: 'arcilloso',
      icon: <Shovel className="w-5 h-5 text-amber-800" />,
      name: 'Tierra de Barro',
      desc: 'Pegajosa, retiene agua',
    },
    {
      id: 'arenoso',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      name: 'Tierra Arenosa',
      desc: 'Seca rápido con el sol',
    },
    {
      id: 'volcanico',
      icon: <Mountain className="w-5 h-5 text-stone-800" />,
      name: 'Tierra Volcánica',
      desc: 'Ceniza fértil de altura',
    },
  ];

  const objectives: { id: ObjectiveId; icon: React.ReactNode; title: string; desc: string }[] = [
    {
      id: 'soil_health',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      title: 'Abonar y cuidar la tierra',
      desc: 'Meter abono natural y nitrógeno al suelo para que no se canse',
    },
    {
      id: 'climate_resilience',
      icon: <Shield className="w-5 h-5 text-sky-700" />,
      title: 'Aguantar sequías y calor',
      desc: 'Evitar que la canícula de julio o la falta de lluvia queme la siembra',
    },
    {
      id: 'yield_stability',
      icon: <Coins className="w-5 h-5 text-amber-700" />,
      title: 'Asegurar comida y cosecha',
      desc: 'Proteger la inversión y el sustento de la familia',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-5">
      {/* 1. SELECCIÓN DE CULTIVO */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-800 tracking-tight">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>1. ¿Qué cultivo tienes sembrado en tu terreno?</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {crops.map((c) => {
            const isSelected = selectedCrop === c.id;
            return (
              <button
                key={c.id}
                type="button"
                disabled={isLoading}
                onClick={() => setSelectedCrop(c.id)}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center sm:items-start relative ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 absolute top-1.5 right-1.5" />
                )}
                <div className="p-1.5 rounded-lg bg-white border border-stone-200/80 mb-1 shadow-2xs">
                  {c.icon}
                </div>
                <span className="font-bold text-xs">{c.name}</span>
                <span className="text-[10px] text-stone-500 hidden sm:inline leading-tight">
                  {c.helper}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SELECCIÓN DE TIPO DE TIERRA */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-800 tracking-tight">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>2. ¿Cómo se siente la tierra de tu parcela?</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {soils.map((s) => {
            const isSelected = soilType === s.id;
            return (
              <button
                key={s.id}
                type="button"
                disabled={isLoading}
                onClick={() => setSoilType(s.id)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2.5 relative ${
                  isSelected
                    ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs ring-2 ring-amber-600/30'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-white border border-stone-200/80 shrink-0 shadow-2xs">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs truncate">{s.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{s.desc}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SELECCIÓN DEL OBJETIVO */}
      <div className="space-y-2 pt-3 border-t border-stone-200">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-800 tracking-tight">
          <Shield className="w-4 h-4 text-sky-700" />
          <span>3. ¿Qué es lo que más te interesa lograr?</span>
        </label>
        <div className="space-y-2">
          {objectives.map((o) => {
            const isSelected = objective === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={isLoading}
                onClick={() => setObjective(o.id)}
                className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200/80 shrink-0 shadow-2xs">
                    {o.icon}
                  </div>
                  <div>
                    <p className="font-bold text-xs">{o.title}</p>
                    <p className="text-[11px] text-stone-600">{o.desc}</p>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
