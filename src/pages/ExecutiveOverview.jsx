import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FileCheck2, 
  Users, 
  Lock, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PROPOSAL_META } from '../data/proposalData';

export default function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Top Banner / Dossier Header */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#fde047]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="b-badge b-badge-yellow">EXPEDIENTE TÉCNICO</span>
            <span className="b-badge b-badge-blue">CONVENIO SENA - JUZGADO 4</span>
          </div>
          <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300 font-medium">
            {PROPOSAL_META.fecha} // VERSIÓN {PROPOSAL_META.version}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-3 text-neutral-900 dark:text-neutral-50">
          Asistente de IA para <br className="hidden sm:inline" />
          <span className="bg-[#fde047] text-black px-2 py-0.5 inline-block -rotate-0.5 border border-black my-1">
            Automatización Jurídica
          </span>
        </h1>

        <p className="text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed max-w-5xl mb-4 font-normal">
          Presentación formal de la propuesta técnica para optimizar los tiempos de redacción y análisis de providencias en el <strong>Juzgado de Familia 4</strong>. 
          Un proyecto con alcance acotado a <strong>Tutelas (MVP)</strong>, estricto <strong>aislamiento de datos mediante Mocking</strong> y el respaldo de desarrollo integral de la <strong>Fábrica de Software del SENA</strong> bajo metodologías ágiles de ingeniería de software.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <NavLink to="/definicion" className="b-btn b-btn-primary text-xs font-bold">
            <span>Iniciar Lectura de la Propuesta</span>
            <ArrowRight size={15} />
          </NavLink>

          <NavLink to="/alcance-mvp" className="b-btn text-xs bg-neutral-100 dark:bg-neutral-800">
            <Sparkles size={14} className="text-[#2563eb]" />
            <span>Ver Maqueta del MVP (Tutelas)</span>
          </NavLink>

          <NavLink to="/dossier" className="b-btn text-xs bg-neutral-100 dark:bg-neutral-800">
            <span>Exportar Documento Completo</span>
          </NavLink>
        </div>
      </div>

      {/* 4 Pillars Summary Grid - 4 Columns on wide screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#2563eb] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">PILAR 01</span>
              <FileCheck2 size={20} className="text-[#2563eb]" />
            </div>
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Módulo Único: Tutelas</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Para mitigar riesgos y entregar valor rápido, el MVP se enfoca exclusivamente en la generación y diligenciamiento automatizado de Tutelas (autos admisoriales y proyectos de fallo).
            </p>
          </div>
          <NavLink to="/alcance-mvp" className="text-xs font-mono font-bold text-[#2563eb] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Ver justificación y maqueta</span>
            <ChevronRight size={13} />
          </NavLink>
        </div>

        {/* Pillar 2 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#e11d48] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">PILAR 02</span>
              <Users size={20} className="text-[#e11d48]" />
            </div>
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Desarrollo Respaldado SENA</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Arquitectura, backend, seguridad e IA desarrollados por la Fábrica de Software del SENA con estándares profesionales y soporte continuo.
            </p>
          </div>
          <NavLink to="/equipo-roles" className="text-xs font-mono font-bold text-[#e11d48] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Ver metodología y gobernanza</span>
            <ChevronRight size={13} />
          </NavLink>
        </div>

        {/* Pillar 3 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#059669] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">PILAR 03</span>
              <Lock size={20} className="text-[#059669]" />
            </div>
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Aislamiento 100% Mocking</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Cero expedientes reales en fase de desarrollo SENA. Se utilizará información 100% sintética. Los datos reales solo serán ingresados por el Juzgado en producción.
            </p>
          </div>
          <NavLink to="/seguridad" className="text-xs font-mono font-bold text-[#059669] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Ver protocolo de privacidad</span>
            <ChevronRight size={13} />
          </NavLink>
        </div>

        {/* Pillar 4 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#ea580c] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">PILAR 04</span>
              <Cpu size={20} className="text-[#ea580c]" />
            </div>
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Ruta Dual de Motor IA</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Opción A: <strong>Google Gemini</strong> para inicio rápido en prototipado. Opción B: <strong>Azure OpenAI</strong> sujeta a licencias Microsoft del Juzgado.
            </p>
          </div>
          <NavLink to="/arquitectura" className="text-xs font-mono font-bold text-[#ea580c] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Comparar Google vs Microsoft</span>
            <ChevronRight size={13} />
          </NavLink>
        </div>
      </div>

      {/* Interactive Simulation CTA Banner */}
      <div className="clean-card bg-neutral-100 dark:bg-[#16181c] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase text-[#2563eb] block mb-1">
            DEMOSTRACIÓN INTERACTIVA DEL MVP
          </span>
          <h4 className="text-base font-bold uppercase text-neutral-900 dark:text-neutral-100">
            Simulador de Generación Documental (Tutelas)
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-1 max-w-xl">
            Pruebe el flujo de entrada de variables jurídicas editables y observe en vivo cómo la IA estructura el borrador de providencia judicial.
          </p>
        </div>
        <NavLink 
          to="/alcance-mvp" 
          className="b-btn b-btn-primary text-xs font-bold py-2.5 px-4 shrink-0 flex items-center gap-2"
        >
          <span>Ir al Simulador de Documentos</span>
          <ChevronRight size={14} />
        </NavLink>
      </div>
    </div>
  );
}
