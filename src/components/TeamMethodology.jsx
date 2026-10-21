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

export default function TeamMethodology() {
  return (
    <section id="metodologia" className="py-12 border-b-4 border-black dark:border-white">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-stamp b-stamp-yellow text-xs">SECCIÓN 05</span>
          <span className="font-mono text-xs text-neutral-500 uppercase font-bold">GOBERNANZA & METODOLOGÍA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          5. Metodología de Desarrollo y Gobernanza
        </h2>
        <p className="text-sm sm:text-base font-mono text-neutral-600 dark:text-neutral-400 mt-2 max-w-4xl">
          Marco de cooperación ágil y coordinación interinstitucional entre la Fábrica de Software del SENA y el Juzgado de Familia 4.
        </p>
      </div>

      {/* Primary Assurance Callout */}
      <div className="b-card bg-[#fffdf0] dark:bg-[#1f1d14] border-l-[8px] border-l-[#ffe600] mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="b-stamp b-stamp-yellow text-xs">GARANTÍA INSTITUCIONAL SENA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase">
              Desarrollo Integral Respaldado por la Fábrica de Software SENA
            </h3>
            <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300 mt-1">
              El desarrollo del Asistente de IA para Automatización Jurídica es asumido íntegramente por la <strong>Fábrica de Software del SENA</strong>, aplicando estándares profesionales de ingeniería de software, arquitectura moderna, orquestación segura de modelos de IA y rigurosos protocolos de pruebas.
            </p>
          </div>
        </div>
      </div>

      {/* Two Roles Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* SENA Software Factory */}
        <div className="b-card bg-white dark:bg-[#1a1d24] border-t-[8px] border-t-[#ffe600]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black dark:border-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffe600] text-black border-2 border-black flex items-center justify-center font-black">
                <Cpu size={22} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-base uppercase">{TEAM_ROLES[0].rol}</h4>
                <div className="font-mono text-xs text-neutral-500">{TEAM_ROLES[0].responsables}</div>
              </div>
            </div>
            <span className="b-stamp b-stamp-yellow text-[10px]">{TEAM_ROLES[0].badge}</span>
          </div>

          <div className="mb-4">
            <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-2">
              Compromiso Técnico:
            </div>
            <p className="font-mono text-xs text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 p-2.5 border border-black dark:border-white">
              {TEAM_ROLES[0].compromiso}
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold uppercase text-neutral-500 block mb-1">Alcance y Actividades a Cargo:</span>
            {TEAM_ROLES[0].tareas.map((task, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#00d665] shrink-0 mt-0.5" />
                <span>{task}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-3 border-t border-black dark:border-white font-mono text-xs flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#00d665]" />
            <span className="font-bold">Garantiza entrega de software funcional, seguridad y estabilidad.</span>
          </div>
        </div>

        {/* Juzgado de Familia 4 */}
        <div className="b-card bg-white dark:bg-[#1a1d24] border-t-[8px] border-t-[#0052ff]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black dark:border-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0052ff] text-white border-2 border-black flex items-center justify-center font-black">
                <Scale size={22} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-base uppercase">{TEAM_ROLES[1].rol}</h4>
                <div className="font-mono text-xs text-neutral-500">{TEAM_ROLES[1].responsables}</div>
              </div>
            </div>
            <span className="b-stamp b-stamp-blue text-[10px]">{TEAM_ROLES[1].badge}</span>
          </div>

          <div className="mb-4">
            <div className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-2">
              Aporte Funcional:
            </div>
            <p className="font-mono text-xs text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 p-2.5 border border-black dark:border-white">
              {TEAM_ROLES[1].compromiso}
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="font-bold uppercase text-neutral-500 block mb-1">Actividades de la Contraparte:</span>
            {TEAM_ROLES[1].tareas.map((task, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0052ff] shrink-0 mt-0.5" />
                <span>{task}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-3 border-t border-black dark:border-white font-mono text-xs flex items-center gap-2">
            <Building2 size={16} className="text-[#0052ff]" />
            <span className="font-bold">Asegura que el software se ajuste a los requerimientos de la Rama Judicial.</span>
          </div>
        </div>
      </div>

      {/* RACI Matrix Table */}
      <div className="b-card bg-white dark:bg-[#1a1d24]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black dark:border-white">
          <div className="flex items-center gap-2">
            <TableIcon size={20} className="text-[#0052ff]" />
            <h4 className="font-mono font-bold text-base uppercase">
              Matriz de Gobernanza y Responsabilidades (RACI)
            </h4>
          </div>
          <div className="font-mono text-[11px] flex items-center gap-3">
            <span className="text-[#00d665] font-bold">R: Responsable</span>
            <span className="text-[#0052ff] font-bold">A: Aprueba (Accountable)</span>
            <span className="text-neutral-600 dark:text-neutral-400 font-bold">C: Consultado</span>
            <span className="text-neutral-500 font-bold">I: Informado</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs text-left border-collapse border border-black dark:border-white">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3 border border-black dark:border-white uppercase">Actividad / Hito Técnico</th>
                <th className="p-3 border border-black dark:border-white uppercase text-center bg-[#ffe600] text-black w-1/3">
                  Fábrica de Software SENA
                </th>
                <th className="p-3 border border-black dark:border-white uppercase text-center bg-[#0052ff] text-white w-1/3">
                  Juzgado de Familia 4
                </th>
              </tr>
            </thead>
            <tbody>
              {RACI_MATRIX.map((row, idx) => (
                <tr 
                  key={idx}
                  className={`border-b border-black dark:border-white ${
                    idx % 2 === 0 ? 'bg-white dark:bg-[#1a1d24]' : 'bg-neutral-50 dark:bg-[#15171c]'
                  }`}
                >
                  <td className="p-3 font-bold border-r border-black dark:border-white">
                    {row.actividad}
                  </td>
                  <td className="p-3 text-center font-bold border-r border-black dark:border-white text-[#00d665]">
                    {row.sena}
                  </td>
                  <td className="p-3 text-center font-bold text-[#0052ff]">
                    {row.juzgado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
