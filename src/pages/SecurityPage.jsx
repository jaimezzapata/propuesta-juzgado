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
          <span className="b-badge b-badge-yellow">SECCIÓN 04</span>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">PRIVACIDAD & HABEAS DATA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">
          4. Protocolo de Seguridad y Aislamiento de Datos (Mocking)
        </h1>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono mt-1">
          Separación estricta de ambientes para garantizar el cumplimiento legal y la reserva judicial.
        </p>
      </div>

      {/* Principle Banner */}
      <div className="clean-card bg-white dark:bg-[#1c1e22] border-l-4 border-l-[#059669]">
        <h2 className="text-lg font-bold uppercase mb-2 text-neutral-900 dark:text-neutral-100">
          Garantía de Aislamiento Total en Desarrollo
        </h2>
        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3">
          Para garantizar el cumplimiento de la <strong>Ley 1581 de 2012 (Habeas Data)</strong> y la reserva legal de los procesos judiciales, la arquitectura contempla una separación absoluta entre el laboratorio de desarrollo del SENA y el entorno operativo del Juzgado de Familia 4.
        </p>
        <span className="b-badge b-badge-green font-mono text-xs font-bold">
          100% DATOS SINTÉTICOS EN FASE DE DESARROLLO
        </span>
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
