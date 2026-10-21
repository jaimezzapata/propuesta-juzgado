import React from 'react';
import { Printer, Scale, CheckCircle2, Copy } from 'lucide-react';
import { PROPOSAL_META, TEAM_ROLES, RACI_MATRIX, AI_PROVIDERS } from '../data/proposalData';

export default function DossierDocumentPage({ selectedEngine }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="b-badge b-badge-yellow">EXPEDIENTE TÉCNICO FORMAL</span>
            <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">DOCUMENTO CONSOLIDADO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
            Dossier de la Propuesta Técnica
          </h1>
        </div>

        <button
          onClick={handlePrint}
          className="b-btn b-btn-primary text-xs py-2 px-4 shadow-sm"
        >
          <Printer size={15} />
          <span>Imprimir / Guardar como PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="clean-card bg-white dark:bg-[#181a1f] p-6 sm:p-10 font-mono text-xs sm:text-sm leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 shadow-md border-2 border-neutral-300 dark:border-neutral-700">
        {/* Judicial Header Memo */}
        <div className="text-center border-b-2 border-neutral-300 dark:border-neutral-700 pb-6 space-y-2">
          <div className="text-base sm:text-lg font-black uppercase text-neutral-900 dark:text-neutral-50 tracking-wide">
            PROPUESTA TÉCNICA DE DESARROLLO
          </div>
          <div className="text-sm font-bold text-[#2563eb] dark:text-[#60a5fa] uppercase">
            ASISTENTE DE INTELIGENCIA ARTIFICIAL PARA AUTOMATIZACIÓN JURÍDICA
          </div>
          <div className="text-xs text-neutral-700 dark:text-neutral-300">
            RECEPTOR: JUZGADO DE FAMILIA 4 • EJECUTOR: FÁBRICA DE SOFTWARE & SEMILLERO SENA
          </div>
          <div className="inline-block bg-[#fde047] text-black px-3 py-1 font-bold text-xs border border-black rounded-xs mt-1">
            RADICADO: {PROPOSAL_META.radicado} • VERSIÓN: {PROPOSAL_META.version} • {PROPOSAL_META.fecha}
          </div>
        </div>

        {/* Section 1 */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-xs sm:text-sm uppercase bg-neutral-900 text-white dark:bg-[#fde047] dark:text-black px-2.5 py-0.5 inline-block mb-1 font-mono">
            1. DEFINICIÓN DEL PRODUCTO
          </h2>
          <p className="text-justify leading-relaxed text-neutral-800 dark:text-neutral-200">
            Desarrollo de una aplicación web integrada con Inteligencia Artificial Generativa, diseñada para optimizar los tiempos de redacción y análisis de documentos jurídicos en el Juzgado de Familia 4, reduciendo la carga operativa manual.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-xs sm:text-sm uppercase bg-neutral-900 text-white dark:bg-[#fde047] dark:text-black px-2.5 py-0.5 inline-block mb-1 font-mono">
            2. ALCANCE TÉCNICO Y PRODUCTO MÍNIMO VIABLE (MVP)
          </h2>
          <p className="text-justify leading-relaxed mb-2 text-neutral-800 dark:text-neutral-200">
            Para mitigar riesgos y entregar valor en el corto plazo, el ciclo inicial de desarrollo se acotará a un MVP funcional con las siguientes características:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><strong>Módulo único de enfoque:</strong> Generación y diligenciamiento automatizado exclusivamente para <strong>Tutelas</strong>.</li>
            <li><strong>Input/Output:</strong> Interfaz donde el usuario ingresa las variables del caso y el sistema retorna el documento jurídico estructurado en formato exportable (PDF/Word).</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-xs sm:text-sm uppercase bg-neutral-900 text-white dark:bg-[#fde047] dark:text-black px-2.5 py-0.5 inline-block mb-1 font-mono">
            3. ARQUITECTURA Y STACK TECNOLÓGICO PROPUESTO
          </h2>
          <p className="text-justify leading-relaxed mb-2 text-neutral-800 dark:text-neutral-200">
            Se plantea una arquitectura basada en tecnologías web modernas y consumo de APIs, orientada al rendimiento y la escalabilidad:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><strong>Frontend (Interfaz de usuario):</strong> React.js + Tailwind CSS, garantizando una interfaz ágil, limpia y optimizada para el flujo de trabajo del juzgado.</li>
            <li><strong>Backend (Lógica y enrutamiento):</strong> Node.js con Express, encargado de orquestar las peticiones entre el cliente y el motor de IA de forma segura.</li>
            <li><strong>Base de Datos:</strong> PostgreSQL para gestionar configuraciones, plantillas base y roles de usuario (sin almacenar datos sensibles de los casos).</li>
            <li>
              <strong>Motor de Inteligencia Artificial (Selección Concertada: {selectedEngine === 'gemini' ? 'Google Gemini' : 'Azure OpenAI'}):</strong>
              <div className="pl-4 mt-1 space-y-1 text-neutral-800 dark:text-neutral-200">
                <div>• <em>Opción A (Ruta de inicio rápido):</em> Implementación de la API de Google (Gemini) para el prototipado inicial, aprovechando la experiencia técnica del equipo de desarrollo.</div>
                <div>• <em>Opción B (Ruta de licenciamiento institucional):</em> Integración con Azure OpenAI, sujeta a la confirmación del juzgado sobre la disponibilidad y alcance de sus licencias de Microsoft para entornos de desarrollo.</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-xs sm:text-sm uppercase bg-neutral-900 text-white dark:bg-[#fde047] dark:text-black px-2.5 py-0.5 inline-block mb-1 font-mono">
            4. PROTOCOLO DE SEGURIDAD Y AISLAMIENTO DE DATOS (MOCKING)
          </h2>
          <p className="text-justify leading-relaxed mb-2 text-neutral-800 dark:text-neutral-200">
            Para garantizar el cumplimiento legal y la privacidad de la información, la arquitectura contempla una separación estricta:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><strong>Entorno de Desarrollo (SENA):</strong> Todo el modelado de datos, estructuración de prompts y pruebas de software se realizará utilizando información 100% ficticia (mock data). La aplicación en fase de desarrollo no consumirá ni almacenará información real de los procesos.</li>
            <li><strong>Entorno de Producción/Pruebas del Cliente:</strong> Una vez desplegado el MVP, el personal del Juzgado será el único autorizado para ingresar datos reales directamente en la herramienta para sus pruebas de validación.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="space-y-1.5">
          <h2 className="font-bold text-xs sm:text-sm uppercase bg-neutral-900 text-white dark:bg-[#fde047] dark:text-black px-2.5 py-0.5 inline-block mb-1 font-mono">
            5. METODOLOGÍA DE DESARROLLO Y GOBERNANZA
          </h2>
          <p className="text-justify leading-relaxed mb-2 text-neutral-800 dark:text-neutral-200">
            El proyecto se ejecutará bajo metodologías ágiles de desarrollo iterativo e incremental con la siguiente articulación institucional:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><strong>Fábrica de Software SENA:</strong> Asume el diseño integral de la arquitectura, la orquestación segura de modelos de IA, la construcción de componentes frontend y backend, la sanitización de datos y el control de calidad para la entrega del MVP.</li>
            <li><strong>Juzgado de Familia 4:</strong> Contraparte funcional encargada de definir criterios jurídicos, validar plantillas y formatos procesales, y realizar las pruebas de aceptación directamente en el despacho.</li>
            <li><strong>Condición de inicio:</strong> El desarrollo técnico iniciará una vez formalizado el acuerdo y confirmada la vía de acceso al motor de IA (vía directa Google Gemini o tenant institucional de la Rama Judicial).</li>
          </ul>
        </div>

        {/* Signature Line */}
        <div className="pt-8 border-t-2 border-neutral-300 dark:border-neutral-700">
          <div className="grid grid-cols-2 gap-8 text-center pt-8">
            <div>
              <div className="border-t border-black dark:border-white pt-2 font-bold uppercase text-neutral-900 dark:text-neutral-50">
                POR EL JUZGADO DE FAMILIA 4
              </div>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Despacho Judicial / Validación de Alcance
              </div>
            </div>
            <div>
              <div className="border-t border-black dark:border-white pt-2 font-bold uppercase text-neutral-900 dark:text-neutral-50">
                POR LA FÁBRICA DE SOFTWARE SENA
              </div>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Equipo de Desarrollo Fábrica de Software SENA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
