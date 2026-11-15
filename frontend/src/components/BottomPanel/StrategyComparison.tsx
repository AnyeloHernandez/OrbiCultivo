import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { StrategiesSkeleton } from '../Common/SkeletonLoader';

export const StrategyComparison: React.FC = () => {
  const { analysisResult, isLoading } = useAgroStore();

  if (isLoading || !analysisResult) {
    return <StrategiesSkeleton />;
  }

  const { selectedParameters } = analysisResult;
  const currentCrop = selectedParameters.crop.name;

  return (
    <div className="space-y-4">
      {/* Título de la sección */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              ¿Qué te conviene sembrar después? (3 Opciones para tu Terreno)
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Compara lo que pasa si sigues sembrando solo {currentCrop} frente a rotar con abonos verdes o cultivos resistentes
          </p>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span>Consejos prácticos de rotación</span>
        </div>
      </div>

      {/* Grid de las 3 opciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* OPCIÓN 1: MONOCULTIVO (LO DE SIEMPRE) */}
        <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/25 via-slate-900 to-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-rose-500/20 text-rose-300 border-rose-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>No Recomendado</span>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Opción 1: Seguir con solo {currentCrop}
              </h3>
              <p className="text-xs text-rose-300 mt-0.5 font-medium">
                Monocultivo tradicional sin descanso
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sembrar {currentCrop} una y otra vez en el mismo pedazo cansa la tierra. La planta consume siempre los mismos nutrientes y las plagas se acostumbran al terreno.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-start space-x-2 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>La tierra se agota y cada año pide más fertilizante químico caro.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>La lluvia se escurre sin entrar a la tierra; la sequía pega el doble.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Las plagas de raíz (como gallina ciega) aumentan temporada tras temporada.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <p className="text-[11px] text-slate-400 font-semibold">Resultado para tu bolsillo:</p>
            <p className="text-xs font-bold text-rose-400 mt-0.5">
              Alto riesgo de perder dinero si falta la lluvia
            </p>
          </div>
        </div>

        {/* OPCIÓN 2: SALUD DEL SUELO (RECOMENDADO) */}
        <div className="rounded-2xl border border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-xl ring-1 ring-emerald-500/30">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-emerald-500/25 text-emerald-300 border-emerald-500/50 shadow-sm flex items-center gap-1">
                <Sprout className="w-3 h-3" />
                <span>El Mejor para tu Tierra</span>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Opción 2: Rotar con Frijol Abono
              </h3>
              <p className="text-xs text-emerald-400 mt-0.5 font-medium">
                Regenerar el suelo con Canavalia o Mucuna
              </p>
            </div>

            {/* Secuencia simple */}
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-1.5 text-xs text-slate-200">
              <span className="font-semibold text-emerald-400">{currentCrop}</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="font-semibold text-white">Frijol Abono</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="text-slate-300">Descanso fértil</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Al terminar tu cosecha de {currentCrop}, siembras leguminosas de cobertura. Sus raíces aflojan la tierra dura y atrapan nitrógeno del aire para enriquecer la parcela.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Abono gratis:</strong> Le mete nitrógeno natural a tu tierra (te ahorras hasta 2 sacos de urea).</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Guarda la humedad:</strong> El rastrojo actúa como cobija para que el sol no seque la tierra.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Ahoga la maleza:</strong> Corta el ciclo de las plagas y la mala hierba.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <p className="text-[11px] text-slate-400 font-semibold">Resultado para tu bolsillo:</p>
            <p className="text-xs font-bold text-emerald-400 mt-0.5">
              Gastas menos en abono químico y tu tierra rinde más
            </p>
          </div>
        </div>

        {/* OPCIÓN 3: RESILIENCIA ANTE SEQUÍA */}
        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/25 via-slate-900 to-slate-900 p-5 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-cyan-500/20 text-cyan-300 border-cyan-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Seguro contra la Sequía</span>
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Opción 3: Variedades Resistentes
              </h3>
              <p className="text-xs text-cyan-400 mt-0.5 font-medium">
                Sorgo forrajero o semillas tolerantes al calor
              </p>
            </div>

            {/* Secuencia simple */}
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-1.5 text-xs text-slate-200">
              <span className="font-semibold text-cyan-400">{currentCrop}</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="font-semibold text-white">Sorgo / Maíz tolerante</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="text-slate-300">Cosecha fija</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Si viene un año con canícula prolongada o estás en zona seca, siembras cultivos rústicos que no mueren aunque falte la lluvia por varias semanas.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Aguanta el calor:</strong> Variedades con raíces profundas que buscan agua en el fondo.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Comida o forraje seguro:</strong> Si no llueve lo suficiente, tienes comida para tus animales.</span>
              </div>
              <div className="flex items-start space-x-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>No te quedas sin nada:</strong> Aseguras dinero para la casa aun en año seco.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <p className="text-[11px] text-slate-400 font-semibold">Resultado para tu bolsillo:</p>
            <p className="text-xs font-bold text-cyan-400 mt-0.5">
              Cosecha segura y protección contra la pérdida total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
