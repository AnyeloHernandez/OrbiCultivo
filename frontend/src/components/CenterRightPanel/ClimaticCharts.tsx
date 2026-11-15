import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Calendar, HelpCircle } from 'lucide-react';
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
            Te muestra en qué meses el cultivo tiene agua de sobra y en cuáles puede sufrir sed
          </p>
        </div>

        {/* Leyenda visual directa */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500"></span>
            <span className="text-slate-200 font-medium">Lluvia esperada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400"></span>
            <span className="text-slate-200 font-medium">Agua que pide el cultivo</span>
          </div>
        </div>
      </div>

      {/* Gráfico de barras simplificado */}
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

      {/* Consejo campesino al pie del gráfico */}
      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-2 text-xs text-slate-300">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">¿Cómo leer este gráfico?</strong> Cuando la barra dorada supera a la azul (especialmente en la <strong>canícula de julio o al sembrar antes de las lluvias</strong>), la planta sufre por falta de agua. Cubrir el suelo con rastrojo evita que el sol evapore la poca agua que queda en la tierra.
        </p>
      </div>
    </div>
  );
};
