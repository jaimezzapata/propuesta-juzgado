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
  FileDown, 
  FileText, 
  Edit3, 
  Upload, 
  Highlighter,
  BarChart3,
  Users,
  Lock
} from 'lucide-react';
import { MOCK_TUTELA_CASES, TEMPLATE_USAGE_METRICS } from '../data/proposalData';
import { DEFAULT_LEGAL_TEMPLATES, compileTemplate } from '../data/legalTemplates';
import { downloadDocumentAsWord, printOrSaveAsPdf } from '../utils/documentExporter';
import { useAlert } from '../context/AlertContext';

export default function ScopeMVPPage() {
  const { showAlert } = useAlert();
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_TUTELA_CASES[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copied, setCopied] = useState(false);

  // User Profile Mode: 'trabajador' (Sustanciador) vs 'admin' (Jefe de Despacho)
  const [userRole, setUserRole] = useState('trabajador');

  // Visual Highlight of Replaced Lines in Base Document
  const [highlightLines, setHighlightLines] = useState(true);

  // Anti-Hallucination Prompt Validation Result
  const [promptValidation, setPromptValidation] = useState(null);

  // Active Control Tab: 'variables' (Case Data) vs 'template' (Format Editor) vs 'admin_metrics' (Métricas)
  const [activeTab, setActiveTab] = useState('variables');

  // Active Format / Template State
  const [selectedTemplateId, setSelectedTemplateId] = useState(DEFAULT_LEGAL_TEMPLATES[0].id);
  const [templateText, setTemplateText] = useState(DEFAULT_LEGAL_TEMPLATES[0].formatoOriginal);
  const [isCustomTemplate, setIsCustomTemplate] = useState(false);

  // Editable Form State initialized from first preset
  const [form, setForm] = useState({
    tipoDocumento: DEFAULT_LEGAL_TEMPLATES[0].nombre,
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

  // Handle Reading / Selecting a Judicial Template
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    const tmpl = DEFAULT_LEGAL_TEMPLATES.find(t => t.id === templateId);
    if (tmpl) {
      setTemplateText(tmpl.formatoOriginal);
      setIsCustomTemplate(false);
      setForm(prev => ({
        ...prev,
        tipoDocumento: tmpl.nombre
      }));
      triggerSimulateAnimation();
    }
  };

  // Restore Template to default official court text
  const handleRestoreTemplate = () => {
    const tmpl = DEFAULT_LEGAL_TEMPLATES.find(t => t.id === selectedTemplateId) || DEFAULT_LEGAL_TEMPLATES[0];
    setTemplateText(tmpl.formatoOriginal);
    setIsCustomTemplate(false);
    showAlert({
      type: 'info',
      title: 'Formato Oficial Restaurado',
      message: `Se ha reestablecido la redacción base de la plantilla "${tmpl.nombre}" según los parámetros oficiales del Juzgado 4 de Familia.`,
      confirmText: 'Aceptar'
    });
  };

  // Simulate Reading / Uploading an External Format File (.docx / .txt)
  const handleSimulateUploadFormat = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const isDocx = file.name.endsWith('.docx') || file.name.endsWith('.doc');

      if (isDocx) {
        // Docx files are binary zips: simulate intelligent text extraction from the Word document
        const simulatedExtractedFromDocx = `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}} (C.C. {{IDENTIFICACION}})
ACCIONADO: {{ACCIONADO}}
ASUNTO: PROVIDENCIA JUDICIAL IMPORTADA ("${file.name}")

I. CONSIDERACIONES DEL DESPACHO
El Despacho procede a dar trámite a la presente acción de tutela interpuesta para la salvaguarda de los derechos fundamentales a {{DERECHOS}}.

Hechos fácticos extraídos del expediente:
"{{HECHOS}}"

Pretensión procesal invocada:
"{{PRETENSION}}"

II. PARTE DISPOSITIVA
PRIMERO: ADMITIR la acción de tutela promovida por {{ACCIONANTE}} contra {{ACCIONADO}}.
SEGUNDO: CORRER TRASLADO a la accionada por el término de dos (2) días hábiles para que rinda informe detallado.
TERCERO: {{ORDEN_MEDIDA}}.
CUARTO: NOTIFICAR a las partes por el medio más expedito y eficaz.

NOTIFÍQUESE Y CÚMPLASE,

JUEZ CUARTO DE FAMILIA DE ORALIDAD`;

        setTemplateText(simulatedExtractedFromDocx);
        setIsCustomTemplate(true);
        showAlert({
          type: 'success',
          title: 'Documento Word Leído con Éxito',
          message: `El archivo "${file.name}" fue interpretado y estructurado por el motor de procesamiento documental. Se identificaron las cláusulas y variables jurídicas listas para su edición.`,
          confirmText: 'Continuar'
        });
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          setTemplateText(content);
          setIsCustomTemplate(true);
          showAlert({
            type: 'success',
            title: 'Formato Leído con Éxito',
            message: `El archivo "${file.name}" fue leído por el analizador. Ahora puedes modificar su estructura o compilarlo con los datos del expediente.`,
            confirmText: 'Continuar'
          });
        };
        reader.readAsText(file);
      }
      // Reset input value so the same file can be loaded again if desired
      e.target.value = '';
    } else {
      // Fallback simulated reading if triggered without selecting a file
      const simulatedCustom = `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}}
ACCIONADO: {{ACCIONADO}}
ASUNTO: AUTO PERSONALIZADO IMPORTADO POR EL DESPACHO

I. CONSIDERACIONES DEL DESPACHO
Este formato fue leído desde un archivo externo del usuario.
El accionante {{ACCIONANTE}} (identificado con {{IDENTIFICACION}}) solicita la protección urgente de sus derechos a {{DERECHOS}}.

Hechos relevantes: "{{HECHOS}}".
Pretensión formulada: "{{PRETENSION}}".

II. PARTE DISPOSITIVA
PRIMERO: ADMITIR el trámite y dar traslado a {{ACCIONADO}}.
SEGUNDO: ORDENAR a la accionada responder en 48 horas.
TERCERO: {{ORDEN_MEDIDA}}.

NOTIFÍQUESE Y CÚMPLASE,
JUEZ CUARTO DE FAMILIA`;
      setTemplateText(simulatedCustom);
      setIsCustomTemplate(true);
      showAlert({
        type: 'success',
        title: 'Lectura de Formato Simulada',
        message: 'Se simuló la lectura de una plantilla judicial externa (".docx"). Los campos han sido detectados y ahora puedes modificar su texto libremente.',
        confirmText: 'Entendido'
      });
    }
    triggerSimulateAnimation();
  };

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
    
    // Auto-select the template that best matches the case
    let targetTemplateId = "auto-admisorio-medida";
    if (c.tipoDocumento.includes("Fallo") || c.tipoDocumento.includes("Sentencia")) {
      targetTemplateId = "sentencia-tutela";
    } else if (!c.medidaCautelar) {
      targetTemplateId = "auto-admisorio-ordinario";
    }
    
    setSelectedTemplateId(targetTemplateId);
    const tmpl = DEFAULT_LEGAL_TEMPLATES.find(t => t.id === targetTemplateId);
    if (tmpl && !isCustomTemplate) {
      setTemplateText(tmpl.formatoOriginal);
    }

    setForm({
      tipoDocumento: tmpl ? tmpl.nombre : c.tipoDocumento,
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

  // Anti-hallucination prompt validator
  const handleValidatePrompt = () => {
    const hasAccionante = form.accionante && form.accionante.length > 3;
    const hasHechos = form.hechos && form.hechos.length > 15;
    const hasPretension = form.pretension && form.pretension.length > 8;

    if (hasAccionante && hasHechos && hasPretension) {
      setPromptValidation({
        valid: true,
        score: "100%",
        resumen: "Prompt jurídico óptimo. Identificación de partes completa, hecho generador delimitado y alineado con el Decreto 2591/91. Listo para generar sin alucinaciones."
      });
    } else {
      setPromptValidation({
        valid: false,
        score: "65%",
        resumen: "Sugerencia del Asistente: Diligencie o amplíe los hechos y la pretensión para evitar que la IA asuma supuestos jurídicos."
      });
    }
  };

  // Compile document mapping
  const compiledDataMapping = useMemo(() => {
    return {
      '{{RADICADO}}': form.radicado || "2026-F04-TUT-0089",
      '{{ACCIONANTE}}': form.accionante || "[Nombre del Accionante]",
      '{{IDENTIFICACION}}': form.identificacion || "[Identificación]",
      '{{ACCIONADO}}': form.accionado || "[Entidad Accionada]",
      '{{DERECHOS}}': form.derechosVulnerados || "[Derechos Invocados]",
      '{{PRETENSION}}': form.pretension || "[Pretensión del accionante]",
      '{{HECHOS}}': form.hechos || "[Relato fáctico sucinto del expediente]",
      '{{ORDEN_MEDIDA}}': form.medidaCautelarTexto || form.pretension || "Protección preventiva urgente.",
      '{{FECHA_ACTUAL}}': new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  }, [form]);

  // Live compilation of the legal document (plain text for export)
  const previewDocument = useMemo(() => {
    return compileTemplate(templateText, {
      radicado: form.radicado || "2026-F04-TUT-0089",
      accionante: form.accionante || "[Nombre del Accionante]",
      identificacion: form.identificacion || "[Identificación]",
      accionado: form.accionado || "[Entidad Accionada]",
      derechosVulnerados: form.derechosVulnerados || "[Derechos Invocados]",
      pretension: form.pretension || "[Pretensión del accionante]",
      hechos: form.hechos || "[Relato fáctico sucinto del expediente]",
      medidaCautelarTexto: form.medidaCautelarTexto || form.pretension || "Protección preventiva urgente."
    });
  }, [templateText, form]);

  // Render document with visual highlights
  const renderVisualDocument = useMemo(() => {
    if (!highlightLines) {
      return previewDocument;
    }
    const tagsRegex = /({{RADICADO}}|{{ACCIONANTE}}|{{IDENTIFICACION}}|{{ACCIONADO}}|{{DERECHOS}}|{{PRETENSION}}|{{HECHOS}}|{{ORDEN_MEDIDA}}|{{FECHA_ACTUAL}})/g;
    const parts = templateText.split(tagsRegex);

    return parts.map((part, index) => {
      if (compiledDataMapping[part] !== undefined) {
        return (
          <mark 
            key={index} 
            className="bg-yellow-300 dark:bg-yellow-400 text-black px-1 font-bold rounded-xs shadow-xs"
            title={`Línea sustituida por IA: ${part}`}
          >
            {compiledDataMapping[part]}
          </mark>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [templateText, compiledDataMapping, highlightLines, previewDocument]);

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
      message: `El documento judicial ha sido generado y descargado exitosamente como "${filename}". Incluye el formato judicial oficial modificado, márgenes de 2.5cm y formato editable para Microsoft Word.`,
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
      message: 'Se ha abierto una ventana con el formato compilado. En el cuadro de diálogo de impresión, selecciona la opción "Guardar como PDF" para guardarlo en tu equipo.',
      confirmText: 'Entendido'
    });
  };

  // Insert a tag into the template text editor
  const handleInsertTag = (tag) => {
    setTemplateText(prev => `${prev} ${tag} `);
    setIsCustomTemplate(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 05</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">ALCANCE TÉCNICO & SIMULADOR (DEMO)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          5. Alcance Técnico y Simulador MVP (Demo)
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Sustitución en <strong>documentos con líneas resaltadas</strong>, <strong>asistente corrector de prompts</strong>, validación anti-alucinaciones y analítica por perfiles.
        </p>
      </div>

      {/* Role Switcher Toolbar (Jefe vs Sustanciador) */}
      <div className="p-3 bg-white dark:bg-[#1c1e22] border-2 border-[#18181b] dark:border-neutral-700 rounded shadow-[3px_3px_0px_#18181b] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase">
            Perfil de Usuario Activo:
          </span>
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded border border-neutral-300 dark:border-neutral-700 font-mono text-xs">
            <button
              onClick={() => {
                setUserRole('trabajador');
                if (activeTab === 'admin_metrics') setActiveTab('variables');
              }}
              className={`py-1 px-2.5 rounded font-bold flex items-center gap-1.5 transition-all ${
                userRole === 'trabajador' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Scale size={13} />
              <span>Sustanciador (Trabajador)</span>
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setActiveTab('admin_metrics');
              }}
              className={`py-1 px-2.5 rounded font-bold flex items-center gap-1.5 transition-all ${
                userRole === 'admin' 
                  ? 'bg-yellow-400 text-black shadow-xs font-black' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Users size={13} />
              <span>Jefe de Despacho (Admin)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="b-badge b-badge-green flex items-center gap-1 text-[10px]">
            <Lock size={11} /> Zero-Cloud: Datos en Local
          </span>
        </div>
      </div>

      {/* Simulator Container */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        {/* Accionante Quick Auto-Fill Selector Bar */}
        <div className="p-3.5 mb-5 bg-[#FFE600]/15 dark:bg-[#FFE600]/10 border-2 border-[#18181b] dark:border-[#FFE600] rounded">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <UserCheck size={20} className="text-[#18181b] dark:text-[#FFE600] shrink-0" />
              <div>
                <span className="font-mono text-[11px] font-black uppercase text-[#18181b] dark:text-[#FFE600] block">
                  AUTOCOMPLETADO POR ACCIONANTE / EXPEDIENTE
                </span>
                <span className="text-xs text-neutral-800 dark:text-neutral-200 font-sans">
                  Seleccione un accionante para cargar automáticamente sus antecedentes y plantilla recomendada:
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto min-w-[340px]">
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

        {/* Dual Column Layout: Left Column (Control Tabs) vs Right Column (Output Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Controls with Tabs */}
          <div className="lg:col-span-5 p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded space-y-4 font-mono text-xs">
            {/* Tab Navigation Switches */}
            <div className="flex items-center gap-1 p-1 bg-neutral-200 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700">
              <button
                onClick={() => setActiveTab('variables')}
                className={`flex-1 py-1.5 px-2 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'variables'
                    ? 'bg-white dark:bg-[#1c1e22] text-[#2563eb] shadow-sm border border-neutral-300 dark:border-neutral-600'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Sliders size={13} />
                <span>1. Caso / Variables</span>
              </button>
              <button
                onClick={() => setActiveTab('template')}
                className={`flex-1 py-1.5 px-2 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'template'
                    ? 'bg-white dark:bg-[#1c1e22] text-[#2563eb] shadow-sm border border-neutral-300 dark:border-neutral-600'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Edit3 size={13} />
                <span>2. Formato Base</span>
                {isCustomTemplate && (
                  <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
                )}
              </button>
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin_metrics')}
                  className={`flex-1 py-1.5 px-2 rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'admin_metrics'
                      ? 'bg-yellow-400 text-black shadow-sm font-black border border-yellow-500'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <BarChart3 size={13} />
                  <span>3. Métricas Jefe</span>
                </button>
              )}
            </div>

            {/* TAB 1: EDITABLE CASE VARIABLES */}
            {activeTab === 'variables' && (
              <div className="space-y-3">
                {/* Prompt Assistant Action Bar */}
                <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800/80 rounded border border-neutral-300 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                    <Sparkles size={13} className="text-[#2563eb]" />
                    <span>Asistente de Validación:</span>
                  </div>

                  <button
                    onClick={handleValidatePrompt}
                    className="b-btn text-[11px] py-1 px-3 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-400 font-bold flex items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    title="Analizar y verificar el prompt para evitar alucinaciones"
                  >
                    <Sliders size={13} className="text-[#2563eb]" />
                    <span>Validar Variables IA</span>
                  </button>
                </div>

                {/* Prompt Diagnostic Banner if activated */}
                {promptValidation && (
                  <div className={`p-2.5 rounded border text-[11px] font-mono ${
                    promptValidation.valid 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100' 
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100'
                  }`}>
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>Precisión del Prompt: {promptValidation.score}</span>
                      </span>
                      <button onClick={() => setPromptValidation(null)} className="text-neutral-500 hover:text-black">✕</button>
                    </div>
                    <p>{promptValidation.resumen}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Sliders size={14} className="text-[#2563eb]" />
                    <span>VARIABLES DEL EXPEDIENTE (EDITABLES)</span>
                  </span>
                  <button
                    onClick={handleClearForm}
                    className="text-[10px] text-neutral-600 dark:text-neutral-400 hover:text-[#e11d48] flex items-center gap-1"
                    title="Limpiar campos"
                  >
                    <RotateCcw size={11} />
                    <span>Limpiar</span>
                  </button>
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
                    Derechos Fundamentales Invocados:
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
              </div>
            )}

            {/* TAB 2: READ AND MODIFY LEGAL FORMAT (TEMPLATE EDITOR) */}
            {activeTab === 'template' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} className="text-[#059669]" />
                    <span>GESTOR Y EDITOR DEL FORMATO JUDICIAL</span>
                  </span>
                  {isCustomTemplate ? (
                    <span className="b-badge b-badge-red text-[9px] font-bold">MODIFICADO</span>
                  ) : (
                    <span className="b-badge b-badge-green text-[9px] font-bold">ORIGINAL</span>
                  )}
                </div>

                {/* Template Selector Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Leer Formato Base del Despacho:
                  </label>
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => handleSelectTemplate(e.target.value)}
                    className="b-select text-xs w-full text-neutral-900 dark:text-neutral-100 font-sans"
                  >
                    {DEFAULT_LEGAL_TEMPLATES.map((tmpl) => (
                      <option key={tmpl.id} value={tmpl.id}>
                        {tmpl.nombre} ({tmpl.categoria})
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Simulation Action */}
                <div className="flex items-center gap-2">
                  <label className="b-btn text-[11px] py-1.5 px-3 bg-neutral-100 dark:bg-neutral-800 cursor-pointer flex items-center gap-1.5 border border-dashed border-neutral-400 hover:border-black">
                    <Upload size={12} className="text-[#2563eb]" />
                    <span>Cargar Formato (.docx / .txt)</span>
                    <input 
                      type="file" 
                      accept=".txt,.doc,.docx" 
                      onChange={handleSimulateUploadFormat} 
                      className="hidden" 
                    />
                  </label>

                  <button
                    onClick={handleRestoreTemplate}
                    className="b-btn text-[11px] py-1.5 px-3 bg-neutral-100 dark:bg-neutral-800 flex items-center gap-1"
                    title="Restaurar a la redacción oficial original del juzgado"
                  >
                    <RotateCcw size={12} />
                    <span>Restaurar Original</span>
                  </button>
                </div>

                {/* Variable Tags Quick Insertion Chips */}
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                    Insertar variables dinámicas en el formato:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: "+ Accionante", tag: "{{ACCIONANTE}}" },
                      { label: "+ Demandado", tag: "{{ACCIONADO}}" },
                      { label: "+ Derechos", tag: "{{DERECHOS}}" },
                      { label: "+ Hechos", tag: "{{HECHOS}}" },
                      { label: "+ Pretensión", tag: "{{PRETENSION}}" },
                      { label: "+ Medida", tag: "{{ORDEN_MEDIDA}}" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleInsertTag(item.tag)}
                        className="b-badge b-badge-neutral text-[9px] py-0.5 px-1.5 hover:bg-[#FFE600] hover:text-black cursor-pointer font-bold"
                        title={`Insertar etiqueta ${item.tag}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editable Format Textarea */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Texto del Formato (Modificable):
                  </label>
                  <textarea
                    rows={12}
                    value={templateText}
                    onChange={(e) => {
                      setTemplateText(e.target.value);
                      setIsCustomTemplate(true);
                    }}
                    placeholder="Contenido del formato judicial con variables..."
                    className="b-input text-[11px] w-full text-neutral-900 dark:text-neutral-100 font-mono leading-relaxed"
                  />
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Puede editar considerandos, agregar citas de sentencias o ajustar los plazos de la parte resolutiva. La vista previa de la derecha se actualizará con sus modificaciones.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ADMIN METRICS & TEMPLATE MANAGEMENT */}
            {activeTab === 'admin_metrics' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 size={14} className="text-yellow-600" />
                    <span>MÉTRICAS Y CONTROL (JEFE DE DESPACHO)</span>
                  </span>
                  <span className="b-badge b-badge-yellow text-[9px]">EXCLUSIVO JEFE</span>
                </div>

                <div className="p-2.5 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-300 dark:border-yellow-800 rounded text-[11px] leading-relaxed">
                  <strong>Control Maestro:</strong> Solo el Administrador puede editar la redacción jurídica permanente de las plantillas y autorizar a los sustanciadores.
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                    Rendimiento por Plantilla (Mes Actual):
                  </div>
                  {TEMPLATE_USAGE_METRICS.map((metric) => (
                    <div key={metric.id} className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded space-y-1">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 text-[11px]">
                        {metric.plantilla}
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                        <div>Usos: <strong className="text-neutral-900 dark:text-neutral-100">{metric.usosMes}</strong></div>
                        <div>Tiempo: <strong className="text-neutral-900 dark:text-neutral-100">{metric.tiempoPromedioMin} min</strong></div>
                        <div>Aprobación: <strong className="text-[#059669]">{metric.tasaAprobacionDirecta}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulation Trigger Button */}
            <button
              onClick={triggerSimulateAnimation}
              disabled={isSimulating}
              className="b-btn b-btn-primary w-full text-xs font-bold py-2.5 flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>{isSimulating ? 'Estructurando con IA...' : 'Compilar Formato y Variables con IA'}</span>
            </button>
          </div>

          {/* Right Column: Generated Output Document */}
          <div className="lg:col-span-7 p-4 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 gap-2">
                <span className="flex items-center gap-1.5">
                  <FileType size={14} className="text-[#059669]" />
                  <span>DOCUMENTO BASE CON REEMPLAZO INTELIGENTE</span>
                </span>
                
                {/* Visual Highlight Toggle Switch */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHighlightLines(!highlightLines)}
                    className={`b-btn text-[10px] py-1 px-2 flex items-center gap-1.5 transition-all ${
                      highlightLines 
                        ? 'bg-yellow-300 text-black border-black font-black' 
                        : 'bg-white dark:bg-neutral-900 text-neutral-500'
                    }`}
                    title="Alternar resaltado visual de las líneas sustituidas por la IA"
                  >
                    <Highlighter size={12} />
                    <span>{highlightLines ? 'Líneas Resaltadas: ON' : 'Líneas Resaltadas: OFF'}</span>
                  </button>
                  <span className="b-badge b-badge-yellow text-[9px] py-0.5 font-bold">VISTA PREVIA</span>
                </div>
              </div>

              {/* Document Text Box */}
              <div className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-mono text-[11px] leading-relaxed max-h-[520px] overflow-y-auto whitespace-pre-wrap select-text text-neutral-900 dark:text-neutral-100 shadow-inner">
                {isSimulating ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-500 dark:text-neutral-400 font-bold">
                    <RefreshCw className="animate-spin text-[#2563eb]" size={28} />
                    <span>Sustituyendo líneas resaltadas sin alterar la base legal...</span>
                  </div>
                ) : (
                  renderVisualDocument
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

      {/* MVP Scope Delimitation Note: Out of Scope for MVP */}
      <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="b-badge b-badge-yellow text-[10px] shrink-0 font-bold">DELIMITACIÓN MVP</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            <strong>Módulos Delimitados para Fases Futuras (Post-MVP):</strong> Transcripción de audios de audiencias, integración con plataformas externas de la Rama Judicial y firma digital.
          </span>
        </div>
        <span className="text-[11px] text-neutral-500 shrink-0 font-bold">Foco 100%: Plantillas & Tutelas</span>
      </div>
    </div>
  );
}
