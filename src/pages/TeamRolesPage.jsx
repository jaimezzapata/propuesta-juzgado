import React from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Scale,
  Table as TableIcon 
} from 'lucide-react';
import { TEAM_ROLES, RACI_MATRIX } from '../data/proposalData';

export default function TeamRolesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 05</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">GOBERNANZA & METODOLOGÍA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          5. Metodología de Desarrollo y Gobernanza
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Marco de cooperación ágil y coordinación interinstitucional entre la Fábrica de Software del SENA y el Juzgado de Familia 4.
        </p>
      </div>

      {/* Primary Commitment Card */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#FFE600]">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">GARANTÍA INSTITUCIONAL SENA</span>
        </div>
        <h2 className="text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100">
          Desarrollo Integral Respaldado por la Fábrica de Software SENA
        </h2>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
          El desarrollo del Asistente de IA para Automatización Jurídica es asumido íntegramente por la <strong>Fábrica de Software del SENA</strong>, aplicando estándares profesionales de ingeniería de software, arquitectura moderna, orquestación segura de modelos de IA y rigurosos protocolos de pruebas. La contraparte judicial se enfoca en sus competencias misionales: definición de criterios de sustanciación, retroalimentación jurídica y validación de entregables.
        </p>
      </div>

      {/* Two Roles Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SENA Software Factory */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#FFE600]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-[#18181b] dark:text-[#FFE600]" />
              <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">{TEAM_ROLES[0].rol}</h3>
            </div>
            <span className="b-badge b-badge-yellow text-[10px]">{TEAM_ROLES[0].badge}</span>
          </div>

          <div className="mb-3 font-mono text-xs">
            <div className="font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-1">Compromiso Técnico:</div>
            <p className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-900 dark:text-neutral-100 font-bold">
              {TEAM_ROLES[0].compromiso}
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-neutral-800 dark:text-neutral-200">
            <span className="font-bold uppercase text-neutral-600 dark:text-neutral-400 block mb-1">Alcance y Actividades a Cargo:</span>
            {TEAM_ROLES[0].tareas.map((task, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#059669] shrink-0 mt-0.5" />
                <span>{task}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#059669]" />
            <span>Garantiza entrega de software funcional, seguridad y estabilidad de la solución.</span>
          </div>
        </div>

        {/* Juzgado de Familia 4 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#2563EB]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Scale size={18} className="text-[#2563eb]" />
              <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">{TEAM_ROLES[1].rol}</h3>
            </div>
            <span className="b-badge b-badge-blue text-[10px]">{TEAM_ROLES[1].badge}</span>
          </div>

          <div className="mb-3 font-mono text-xs">
            <div className="font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-1">Aporte Funcional:</div>
            <p className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-900 dark:text-neutral-100 font-bold">
              {TEAM_ROLES[1].compromiso}
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-neutral-800 dark:text-neutral-200">
            <span className="font-bold uppercase text-neutral-600 dark:text-neutral-400 block mb-1">Actividades de la Contraparte:</span>
            {TEAM_ROLES[1].tareas.map((task, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#2563eb] shrink-0 mt-0.5" />
                <span>{task}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Building2 size={14} className="text-[#2563eb]" />
            <span>Asegura que el software se ajuste con exactitud a los requerimientos de la Rama Judicial.</span>
          </div>
        </div>
      </div>

      {/* RACI Matrix */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <TableIcon size={16} className="text-[#2563eb]" />
            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">Matriz de Gobernanza y Responsabilidades (RACI)</h3>
          </div>
          <div className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center gap-3">
            <span><strong>R:</strong> Responsable técnico</span>
            <span><strong>A:</strong> Aprueba (Accountable)</span>
            <span><strong>C:</strong> Consultado</span>
            <span><strong>I:</strong> Informado</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs text-left border-collapse">
            <thead>
              <tr className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700">
                <th className="p-2.5">Actividad / Hito Técnico</th>
                <th className="p-2.5 text-center bg-yellow-50/80 dark:bg-yellow-950/40 text-yellow-950 dark:text-yellow-100 font-bold w-1/3">
                  Fábrica de Software SENA
                </th>
                <th className="p-2.5 text-center bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-bold w-1/3">
                  Juzgado de Familia 4
                </th>
              </tr>
            </thead>
            <tbody>
              {RACI_MATRIX.map((row, idx) => (
                <tr 
                  key={idx}
                  className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <td className="p-2.5 font-bold text-neutral-900 dark:text-neutral-100">
                    {row.actividad}
                  </td>
                  <td className="p-2.5 text-center font-bold text-[#059669] dark:text-[#34d399]">
                    {row.sena}
                  </td>
                  <td className="p-2.5 text-center font-bold text-[#2563eb] dark:text-[#60a5fa]">
                    {row.juzgado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
