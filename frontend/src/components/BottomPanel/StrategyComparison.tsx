import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Satellite,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Compass,
} from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { StrategiesSkeleton } from '../Common/SkeletonLoader';

export const StrategyComparison: React.FC = () => {
  const { analysisResult, isLoading } = useAgroStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading || !analysisResult) {
    return <StrategiesSkeleton />;
  }

  const { strategies, selectedParameters } = analysisResult;
  const currentCrop = selectedParameters.crop.name;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Título de la sección */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              ¿Qué te conviene sembrar después? (3 Opciones para tu Terreno)
            </h2>
          </div>
          <p className="text-xs text-stone-600 mt-0.5">
            Decisiones agronómicas basadas en datos satelitales NASA para tu parcela de {currentCrop}
          </p>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5 shadow-2xs">
          <Satellite className="w-3.5 h-3.5 text-emerald-700" />
          <span>Validado con Satélites NASA</span>
        </div>
      </div>

      {/* Grid de las 3 opciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-start">
        {strategies.map((strategy) => {
          const isBaseline = strategy.type === 'baseline';
          const isSoil = strategy.type === 'soil_health';
          const isExpanded = expandedId === strategy.id;

          const cardBorder = isBaseline
            ? 'border-stone-300 bg-white hover:border-rose-300 shadow-sm'
            : isSoil
            ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/30 shadow-md'
            : 'border-amber-400 bg-amber-50/20 shadow-sm';

          const tagBadge = isBaseline
            ? 'bg-stone-100 text-stone-700 border-stone-300'
            : isSoil
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : 'bg-amber-100 text-amber-800 border-amber-300';

          const iconWrapper = isBaseline
            ? 'bg-rose-50 text-rose-700 border border-rose-200'
            : isSoil
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-amber-100 text-amber-800 border border-amber-300';

          const pocketColor = isBaseline
            ? 'text-rose-700 font-bold'
            : isSoil
            ? 'text-emerald-800 font-bold'
            : 'text-amber-800 font-bold';

          return (
            <div
              key={strategy.id}
              className={`rounded-2xl border ${cardBorder} p-5 flex flex-col justify-between space-y-4 transition`}
            >
              <div className="space-y-3">
                {/* Header de la tarjeta */}
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2.5 rounded-xl ${iconWrapper}`}>
                    {isBaseline && <AlertTriangle className="w-5 h-5" />}
                    {isSoil && <Sprout className="w-5 h-5" />}
                    {!isBaseline && !isSoil && <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${tagBadge}`}>
                    {isBaseline && <AlertTriangle className="w-3 h-3" />}
                    {isSoil && <Sprout className="w-3 h-3" />}
                    {!isBaseline && !isSoil && <ShieldCheck className="w-3 h-3" />}
                    <span>{strategy.tag}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    {strategy.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-medium">
                    {strategy.subtitle}
                  </p>
                </div>

                {/* Secuencia de rotación */}
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center gap-1.5 text-xs text-stone-700">
                  {strategy.rotationCrops.map((crop, idx) => (
                    <React.Fragment key={idx}>
                      <span className="font-bold text-stone-900 px-2 py-0.5 rounded-md bg-white border border-stone-200 shadow-2xs">
                        {crop}
                      </span>
                      {idx < strategy.rotationCrops.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {strategy.description}
                </p>

                {/* Beneficios o Advertencias */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  {strategy.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs">
                      {h.isPositive ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <span className={h.isPositive ? 'text-stone-700' : 'text-rose-800 font-medium'}>
                        {h.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón Acordeón: Evidencia Satelital NASA & Validación de Campo (Requisito NASA) */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(strategy.id)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/90 border border-stone-300 text-xs text-stone-800 flex items-center justify-between transition shadow-2xs"
                >
                  <span className="flex items-center gap-1.5 font-bold text-stone-800">
                    <Satellite className="w-3.5 h-3.5 text-emerald-700" />
                    Respaldo Satelital y Validación Local
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {/* Detalle desplegable de la NASA y Trabajo de Campo */}
                {isExpanded && (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs text-stone-700 animate-fadeIn shadow-inner">
                    {/* 1. Evidencia NASA */}
                    {strategy.nasaEvidence && (
                      <div className="space-y-1">
                        <span className="font-bold text-sky-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <Satellite className="w-3 h-3 text-sky-700" />
                          Evidencia Satelital NASA:
                        </span>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {strategy.nasaEvidence.dataset}
                        </p>
                        <p className="text-stone-700 text-[11px] leading-relaxed">
                          {strategy.nasaEvidence.finding}
                        </p>
                      </div>
                    )}

                    {/* 2. Lagunas de información e incertidumbre */}
                    {strategy.dataGaps && (
                      <div className="space-y-1 pt-2 border-t border-stone-200">
                        <span className="font-bold text-amber-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <HelpCircle className="w-3 h-3 text-amber-700" />
                          Limitación del Satélite (Data Gap):
                        </span>
                        <p className="text-stone-700 text-[11px] leading-relaxed">
                          {strategy.dataGaps.limitation}
                        </p>
                        <p className="text-emerald-800 text-[11px] font-bold">
                          <strong>Comprobación en tierra:</strong> {strategy.dataGaps.groundValidation}
                        </p>
                      </div>
                    )}

                    {/* 3. Revisión Local con Experto */}
                    {strategy.localReview && (
                      <div className="space-y-1 pt-2 border-t border-stone-200">
                        <span className="font-bold text-emerald-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <Compass className="w-3 h-3 text-emerald-700" />
                          Revisión en tu Comunidad:
                        </span>
                        <p className="text-stone-700 text-[11px] leading-relaxed">
                          {strategy.localReview.action}
                        </p>
                        <p className="text-stone-600 text-[11px]">
                          <strong>Consejo de campo:</strong> {strategy.localReview.practicalAdvice}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pie con resultado económico */}
              <div className="pt-3 border-t border-stone-200 text-xs bg-stone-50/80 -mx-5 -mb-5 p-4 rounded-b-2xl">
                <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                  Resultado para tu bolsillo:
                </p>
                <p className={`text-xs mt-0.5 ${pocketColor}`}>
                  {isBaseline
                    ? 'Alto riesgo de pérdida económica si la sequía continúa'
                    : isSoil
                    ? 'Ahorras en fertilizantes químicos y la tierra rinde más'
                    : 'Cosecha segura y protección contra la quiebra familiar'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
