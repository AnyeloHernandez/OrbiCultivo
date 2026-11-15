import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from 'recharts';
import { Calendar, AlertTriangle, Sprout, ShieldAlert, Sun } from 'lucide-react';
import { useAgroStore } from '../../store/useAgroStore';
import { ChartSkeleton } from '../Common/SkeletonLoader';

export const ClimaticCharts: React.FC = () => {
  const { analysisResult, isLoading } = useAgroStore();

  if (isLoading || !analysisResult) {
    return <ChartSkeleton />;
  }

  const { timeSeries, selectedParameters } = analysisResult;
  const cropName = selectedParameters.crop.name;

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-4 h-full flex flex-col justify-between">
      {/* Encabezado sin tecnicismos */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Calendario: Meses con Lluvia vs Lo que pide tu {cropName}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Observaciones satelitales NASA que identifican sequías estacionales y temporadas de suelo baldío
          </p>
        </div>

        {/* Leyenda visual directa */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500"></span>
            <span className="text-slate-200 font-medium">Lluvia esperada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400"></span>
            <span className="text-slate-200 font-medium">Agua que pide {cropName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/60"></span>
            <span className="text-amber-300 font-medium">Canícula</span>
          </div>
        </div>
      </div>

      {/* Barra de Fases del Año y Suelo Baldío (Requisito NASA) */}
      <div className="grid grid-cols-4 gap-1.5 text-[11px] font-medium text-center">
        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/70 text-slate-400">
          <span className="font-bold text-slate-300 block">Ene - Abr</span>
          <span className="text-[10px] text-amber-400/90 flex items-center justify-center gap-1">
            <Sun className="w-3 h-3" />
            Suelo Baldío
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
          <span className="font-bold text-white block">May - Jun</span>
          <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1">
            <Sprout className="w-3 h-3" />
            Siembra Activa
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-200 ring-1 ring-amber-500/30">
          <span className="font-bold text-white block">Jul - Ago</span>
          <span className="text-[10px] text-amber-300 font-semibold flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Canícula Crítica
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/70 text-slate-400">
          <span className="font-bold text-slate-300 block">Sep - Dic</span>
          <span className="text-[10px] text-slate-300 flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3" />
            Cosecha / Descanso
          </span>
        </div>
      </div>

      {/* Gráfico de barras con sombreado de Canícula */}
      <div className="h-56 sm:h-64 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={timeSeries}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              unit=" mm"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
              }}
              formatter={(val: number, name: string) => [
                `${val} mm`,
                name === 'precipitation' ? 'Lluvia esperada' : `Agua que pide ${cropName}`,
              ]}
              labelFormatter={(label) => `Mes de ${label}`}
            />

            {/* Sombreado de la Canícula Crítica (Julio y Agosto) */}
            <ReferenceArea
              x1="Jul"
              x2="Ago"
              fill="#f59e0b"
              fillOpacity={0.12}
              stroke="#f59e0b"
              strokeOpacity={0.3}
              strokeDasharray="3 3"
            />

            <Bar
              dataKey="precipitation"
              name="precipitation"
              fill="#06b6d4"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="cropDemand"
              name="cropDemand"
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tarjetas de Diagnóstico de Temporadas: Canícula vs Suelo Baldío (Requisito NASA) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {/* Temporada Crítica */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2 text-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-white text-[11px]">
              Momento más vulnerable: Canícula (Julio - Agosto)
            </p>
            <p className="text-[11px] text-amber-300/90 leading-relaxed">
              El cultivo de {cropName} entra en floración justo cuando la lluvia disminuye. Si la tierra no tiene cobertura de rastrojo, el sol evapora el agua y el grano no cuaja.
            </p>
          </div>
        </div>

        {/* Ventana de Suelo Baldío */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-2 text-emerald-200">
          <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-white text-[11px]">
              Oportunidad: Suelo Baldío (Noviembre - Abril)
            </p>
            <p className="text-[11px] text-emerald-300/90 leading-relaxed">
              Tras la cosecha, la parcela queda meses desprotegida. Es la ventana perfecta para sembrar <strong>Frijol Abono (Canavalia)</strong> que proteja el suelo contra el viento y fije nitrógeno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
