"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, Check, ShieldCheck } from "lucide-react";
import { MapaClavesIA, ProveedorIA } from "../types";
import {
  construirColaConmutacionIA,
  obtenerNombreProveedorIA,
} from "../utils/ia-detector.utils";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface ModalConfiguracionIAProps {
  abierto: boolean;
  clavesActuales: MapaClavesIA;
  proveedorForzadoActual: ProveedorIA | "auto";
  onCerrar: () => void;
  onGuardar: (claves: MapaClavesIA, proveedor: ProveedorIA | "auto") => void;
}

export const ModalConfiguracionIA: React.FC<ModalConfiguracionIAProps> = ({
  abierto,
  clavesActuales,
  proveedorForzadoActual,
  onCerrar,
  onGuardar,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  const [claves, setClaves] = useState<MapaClavesIA>(clavesActuales);
  const [provSelect, setProvSelect] = useState<ProveedorIA | "auto">(
    proveedorForzadoActual
  );

  useEffect(() => {
    if (abierto) {
      setClaves(clavesActuales);
      setProvSelect(proveedorForzadoActual);
    }
  }, [abierto, clavesActuales, proveedorForzadoActual]);

  if (!abierto) return null;

  const colaSimulada = construirColaConmutacionIA(
    claves,
    provSelect === "auto" ? undefined : provSelect
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-lg p-5 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto ${tema.modalContenedor}`}
      >
        <div className="flex items-center justify-between border-b border-current/15 pb-2.5">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#9A7B3E]" />
            <h3 className="text-sm font-black uppercase tracking-wider">
              Cadena Reactiva Multi-IA (Conmutación Automática)
            </h3>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="p-1 opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs opacity-80 leading-relaxed">
          Si la IA principal falla o agota su cuota, la aplicación{" "}
          <strong>no detiene la tarea</strong>: salta automáticamente al
          siguiente modelo y proveedor configurado hasta lograr el resultado.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider">
            API Key Principal (Autodetecta Gemini / Claude / ChatGPT / Groq)
          </label>
          <input
            type="password"
            value={claves.principal || ""}
            onChange={(e) =>
              setClaves({ ...claves, principal: e.target.value })
            }
            placeholder="Pegue aquí cualquier API Key (AIza... / sk-ant-... / sk-... / gsk_...)"
            className={`w-full h-8 px-2.5 text-xs font-mono outline-none ${tema.input}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1 border-t border-current/10">
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Respaldo Google Gemini (`AIza...`)
            </label>
            <input
              type="password"
              value={claves.gemini || ""}
              onChange={(e) => setClaves({ ...claves, gemini: e.target.value })}
              placeholder="Opcional o en .env"
              className={`w-full h-8 px-2.5 text-xs font-mono outline-none ${tema.input}`}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Respaldo Anthropic Claude (`sk-ant-...`)
            </label>
            <input
              type="password"
              value={claves.claude || ""}
              onChange={(e) => setClaves({ ...claves, claude: e.target.value })}
              placeholder="Opcional o en .env"
              className={`w-full h-8 px-2.5 text-xs font-mono outline-none ${tema.input}`}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Respaldo OpenAI ChatGPT (`sk-...`)
            </label>
            <input
              type="password"
              value={claves.openai || ""}
              onChange={(e) => setClaves({ ...claves, openai: e.target.value })}
              placeholder="Opcional o en .env"
              className={`w-full h-8 px-2.5 text-xs font-mono outline-none ${tema.input}`}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Respaldo Groq Cloud (`gsk_...`)
            </label>
            <input
              type="password"
              value={claves.groq || ""}
              onChange={(e) => setClaves({ ...claves, groq: e.target.value })}
              placeholder="Opcional o en .env"
              className={`w-full h-8 px-2.5 text-xs font-mono outline-none ${tema.input}`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider">
            Prioridad Inicial de Intento
          </label>
          <select
            value={provSelect}
            onChange={(e) =>
              setProvSelect(e.target.value as ProveedorIA | "auto")
            }
            className={`w-full h-8 px-2.5 text-xs font-bold outline-none ${tema.input}`}
          >
            <option value="auto">
              Automático (Detectar por llave y conmutar en cascada)
            </option>
            <option value="gemini">Iniciar por Google Gemini</option>
            <option value="claude">Iniciar por Anthropic Claude</option>
            <option value="openai">Iniciar por OpenAI ChatGPT</option>
            <option value="groq">Iniciar por Groq (Llama 3.3)</option>
          </select>
        </div>

        {/* Visualización de la cadena de conmutación activa */}
        <div className={`p-2.5 text-xs flex flex-col gap-1 ${tema.subpanel}`}>
          <div className="flex items-center gap-1.5 font-bold text-[#9A7B3E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Orden de reacción y reintento automático:</span>
          </div>
          <div className="text-[11px] flex items-center gap-1.5 flex-wrap">
            {colaSimulada.map((item, idx) => (
              <span key={`${item.proveedor}-${idx}`} className="font-semibold">
                {idx + 1}. {obtenerNombreProveedorIA(item.proveedor)} &rarr;
              </span>
            ))}
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Motor Semántico Jurídico
              (Garantizado)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-current/15">
          <button
            type="button"
            onClick={onCerrar}
            className={`h-8 px-3 text-xs font-bold cursor-pointer ${tema.botonSecundario(
              false
            )}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onGuardar(claves, provSelect)}
            className={`h-8 px-4 text-xs font-black flex items-center gap-1.5 cursor-pointer ${tema.botonPrimario}`}
          >
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Guardar Cadena de IA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
