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

  const crops: { id: CropId; icon: React.ReactNode; name: string; helper: string; color: string }[] = [
    {
      id: 'maiz',
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      name: 'Maíz',
      helper: 'Milpa tradicional',
      color: 'border-amber-500/40 bg-amber-500/10',
    },
    {
      id: 'frijol',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      name: 'Frijol',
      helper: 'Leguminosa',
      color: 'border-emerald-500/40 bg-emerald-500/10',
    },
    {
      id: 'cafe',
      icon: <Coffee className="w-5 h-5 text-orange-400" />,
      name: 'Café',
      helper: 'Cafetal de altura',
      color: 'border-orange-500/40 bg-orange-500/10',
    },
    {
      id: 'hortalizas',
      icon: <Carrot className="w-5 h-5 text-rose-400" />,
      name: 'Hortalizas',
      helper: 'Papa, tomate, brócoli',
      color: 'border-rose-500/40 bg-rose-500/10',
    },
    {
      id: 'cardamomo',
      icon: <Trees className="w-5 h-5 text-teal-400" />,
      name: 'Cardamomo',
      helper: 'Bosque húmedo',
      color: 'border-teal-500/40 bg-teal-500/10',
    },
    {
      id: 'cana',
      icon: <Leaf className="w-5 h-5 text-lime-400" />,
      name: 'Caña',
      helper: 'Costa y valles',
      color: 'border-lime-500/40 bg-lime-500/10',
    },
  ];

  const soils: { id: SoilId; icon: React.ReactNode; name: string; desc: string }[] = [
    {
      id: 'franco',
      icon: <Layers className="w-5 h-5 text-amber-300" />,
      name: 'Tierra Negra',
      desc: 'Suelta y equilibrada',
    },
    {
      id: 'arcilloso',
      icon: <Shovel className="w-5 h-5 text-orange-400" />,
      name: 'Tierra de Barro',
      desc: 'Pegajosa, retiene agua',
    },
    {
      id: 'arenoso',
      icon: <Sun className="w-5 h-5 text-yellow-300" />,
      name: 'Tierra Arenosa',
      desc: 'Seca rápido al sol',
    },
    {
      id: 'volcanico',
      icon: <Mountain className="w-5 h-5 text-purple-300" />,
      name: 'Tierra Volcánica',
      desc: 'Ceniza fértil de altura',
    },
  ];

  const objectives: { id: ObjectiveId; icon: React.ReactNode; title: string; desc: string }[] = [
    {
      id: 'soil_health',
      icon: <Sprout className="w-5 h-5 text-emerald-400" />,
      title: 'Abonar y cuidar la tierra',
      desc: 'Meter abono natural y nitrógeno al suelo',
    },
    {
      id: 'climate_resilience',
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      title: 'Aguantar sequías y calor',
      desc: 'Evitar que la canícula seque la siembra',
    },
    {
      id: 'yield_stability',
      icon: <Coins className="w-5 h-5 text-amber-400" />,
      title: 'Asegurar comida y cosecha',
      desc: 'Proteger la inversión de la familia',
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-5">
      {/* 1. SELECCIÓN DE CULTIVO */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200 tracking-wide">
          <Sparkles className="w-4 h-4 text-emerald-400" />
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
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-1.5 right-1.5" />
                )}
                <div className="p-1.5 rounded-lg bg-slate-900/70 mb-1">
                  {c.icon}
                </div>
                <span className="font-bold text-xs">{c.name}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline leading-tight">
                  {c.helper}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SELECCIÓN DE TIPO DE TIERRA */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200 tracking-wide">
          <Layers className="w-4 h-4 text-amber-400" />
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
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-slate-900/70 shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs truncate">{s.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{s.desc}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SELECCIÓN DEL OBJETIVO */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-200 tracking-wide">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>3. ¿Qué es lo que más te interesa lograr?</span>
        </label>
        <div className="space-y-1.5">
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
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-900/70 shrink-0">
                    {o.icon}
                  </div>
                  <div>
                    <p className="font-bold text-xs">{o.title}</p>
                    <p className="text-[10px] text-slate-400">{o.desc}</p>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
