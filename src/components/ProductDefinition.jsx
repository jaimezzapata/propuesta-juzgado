import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Layers,
  Scale
} from 'lucide-react';

export default function ProductDefinition() {
  const [activeTab, setActiveTab] = useState('comparativa');

  return (
    <section id="vision" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="section-header-box">
          <Scale size={20} className="text-[#ffe600]" />
          <span>01. DEFINICIÓN DEL PRODUCTO</span>
        </div>
        <span className="b-stamp b-stamp-yellow">PROPÓSITO Y VALOR OPERATIVO</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Definition */}
        <div className="lg:col-span-5 space-y-6">
          <div className="b-card bg-[#ffffff] dark:bg-[#181b20]">
            <span className="b-stamp b-stamp-blue mb-3 inline-block">VISIÓN DE LA SOLUCIÓN</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight mb-4">
              ¿Qué es el Asistente de IA Jurídica?
            </h2>
            <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4">
              Es una <strong>aplicación web institucional integrada con Inteligencia Artificial Generativa</strong>, concebida para apoyar las tareas de redacción y análisis de documentos jurídicos en el <strong>Juzgado de Familia 4</strong>, reduciendo drásticamente la carga operativa manual de los funcionarios del despacho.
            </p>
            <div className="p-3 bg-[#ffe600]/20 border-l-4 border-[#ffe600] font-mono text-xs text-neutral-900 dark:text-neutral-100">
              <strong>PRINCIPIO GUÍA:</strong> La IA actúa como un redactor asistente (Human-in-the-Loop). La revisión de fondo, control legal y firma siempre corresponden exclusivamente al Juez y su equipo.
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="b-card bg-[#fffdf0] dark:bg-[#1f1d16] p-4 text-center">
              <div className="font-mono text-xs font-bold text-neutral-500 uppercase">Tiempo de Redacción</div>
              <div className="text-3xl font-black text-[#ff3333] my-1 flex items-center justify-center gap-1">
                <TrendingDown size={28} /> -75%
              </div>
              <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">De 4 horas a minutos en borradores base</div>
            </div>

            <div className="b-card bg-[#f0fff4] dark:bg-[#152219] p-4 text-center">
              <div className="font-mono text-xs font-bold text-neutral-500 uppercase">Estandarización</div>
              <div className="text-3xl font-black text-[#00d665] my-1 flex items-center justify-center gap-1">
                <CheckCircle2 size={28} /> 100%
              </div>
              <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">Plantillas conformes a la Corte Constitucional</div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative & Operational Flow */}
        <div className="lg:col-span-7">
          <div className="b-card bg-[#ffffff] dark:bg-[#181b20]">
            {/* Tab navigation */}
            <div className="flex border-b-2 border-black dark:border-white mb-6 font-mono text-xs font-bold">
              <button
                onClick={() => setActiveTab('comparativa')}
                className={`px-4 py-2 border-r-2 border-black dark:border-white transition-colors ${
                  activeTab === 'comparativa' 
                    ? 'bg-[#ffe600] text-black shadow-[2px_2px_0px_#000]' 
                    : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                ANTES VS DESPUÉS (FLUJO OPERATIVO)
              </button>
              <button
                onClick={() => setActiveTab('principios')}
                className={`px-4 py-2 transition-colors ${
                  activeTab === 'principios' 
                    ? 'bg-[#ffe600] text-black shadow-[2px_2px_0px_#000]' 
                    : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                CRITERIOS DE ÉXITO JUDICIAL
              </button>
            </div>

            {activeTab === 'comparativa' ? (
              <div className="space-y-4">
                {/* Before State */}
                <div className="border-[2px] border-[#ff3333] bg-[#fff5f5] dark:bg-[#201515] p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#ff3333] font-bold font-mono text-xs uppercase">
                    <AlertTriangle size={16} /> SITUACIÓN ACTUAL: PROCESO MANUAL REPETITIVO
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#ff3333]">❌</span>
                      <span>El sustanciador debe copiar y pegar fragmentos dispersos de autos anteriores de word en word.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#ff3333]">❌</span>
                      <span>Riesgo de errores en números de radicado, nombres de partes o fechas por edición manual.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#ff3333]">❌</span>
                      <span>Saturación del despacho ante oleadas de tutelas de salud y medidas cautelares urgentes.</span>
                    </li>
                  </ul>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center text-neutral-400 font-mono text-xs font-bold gap-2 items-center">
                  <span>TRANSFORMACIÓN DIGITAL PROPUESTA</span>
                  <ArrowRight size={16} />
                </div>

                {/* After State */}
                <div className="border-[2px] border-[#00d665] bg-[#f0fff4] dark:bg-[#132218] p-4">
                  <div className="flex items-center gap-2 mb-2 text-[#009b49] dark:text-[#00e575] font-bold font-mono text-xs uppercase">
                    <Sparkles size={16} /> CON EL ASISTENTE DE IA PROPUESTO
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#009b49]">✓</span>
                      <span>El funcionario solo ingresa las variables del caso en un formulario parametrizado y guiado.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#009b49]">✓</span>
                      <span>La IA ensambla antecedentes, consideraciones constitucionales y resuelve en segundos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#009b49]">✓</span>
                      <span>Exportación limpia en Word o PDF lista para la revisión y rúbrica del Juez de Familia.</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-black dark:border-white p-3 bg-neutral-50 dark:bg-neutral-900">
                  <h4 className="font-mono font-bold text-xs uppercase mb-1">Cero Alucinaciones</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Prompts jurídicos blindados con restricciones estrictas de formato y citas normativas válidas colombianas.
                  </p>
                </div>
                <div className="border border-black dark:border-white p-3 bg-neutral-50 dark:bg-neutral-900">
                  <h4 className="font-mono font-bold text-xs uppercase mb-1">Total Control Humano</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    El sistema nunca decide ni emite fallos de forma autónoma; solo genera proyectos preliminares editables.
                  </p>
                </div>
                <div className="border border-black dark:border-white p-3 bg-neutral-50 dark:bg-neutral-900">
                  <h4 className="font-mono font-bold text-xs uppercase mb-1">Interoperabilidad</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Exporta en formatos nativos utilizados en el despacho judicial (.docx compatible y PDF firmado).
                  </p>
                </div>
                <div className="border border-black dark:border-white p-3 bg-neutral-50 dark:bg-neutral-900">
                  <h4 className="font-mono font-bold text-xs uppercase mb-1">Agilidad Operativa</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Curva de aprendizaje mínima para los empleados del juzgado con interfaz clara y sin distracciones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
