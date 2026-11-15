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

  const crops: { id: CropId; icon: React.ReactNode; name: string }[] = [
    {
      id: 'maiz',
      icon: <Wheat className="w-5 h-5 text-amber-700" />,
      name: 'Maíz',
    },
    {
      id: 'frijol',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      name: 'Frijol',
    },
    {
      id: 'cafe',
      icon: <Coffee className="w-5 h-5 text-amber-900" />,
      name: 'Café',
    },
    {
      id: 'hortalizas',
      icon: <Carrot className="w-5 h-5 text-rose-700" />,
      name: 'Hortalizas',
    },
    {
      id: 'cardamomo',
      icon: <Trees className="w-5 h-5 text-teal-700" />,
      name: 'Cardamomo',
    },
    {
      id: 'cana',
      icon: <Leaf className="w-5 h-5 text-lime-700" />,
      name: 'Caña',
    },
  ];

  const soils: { id: SoilId; icon: React.ReactNode; name: string }[] = [
    {
      id: 'franco',
      icon: <Layers className="w-5 h-5 text-stone-700" />,
      name: 'Tierra Negra',
    },
    {
      id: 'arcilloso',
      icon: <Shovel className="w-5 h-5 text-amber-800" />,
      name: 'Tierra de Barro',
    },
    {
      id: 'arenoso',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      name: 'Tierra Arenosa',
    },
    {
      id: 'volcanico',
      icon: <Mountain className="w-5 h-5 text-stone-800" />,
      name: 'Tierra Volcánica',
    },
  ];

  const objectives: { id: ObjectiveId; icon: React.ReactNode; title: string }[] = [
    {
      id: 'soil_health',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      title: 'Abonar y nutrir la tierra',
    },
    {
      id: 'climate_resilience',
      icon: <Shield className="w-5 h-5 text-sky-700" />,
      title: 'Aguantar sequías y calor',
    },
    {
      id: 'yield_stability',
      icon: <Coins className="w-5 h-5 text-amber-700" />,
      title: 'Asegurar buena cosecha',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4">
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
                className={`py-3 px-2 rounded-xl border text-center transition flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 absolute top-1.5 right-1.5" />
                )}
                <div className="p-2 rounded-lg bg-white border border-stone-200/80 mb-1.5 shadow-2xs">
                  {c.icon}
                </div>
                <span className="font-bold text-xs">{c.name}</span>
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
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-white border border-stone-200/80 shrink-0 shadow-2xs">
                  {s.icon}
                </div>
                <span className="font-bold text-xs truncate flex-1">{s.name}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {objectives.map((o) => {
            const isSelected = objective === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={isLoading}
                onClick={() => setObjective(o.id)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-white border border-stone-200/80 shrink-0 shadow-2xs">
                    {o.icon}
                  </div>
                  <span className="font-bold text-xs">{o.title}</span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
