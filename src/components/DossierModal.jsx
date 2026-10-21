import React from 'react';
import { X, Printer, Download, CheckCircle2, Scale, ShieldCheck } from 'lucide-react';
import { PROPOSAL_META, TEAM_ROLES, RACI_MATRIX, SPRINTS, AI_PROVIDERS } from '../data/proposalData';

export default function DossierModal({ isOpen, onClose, selectedEngine, approvals }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="b-card bg-white dark:bg-[#121418] w-full max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden shadow-[12px_12px_0px_#ffe600]">
        {/* Modal Toolbar Header */}
        <div className="p-4 bg-[#111111] text-white flex items-center justify-between border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <Scale size={20} className="text-[#ffe600]" />
            <div>
              <span className="text-xs font-mono font-bold text-[#ffe600] uppercase block">
                DOSSIER EJECUTIVO IMPRIMIBLE // RADICADO {PROPOSAL_META.radicado}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-tight">
                Propuesta Técnica: Asistente IA para Automatización Jurídica
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="b-btn b-btn-primary text-xs py-1.5 px-3"
            >
              <Printer size={15} />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="b-btn text-xs py-1.5 px-2 bg-neutral-800 text-white hover:bg-neutral-700"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-neutral-900 dark:text-neutral-100 bg-[#fffdfa] dark:bg-[#0f1115] space-y-6">
          {/* Header Memo */}
          <div className="border-b-2 border-black dark:border-white pb-6 text-center space-y-2">
            <div className="text-base sm:text-lg font-black uppercase">
              PROPUESTA TÉCNICA DE DESARROLLO
            </div>
            <div className="text-sm font-bold text-[#0052ff] uppercase">
              ASISTENTE DE INTELIGENCIA ARTIFICIAL PARA AUTOMATIZACIÓN JURÍDICA
            </div>
            <div className="text-xs text-neutral-500">
              RECEPTOR: JUZGADO DE FAMILIA 4 • EJECUTOR: FÁBRICA DE SOFTWARE & SEMILLERO SENA
            </div>
            <div className="inline-block bg-[#ffe600] text-black px-3 py-1 font-bold text-xs border border-black mt-2">
              VERSIÓN FORMAL: {PROPOSAL_META.version} // {PROPOSAL_META.fecha}
            </div>
          </div>

          {/* Section 1 */}
          <div>
            <h4 className="font-black text-sm uppercase bg-black text-white px-2 py-1 inline-block mb-2">
              1. DEFINICIÓN DEL PRODUCTO
            </h4>
            <p className="text-justify text-neutral-800 dark:text-neutral-200">
              Desarrollo de una aplicación web integrada con Inteligencia Artificial Generativa, diseñada para optimizar los tiempos de redacción y análisis de documentos jurídicos en el Juzgado de Familia 4, reduciendo la carga operativa manual.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-black text-sm uppercase bg-black text-white px-2 py-1 inline-block mb-2">
              2. ALCANCE TÉCNICO Y PRODUCTO MÍNIMO VIABLE (MVP)
            </h4>
            <p className="text-justify text-neutral-800 dark:text-neutral-200 mb-2">
              Para mitigar riesgos y entregar valor en el corto plazo, el ciclo inicial de desarrollo se acotará a un MVP funcional con las siguientes características:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Módulo único de enfoque:</strong> Generación y diligenciamiento automatizado exclusivamente para <strong>Tutelas</strong>.</li>
              <li><strong>Input/Output:</strong> Interfaz donde el usuario ingresa las variables del caso y el sistema retorna el documento jurídico estructurado en formato exportable (PDF/Word).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-black text-sm uppercase bg-black text-white px-2 py-1 inline-block mb-2">
              3. ARQUITECTURA Y STACK TECNOLÓGICO PROPUESTO
            </h4>
            <p className="text-justify text-neutral-800 dark:text-neutral-200 mb-2">
              Se plantea una arquitectura basada en tecnologías web modernas y consumo de APIs, orientada al rendimiento y la escalabilidad:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Frontend (Interfaz de usuario):</strong> React.js + Tailwind CSS, garantizando una interfaz ágil, limpia y optimizada para el flujo de trabajo del juzgado.</li>
              <li><strong>Backend (Lógica y enrutamiento):</strong> Node.js con Express, encargado de orquestar las peticiones entre el cliente y el motor de IA de forma segura.</li>
              <li><strong>Base de Datos:</strong> PostgreSQL para gestionar configuraciones, plantillas base y roles de usuario (sin almacenar datos sensibles de los casos).</li>
              <li>
                <strong>Motor de Inteligencia Artificial (Selección Concertada: {selectedEngine === 'gemini' ? 'Google Gemini' : 'Azure OpenAI'}):</strong>
                <div className="pl-4 mt-1 space-y-1">
                  <div>• <em>Opción A (Ruta de inicio rápido):</em> Implementación de la API de Google (Gemini) para el prototipado inicial, aprovechando la experiencia técnica del equipo de desarrollo.</div>
                  <div>• <em>Opción B (Ruta de licenciamiento institucional):</em> Integración con Azure OpenAI, sujeta a la confirmación del juzgado sobre la disponibilidad y alcance de sus licencias de Microsoft para entornos de desarrollo.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="font-black text-sm uppercase bg-black text-white px-2 py-1 inline-block mb-2">
              4. PROTOCOLO DE SEGURIDAD Y AISLAMIENTO DE DATOS (MOCKING)
            </h4>
            <p className="text-justify text-neutral-800 dark:text-neutral-200 mb-2">
              Para garantizar el cumplimiento legal y la privacidad de la información, la arquitectura contempla una separación estricta:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Entorno de Desarrollo (SENA):</strong> Todo el modelado de datos, estructuración de prompts y pruebas de software se realizará utilizando información 100% ficticia (mock data). La aplicación en fase de desarrollo no consumirá ni almacenará información real de los procesos.</li>
              <li><strong>Entorno de Producción/Pruebas del Cliente:</strong> Una vez desplegado el MVP, el personal del Juzgado será el único autorizado para ingresar datos reales directamente en la herramienta para sus pruebas de validación.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h4 className="font-black text-sm uppercase bg-black text-white px-2 py-1 inline-block mb-2">
              5. EQUIPO DE DESARROLLO Y METODOLOGÍA
            </h4>
            <p className="text-justify text-neutral-800 dark:text-neutral-200 mb-2">
              El proyecto se ejecutará bajo metodologías ágiles de desarrollo iterativo con la siguiente articulación:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Fábrica de Software SENA:</strong> Asume el diseño integral de la arquitectura, orquestación de modelos de IA, construcción de componentes y control de calidad del MVP.</li>
              <li><strong>Juzgado de Familia 4:</strong> Contraparte funcional encargada de definir criterios jurídicos, validar plantillas y realizar pruebas en el despacho.</li>
              <li><strong>Condición de inicio:</strong> El desarrollo técnico iniciará una vez formalizado el acuerdo y confirmada la vía de acceso al motor de IA (Google Gemini o Azure OpenAI).</li>
            </ul>
          </div>

          {/* Formal Signatures Box */}
          <div className="pt-6 border-t-2 border-black dark:border-white mt-8">
            <div className="grid grid-cols-2 gap-8 text-center pt-8">
              <div>
                <div className="border-t border-black dark:border-white pt-2 font-bold uppercase">
                  POR EL JUZGADO DE FAMILIA 4
                </div>
                <div className="text-[11px] text-neutral-500">
                  Despacho Judicial / Validación de Alcance
                </div>
              </div>
              <div>
                <div className="border-t border-black dark:border-white pt-2 font-bold uppercase">
                  POR LA FÁBRICA DE SOFTWARE SENA
                </div>
                <div className="text-[11px] text-neutral-500">
                  Equipo de Desarrollo Fábrica de Software SENA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
