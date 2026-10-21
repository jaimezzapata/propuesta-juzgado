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
  ChevronRight,
  Calendar,
  AlertCircle,
  FileText,
  Highlighter,
  Sliders,
  Info
} from 'lucide-react';
import { PROPOSAL_META, CORE_NEW_FEATURES, FUTURE_ROADMAP_FEATURES } from '../data/proposalData';

export default function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Top Banner / Ficha Técnica */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#fde047]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="b-badge b-badge-yellow">EXPEDIENTE TÉCNICO</span>
            <span className="b-badge b-badge-blue">CONVENIO SEMILLERO SENA - JUZGADO 4</span>
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
          Propuesta técnica oficial ajustada tras la reunión de trabajo con el Despacho Judicial. Proyecto acotado a <strong>Tutelas (MVP)</strong>, impulsado por el <strong>Semillero de Investigación SENA</strong> (instructores y aprendices), con arquitectura de <strong>privacidad local (Zero-Cloud Leakage)</strong> donde los expedientes confidenciales <strong>no se suben a la nube</strong>.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <NavLink to="/definicion" className="b-btn b-btn-primary text-xs font-bold">
            <span>Iniciar Lectura de la Propuesta</span>
            <ArrowRight size={15} />
          </NavLink>

          <NavLink to="/alcance-mvp" className="b-btn text-xs bg-neutral-100 dark:bg-neutral-800">
            <Sparkles size={14} className="text-[#2563eb]" />
            <span>Probar Simulador MVP (Tutelas)</span>
          </NavLink>
        </div>
      </div>

      {/* Clarification Box: Propuesta y Aterrizaje vs Software Final */}
      <div className="p-4 bg-blue-50/90 dark:bg-blue-950/40 border-2 border-[#2563eb] rounded shadow-[3px_3px_0px_#2563eb] font-mono text-xs">
        <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-100 uppercase mb-1.5 text-xs sm:text-sm">
          <Info size={16} className="text-[#2563eb] shrink-0" />
          <span>NATURALEZA DE ESTE DOCUMENTO WEB: PROPUESTA TÉCNICA DE ATERRIZAJE</span>
        </div>
        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans text-xs">
          Esta plataforma constituye un <strong>documento interactivo de propuesta</strong> que detalla el proceso de trabajo, metodología y alcance propuesto por el Semillero SENA para el Juzgado de Familia 4. <strong>No representa el software final en producción</strong>, sino una <strong>escala mínima demostrativa</strong> concebida para aterrizar, conceptualizar y generalizar el funcionamiento de la aplicación y formalizar el acuerdo técnico previo al desarrollo definitivo.
        </p>
      </div>

      {/* Critical Alert / Next Meeting Banner */}
      <div className="clean-card bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-neutral-900 border-2 border-yellow-500 shadow-[4px_4px_0px_#ca8a04]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-yellow-400 border border-black flex items-center justify-center shrink-0 mt-0.5 text-black">
              <Calendar size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="b-badge b-badge-red text-[10px]">VISITA URGENTE PROGRAMADA</span>
                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {PROPOSAL_META.proximaVisitaUrgente}
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-neutral-50 uppercase">
                Reunión de Delimitación Fina de Alcance en el Despacho
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-sans mt-0.5">
                Visita técnica para recopilar documentos base con líneas resaltadas, formalizar reglas del sustanciador y acordar los entregables factibles antes del cierre trimestral (5 de diciembre).
              </p>
            </div>
          </div>
          <NavLink
            to="/equipo-roles"
            className="b-btn text-xs bg-white dark:bg-neutral-800 border-neutral-900 font-bold shrink-0 self-start md:self-center"
          >
            <span>Ver Cronograma Completo</span>
            <ChevronRight size={14} />
          </NavLink>
        </div>
      </div>

      {/* 5 Specific Requirements Collected in Meeting */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="b-badge b-badge-yellow text-[10px]">REUNIÓN EQUIPO TÉCNICO</span>
            <h2 className="text-base font-extrabold uppercase text-neutral-900 dark:text-neutral-50">
              Requerimientos Concertados con el Despacho
            </h2>
          </div>
          <span className="font-mono text-[11px] text-neutral-500">5 Módulos Clave</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_NEW_FEATURES.map((feat) => {
            const icons = {
              "lineas-resaltadas": Highlighter,
              "anti-alucinacion-prompt": Sliders,
              "extraccion-variables": FileText,
              "privacidad-no-cloud": Lock,
              "maxima-automatizacion": Sparkles
            };
            const Icon = icons[feat.id] || CheckCircle2;

            return (
              <div 
                key={feat.id} 
                className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded bg-[#fde047] border border-black flex items-center justify-center text-black shrink-0">
                      <Icon size={14} />
                    </div>
                    <span className="font-bold text-xs uppercase text-neutral-900 dark:text-neutral-100">
                      {feat.titulo}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#2563eb] dark:text-[#60a5fa] mb-1.5">
                    {feat.tagline}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {feat.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post-MVP Delimitation Note */}
        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="b-badge b-badge-yellow text-[10px] font-bold shrink-0">POST-MVP (FUTURO)</span>
            <span className="text-neutral-700 dark:text-neutral-300">
              Módulos como la <strong>transcripción de voz/audiencias</strong> e interoperabilidad quedan delimitados para fases posteriores tras consolidar el MVP de Tutelas.
            </span>
          </div>
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
            <span>Ver simulador con líneas resaltadas</span>
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
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Semillero de Investigación</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Desarrollo impulsado por el Semillero SENA (3 instructores investigadores guiando aprendices a su ritmo formativo hasta el 5 de diciembre).
            </p>
          </div>
          <NavLink to="/equipo-roles" className="text-xs font-mono font-bold text-[#e11d48] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Ver cronograma y semillero</span>
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
            <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Privacidad Zero-Cloud</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Los documentos de los casos y los datos personales no suben a la nube. Se procesan con variables locales dentro del Juzgado.
            </p>
          </div>
          <NavLink to="/seguridad" className="text-xs font-mono font-bold text-[#059669] inline-flex items-center gap-1 hover:underline pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Ver protocolo de privacidad local</span>
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
            Simulador de Documentos con Líneas Resaltadas
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-1 max-w-xl">
            Pruebe el reemplazo automático en documentos oficiales, la validación de variables fácticas y el análisis de prompts anti-alucinaciones.
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
