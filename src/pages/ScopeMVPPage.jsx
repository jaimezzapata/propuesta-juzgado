import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Download, 
  Sliders, 
  FileType, 
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  Scale,
  UserCheck,
  FileDown
} from 'lucide-react';
import { MOCK_TUTELA_CASES } from '../data/proposalData';
import { generateLegalDocument } from '../utils/legalDocumentGenerator';
import { downloadDocumentAsWord, printOrSaveAsPdf } from '../utils/documentExporter';
import { useAlert } from '../context/AlertContext';

export default function ScopeMVPPage() {
  const { showAlert } = useAlert();
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_TUTELA_CASES[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editable Form State initialized from first preset
  const [form, setForm] = useState({
    tipoDocumento: MOCK_TUTELA_CASES[0].tipoDocumento,
    radicado: "2026-F04-TUT-0089",
    accionante: MOCK_TUTELA_CASES[0].accionante,
    identificacion: MOCK_TUTELA_CASES[0].identificacion,
    accionado: MOCK_TUTELA_CASES[0].accionado,
    derechosVulnerados: MOCK_TUTELA_CASES[0].derechosVulnerados.join(', '),
    pretension: MOCK_TUTELA_CASES[0].pretension,
    hechos: MOCK_TUTELA_CASES[0].hechos,
    medidaCautelar: MOCK_TUTELA_CASES[0].medidaCautelar,
    medidaCautelarTexto: MOCK_TUTELA_CASES[0].medidaCautelarTexto || "Garantizar de forma inmediata la atención en salud prescrita."
  });

  // Handle Accionante / Document Auto-Fill
  const handleSelectAccionante = (caseId) => {
    setSelectedCaseId(caseId);
    
    if (caseId === "custom") {
      setForm({
        tipoDocumento: "Auto Admisorio con Medida Provisional",
        radicado: "2026-F04-TUT-XXXX",
        accionante: "",
        identificacion: "",
        accionado: "",
        derechosVulnerados: "Salud, Vida Digna, Mínimo Vital",
        pretension: "",
        hechos: "",
        medidaCautelar: false,
        medidaCautelarTexto: ""
      });
      return;
    }

    const c = MOCK_TUTELA_CASES.find(item => item.id === caseId);
    if (!c) return;

    const caseIndex = MOCK_TUTELA_CASES.findIndex(item => item.id === caseId);
    setForm({
      tipoDocumento: c.tipoDocumento,
      radicado: `2026-F04-TUT-00${89 + caseIndex}`,
      accionante: c.accionante,
      identificacion: c.identificacion,
      accionado: c.accionado,
      derechosVulnerados: Array.isArray(c.derechosVulnerados) ? c.derechosVulnerados.join(', ') : c.derechosVulnerados,
      pretension: c.pretension,
      hechos: c.hechos,
      medidaCautelar: c.medidaCautelar,
      medidaCautelarTexto: c.medidaCautelarTexto || "Garantizar la protección provisional inmediata."
    });

    triggerSimulateAnimation();
  };

  // Reset to empty custom form
  const handleClearForm = () => {
    handleSelectAccionante("custom");
  };

  // Trigger quick AI simulation animation
  const triggerSimulateAnimation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  // Live generation of the legal document from current editable form inputs
  const previewDocument = useMemo(() => {
    return generateLegalDocument({
      tipoDocumento: form.tipoDocumento,
      radicado: form.radicado || "2026-F04-TUT-0089",
      accionante: form.accionante || "[Nombre del Accionante]",
      identificacion: form.identificacion || "[Identificación]",
      accionado: form.accionado || "[Entidad Accionada]",
      derechosVulnerados: form.derechosVulnerados ? form.derechosVulnerados.split(',').map(s => s.trim()) : ["Derecho Constitucional Invocado"],
      pretension: form.pretension || "[Pretensión del accionante]",
      hechos: form.hechos || "[Relato fáctico sucinto del expediente]",
      medidaCautelar: form.medidaCautelar,
      medidaCautelarTexto: form.medidaCautelarTexto || form.pretension || "Protección preventiva urgente.",
      motorIA: "Google Gemini / Azure OpenAI (Mock Preview)"
    });
  }, [form]);

  const handleCopy = () => {
    navigator.clipboard.writeText(previewDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Real client-side Word download
  const handleDownloadWord = () => {
    const filename = `Providencia_${form.radicado.replace(/[^a-zA-Z0-9-]/g, '_')}_${(form.accionante || 'Tutela').replace(/\s+/g, '_')}.doc`;
    downloadDocumentAsWord({
      filename,
      radicado: form.radicado,
      tipoDocumento: form.tipoDocumento,
      accionante: form.accionante,
      accionado: form.accionado,
      content: previewDocument
    });

    showAlert({
      type: 'success',
      title: 'Descarga Word (.doc) Iniciada',
      message: `El documento judicial ha sido generado y descargado exitosamente como "${filename}". Incluye membrete oficial del Juzgado 4 de Familia, márgenes judiciales de 2.5cm y formato 100% editable para Microsoft Word.`,
      confirmText: 'Aceptar'
    });
  };

  // Real client-side PDF preview and print
  const handleDownloadPdf = () => {
    printOrSaveAsPdf({
      radicado: form.radicado,
      tipoDocumento: form.tipoDocumento,
      accionante: form.accionante,
      accionado: form.accionado,
      content: previewDocument
    });

    showAlert({
      type: 'info',
      title: 'Vista Previa PDF Judicial Generada',
      message: 'Se ha abierto una ventana con el documento oficial formateado con membrete de la Rama Judicial. En el cuadro de diálogo de impresión, selecciona la opción "Guardar como PDF" para almacenarlo en tu equipo.',
      confirmText: 'Entendido'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 02</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">ALCANCE TÉCNICO & SIMULADOR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          2. Alcance Técnico y Simulador MVP (Tutelas)
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Seleccione un accionante para autocompletar el expediente o edite los campos libremente. Descargue la providencia simulada en Word o PDF en tiempo real.
        </p>
      </div>

      {/* Rationale Card */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#FFE600]">
        <h2 className="text-base sm:text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Scale size={18} className="text-[#2563eb]" />
          <span>Focalización Estratégica: ¿Por qué acotar el MVP a Tutelas?</span>
        </h2>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3">
          Las tutelas representan el <strong>trámite de mayor urgencia diaria en el Juzgado de Familia 4</strong>, con términos constitucionales perentorios de 10 días para fallo y 24 a 48 horas para medidas provisionales. Acotar el Producto Mínimo Viable a tutelas elimina la dispersión técnica y garantiza un retorno operativo inmediato para el despacho.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="b-badge b-badge-green font-bold">MÓDULO ÚNICO: TUTELAS</span>
          <span className="b-badge b-badge-yellow font-bold">AUTO ADMISORIO</span>
          <span className="b-badge b-badge-blue font-bold">MEDIDA CAUTELAR PROVISIONAL</span>
          <span className="b-badge b-badge-neutral font-bold">PROYECTO DE SENTENCIA</span>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        {/* Accionante Quick Auto-Fill Selector */}
        <div className="p-3.5 mb-5 bg-[#FFE600]/15 dark:bg-[#FFE600]/10 border-2 border-[#18181b] dark:border-[#FFE600] rounded">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <UserCheck size={20} className="text-[#18181b] dark:text-[#FFE600] shrink-0" />
              <div>
                <span className="font-mono text-[11px] font-black uppercase text-[#18181b] dark:text-[#FFE600] block">
                  AUTOCOMPLETADO POR ACCIONANTE / DOCUMENTO
                </span>
                <span className="text-xs text-neutral-800 dark:text-neutral-200 font-sans">
                  Seleccione un accionante registrado para cargar automáticamente todos los datos del expediente:
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto min-w-[320px]">
              <select
                value={selectedCaseId}
                onChange={(e) => handleSelectAccionante(e.target.value)}
                className="b-select text-xs w-full font-bold text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 border-2 border-[#18181b] dark:border-white shadow-[2px_2px_0px_#18181b] dark:shadow-[2px_2px_0px_#FFE600]"
              >
                {MOCK_TUTELA_CASES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.accionante} ({c.identificacion}) — {c.titulo}
                  </option>
                ))}
                <option value="custom">✏️ Caso Personalizado (Escribir datos desde cero...)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dual Column Layout: Inputs (Left) and Output Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Editable Inputs */}
          <div className="lg:col-span-5 p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 font-bold text-neutral-900 dark:text-neutral-100">
              <span className="flex items-center gap-1.5">
                <Sliders size={14} className="text-[#2563eb]" />
                <span>1. VARIABLES DEL EXPEDIENTE (EDITABLES)</span>
              </span>
              <button
                onClick={handleClearForm}
                className="text-[10px] text-neutral-600 dark:text-neutral-400 hover:text-[#e11d48] flex items-center gap-1"
                title="Limpiar formulario"
              >
                <RotateCcw size={11} />
                <span>Limpiar</span>
              </button>
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Tipo de Providencia Judicial:
              </label>
              <select
                value={form.tipoDocumento}
                onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}
                className="b-select text-xs w-full text-neutral-900 dark:text-neutral-100 font-sans"
              >
                <option value="Auto Admisorio con Medida Provisional">Auto Admisorio con Medida Provisional</option>
                <option value="Auto Admisorio y Requerimiento de Informes">Auto Admisorio Ordinario (Sin Medida)</option>
                <option value="Proyecto de Sentencia de Tutela (Fallo)">Proyecto de Sentencia (Fallo de Tutela)</option>
              </select>
            </div>

            {/* Radicado y Accionante */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  N° Radicado:
                </label>
                <input
                  type="text"
                  value={form.radicado}
                  onChange={(e) => setForm({ ...form, radicado: e.target.value })}
                  placeholder="2026-F04-TUT-XXXX"
                  className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Accionante (Ciudadano):
                </label>
                <input
                  type="text"
                  value={form.accionante}
                  onChange={(e) => setForm({ ...form, accionante: e.target.value })}
                  placeholder="Nombre del accionante"
                  className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Cédula y Entidad Accionada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Cédula / Identificación:
                </label>
                <input
                  type="text"
                  value={form.identificacion}
                  onChange={(e) => setForm({ ...form, identificacion: e.target.value })}
                  placeholder="CC. 00.000.000"
                  className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Entidad Accionada:
                </label>
                <input
                  type="text"
                  value={form.accionado}
                  onChange={(e) => setForm({ ...form, accionado: e.target.value })}
                  placeholder="EPS / Entidad demandada"
                  className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Derechos Invocados */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Derechos Fundamentales Invocados (separados por coma):
              </label>
              <input
                type="text"
                value={form.derechosVulnerados}
                onChange={(e) => setForm({ ...form, derechosVulnerados: e.target.value })}
                placeholder="Salud, Vida Digna, Mínimo Vital..."
                className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100"
              />
            </div>

            {/* Pretensión Principal */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Pretensión Principal:
              </label>
              <textarea
                rows={2}
                value={form.pretension}
                onChange={(e) => setForm({ ...form, pretension: e.target.value })}
                placeholder="Qué solicita ordenar a la entidad accionada..."
                className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100 font-sans leading-relaxed"
              />
            </div>

            {/* Hechos Fácticos */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Hechos Fácticos Sintéticos:
              </label>
              <textarea
                rows={3}
                value={form.hechos}
                onChange={(e) => setForm({ ...form, hechos: e.target.value })}
                placeholder="Resumen de antecedentes y motivos de la tutela..."
                className="b-input text-xs w-full text-neutral-900 dark:text-neutral-100 font-sans leading-relaxed"
              />
            </div>

            {/* Medida Cautelar Toggle */}
            <div className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.medidaCautelar}
                  onChange={(e) => setForm({ ...form, medidaCautelar: e.target.checked })}
                  className="w-4 h-4 accent-[#2563eb]"
                />
                <span className="font-bold text-[11px] text-neutral-900 dark:text-neutral-100">
                  ¿Incluir Medida Cautelar Provisional Urgente?
                </span>
              </label>

              {form.medidaCautelar && (
                <div>
                  <label className="block text-[10px] text-neutral-600 dark:text-neutral-400 font-bold mb-1">
                    Orden Provisional Inmediata:
                  </label>
                  <input
                    type="text"
                    value={form.medidaCautelarTexto}
                    onChange={(e) => setForm({ ...form, medidaCautelarTexto: e.target.value })}
                    placeholder="Orden urgente en 24-48 horas..."
                    className="b-input text-[11px] w-full text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              )}
            </div>

            {/* Simulation Trigger Button */}
            <button
              onClick={triggerSimulateAnimation}
              disabled={isSimulating}
              className="b-btn b-btn-primary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>{isSimulating ? 'Estructurando con IA...' : 'Actualizar Borrador con IA'}</span>
            </button>
          </div>

          {/* Right Column: Generated Output Document */}
          <div className="lg:col-span-7 p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                <span className="flex items-center gap-1.5">
                  <FileType size={14} className="text-[#059669]" />
                  <span>2. OUTPUT: BORRADOR ESTRUCTURADO EN TIEMPO REAL</span>
                </span>
                <span className="b-badge b-badge-yellow text-[9px] py-0.5 font-bold">VISTA PREVIA</span>
              </div>

              {/* Document Text Box */}
              <div className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-mono text-[11px] leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre-wrap select-text text-neutral-900 dark:text-neutral-100 shadow-inner">
                {isSimulating ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-500 dark:text-neutral-400 font-bold">
                    <RefreshCw className="animate-spin text-[#2563eb]" size={28} />
                    <span>Compilando variables y jurisprudencia aplicable...</span>
                  </div>
                ) : (
                  previewDocument
                )}
              </div>
            </div>

            {/* Export & Action Toolbar */}
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400 font-bold">
                Descarga de archivos reales (sin backend):
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="b-btn text-xs py-1.5 px-3 bg-white dark:bg-neutral-800"
                  title="Copiar texto al portapapeles"
                >
                  <Copy size={13} />
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  onClick={handleDownloadWord}
                  className="b-btn text-xs py-1.5 px-3 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100 border-blue-400 font-bold hover:bg-blue-100"
                  title="Descargar archivo editable para Microsoft Word"
                >
                  <FileDown size={13} className="text-[#2563eb]" />
                  <span>Descargar Word (.doc)</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className="b-btn text-xs py-1.5 px-3 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100 border-red-400 font-bold hover:bg-red-100"
                  title="Abrir vista judicial para guardar como PDF"
                >
                  <Download size={13} className="text-[#e11d48]" />
                  <span>Generar PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Delivery Scope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#2563eb]">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck2 size={18} className="text-[#2563eb]" />
            <h4 className="font-bold text-xs uppercase text-neutral-900 dark:text-neutral-100">
              Auto Admisorio
            </h4>
          </div>
          <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            Revisión automática de requisitos formales (Art. 14 Dec. 2591), orden de traslado a la entidad accionada y vinculación de terceros con términos procesales exactos.
          </p>
        </div>

        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#FFE600]">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-[#059669]" />
            <h4 className="font-bold text-xs uppercase text-neutral-900 dark:text-neutral-100">
              Medida Cautelar
            </h4>
          </div>
          <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            Detección de urgencia manifiesta y redacción de órdenes provisionales perentorias para evitar la consumación de perjuicios irremediables (salud, niñez, adultos mayores).
          </p>
        </div>

        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#059669]">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={18} className="text-[#059669]" />
            <h4 className="font-bold text-xs uppercase text-neutral-900 dark:text-neutral-100">
              Proyecto de Fallo
            </h4>
          </div>
          <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            Estructuración del problema jurídico, síntesis probatoria, cita de sentencias hito de la Corte Constitucional y proyecto de parte resolutiva para el Juez.
          </p>
        </div>
      </div>
    </div>
  );
}
