import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Key, 
  FileLock2, 
  Layers, 
  Database,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';

export default function SecurityIsolation() {
  const [activeEnvironment, setActiveEnvironment] = useState('sena');

  return (
    <section id="seguridad" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="section-header-box">
          <Lock size={20} className="text-[#ffe600]" />
          <span>04. PROTOCOLO DE SEGURIDAD Y AISLAMIENTO DE DATOS (MOCKING)</span>
        </div>
        <span className="b-stamp b-stamp-green">CUMPLIMIENTO LEY 1581 DE 2012</span>
      </div>

      <div className="b-card bg-[#fffdf0] dark:bg-[#1a1b14] border-l-[8px] border-l-[#00d665] mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-1">
              Separación Estricta: Entorno SENA vs Entorno Juzgado
            </h3>
            <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
              Para garantizar la <strong>privacidad total de los expedientes judiciales</strong> y la debida reserva legal, 
              se establece una barrera infranqueable de aislamiento entre el desarrollo técnico y las pruebas operativas.
            </p>
          </div>
          <span className="b-stamp b-stamp-red whitespace-nowrap">CERO DATOS REALES EN DESARROLLO</span>
        </div>
      </div>

      {/* Interactive Environment Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Environment A: SENA Development (Mock Data) */}
        <div 
          onClick={() => setActiveEnvironment('sena')}
          className={`b-card transition-all cursor-pointer ${
            activeEnvironment === 'sena' 
              ? 'ring-4 ring-[#0052ff] bg-white dark:bg-[#181d28]' 
              : 'bg-neutral-50 dark:bg-neutral-900 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black dark:border-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0052ff] text-white flex items-center justify-center font-bold">
                <GraduationCap size={18} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm uppercase">1. ENTORNO DE DESARROLLO</h4>
                <div className="font-mono text-xs text-neutral-500">SENA (Fábrica de Software & Semillero)</div>
              </div>
            </div>
            <span className="b-stamp b-stamp-blue text-[10px]">100% MOCK DATA</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Datos Sintéticos / Simulados:</strong> Todo el modelado, ingeniería de prompts y pruebas unitarias se ejecutan con nombres, cédulas y casos ficticios creados específicamente para pruebas.</span>
            </div>

            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Cero Expedientes Reales:</strong> Ningún documento, memorial o expediente real del Juzgado ingresará a los equipos de cómputo del SENA ni a los servidores de desarrollo.</span>
            </div>

            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Blindaje Legal de Datos:</strong> Al no tener contacto con datos sensibles de ciudadanos reales, se preserva el cumplimiento estricto de la Ley 1581 de 2012.</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-neutral-300 dark:border-neutral-700">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-[#0052ff] font-mono text-[11px] text-blue-900 dark:text-blue-200">
              <strong>MOCK DATA SCHEMA:</strong> Accionante: "Ciudadano Sintético A" • Radicado: "2026-MOCK-001" • Entidad: "EPS Ficticia S.A."
            </div>
          </div>
        </div>

        {/* Environment B: Production / Juzgado 4 */}
        <div 
          onClick={() => setActiveEnvironment('juzgado')}
          className={`b-card transition-all cursor-pointer ${
            activeEnvironment === 'juzgado' 
              ? 'ring-4 ring-[#ff3333] bg-white dark:bg-[#251818]' 
              : 'bg-neutral-50 dark:bg-neutral-900 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black dark:border-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff3333] text-white flex items-center justify-center font-bold">
                <Building2 size={18} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm uppercase">2. ENTORNO DE PRODUCCIÓN</h4>
                <div className="font-mono text-xs text-neutral-500">Juzgado de Familia 4 (Exclusivo Despacho)</div>
              </div>
            </div>
            <span className="b-stamp b-stamp-red text-[10px]">DATOS REALES EXCLUSIVOS</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Acceso Exclusivo del Personal Judicial:</strong> Una vez entregado y desplegado el MVP, solo el personal autorizado del Juzgado 4 podrá ingresar información de expedientes reales.</span>
            </div>

            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Aislamiento de Red:</strong> La base de datos PostgreSQL en producción NO guarda datos sensibles de las tutelas (solo esquemas y plantillas). Las variables son procesadas en memoria volátil.</span>
            </div>

            <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 size={16} className="text-[#00d665] shrink-0 mt-0.5" />
              <span><strong>Auditoría y Trazabilidad:</strong> El Juzgado mantiene la soberanía completa sobre las peticiones y documentos generados en su propio entorno.</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-neutral-300 dark:border-neutral-700">
            <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-[#ff3333] font-mono text-[11px] text-red-900 dark:text-red-200">
              <strong>POLÍTICA DE RETENCIÓN CERO:</strong> El asistente no almacena copias de los hechos procesados una vez emitido el borrador exportable.
            </div>
          </div>
        </div>
      </div>

      {/* Security Principles Checklist */}
      <div className="b-card bg-neutral-100 dark:bg-[#16181f]">
        <h4 className="font-mono font-bold text-xs uppercase mb-3 pb-2 border-b border-black dark:border-white">
          MATRIZ DE CUMPLIMIENTO Y HABEAS DATA
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-black dark:border-white p-3 bg-white dark:bg-neutral-800">
            <div className="font-bold text-[#0052ff] mb-1">1. Principio de Finalidad</div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Los datos procesados se destinan única y exclusivamente a la formulación del borrador procesal de la tutela.
            </p>
          </div>

          <div className="border border-black dark:border-white p-3 bg-white dark:bg-neutral-800">
            <div className="font-bold text-[#00d665] mb-1">2. Principio de Seguridad</div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Cifrado en tránsito mediante HTTPS/TLS en todas las peticiones entre cliente, orquestador backend y API de IA.
            </p>
          </div>

          <div className="border border-black dark:border-white p-3 bg-white dark:bg-neutral-800">
            <div className="font-bold text-[#ff3333] mb-1">3. Confidencialidad Absoluta</div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Prohibición estricta de manipular o extraer información no anonimizada fuera de la sede judicial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
