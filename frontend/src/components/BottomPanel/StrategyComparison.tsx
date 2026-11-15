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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              ¿Qué te conviene sembrar después? (3 Opciones para tu Terreno)
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Decisiones agronómicas basadas en datos satelitales NASA para tu parcela de {currentCrop}
          </p>
        </div>
        <div className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
          <Satellite className="w-3.5 h-3.5 text-emerald-400" />
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
            ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/25 via-slate-900 to-slate-900'
            : isSoil
            ? 'border-emerald-500/60 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900 ring-1 ring-emerald-500/30'
            : 'border-cyan-500/40 bg-gradient-to-b from-cyan-950/25 via-slate-900 to-slate-900';

          const tagBadge = isBaseline
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            : isSoil
            ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50'
            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';

          const iconWrapper = isBaseline
            ? 'bg-rose-500/15 text-rose-400'
            : isSoil
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-cyan-500/15 text-cyan-400';

          const pocketColor = isBaseline
            ? 'text-rose-400'
            : isSoil
            ? 'text-emerald-400'
            : 'text-cyan-400';

          return (
            <div
              key={strategy.id}
              className={`rounded-2xl border ${cardBorder} p-5 flex flex-col justify-between space-y-4 shadow-xl transition`}
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
                  <h3 className="text-base font-bold text-white">
                    {strategy.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    {strategy.subtitle}
                  </p>
                </div>

                {/* Secuencia de rotación */}
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center gap-1 text-xs text-slate-200">
                  {strategy.rotationCrops.map((crop, idx) => (
                    <React.Fragment key={idx}>
                      <span className="font-semibold text-white px-1.5 py-0.5 rounded bg-slate-800/80">
                        {crop}
                      </span>
                      {idx < strategy.rotationCrops.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {strategy.description}
                </p>

                {/* Beneficios o Advertencias */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {strategy.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs">
                      {h.isPositive ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span className={h.isPositive ? 'text-slate-200' : 'text-rose-300'}>
                        {h.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón Acordeón: Evidencia Satelital NASA & Validación de Campo (Requisito NASA) */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(strategy.id)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                    <Satellite className="w-3.5 h-3.5" />
                    Respaldo Satelital y Validación Local
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Detalle desplegable de la NASA y Trabajo de Campo */}
                {isExpanded && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs animate-fadeIn">
                    {/* 1. Evidencia NASA */}
                    {strategy.nasaEvidence && (
                      <div className="space-y-1">
                        <span className="font-bold text-cyan-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <Satellite className="w-3 h-3 text-cyan-400" />
                          Evidencia Satelital NASA:
                        </span>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {strategy.nasaEvidence.dataset}
                        </p>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {strategy.nasaEvidence.finding}
                        </p>
                      </div>
                    )}

                    {/* 2. Lagunas de información e incertidumbre */}
                    {strategy.dataGaps && (
                      <div className="space-y-1 pt-2 border-t border-slate-800/80">
                        <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <HelpCircle className="w-3 h-3 text-amber-400" />
                          Limitación del Satélite (Data Gap):
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {strategy.dataGaps.limitation}
                        </p>
                        <p className="text-emerald-400 text-[11px] font-medium">
                          <strong>Comprobación en tierra:</strong> {strategy.dataGaps.groundValidation}
                        </p>
                      </div>
                    )}

                    {/* 3. Revisión Local con Experto */}
                    {strategy.localReview && (
                      <div className="space-y-1 pt-2 border-t border-slate-800/80">
                        <span className="font-bold text-emerald-300 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <Compass className="w-3 h-3 text-emerald-400" />
                          Revisión en tu Comunidad:
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {strategy.localReview.action}
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          <strong>Consejo práctico:</strong> {strategy.localReview.practicalAdvice}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pie con resultado económico */}
              <div className="pt-3 border-t border-slate-800 text-xs bg-slate-950/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
                <p className="text-[11px] text-slate-400 font-semibold">Resultado para tu bolsillo:</p>
                <p className={`text-xs font-bold mt-0.5 ${pocketColor}`}>
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
