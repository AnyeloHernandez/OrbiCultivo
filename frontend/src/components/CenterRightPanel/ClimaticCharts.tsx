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
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-4 h-full flex flex-col justify-between">
      {/* Encabezado sin tecnicismos */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div>
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            Lluvia del Año vs Agua que Pide tu {cropName}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Observación histórica para identificar meses secos y temporadas libres
          </p>
        </div>

        {/* Leyenda visual directa */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-600"></span>
            <span className="text-stone-700 font-medium">Lluvia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-600"></span>
            <span className="text-stone-700 font-medium">Demanda del cultivo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400"></span>
            <span className="text-amber-800 font-bold">Canícula</span>
          </div>
        </div>
      </div>

      {/* Barra de Fases del Año y Suelo Baldío */}
      <div className="grid grid-cols-4 gap-1.5 text-[11px] font-medium text-center">
        <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700">
          <span className="font-bold text-stone-900 block">Ene - Abr</span>
          <span className="text-[10px] text-amber-700 flex items-center justify-center gap-1 font-semibold">
            <Sun className="w-3 h-3" />
            Suelo Baldío
          </span>
        </div>
        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
          <span className="font-bold text-stone-900 block">May - Jun</span>
          <span className="text-[10px] text-emerald-700 flex items-center justify-center gap-1 font-semibold">
            <Sprout className="w-3 h-3" />
            Siembra Activa
          </span>
        </div>
        <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 ring-1 ring-amber-300">
          <span className="font-bold text-stone-900 block">Jul - Ago</span>
          <span className="text-[10px] text-amber-800 font-bold flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            Canícula Crítica
          </span>
        </div>
        <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700">
          <span className="font-bold text-stone-900 block">Sep - Dic</span>
          <span className="text-[10px] text-stone-600 flex items-center justify-center gap-1 font-semibold">
            <Calendar className="w-3 h-3" />
            Cosecha / Descanso
          </span>
        </div>
      </div>

      {/* Gráfico de barras con sombreado de Canícula */}
      <div className="h-52 sm:h-60 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={timeSeries}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" opacity={0.8} />
            <XAxis
              dataKey="month"
              stroke="#78716c"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#78716c"
              fontSize={11}
              tickLine={false}
              unit=" mm"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e7e5e4',
                borderRadius: '0.75rem',
                color: '#1c1917',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
              }}
              formatter={(val: number, name: string) => [
                `${val} mm`,
                name === 'precipitation' ? 'Lluvia esperada' : `Demanda ${cropName}`,
              ]}
              labelFormatter={(label) => `Mes de ${label}`}
            />

            {/* Sombreado de la Canícula Crítica (Julio y Agosto) */}
            <ReferenceArea
              x1="Jul"
              x2="Ago"
              fill="#f59e0b"
              fillOpacity={0.14}
              stroke="#f59e0b"
              strokeOpacity={0.4}
              strokeDasharray="3 3"
            />

            <Bar
              dataKey="precipitation"
              name="precipitation"
              fill="#0284c7"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="cropDemand"
              name="cropDemand"
              fill="#d97706"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tarjetas de Diagnóstico de Temporadas: Concisas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {/* Temporada Crítica */}
        <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start space-x-2 text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-stone-900 text-[11px]">
              Alerta de Canícula (Jul - Ago)
            </p>
            <p className="text-[11px] text-amber-900/90 leading-tight mt-0.5">
              El {cropName} florece con menos lluvia. Cubre el suelo con rastrojo para no perder agua.
            </p>
          </div>
        </div>

        {/* Ventana de Suelo Baldío */}
        <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-start space-x-2 text-emerald-950">
          <Sprout className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-stone-900 text-[11px]">
              Oportunidad: Suelo Libre (Nov - Abr)
            </p>
            <p className="text-[11px] text-emerald-900/90 leading-tight mt-0.5">
              Siembra Frijol Abono (Canavalia) para nutrir la tierra y fijar nitrógeno gratis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
