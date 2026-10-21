import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Sparkles, 
  FileSignature, 
  Scale, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPRINTS, PROPOSAL_META } from '../data/proposalData';
import { useAlert } from '../context/AlertContext';

export default function SprintZeroRoadmap({ 
  selectedEngine, 
  approvals, 
  setApprovals,
  onOpenDossier 
}) {
  const [signerName, setSignerName] = useState('');
  const [signerRole, setSignerRole] = useState('Juez de Familia 4 / Despacho');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { showAlert } = useAlert();

  const canSign = approvals.coordinacion && approvals.juzgado && approvals.engineSelected;

  const handleFormalize = (e) => {
    e.preventDefault();
    if (!canSign) {
      showAlert({
        type: 'warning',
        title: 'Condiciones Previas Pendientes',
        message: 'Por favor marque los puntos de acuerdo previos para habilitar la formalización del Sprint 0.',
        confirmText: 'Entendido'
      });
      return;
    }

    setIsFormSubmitted(true);
    
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <section id="formalizacion" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="section-header-box">
          <Calendar size={20} className="text-[#ffe600]" />
          <span>06. FASES DE ENTREGA Y VISTO BUENO</span>
        </div>
        <span className="b-stamp b-stamp-yellow">DEPENDENCIAS DE INICIO</span>
      </div>

      {/* Critical Starting Dependency Box */}
      <div className="b-card bg-[#fffdf0] dark:bg-[#1a1b14] border-l-[8px] border-l-[#ff6600] mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertOctagon size={18} className="text-[#ff6600]" />
              <span className="font-mono text-xs font-bold uppercase text-[#ff6600]">
                CONDICIÓN PREVIA OBLIGATORIA (GATEWAY)
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase">
              Activación de la Fase de Inicio: Dependencias Clave
            </h3>
            <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300 mt-1">
              El inicio formal de la configuración de repositorios y arquitectura base iniciará inmediatamente 
              una vez se obtenga: <strong>1) La aprobación oficial de la Coordinación Académica del SENA</strong>, 
              y <strong>2) La confirmación del Juzgado sobre la ruta de licencias (Google vs Microsoft)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Sprints Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {SPRINTS.map((sprint, idx) => {
          const isFase0 = idx === 0;
          return (
            <div 
              key={sprint.id}
              className={`b-card ${
                isFase0 
                  ? 'border-2 border-black dark:border-white bg-[#fffdf0] dark:bg-[#201d14] ring-2 ring-[#ffe600]' 
                  : 'bg-white dark:bg-[#171a22]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-neutral-500">ETAPA 0{idx}</span>
                <span className={`b-stamp text-[10px] ${isFase0 ? 'b-stamp-yellow' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
                  {sprint.foco}
                </span>
              </div>

              <h4 className="font-black text-base uppercase mb-2">
                {sprint.nombre}
              </h4>

              <div className="space-y-1.5 font-mono text-xs text-neutral-700 dark:text-neutral-300 mb-4">
                {sprint.entregables.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-[#0052ff] font-bold">▪</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-neutral-700 font-mono text-[10px] font-bold uppercase text-neutral-500">
                ESTADO: {sprint.estado}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Formalization & Sign-Off Panel */}
      <div className="b-card bg-neutral-100 dark:bg-[#16181f] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
          <div>
            <span className="text-xs font-mono font-bold uppercase bg-black text-white px-2 py-0.5">
              PANEL DE FORMALIZACIÓN Y CONCERTACIÓN TÉCNICA
            </span>
            <h3 className="text-xl font-black uppercase mt-1">
              Simulador de Visto Bueno para Habilitar el Sprint 0
            </h3>
            <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
              Permite validar de forma interactiva el cumplimiento de las condiciones previas antes de iniciar desarrollo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold">MOTOR SELECCIONADO:</span>
            <span className="b-stamp b-stamp-yellow text-xs font-bold">
              {selectedEngine === 'gemini' ? 'GOOGLE GEMINI (Opción A)' : 'AZURE OPENAI (Opción B)'}
            </span>
          </div>
        </div>

        <form onSubmit={handleFormalize} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Checkboxes List */}
          <div className="lg:col-span-7 b-card bg-white dark:bg-[#1a1d24]">
            <h4 className="font-mono font-bold text-xs uppercase mb-3 text-neutral-500">
              1. Puntos de Acuerdo y Validación Previa:
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <label className="flex items-start gap-3 p-2.5 border border-neutral-300 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={approvals.coordinacion} 
                  onChange={(e) => setApprovals({ ...approvals, coordinacion: e.target.checked })}
                  className="w-5 h-5 accent-[#0052ff] mt-0.5"
                />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Aprobación de la Coordinación Académica SENA
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Se avala la participación y asignación del equipo de desarrollo de la Fábrica de Software SENA.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 border border-neutral-300 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={approvals.engineSelected} 
                  onChange={(e) => setApprovals({ ...approvals, engineSelected: e.target.checked })}
                  className="w-5 h-5 accent-[#0052ff] mt-0.5"
                />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Definición de Ruta de IA ({selectedEngine === 'gemini' ? 'Google Gemini' : 'Azure OpenAI'})
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Se acuerda la ruta seleccionada para la orquestación de prompts durante el ciclo de vida del MVP.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 border border-neutral-300 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={approvals.juzgado} 
                  onChange={(e) => setApprovals({ ...approvals, juzgado: e.target.checked })}
                  className="w-5 h-5 accent-[#0052ff] mt-0.5"
                />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Concertación con el Despacho (Juzgado de Familia 4)
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Se acepta el alcance acotado a Tutelas y el protocolo de Mock Data 100% sintética en fase de desarrollo.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Signer Details & Activation Button */}
          <div className="lg:col-span-5 flex flex-col justify-between b-card bg-[#fffef9] dark:bg-[#121418]">
            <div>
              <h4 className="font-mono font-bold text-xs uppercase mb-3 text-neutral-500">
                2. Datos de Quien Da el Visto Bueno:
              </h4>

              <div className="space-y-3 font-mono text-xs mb-4">
                <div>
                  <label className="block font-bold mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Dra. María Fernanda Silva"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="b-input text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Rol / Cargo Representado:</label>
                  <select
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
                    className="b-select text-xs"
                  >
                    <option value="Juez de Familia 4 / Despacho">Juez de Familia 4 / Despacho</option>
                    <option value="Secretario(a) Judicial Juzgado 4">Secretario(a) Judicial Juzgado 4</option>
                    <option value="Coordinador Académico SENA">Coordinador Académico SENA</option>
                    <option value="Líder Fábrica de Software SENA">Líder Fábrica de Software SENA</option>
                  </select>
                </div>
              </div>

              {isFormSubmitted && (
                <div className="p-3 bg-[#00d665]/20 border-2 border-[#00d665] font-mono text-xs text-neutral-900 dark:text-neutral-100 mb-4 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-[#009944] dark:text-[#00e575] mb-1">
                    <CheckCircle2 size={16} /> ACTA CONCERTADA SATISFACTORIAMENTE
                  </div>
                  <div>Firmado por: <strong>{signerName}</strong> ({signerRole})</div>
                  <div className="text-[10px] text-neutral-500 mt-1">Radicado: {PROPOSAL_META.radicado} • Sprint 0 HABILITADO</div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-black dark:border-white">
              <button
                type="submit"
                disabled={!canSign}
                className={`b-btn w-full text-xs font-bold py-2.5 ${
                  canSign ? 'b-btn-primary' : 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed opacity-60'
                }`}
              >
                <FileSignature size={16} />
                <span>Emitir Visto Bueno & Habilitar Sprint 0</span>
              </button>

              <button
                type="button"
                onClick={onOpenDossier}
                className="b-btn w-full text-xs py-2 bg-neutral-200 dark:bg-neutral-800"
              >
                Ver Documento Formal Completo para Imprimir
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
