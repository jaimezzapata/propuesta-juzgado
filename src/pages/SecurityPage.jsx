import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  FileLock2, 
  AlertCircle 
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="b-badge b-badge-yellow">SECCIÓN 03</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">PRIVACIDAD & HABEAS DATA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          3. Protocolo de Seguridad y Privacidad Local (Zero-Cloud)
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Separación estricta de ambientes para garantizar el cumplimiento legal y la reserva judicial.
        </p>
      </div>

      {/* Principle Banner */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#059669]">
        <h2 className="text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100">
          Garantía de Aislamiento Total & Protocolo Zero-Cloud
        </h2>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3">
          Para dar estricto cumplimiento al requerimiento del Juzgado de <strong>no subir expedientes ni documentos completos a la nube</strong>, la arquitectura implementa una separación criptográfica entre <strong>variables privadas locales</strong> (nombres de personas, cédulas, diagnósticos y datos sensibles del expediente) y el <strong>contexto normativo</strong> de la IA.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="b-badge b-badge-green font-mono text-xs font-bold">
            100% DATOS SINTÉTICOS EN FASE DE DESARROLLO
          </span>
          <span className="b-badge b-badge-yellow font-mono text-xs font-bold">
            EXPEDIENTES Y PERSONAS NUNCA SUBEN A LA NUBE
          </span>
        </div>
      </div>

      {/* Cloud vs Local Data Flow Card */}
      <div className="clean-card bg-neutral-50 dark:bg-neutral-800/60 border-2 border-neutral-300 dark:border-neutral-700">
        <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
          <Lock size={16} className="text-[#059669]" />
          <span>Esquema de Procesamiento Seguro: Local vs Nube</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
            <div className="font-bold text-[#059669] mb-1">PROCESADO ESTRICTAMENTE EN LOCAL (DESPACHO):</div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Identificación de las partes (accionante, accionado, menores).</li>
              <li>• Archivos y expedientes originales en PDF/Word del caso.</li>
              <li>• Ensamblaje y descarga del documento final (.docx / PDF).</li>
              <li>• Almacenamiento de expedientes y métricas internas.</li>
            </ul>
          </div>
          <div className="p-3 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
            <div className="font-bold text-[#2563eb] mb-1">PETICIÓN ABSTRACTA AL MODELO DE IA:</div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Hechos y pretensiones previamente anonimizados o sintéticos.</li>
              <li>• Consulta de jurisprudencia y normas legales del Decreto 2591.</li>
              <li>• Redacción de argumentos jurídicos y considerandos generales.</li>
              <li>• Cero fuga de secretos procesales o datos de menores.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Two Environments Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment A: SENA */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#2563eb]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100">
              <GraduationCap size={18} className="text-[#2563eb]" />
              <span>ENTORNO DE DESARROLLO (SENA)</span>
            </div>
            <span className="b-badge b-badge-blue text-[10px]">100% MOCK DATA</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-neutral-800 dark:text-neutral-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Datos 100% Ficticios:</strong> Todo el modelado de datos, estructuración de prompts y pruebas de software se realizará utilizando información sintética generada para pruebas.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Cero Consumo de Expedientes Reales:</strong> La aplicación en fase de desarrollo <strong>no consumirá ni almacenará información real</strong> de los procesos del despacho.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Blindaje en Entorno SENA:</strong> El equipo de desarrollo nunca tendrá contacto visual ni técnico con cédulas, diagnósticos médicos o partes procesales reales.</span>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded font-mono text-[11px] text-blue-950 dark:text-blue-100">
            <strong>EJEMPLO SINTÉTICO:</strong> Accionante: "María Gómez Ficticia" • Accionado: "EPS Alfa Simulada" • Cédula: "CC. 00.000.000"
          </div>
        </div>

        {/* Environment B: Juzgado 4 */}
        <div className="clean-card bg-white dark:bg-[#1c1e22] border-t-4 border-t-[#e11d48]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100">
              <Building2 size={18} className="text-[#e11d48]" />
              <span>ENTORNO PRODUCCIÓN / PRUEBAS JUZGADO</span>
            </div>
            <span className="b-badge b-badge-red text-[10px]">EXCLUSIVO DESPACHO</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-neutral-800 dark:text-neutral-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Acceso Exclusivo del Personal Judicial:</strong> Una vez desplegado el MVP, el personal del Juzgado será el <strong>único autorizado</strong> para ingresar datos reales en la herramienta.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Validación Privada:</strong> Las pruebas de validación con casos reales se ejecutan dentro de la red del Juzgado sin visibilidad externa.</span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
              <span><strong>Política de No Persistencia Sensible:</strong> La base de datos PostgreSQL almacena configuraciones y plantillas, pero no retiene hechos ni identificaciones de ciudadanos.</span>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded font-mono text-[11px] text-rose-950 dark:text-rose-100">
            <strong>SOBERANÍA JUDICIAL:</strong> El Despacho conserva el control absoluto de sus expedientes y de las providencias generadas.
          </div>
        </div>
      </div>

      {/* Compliance Matrix */}
      <div className="clean-card bg-neutral-100 dark:bg-[#16181c] p-4 sm:p-5">
        <h3 className="font-mono text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-3">
          Principios de Protección de Datos (Ley 1581 de 2012)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded">
            <div className="font-bold text-[#2563eb] mb-1">1. Finalidad Exclusiva</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Uso delimitado exclusivamente a la asistencia técnica de redacción preliminar en tutelas del despacho.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded">
            <div className="font-bold text-[#059669] mb-1">2. Seguridad en Tránsito</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Protocolos de cifrado HTTPS/TLS en todas las peticiones entre cliente, orquestador y API de IA.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded">
            <div className="font-bold text-[#e11d48] mb-1">3. Confidencialidad Institucional</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Prohibición estricta de manipular información no anonimizada fuera de la sede judicial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
