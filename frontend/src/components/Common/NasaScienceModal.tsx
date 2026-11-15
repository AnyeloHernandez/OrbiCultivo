import React, { useState } from 'react';
import {
  X,
  Satellite,
  Compass,
  BookOpen,
  Waves,
  Sun,
  CloudRain,
  CheckCircle2,
  Eye,
} from 'lucide-react';

interface NasaScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NasaScienceModal: React.FC<NasaScienceModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'satellites' | 'comparison' | 'glossary'>('satellites');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header del Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                ¿Cómo observa la NASA tu parcela?
              </h2>
              <p className="text-xs text-slate-400">
                Guía sencilla: satélites espaciales combinados con la sabiduría del campo
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-1.5 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('satellites')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'satellites'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Los Satélites Utilizados</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'comparison'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Satélite vs. Tu Pala en Tierra</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition shrink-0 ${
              activeTab === 'glossary'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glosario Campesino</span>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* PESTAÑA 1: LOS SATÉLITES */}
          {activeTab === 'satellites' && (
            <div className="space-y-4">
              <p className="text-slate-300">
                La NASA tiene decenas de satélites en órbita constante sobre Centroamérica. Para esta plataforma usamos cuatro fuentes científicas clave adaptadas al campo guatemalteco:
              </p>

              <div className="space-y-3">
                {/* SMAP */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Waves className="w-4 h-4 text-emerald-400" />
                      NASA SMAP (Humedad del Suelo)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      Banda L Microondas
                    </span>
                  </div>
                  <p>
                    <strong>¿Qué hace?</strong> Emite ondas de radar que penetran los primeros centímetros de la tierra para medir cuánta agua hay retenida en la zona radicular, sin necesidad de cavar.
                  </p>
                  <p className="text-emerald-400 font-medium text-[11px]">
                    <strong>Beneficio para ti:</strong> Te avisa si las raíces aún tienen reserva de agua o si el suelo ya llegó al punto donde la planta empezará a marchitarse.
                  </p>
                </div>

                {/* NASA POWER & GPM */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-cyan-400" />
                      NASA POWER & GPM (Lluvia y Clima)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      Radares de Precipitación
                    </span>
                  </div>
                  <p>
                    <strong>¿Qué hace?</strong> Recopila más de 40 años de observaciones meteorológicas globales: lluvia diaria, radiación solar, temperaturas máximas/mínimas y velocidad del viento.
                  </p>
                  <p className="text-cyan-400 font-medium text-[11px]">
                    <strong>Beneficio para ti:</strong> Identifica con anticipación la fecha típica en que la lluvia se corta (canícula) para que planifiques tu siembra.
                  </p>
                </div>

                {/* ECOSTRESS */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400" />
                      ECOSTRESS (Estrés Térmico y Sudor de Plantas)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Sensor Térmico ISS
                    </span>
                  </div>
                  <p>
                    <strong>¿Qué hace?</strong> Montado en la Estación Espacial Internacional, mide la temperatura térmica de las hojas para calcular cuánta agua están evaporando y transpirando las plantas.
                  </p>
                  <p className="text-amber-300 font-medium text-[11px]">
                    <strong>Beneficio para ti:</strong> Detecta el estrés por calor días antes de que los ojos humanos noten las hojas secas o amarillentas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA 2: SATÉLITE VS TIERRA */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  La Filosofía: El Satélite Orienta, Tu Mano Decide
                </h3>
                <p>
                  Ningún satélite en el espacio reemplaza la experiencia de quien camina la tierra todos los días. Esta plataforma está diseñada como un <strong>apoyo a tus decisiones</strong>, uniendo la vista panorámica del espacio con tu sabiduría local.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <span className="font-bold text-cyan-300 text-xs uppercase tracking-wide flex items-center gap-1">
                    <Satellite className="w-3.5 h-3.5" />
                    Lo que el Satélite ve muy bien
                  </span>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>Tendencias de lluvia de los últimos 40 años.</li>
                    <li>Riesgos regionales de heladas y sequías en camino.</li>
                    <li>La reserva hídrica promedio de toda tu comarca.</li>
                    <li>El impacto del Fenómeno de El Niño en la región.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <span className="font-bold text-emerald-300 text-xs uppercase tracking-wide flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" />
                    Lo que solo tú sabes en tu parcela
                  </span>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    <li>Si en tu surco hay piedras o sombra de árboles.</li>
                    <li>La humedad exacta palpando el terrón con machete.</li>
                    <li>La historia de plagas que atacaron el año pasado.</li>
                    <li>Los precios y el mercado donde vendes tu cosecha.</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-slate-400 space-y-1">
                <p className="font-bold text-slate-200">¿Por qué hay incertidumbre en los datos satelitales?</p>
                <p>
                  Los satélites toman fotos en celdas de varios kilómetros cuadrados. Por eso, si tu terreno está al pie de un barranco húmedo, puede tener más agua de la que el satélite reporta. <strong>Siempre comprueba la tierra con tu azadón antes de sembrar.</strong>
                </p>
              </div>
            </div>
          )}

          {/* PESTAÑA 3: GLOSARIO CAMPESINO */}
          {activeTab === 'glossary' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                Términos científicos traducidos a palabras cotidianas del campo:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <span className="font-bold text-emerald-400 text-xs">Evapotranspiración</span>
                  <p className="text-slate-300">
                    Es la suma de dos cosas: el agua que el sol evapora directamente de la tierra, más el sudor natural que la planta suelta por las hojas para no recalentarse.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <span className="font-bold text-cyan-400 text-xs">Suelo Baldío (Fallow Period)</span>
                  <p className="text-slate-300">
                    Los meses en que la parcela se queda sin cultivo después de cosechar. Si se deja desnuda, el viento se lleva la tierra buena y el sol mata las lombrices. Por eso conviene sembrar frijol abono.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <span className="font-bold text-amber-400 text-xs">Fijación Biológica de Nitrógeno</span>
                  <p className="text-slate-300">
                    Las leguminosas (frijol común, canavalia, gandul) tienen pelotitas en sus raíces llamadas nódulos. Unas bacterias microscópicas atrapan el nitrógeno del aire y lo meten a la tierra, ahorrándote dinero en sacos de urea química.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                  <span className="font-bold text-purple-400 text-xs">Estrés Hídrico</span>
                  <p className="text-slate-300">
                    Ocurre cuando la planta necesita tomar agua por la raíz pero la tierra está seca. La planta gasta su energía en sobrevivir en vez de formar granos o mazorcas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            OrbiCultivo · NASA Space Apps Challenge
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition shadow-md"
          >
            Entendido, volver a mi parcela
          </button>
        </div>
      </div>
    </div>
  );
};
