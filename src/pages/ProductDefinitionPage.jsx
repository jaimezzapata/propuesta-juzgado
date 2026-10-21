import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function ProductDefinitionPage() {
  const [activeTab, setActiveTab] = useState('comparativa');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 01</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">PROPÓSITO & ALINEACIÓN</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          1. Definición del Producto
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Qué es el asistente, qué problema resuelve en el despacho y cómo interactúa con el funcionario judicial.
        </p>
      </div>

      {/* Core Definition Card */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <h2 className="text-lg font-bold uppercase mb-2 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Scale size={20} className="text-[#2563eb]" />
          <span>Concepto Central del Software</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200 mb-4">
          Desarrollo de una <strong>aplicación web integrada con Inteligencia Artificial Generativa</strong>, diseñada para optimizar los tiempos de redacción y análisis de documentos jurídicos en el <strong>Juzgado de Familia 4</strong>, reduciendo la carga operativa manual de funcionarios y sustanciadores.
        </p>

        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border-l-4 border-[#2563eb] rounded-r font-mono text-xs text-neutral-800 dark:text-neutral-200">
          <strong>PRINCIPIO HUMAN-IN-THE-LOOP:</strong> La Inteligencia Artificial actúa como un redactor asistente guiado. La valoración probatoria de fondo, la decisión judicial y la firma son potestades indelegables y exclusivas del Juez de Familia.
        </div>
      </div>

      {/* Impact Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="clean-card p-4 text-center bg-white dark:bg-[#1c1e22]">
          <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Reducción Operativa</div>
          <div className="text-3xl font-black text-[#e11d48] my-1 flex items-center justify-center gap-1">
            <TrendingDown size={24} /> -75%
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">En el tiempo dedicado a estructurar antecedentes de tutelas.</p>
        </div>

        <div className="clean-card p-4 text-center bg-white dark:bg-[#1c1e22]">
          <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Estandarización</div>
          <div className="text-3xl font-black text-[#059669] my-1 flex items-center justify-center gap-1">
            <CheckCircle2 size={24} /> 100%
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Citas jurisprudenciales uniformes conforme a la Corte Constitucional.</p>
        </div>

        <div className="clean-card p-4 text-center bg-white dark:bg-[#1c1e22]">
          <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Término de Respuesta</div>
          <div className="text-3xl font-black text-[#2563eb] my-1 flex items-center justify-center gap-1">
            <Sparkles size={24} /> 24-48h
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Agilidad inmediata para emitir medidas provisionales en salud.</p>
        </div>
      </div>

      {/* Tabs: Antes vs Después / Principios */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-4 font-mono text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('comparativa')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'comparativa' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            FLUJO OPERATIVO: ANTES VS DESPUÉS
          </button>
          <button
            onClick={() => setActiveTab('principios')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'principios' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            CRITERIOS DE CONFIABILIDAD JUDICIAL
          </button>
        </div>

        {activeTab === 'comparativa' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch font-mono text-xs">
            {/* Before */}
            <div className="p-4 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded">
              <div className="flex items-center gap-2 mb-2 text-[#e11d48] font-bold uppercase">
                <AlertTriangle size={16} />
                <span>Situación Actual (Manual)</span>
              </div>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Copia manual dispersa de fragmentos entre múltiples archivos Word antiguos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Riesgo de inconsistencias en radicados, nombres de EPS o derechos vulnerados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Saturación del personal ante oleadas de tutelas con términos de 10 días perentorios.</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded">
              <div className="flex items-center gap-2 mb-2 text-[#059669] font-bold uppercase">
                <Sparkles size={16} />
                <span>Con el Asistente Propuesto</span>
              </div>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span>Ingreso guiado de variables en un formulario web ordenado y parametrizado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span>Estructuración automática de antecedentes, consideraciones y parte resolutiva.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span>Exportación limpia en Word o PDF para la revisión y firma directa del despacho.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
              <div className="font-bold mb-1 text-neutral-900 dark:text-neutral-100">1. Blindaje contra Alucinaciones</div>
              <p className="text-neutral-700 dark:text-neutral-300">
                Los prompts se limitan a jurisprudencia constitucional colombiana verificada (Decreto 2591/91 y precedentes de la Corte).
              </p>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
              <div className="font-bold mb-1 text-neutral-900 dark:text-neutral-100">2. Control Humano Absoluto</div>
              <p className="text-neutral-700 dark:text-neutral-300">
                El sistema nunca emite decisiones ni notifica de manera autónoma; todo documento es un borrador preliminar.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
              <div className="font-bold mb-1 text-neutral-900 dark:text-neutral-100">3. Formatos Estándar (.docx y PDF)</div>
              <p className="text-neutral-700 dark:text-neutral-300">
                Salida 100% compatible con Microsoft Word y los sistemas de gestión documental de la Rama Judicial.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
              <div className="font-bold mb-1 text-neutral-900 dark:text-neutral-100">4. Cero Curva de Aprendizaje</div>
              <p className="text-neutral-700 dark:text-neutral-300">
                Diseñado para que cualquier sustanciador o auxiliar pueda operarlo desde el primer día sin capacitaciones complejas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
