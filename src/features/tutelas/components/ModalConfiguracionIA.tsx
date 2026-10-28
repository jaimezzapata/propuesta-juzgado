"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, Sparkles, X, Check } from "lucide-react";
import { ProveedorIA } from "../types";
import {
  detectarProveedorPorApiKey,
  obtenerNombreProveedorIA,
} from "../utils/ia-detector.utils";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface ModalConfiguracionIAProps {
  abierto: boolean;
  apiKeyActual: string;
  proveedorForzadoActual: ProveedorIA | "auto";
  onCerrar: () => void;
  onGuardar: (apiKey: string, proveedor: ProveedorIA | "auto") => void;
}

export const ModalConfiguracionIA: React.FC<ModalConfiguracionIAProps> = ({
  abierto,
  apiKeyActual,
  proveedorForzadoActual,
  onCerrar,
  onGuardar,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  const [keyInput, setKeyInput] = useState(apiKeyActual);
  const [provSelect, setProvSelect] = useState<ProveedorIA | "auto">(
    proveedorForzadoActual
  );

  useEffect(() => {
    if (abierto) {
      setKeyInput(apiKeyActual);
      setProvSelect(proveedorForzadoActual);
    }
  }, [abierto, apiKeyActual, proveedorForzadoActual]);

  if (!abierto) return null;

  const detectadoAuto = detectarProveedorPorApiKey(keyInput);
  const proveedorEfectivo =
    provSelect === "auto" ? detectadoAuto : provSelect;

  const getModalBox = () => {
    if (esOscuro) {
      return estilo === "neo-brutalista"
        ? "bg-[#1E293B] border-2 border-slate-600 text-slate-100 shadow-[6px_6px_0px_#020617]"
        : "bg-[#181C23] border border-[#C5A880] text-slate-100 rounded-2xl shadow-2xl";
    }
    return estilo === "neo-brutalista"
      ? "bg-white border-2 border-[#0F172A] text-[#0F172A] shadow-[6px_6px_0px_#0F172A]"
      : "bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-2xl";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-5 flex flex-col gap-4 ${getModalBox()}`}>
        <div className="flex items-center justify-between border-b border-current/15 pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#9A7B3E]" />
            <h3 className="text-sm font-black uppercase tracking-wider">
              Conector Universal de IA
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
          Ingrese su API Key de <strong>Google Gemini</strong> (`AIza...`),{" "}
          <strong>Anthropic Claude</strong> (`sk-ant-...`) o{" "}
          <strong>OpenAI ChatGPT</strong> (`sk-...`). El sistema detecta el
          proveedor automáticamente.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider">
            API Key del Proveedor
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Pegue aquí su API Key (AIza... / sk-ant-... / sk-...)"
            className="w-full h-9 px-3 text-xs font-mono bg-transparent border-2 border-current/30 focus:border-[#9A7B3E] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider">
            Motor de Inteligencia Artificial
          </label>
          <select
            value={provSelect}
            onChange={(e) =>
              setProvSelect(e.target.value as ProveedorIA | "auto")
            }
            className="w-full h-9 px-3 text-xs font-semibold bg-transparent border-2 border-current/30 focus:border-[#9A7B3E] outline-none"
          >
            <option value="auto" className="text-black">
              Autodetectar según formato de la API Key
            </option>
            <option value="gemini" className="text-black">
              Google Gemini (gemini-2.5-flash)
            </option>
            <option value="claude" className="text-black">
              Anthropic Claude (claude-3-5-haiku)
            </option>
            <option value="openai" className="text-black">
              OpenAI ChatGPT (gpt-4o-mini)
            </option>
          </select>
        </div>

        <div className="p-2.5 bg-black/5 border border-current/15 flex items-center justify-between text-xs">
          <span className="opacity-75 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9A7B3E]" />
            Proveedor detectado:
          </span>
          <span className="font-black text-[#9A7B3E]">
            {obtenerNombreProveedorIA(proveedorEfectivo)}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-current/15">
          <button
            type="button"
            onClick={onCerrar}
            className="h-8 px-3 text-xs font-bold border border-current/25 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onGuardar(keyInput, provSelect)}
            className="h-8 px-4 text-xs font-black bg-[#0F2537] text-white flex items-center gap-1.5 cursor-pointer border-2 border-[#0F172A]"
          >
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </div>
    </div>
  );
};

