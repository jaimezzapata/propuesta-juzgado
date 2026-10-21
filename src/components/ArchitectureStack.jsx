import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  Layout, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { AI_PROVIDERS } from '../data/proposalData';
import { useAlert } from '../context/AlertContext';

export default function ArchitectureStack({ selectedEngine, setSelectedEngine }) {
  const [activeLayer, setActiveLayer] = useState('ia');
  const { showAlert } = useAlert();

  const currentEngineData = AI_PROVIDERS[selectedEngine];

  return (
    <section id="arquitectura" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="section-header-box">
          <Cpu size={20} className="text-[#ffe600]" />
          <span>03. ARQUITECTURA Y STACK TECNOLÓGICO</span>
        </div>
        <span className="b-stamp b-stamp-blue">ESTABILIDAD & ESCALABILIDAD</span>
      </div>

      <p className="text-base text-neutral-800 dark:text-neutral-200 mb-8 max-w-4xl font-medium">
        Se propone una arquitectura desacoplada y orientada a microservicios/APIs, donde la interfaz de usuario, 
        el servidor de orquestación y el motor de IA operan de forma independiente para facilitar el mantenimiento y la sustitución de componentes.
      </p>

      {/* 4 Core Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Layer 1: Frontend */}
        <div 
          onClick={() => setActiveLayer('frontend')}
          className={`b-card b-card-clickable cursor-pointer ${
            activeLayer === 'frontend' ? 'ring-4 ring-[#ffe600] bg-[#fffdf0] dark:bg-[#222015]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">CLIENTE</span>
            <Layout size={22} className="text-[#0052ff]" />
          </div>
          <h4 className="font-black text-lg uppercase mb-1">React.js + Tailwind</h4>
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            Interfaz ágil, limpia y sin fricción. Componentes modulares, tipografía jurídica de alto contraste y validaciones de formulario en tiempo real.
          </p>
          <div className="text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 inline-block font-bold">
            UI / EXPERIENCIA DE USUARIO
          </div>
        </div>

        {/* Layer 2: Backend */}
        <div 
          onClick={() => setActiveLayer('backend')}
          className={`b-card b-card-clickable cursor-pointer ${
            activeLayer === 'backend' ? 'ring-4 ring-[#ffe600] bg-[#fffdf0] dark:bg-[#222015]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">SERVIDOR</span>
            <Server size={22} className="text-[#00d665]" />
          </div>
          <h4 className="font-black text-lg uppercase mb-1">Node.js + Express</h4>
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            Capa de orquestación segura. Valida y sanitiza variables, ensambla prompts legales blindados y gestiona el enrutamiento hacia la API de IA.
          </p>
          <div className="text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 inline-block font-bold">
            ORQUESTADOR SEGURO
          </div>
        </div>

        {/* Layer 3: Database */}
        <div 
          onClick={() => setActiveLayer('bd')}
          className={`b-card b-card-clickable cursor-pointer ${
            activeLayer === 'bd' ? 'ring-4 ring-[#ffe600] bg-[#fffdf0] dark:bg-[#222015]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">PERSISTENCIA</span>
            <Database size={22} className="text-[#ff3333]" />
          </div>
          <h4 className="font-black text-lg uppercase mb-1">PostgreSQL</h4>
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            Almacena exclusivamente configuraciones, plantillas base de providencias y roles de usuario. <strong>NO almacena datos sensibles de los casos.</strong>
          </p>
          <div className="text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 inline-block font-bold">
            CERO DATOS PERSONALES
          </div>
        </div>

        {/* Layer 4: AI Engine */}
        <div 
          onClick={() => setActiveLayer('ia')}
          className={`b-card b-card-clickable cursor-pointer ${
            activeLayer === 'ia' ? 'ring-4 ring-[#ffe600] bg-[#fffdf0] dark:bg-[#222015]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">MOTOR LLM</span>
            <Zap size={22} className="text-[#ffe600]" />
          </div>
          <h4 className="font-black text-lg uppercase mb-1">Motor de IA Dual</h4>
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            Ruta configurable: <strong>Google Gemini</strong> (inicio rápido) vs <strong>Azure OpenAI</strong> (licencia institucional Rama Judicial).
          </p>
          <div className="text-[10px] font-mono bg-[#ffe600] text-black px-2 py-0.5 inline-block font-bold">
            PUNTO DE DECISIÓN
          </div>
        </div>
      </div>

      {/* Interactive AI Engine Comparison & Decision Matrix */}
      <div className="b-card bg-neutral-100 dark:bg-[#16181f] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black dark:border-white">
          <div>
            <span className="text-xs font-mono font-bold uppercase bg-[#ffe600] text-black px-2 py-0.5 border border-black">
              COMPARADOR DE RUTAS DE INTELIGENCIA ARTIFICIAL
            </span>
            <h3 className="text-xl font-black uppercase mt-1">
              Evaluación Técnica: Opción A (Google) vs Opción B (Microsoft Azure)
            </h3>
          </div>

          {/* Toggle Engine Selector */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold bg-white dark:bg-neutral-800 p-1 border-2 border-black dark:border-white">
            <button
              onClick={() => setSelectedEngine('gemini')}
              className={`px-3 py-1.5 transition-all ${
                selectedEngine === 'gemini' 
                  ? 'bg-[#0052ff] text-white shadow-[2px_2px_0px_#000]' 
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              OPCIÓN A: GOOGLE GEMINI
            </button>
            <button
              onClick={() => setSelectedEngine('azure')}
              className={`px-3 py-1.5 transition-all ${
                selectedEngine === 'azure' 
                  ? 'bg-[#ff6600] text-white shadow-[2px_2px_0px_#000]' 
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              OPCIÓN B: AZURE OPENAI
            </button>
          </div>
        </div>

        {/* Selected Engine Analysis Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 b-card bg-white dark:bg-[#1a1d24]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className={`b-stamp ${selectedEngine === 'gemini' ? 'b-stamp-blue' : 'b-stamp-yellow'}`}>
                {currentEngineData.badge}
              </span>
              <span className="font-mono text-xs font-bold text-neutral-500">
                PROVEEDOR: {currentEngineData.proveedor}
              </span>
            </div>

            <h4 className="text-2xl font-black uppercase mb-1">
              {currentEngineData.nombre}
            </h4>
            <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 mb-4 font-bold">
              {currentEngineData.tagline}
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="font-bold uppercase text-neutral-500 block mb-2">Ventajas Técnicas:</span>
                <ul className="space-y-1.5">
                  {currentEngineData.ventajas.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                      <CheckCircle2 size={15} className="text-[#00d665] shrink-0 mt-0.5" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold uppercase text-neutral-500 block mb-2">Consideraciones / Desafíos:</span>
                <ul className="space-y-1.5">
                  {currentEngineData.desventajas.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                      <AlertCircle size={15} className="text-[#ff3333] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-dashed border-neutral-300 dark:border-neutral-700">
                <span className="font-bold uppercase text-neutral-500 block mb-1">Flujo de Datos Arquitectónico:</span>
                <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border border-black dark:border-white text-[11px] font-bold">
                  {currentEngineData.arquitecturaPath}
                </div>
              </div>
            </div>
          </div>

          {/* Decision Checklist & Impact */}
          <div className="lg:col-span-5 flex flex-col justify-between b-card bg-[#fffef9] dark:bg-[#121418]">
            <div>
              <div className="font-mono font-bold text-xs uppercase mb-3 pb-2 border-b border-black dark:border-white">
                CONDICIÓN OPERATIVA
              </div>

              <div className="space-y-3 font-mono text-xs mb-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
                  <div className="text-neutral-500 text-[10px] uppercase font-bold">Disponibilidad para Iniciar Desarrollo:</div>
                  <div className="text-base font-black text-neutral-900 dark:text-neutral-100 mt-1">
                    {currentEngineData.disponibilidad}
                  </div>
                </div>

                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
                  <div className="text-neutral-500 text-[10px] uppercase font-bold">Requisito Previo del Juzgado:</div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-1">
                    {selectedEngine === 'gemini' 
                      ? 'Ninguno. El equipo SENA asume el aprovisionamiento de las credenciales de desarrollo.' 
                      : 'El Juzgado debe gestionar y suministrar las API keys del tenant de Microsoft de la Rama Judicial.'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#ffe600]/20 border-l-4 border-[#ffe600] font-mono text-[11px]">
                <strong>RECOMENDACIÓN DEL EQUIPO SENA:</strong> Iniciar la implementación inmediata con <strong>Opción A (Google Gemini)</strong> para un avance ágil y continuo, manteniendo la arquitectura desacoplada para conectar con <strong>Azure OpenAI</strong> tan pronto el Juzgado confirme la disponibilidad de sus licencias.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black dark:border-white">
              <button
                onClick={() => {
                  showAlert({
                    type: 'success',
                    title: 'Ruta Técnica de IA Concertada',
                    message: `Has marcado la ${selectedEngine === 'gemini' ? 'Opción A (Google Gemini)' : 'Opción B (Azure OpenAI)'} como ruta preferida para la concertación de la propuesta técnica.`,
                    confirmText: 'Entendido'
                  });
                }}
                className={`b-btn w-full text-xs font-bold py-2.5 ${
                  selectedEngine === 'gemini' ? 'b-btn-blue' : 'b-btn-orange'
                }`}
              >
                <CheckCircle2 size={16} />
                <span>Marcar {selectedEngine === 'gemini' ? 'Gemini' : 'Azure'} como Ruta Preferida</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
