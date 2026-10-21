import React, { useState } from 'react';
import { 
  CheckSquare, 
  FileCode2, 
  Download, 
  Copy, 
  Sparkles, 
  Sliders, 
  FileType, 
  ShieldAlert, 
  Eye, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { MOCK_TUTELA_CASES } from '../data/proposalData';
import { generateLegalDocument } from '../utils/legalDocumentGenerator';
import { useAlert } from '../context/AlertContext';

export default function ScopeMVP() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [customMedida, setCustomMedida] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showAlert } = useAlert();

  const activeCase = MOCK_TUTELA_CASES[selectedCaseIndex];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 700);
  };

  const previewDocument = generateLegalDocument({
    tipoDocumento: activeCase.tipoDocumento,
    radicado: "2026-F04-TUT-0089",
    accionante: activeCase.accionante,
    identificacion: activeCase.identificacion,
    accionado: activeCase.accionado,
    derechosVulnerados: activeCase.derechosVulnerados,
    pretension: activeCase.pretension,
    hechos: activeCase.hechos,
    medidaCautelar: customMedida,
    medidaCautelarTexto: activeCase.medidaCautelarTexto || "Garantizar de forma inmediata la atención en salud prescrita.",
    motorIA: "Google Gemini / Azure OpenAI (Mock Preview)"
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(previewDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="mvp-simulador" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="section-header-box">
          <CheckSquare size={20} className="text-[#ffe600]" />
          <span>02. ALCANCE TÉCNICO Y MVP (EXCLUSIVO TUTELAS)</span>
        </div>
        <span className="b-stamp b-stamp-red">MITIGACIÓN DE RIESGOS</span>
      </div>

      {/* Rationale Banner: Why ONLY Tutelas? */}
      <div className="b-card bg-[#fffdf0] dark:bg-[#1a1b14] border-l-[8px] border-l-[#ffe600] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-1">
              ¿Por qué acotar el alcance a un Módulo Único de Tutelas?
            </h3>
            <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
              Para garantizar una entrega ágil de valor y <strong>eliminar el riesgo de proyectos inacabados</strong>, 
              no se abarcarán inicialmente otros procesos (divorcios, sucesiones, etc.). 
              Las tutelas representan el <strong>60-70% de la urgencia diaria</strong> de un despacho de familia con términos perentorios de 10 días.
            </p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="b-stamp b-stamp-yellow text-xs font-bold">1 SOLO MÓDULO</span>
            <span className="b-stamp b-stamp-green text-xs font-bold">ALTO IMPACTO</span>
          </div>
        </div>
      </div>

      {/* Interactive Mockup: Input / Output Demonstration */}
      <div className="b-card bg-neutral-100 dark:bg-[#15171c] p-4 sm:p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
          <div>
            <span className="text-xs font-mono font-bold uppercase bg-black text-white px-2 py-0.5">
              MAQUETA VISUAL INTERACTIVA
            </span>
            <h4 className="text-lg font-black uppercase mt-1">
              Así operará el flujo Input / Output en la aplicación final
            </h4>
          </div>

          {/* Quick Case Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold">Cargar caso de prueba sintético:</span>
            {MOCK_TUTELA_CASES.map((caso, idx) => (
              <button
                key={caso.id}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  handleSimulate();
                }}
                className={`b-btn text-xs py-1 px-2.5 ${
                  selectedCaseIndex === idx 
                    ? 'b-btn-primary font-bold shadow-[2px_2px_0px_#000]' 
                    : 'bg-white dark:bg-neutral-800'
                }`}
              >
                Caso {idx + 1} ({caso.titulo.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Input vs Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: The Proposed INPUT Interface */}
          <div className="lg:col-span-5 flex flex-col justify-between b-card bg-white dark:bg-[#1a1d24]">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-black dark:border-white">
                <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase">
                  <Sliders size={16} className="text-[#0052ff]" />
                  <span>1. INPUT: VARIABLES DEL CASO</span>
                </div>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 px-1.5 py-0.5 font-bold">
                  FORMULARIO GUIADO
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block font-bold mb-1 text-neutral-600 dark:text-neutral-400">
                    Tipo de Providencia a Proyectar:
                  </label>
                  <div className="b-input bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-neutral-100">
                    {activeCase.tipoDocumento}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1 text-neutral-600 dark:text-neutral-400">
                      Accionante (Ficticio):
                    </label>
                    <div className="b-input bg-neutral-100 dark:bg-neutral-800 truncate" title={activeCase.accionante}>
                      {activeCase.accionante}
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-1 text-neutral-600 dark:text-neutral-400">
                      Entidad Accionada:
                    </label>
                    <div className="b-input bg-neutral-100 dark:bg-neutral-800 truncate" title={activeCase.accionado}>
                      {activeCase.accionado}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-neutral-600 dark:text-neutral-400">
                    Derechos Fundamentales Invocados:
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {activeCase.derechosVulnerados.map((d, i) => (
                      <span key={i} className="bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 text-[10px] font-bold">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-neutral-600 dark:text-neutral-400">
                    Hechos Fácticos Resumidos:
                  </label>
                  <div className="b-textarea bg-neutral-100 dark:bg-neutral-800 text-[11px] leading-relaxed max-h-24 overflow-y-auto">
                    {activeCase.hechos}
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-neutral-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={customMedida} 
                      onChange={(e) => setCustomMedida(e.target.checked)}
                      className="w-4 h-4 accent-[#ffe600] border-2 border-black"
                    />
                    <span className="font-bold text-[11px] text-neutral-900 dark:text-neutral-100">
                      Incluir Medida Cautelar Provisional Urgente (24-48h)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-black dark:border-white">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="b-btn b-btn-primary w-full text-xs font-bold py-2.5"
              >
                <Sparkles size={16} />
                <span>{isSimulating ? 'Estructurando Borrador...' : 'Procesar Variables con IA'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: The Proposed OUTPUT Document */}
          <div className="lg:col-span-7 flex flex-col justify-between b-card bg-[#fffef9] dark:bg-[#121418]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-black dark:border-white">
                <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase">
                  <FileType size={16} className="text-[#00d665]" />
                  <span>2. OUTPUT: DOCUMENTO JURÍDICO ESTRUCTURADO</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="bg-[#ffe600] text-black px-1.5 py-0.5 font-bold border border-black">
                    BORRADOR SUJETO A REVISIÓN
                  </span>
                </div>
              </div>

              {/* Document Paper Preview */}
              <div className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0c0e12] p-4 font-mono text-xs leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap select-text text-neutral-900 dark:text-neutral-200">
                {isSimulating ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-500 font-mono">
                    <RefreshCw className="animate-spin text-[#0052ff]" size={32} />
                    <span>Orquestando prompt legal y aplicando jurisprudencia constitucional...</span>
                  </div>
                ) : (
                  previewDocument
                )}
              </div>
            </div>

            {/* Export Toolbar Mockup */}
            <div className="mt-4 pt-3 border-t border-black dark:border-white flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-[11px] text-neutral-500 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#00d665] rounded-full"></span>
                <span>Formatos contemplados en el MVP:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="b-btn text-xs py-1.5 px-3"
                  title="Copiar texto al portapapeles"
                >
                  <Copy size={14} />
                  <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>

                <button
                  onClick={() => showAlert({
                    type: 'info',
                    title: 'Descarga Word (.docx)',
                    message: 'En el software final, este botón compilará el documento directamente en formato Word (.docx editable) compatible con el despacho judicial.',
                    confirmText: 'Entendido'
                  })}
                  className="b-btn b-btn-blue text-xs py-1.5 px-3"
                >
                  <Download size={14} />
                  <span>Descarga Word (.docx)</span>
                </button>

                <button
                  onClick={() => showAlert({
                    type: 'info',
                    title: 'Descarga PDF Oficial',
                    message: 'En el software final, este botón generará el archivo PDF estructurado con numeración, membrete oficial y sellos de radicación del Juzgado 4.',
                    confirmText: 'Entendido'
                  })}
                  className="b-btn b-btn-red text-xs py-1.5 px-3"
                >
                  <Download size={14} />
                  <span>Descarga PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
