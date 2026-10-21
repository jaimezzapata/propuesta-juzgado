import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  CalendarCheck, 
  CheckCircle2, 
  AlertOctagon, 
  FileSignature, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPRINTS, PROPOSAL_META } from '../data/proposalData';
import { useAlert } from '../context/AlertContext';

export default function SprintRoadmapPage({ selectedEngine, approvals, setApprovals }) {
  const [signerName, setSignerName] = useState('');
  const [signerRole, setSignerRole] = useState('Juez de Familia 4 / Despacho');
  const [isSigned, setIsSigned] = useState(false);
  const { showAlert } = useAlert();

  const canSign = approvals.coordinacion && approvals.juzgado && approvals.engineSelected;

  const handleSign = (e) => {
    e.preventDefault();
    if (!canSign) {
      showAlert({
        type: 'warning',
        title: 'Condiciones Previas Pendientes',
        message: 'Para registrar el visto bueno oficial y formalizar el inicio del desarrollo, es indispensable marcar los 3 acuerdos previos de concertación (Aprobación SENA, Ruta del Motor y Visto Bueno del Juzgado 4).',
        confirmText: 'Entendido, voy a revisar'
      });
      return;
    }

    setIsSigned(true);
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    showAlert({
      type: 'success',
      title: 'Visto Bueno Registrado Formalmente',
      message: `El visto bueno ha sido suscrito exitosamente por ${signerName || 'el Despacho'} (${signerRole}). La fase inicial de desarrollo ha quedado formalmente habilitada para dar inicio a la arquitectura y repositorios base.`,
      confirmText: 'Continuar'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 06</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">PLANIFICACIÓN & FORMALIZACIÓN</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          6. Fases de Entrega y Visto Bueno
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Definición de etapas de desarrollo del MVP, dependencias de inicio y acta interactiva de concertación.
        </p>
      </div>

      {/* Starting Dependencies Alert */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#ea580c]">
        <div className="flex items-center gap-2 mb-2 text-[#ea580c] font-mono text-xs font-bold uppercase">
          <AlertOctagon size={16} />
          <span>Dependencia de Inicio Ineludible (Gateway de Entrada)</span>
        </div>
        <h2 className="text-base sm:text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100">
          El Inicio del Proyecto Requiere el Cumplimiento de Dos Condiciones Previas:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs mt-3">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
            <div className="font-bold text-[#2563eb] mb-1">1. Aprobación Oficial de Coordinación SENA</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Autorización institucional de la Coordinación Académica para habilitar el repositorio y las horas del equipo de desarrollo de la Fábrica de Software.
            </p>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded">
            <div className="font-bold text-[#ea580c] mb-1">2. Confirmación de Licencias (Juzgado 4)</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Definición sobre si se arranca con <strong>Google Gemini</strong> (SENA) o si el Juzgado gestiona llaves de <strong>Azure OpenAI</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Sprints Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SPRINTS.map((sprint, idx) => {
          const isFase0 = idx === 0;
          return (
            <div 
              key={sprint.id}
              className={`clean-card p-4 flex flex-col justify-between ${
                isFase0 ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700' : 'bg-white dark:bg-[#1c1e22]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">ETAPA 0{idx}</span>
                  <span className="b-badge b-badge-yellow text-[10px] font-bold">{sprint.foco}</span>
                </div>
                <h3 className="font-bold text-sm uppercase mb-2 text-neutral-900 dark:text-neutral-100">
                  {sprint.nombre}
                </h3>
                <div className="space-y-1 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 mb-3">
                  {sprint.entregables.map((item, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-[#2563eb] font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 font-mono text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                ESTADO: {sprint.estado}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Formalization Form */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase text-neutral-600 dark:text-neutral-400 block">
              ACTA INTERACTIVA DE CONCERTACIÓN
            </span>
            <h3 className="text-base font-bold uppercase text-neutral-900 dark:text-neutral-100">
              Simulador de Visto Bueno para Habilitar el Desarrollo
            </h3>
          </div>
          <span className="b-badge b-badge-yellow text-xs font-bold">
            MOTOR PREFERIDO: {selectedEngine === 'gemini' ? 'GOOGLE GEMINI' : 'AZURE OPENAI'}
          </span>
        </div>

        <form onSubmit={handleSign} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono text-xs">
          {/* Checkboxes */}
          <div className="lg:col-span-7 space-y-2.5">
            <span className="font-bold uppercase text-neutral-700 dark:text-neutral-300 block mb-2">1. Condiciones de Concertación:</span>

            <label className="flex items-start gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <input
                type="checkbox"
                checked={approvals.coordinacion}
                onChange={(e) => setApprovals({ ...approvals, coordinacion: e.target.checked })}
                className="w-4 h-4 accent-[#2563eb] mt-0.5"
              />
              <div>
                <div className="font-bold text-neutral-900 dark:text-neutral-100">
                  Aprobación de la Coordinación Académica SENA
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Se avala la participación y asignación del equipo de desarrollo de la Fábrica de Software SENA.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <input
                type="checkbox"
                checked={approvals.engineSelected}
                onChange={(e) => setApprovals({ ...approvals, engineSelected: e.target.checked })}
                className="w-4 h-4 accent-[#2563eb] mt-0.5"
              />
              <div>
                <div className="font-bold text-neutral-900 dark:text-neutral-100">
                  Ruta Técnica Definida ({selectedEngine === 'gemini' ? 'Google Gemini' : 'Azure OpenAI'})
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Se acuerda la API seleccionada para las pruebas del MVP inicial.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <input
                type="checkbox"
                checked={approvals.juzgado}
                onChange={(e) => setApprovals({ ...approvals, juzgado: e.target.checked })}
                className="w-4 h-4 accent-[#2563eb] mt-0.5"
              />
              <div>
                <div className="font-bold text-neutral-900 dark:text-neutral-100">
                  Concertación con el Juzgado de Familia 4
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Aceptación del alcance exclusivo a Tutelas y protocolo de Mock Data sintética en desarrollo.
                </div>
              </div>
            </label>
          </div>

          {/* Signer Details */}
          <div className="lg:col-span-5 p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded flex flex-col justify-between">
            <div>
              <span className="font-bold uppercase text-neutral-700 dark:text-neutral-300 block mb-3">2. Identificación de Quien Concierta:</span>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] text-neutral-700 dark:text-neutral-300 mb-1 font-bold">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Dra. Juez de Familia 4"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="b-input text-xs text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-700 dark:text-neutral-300 mb-1 font-bold">Cargo / Representación:</label>
                  <select
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
                    className="b-select text-xs text-neutral-900 dark:text-neutral-100"
                  >
                    <option value="Juez de Familia 4 / Despacho">Juez de Familia 4 / Despacho</option>
                    <option value="Secretario(a) Judicial Juzgado 4">Secretario(a) Judicial Juzgado 4</option>
                    <option value="Coordinador Académico SENA">Coordinador Académico SENA</option>
                    <option value="Representante Fábrica de Software SENA">Representante Fábrica de Software SENA</option>
                  </select>
                </div>
              </div>

              {isSigned && (
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded text-emerald-900 dark:text-emerald-200 mb-4">
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <CheckCircle2 size={14} className="text-[#059669]" />
                    <span>VISTO BUENO REGISTRADO CON ÉXITO</span>
                  </div>
                  <div>Firmante: <strong>{signerName}</strong> ({signerRole})</div>
                  <div className="text-[10px] text-neutral-500 mt-1">Fase inicial de desarrollo habilitada formalmente.</div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <button
                type="submit"
                disabled={!canSign}
                className={`b-btn w-full text-xs font-bold py-2 ${
                  canSign ? 'b-btn-primary' : 'bg-neutral-200 dark:bg-neutral-700 opacity-60 cursor-not-allowed'
                }`}
              >
                <FileSignature size={14} />
                <span>Registrar Visto Bueno & Habilitar Desarrollo</span>
              </button>

              <NavLink
                to="/dossier"
                className="b-btn w-full text-xs py-2 bg-white dark:bg-neutral-800 text-center"
              >
                <Printer size={13} />
                <span>Ver y Exportar Dossier Oficial Imprimible</span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
