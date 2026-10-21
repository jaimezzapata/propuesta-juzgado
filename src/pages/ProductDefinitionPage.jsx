import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Scale,
  Users,
  Highlighter,
  Sliders,
  BarChart3,
  BookOpen,
  Lock
} from 'lucide-react';
import { ROLE_HIERARCHY, TEMPLATE_USAGE_METRICS, LEGAL_KNOWLEDGE_BASE } from '../data/proposalData';

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
          1. Definición del Producto y Flujo Operativo
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Qué es el asistente, cómo opera la jerarquía Jefe-Sustanciador, reemplazo en documentos base y asistencia de redacción local.
        </p>
      </div>

      {/* Core Definition Card */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <h2 className="text-lg font-bold uppercase mb-2 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Scale size={20} className="text-[#2563eb]" />
          <span>Concepto Central del Software</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200 mb-4">
          Desarrollo de una <strong>aplicación web segura con Inteligencia Artificial</strong>, diseñada para automatizar la sustitución de fragmentos variables en <strong>documentos base con líneas resaltadas</strong>, estructurar los hechos del caso y asistir al funcionario judicial en la redacción de providencias en el <strong>Juzgado de Familia 4</strong>, con <strong>mínimos clics</strong> y <strong>sin subir expedientes a la nube</strong>.
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
            <TrendingDown size={24} /> -80%
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Menos clics y sustitución automática en plantillas con líneas resaltadas.</p>
        </div>

        <div className="clean-card p-4 text-center bg-white dark:bg-[#1c1e22]">
          <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Cero Alucinaciones</div>
          <div className="text-3xl font-black text-[#059669] my-1 flex items-center justify-center gap-1">
            <CheckCircle2 size={24} /> 100%
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Prompts matemáticos + Base de conocimiento legal vinculante precargada.</p>
        </div>

        <div className="clean-card p-4 text-center bg-white dark:bg-[#1c1e22]">
          <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">Privacidad y Reserva</div>
          <div className="text-3xl font-black text-[#2563eb] my-1 flex items-center justify-center gap-1">
            <Lock size={24} /> Local
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">Variables de personas y documentos no se suben a servidores cloud.</p>
        </div>
      </div>

      {/* Tabs: Comparativa / Roles y Gobernanza / Flujo de Líneas Resaltadas / Base Legal */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex flex-wrap border-b border-neutral-200 dark:border-neutral-700 mb-4 font-mono text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('comparativa')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'comparativa' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            ANTES VS DESPUÉS
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'roles' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            ROLES: JEFE (ADMIN) VS SUSTANCIADOR
          </button>
          <button
            onClick={() => setActiveTab('lineas')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'lineas' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            DOCUMENTOS CON LÍNEAS RESALTADAS
          </button>
          <button
            onClick={() => setActiveTab('base-legal')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'base-legal' 
                ? 'border-[#18181b] dark:border-white text-current' 
                : 'border-transparent text-neutral-400 hover:text-current'
            }`}
          >
            BASE DE CONOCIMIENTO LEGAL (RAG)
          </button>
        </div>

        {activeTab === 'comparativa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch font-mono text-xs">
            {/* Before */}
            <div className="p-4 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded">
              <div className="flex items-center gap-2 mb-2 text-[#e11d48] font-bold uppercase">
                <AlertTriangle size={16} />
                <span>Situación Actual (Manual y Dispersa)</span>
              </div>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Copia manual de fragmentos entre múltiples archivos Word antiguos y plantillas desactualizadas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Riesgo de errores humanos en radicados, nombres de EPS, copagos o derechos tutelados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>Tiempo excesivo buscando, validando y redactando manualmente los hechos de cada expediente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e11d48] font-bold">✕</span>
                  <span>El funcionario depende de su propia habilidad de redacción para formular consultas a herramientas externas.</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded">
              <div className="flex items-center gap-2 mb-2 text-[#059669] font-bold uppercase">
                <Sparkles size={16} />
                <span>Con el Asistente Concertado</span>
              </div>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span><strong>Plantillas Maestras Controladas por el Jefe:</strong> Solo el Admin modifica la redacción base y supervisa métricas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span><strong>Sustitución en Líneas Resaltadas:</strong> La IA solo altera los datos variables, preservando el 100% del rigor jurídico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span><strong>Estructuración Fáctica en 1 Clic:</strong> Extracción ordenada de antecedentes y variables para poblar la providencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span><strong>Asistente Corrector de Prompts:</strong> La herramienta analiza la entrada y le ayuda a no dejar vacíos fácticos.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Admin / Jefe */}
              <div className="p-4 bg-yellow-50/60 dark:bg-yellow-950/20 border-2 border-yellow-500 rounded">
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-yellow-300 dark:border-yellow-800">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
                    <Users size={16} className="text-yellow-600" />
                    <span>{ROLE_HIERARCHY.admin.nombre}</span>
                  </div>
                  <span className="b-badge b-badge-yellow text-[10px]">ADMIN / CONTROL</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mb-3">
                  {ROLE_HIERARCHY.admin.descripcion}
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  {ROLE_HIERARCHY.admin.permisos.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-neutral-800 dark:text-neutral-200">
                      <CheckCircle2 size={13} className="text-[#059669] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trabajador / Sustanciador */}
              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 border-2 border-blue-500 rounded">
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-blue-300 dark:border-blue-800">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
                    <Scale size={16} className="text-blue-600" />
                    <span>{ROLE_HIERARCHY.trabajador.nombre}</span>
                  </div>
                  <span className="b-badge b-badge-blue text-[10px]">OPERATIVO / GESTIÓN</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mb-3">
                  {ROLE_HIERARCHY.trabajador.descripcion}
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  {ROLE_HIERARCHY.trabajador.permisos.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-neutral-800 dark:text-neutral-200">
                      <CheckCircle2 size={13} className="text-[#2563eb] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Admin Metrics Preview */}
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 font-mono text-xs">
              <div className="flex items-center gap-2 font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                <BarChart3 size={15} className="text-[#2563eb]" />
                <span>Métricas de Uso Disponibles Exclusivamente para el Jefe (Admin):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TEMPLATE_USAGE_METRICS.map((metric) => (
                  <div key={metric.id} className="p-2.5 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <div className="font-bold text-[11px] truncate mb-1">{metric.plantilla}</div>
                    <div className="flex justify-between text-[10px] text-neutral-500">
                      <span>Usos/mes: <strong>{metric.usosMes}</strong></span>
                      <span>Tiempo: <strong>{metric.tiempoPromedioMin}m</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineas' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-400 rounded">
              <div className="flex items-center gap-2 font-bold text-yellow-900 dark:text-yellow-200 mb-1">
                <Highlighter size={16} className="text-yellow-600" />
                <span>Mecanismo de Sustitución en Documento Base</span>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200">
                El despacho no quiere que la IA reescriba todo el documento desde cero. El Jefe define una providencia base oficial donde las partes fijas son inalterables y solo las <mark className="bg-yellow-300 text-black px-1 font-bold">líneas resaltadas</mark> corresponden a hechos, nombres, EPS y pretensiones del caso.
              </p>
            </div>

            <div className="p-4 bg-neutral-900 text-neutral-100 rounded border-2 border-neutral-700 leading-relaxed">
              <div className="text-[10px] text-neutral-400 uppercase mb-2">Ejemplo Visual de Plantilla con Líneas Resaltadas:</div>
              <p className="mb-2">
                RAMA JUDICIAL • JUZGADO CUARTO DE FAMILIA DE MEDELLÍN
              </p>
              <p className="text-neutral-400">
                Radicado: <span className="bg-yellow-400 text-black px-1 font-bold">2026-F04-TUT-0089</span>
              </p>
              <p className="text-neutral-400">
                Accionante: <span className="bg-yellow-400 text-black px-1 font-bold">María Elena Restrepo Gómez (CC. 43.890.123)</span>
              </p>
              <p className="text-neutral-400">
                Accionado: <span className="bg-yellow-400 text-black px-1 font-bold">EPS Salud Total S.A.</span>
              </p>
              <p className="text-neutral-300 mt-2">
                "VISTO el escrito tutelar y considerando que se cumplen los requisitos del Decreto 2591 de 1991, este Despacho dispone admitir la acción y ORDENAR de manera provisional a la entidad accionada que en el término de 48 horas <span className="bg-yellow-400 text-black px-1 font-bold">haga entrega efectiva del medicamento oncológico requerido</span>..."
              </p>
            </div>
          </div>
        )}

        {activeTab === 'base-legal' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-300 rounded">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 mb-1">
                <BookOpen size={16} className="text-blue-600" />
                <span>Base Normativa y Jurisprudencial Vinculante (RAG)</span>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200">
                Para que la herramienta no alucine, se integran las normas y precedentes exactos que rigen la sustanciación en materia de familia y salud. La IA consulta esta base antes de redactar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEGAL_KNOWLEDGE_BASE.map((item, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">
                  <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 mb-0.5">{item.norma}</div>
                  <div className="text-[11px] text-[#2563eb] dark:text-[#60a5fa] font-bold mb-1">{item.ambito}</div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-300">{item.aplicacion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
