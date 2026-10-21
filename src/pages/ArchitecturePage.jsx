import React from 'react';
import { 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  Layout as LayoutIcon, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { AI_PROVIDERS } from '../data/proposalData';
import { useAlert } from '../context/AlertContext';

export default function ArchitecturePage({ selectedEngine, setSelectedEngine }) {
  const currentEngineData = AI_PROVIDERS[selectedEngine];
  const { showAlert } = useAlert();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 03</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">INFRAESTRUCTURA & APIS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          3. Arquitectura y Stack Tecnológico
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Estructura técnica desacoplada y evaluación comparativa del motor de Inteligencia Artificial.
        </p>
      </div>

      {/* 3 Core Tech Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Frontend */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#2563eb]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">CAPA CLIENTE</span>
            <LayoutIcon size={20} className="text-[#2563eb]" />
          </div>
          <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">React.js + Tailwind CSS</h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3 font-normal">
            Garantiza una interfaz ágil, limpia y optimizada para el flujo de trabajo del personal judicial. Validación reactiva sin recargas.
          </p>
          <span className="b-badge b-badge-blue text-[10px]">EXPERIENCIA DE USUARIO</span>
        </div>

        {/* Backend */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#059669]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">ORQUESTACIÓN</span>
            <Server size={20} className="text-[#059669]" />
          </div>
          <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">Node.js con Express</h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3 font-normal">
            Encargado de orquestar las peticiones entre el cliente y el motor de IA de forma segura. Sanitiza variables y blinda los prompts.
          </p>
          <span className="b-badge b-badge-green text-[10px]">API REST SEGURA</span>
        </div>

        {/* Database */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#ea580c]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">PERSISTENCIA</span>
            <Database size={20} className="text-[#ea580c]" />
          </div>
          <h3 className="text-base font-bold uppercase mb-1 text-neutral-900 dark:text-neutral-100">PostgreSQL</h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3 font-normal">
            Para gestionar configuraciones, plantillas base y roles de usuario. <strong>Sin almacenar datos sensibles de los casos.</strong>
          </p>
          <span className="b-badge b-badge-neutral text-[10px]">CERO DATOS PERSONALES</span>
        </div>
      </div>

      {/* Interactive AI Engine Comparison */}
      <div className="clean-card bg-white dark:bg-[#1c1e22]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase text-neutral-600 dark:text-neutral-400 block">
              PUNTO DE DECISIÓN TÉCNICA
            </span>
            <h3 className="text-base font-bold uppercase text-neutral-900 dark:text-neutral-100">
              Motor de IA: Opción A (Google) vs Opción B (Microsoft Azure)
            </h3>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded border border-neutral-300 dark:border-neutral-700 font-mono text-xs font-bold">
            <button
              onClick={() => setSelectedEngine('gemini')}
              className={`px-3 py-1.5 rounded transition-all ${
                selectedEngine === 'gemini'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-current'
              }`}
            >
              Opción A: Google Gemini
            </button>
            <button
              onClick={() => setSelectedEngine('azure')}
              className={`px-3 py-1.5 rounded transition-all ${
                selectedEngine === 'azure'
                  ? 'bg-[#ea580c] text-white shadow-sm'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-current'
              }`}
            >
              Opción B: Azure OpenAI
            </button>
          </div>
        </div>

        {/* Selected Engine Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className={`b-badge ${selectedEngine === 'gemini' ? 'b-badge-blue' : 'b-badge-yellow'}`}>
                {currentEngineData.badge}
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 font-bold">PROVEEDOR: {currentEngineData.proveedor}</span>
            </div>

            <h4 className="text-xl font-extrabold uppercase font-sans text-neutral-900 dark:text-neutral-50">
              {currentEngineData.nombre}
            </h4>
            <p className="text-neutral-800 dark:text-neutral-200 font-bold">
              {currentEngineData.tagline}
            </p>

            <div>
              <span className="font-bold uppercase text-neutral-600 dark:text-neutral-400 block mb-1.5">Ventajas Técnicas:</span>
              <ul className="space-y-1">
                {currentEngineData.ventajas.map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 size={14} className="text-[#059669] shrink-0 mt-0.5" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold uppercase text-neutral-600 dark:text-neutral-400 block mb-1.5">Desafíos o Dependencias:</span>
              <ul className="space-y-1">
                {currentEngineData.desventajas.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                    <AlertCircle size={14} className="text-[#e11d48] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Schedule Impact and Recommendation */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded font-mono text-xs">
            <div>
              <div className="font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                Condición Operativa
              </div>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded">
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold uppercase">Disponibilidad de Inicio:</div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {currentEngineData.disponibilidad}
                  </div>
                </div>

                <div className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded">
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold uppercase">Requisito Previo del Juzgado:</div>
                  <div className="text-neutral-800 dark:text-neutral-200 mt-0.5 text-[11px] font-medium">
                    {selectedEngine === 'gemini' 
                      ? 'Ninguno. El equipo SENA asume el aprovisionamiento de las credenciales de desarrollo.' 
                      : 'El Juzgado debe confirmar y suministrar las llaves de acceso del tenant corporativo de la Rama Judicial.'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded text-[11px] text-amber-950 dark:text-amber-100">
                <strong>RECOMENDACIÓN TÉCNICA:</strong> Iniciar la implementación con <strong>Opción A (Google Gemini)</strong> para un avance ágil y sin dependencias externas, manteniendo la arquitectura modular para conectar <strong>Azure OpenAI</strong> tan pronto el Juzgado entregue sus credenciales.
              </div>
            </div>

            <button
              onClick={() => showAlert({
                type: 'success',
                title: 'Ruta Técnica de IA Fijada',
                message: selectedEngine === 'gemini'
                  ? 'Se ha fijado la Opción A: Google Gemini como ruta prioritaria de prototipado rápido (sin dependencia de credenciales externas del juzgado).'
                  : 'Se ha fijado la Opción B: Azure OpenAI. El inicio con este motor queda sujeto a que el Juzgado de Familia 4 suministre las credenciales del tenant corporativo de la Rama Judicial.',
                confirmText: 'Aceptar Selección'
              })}
              className="b-btn b-btn-primary w-full mt-4 text-xs font-bold py-2 shadow-sm"
            >
              <CheckCircle2 size={14} />
              <span>Fijar {selectedEngine === 'gemini' ? 'Google Gemini' : 'Azure OpenAI'} en la Propuesta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
