import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Scale,
  Table as TableIcon,
  Calendar,
  Clock,
  GraduationCap
} from 'lucide-react';
import { 
  TEAM_ROLES, 
  RACI_MATRIX, 
  PROJECT_SCHEDULE, 
  ROLE_HIERARCHY,
  RESEARCH_TEAM,
  APPRENTICES_TEAM
} from '../data/proposalData';

export default function TeamRolesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 02</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">EQUIPO, ROLES & CRONOGRAMA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          2. Equipo de Trabajo, Roles y Cronograma
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Marco de trabajo con el Semillero SENA, ritmo de aprendices, fechas de reuniones y control de acceso Jefe-Sustanciador.
        </p>
      </div>

      {/* Primary Commitment Card: Semillero SENA */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#FFE600]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SEMILLERO DE INVESTIGACIÓN SENA</span>
          <span className="b-badge b-badge-neutral">RITMO FORMATIVO DE APRENDICES</span>
        </div>
        <h2 className="text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100">
          Desarrollo Ágil Guiado por Instructores e Implementado con Aprendices
        </h2>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans mb-3">
          El proyecto se formula como una iniciativa de investigación aplicada del <strong>Semillero de Investigación de la Fábrica de Software SENA</strong>. Es liderado por <strong>3 instructores investigadores</strong> que orientan técnica y metodológicamente a los <strong>aprendices en formación</strong>, avanzando de manera progresiva y adaptada a su proceso de aprendizaje para entregar un software seguro, útil y riguroso.
        </p>
        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border-l-4 border-[#059669] rounded font-mono text-xs text-neutral-800 dark:text-neutral-200 mb-4">
          <strong>ALCANCE TRIMESTRAL:</strong> El desarrollo se enfoca en lo que se alcance a consolidar de forma rigurosa durante el lapso restante del trimestre académico (fecha límite: <strong>5 de diciembre de 2026</strong>).
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
          {/* Instructores */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Instructores Investigadores
              </span>
              <span className="b-badge b-badge-yellow text-[10px]">3 ASIGNADOS</span>
            </div>
            <div className="space-y-2">
              {RESEARCH_TEAM.map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center gap-2.5 p-2 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded"
                >
                  <div 
                    className="w-7 h-7 rounded border border-[#18181b] dark:border-white font-mono text-[11px] font-black flex items-center justify-center text-[#18181b] shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.iniciales}
                  </div>
                  <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                    {member.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aprendices */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <GraduationCap size={14} className="text-[#2563eb]" />
                Aprendices del Semillero
              </span>
              <span className="b-badge b-badge-blue text-[10px]">MÁXIMO 3</span>
            </div>
            <div className="space-y-2">
              {APPRENTICES_TEAM.map((slot) => (
                <div 
                  key={slot.id}
                  className="flex items-center justify-between gap-2 p-2 bg-blue-50/40 dark:bg-blue-950/20 border border-dashed border-blue-300 dark:border-blue-800 rounded font-mono text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[11px] flex items-center justify-center shrink-0">
                      {slot.iniciales}
                    </div>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-xs">
                      {slot.cupo}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#2563eb] dark:text-[#60a5fa] font-bold bg-white dark:bg-neutral-900 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {slot.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Schedule & Key Meetings */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#2563eb]" />
            <h3 className="font-extrabold text-sm sm:text-base uppercase text-neutral-900 dark:text-neutral-100">
              Cronograma de Reuniones y Fechas Críticas Acordadas
            </h3>
          </div>
          <span className="font-mono text-xs text-neutral-500">Trimestre 2026</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {PROJECT_SCHEDULE.map((item) => {
            const isUrgent = item.prioridad === 'URGENTE';
            return (
              <div 
                key={item.id}
                className={`p-3.5 rounded border-2 transition-all ${
                  isUrgent 
                    ? 'bg-yellow-50/80 dark:bg-yellow-950/20 border-yellow-500 shadow-[2px_2px_0px_#ca8a04]' 
                    : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-300 dark:border-neutral-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`b-badge ${isUrgent ? 'b-badge-red' : 'b-badge-blue'} text-[10px]`}>
                      {item.prioridad}
                    </span>
                    <strong className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {item.titulo}
                    </strong>
                  </div>
                  <span className="font-bold text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                    <Clock size={13} />
                    {item.fecha}
                  </span>
                </div>

                <p className="text-neutral-800 dark:text-neutral-200 font-sans text-xs mb-2 leading-relaxed">
                  {item.objetivo}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700/80 text-[11px]">
                  <span className="font-bold text-neutral-600 dark:text-neutral-400">Entregables:</span>
                  {item.entregables.map((ent, idx) => (
                    <span key={idx} className="bg-white dark:bg-neutral-900 px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200">
                      • {ent}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Governance: Jefe Admin vs Sustanciador */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
          <Scale size={18} className="text-[#2563eb]" />
          <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">
            Organización de Roles en el Despacho: Jefe vs Sustanciador
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase">{ROLE_HIERARCHY.admin.nombre}</span>
              <span className="b-badge b-badge-yellow text-[10px]">ADMINISTRADOR</span>
            </div>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#059669] shrink-0 mt-0.5" />
                <span>Crea y es el único autorizado para modificar plantillas oficiales.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#059669] shrink-0 mt-0.5" />
                <span>Asigna qué plantillas puede usar cada sustanciador.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#059669] shrink-0 mt-0.5" />
                <span>Supervisa métricas de uso, celeridad y productividad del despacho.</span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase">{ROLE_HIERARCHY.trabajador.nombre}</span>
              <span className="b-badge b-badge-blue text-[10px]">OPERATIVO</span>
            </div>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#2563eb] shrink-0 mt-0.5" />
                <span>Usa y gestiona casos sobre las plantillas asignadas en mínimos clics.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#2563eb] shrink-0 mt-0.5" />
                <span>Carga textos o audios y recibe ayuda del corrector de prompts.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-[#2563eb] shrink-0 mt-0.5" />
                <span>No puede alterar ni desfigurar la estructura jurídica de la plantilla maestra.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Two Roles Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SENA Semillero */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#FFE600]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-[#18181b] dark:text-[#FFE600]" />
              <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">Semillero de Investigación SENA</h3>
            </div>
            <span className="b-badge b-badge-yellow text-[10px]">DESARROLLO & INVESTIGACIÓN</span>
          </div>

          <div className="mb-3 font-mono text-xs">
            <div className="font-bold text-neutral-600 dark:text-neutral-400 uppercase mb-1">Compromiso Técnico:</div>
            <p className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-900 dark:text-neutral-100 font-bold">
              Diseño, desarrollo web local seguro, transcripción de audio, sustitución de líneas resaltadas y aseguramiento de calidad con aprendices.
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
            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100">Matriz de Roles y Responsabilidades (RACI)</h3>
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
                  Semillero de Investigación SENA
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
