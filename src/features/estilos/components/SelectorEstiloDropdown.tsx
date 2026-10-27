"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, ChevronDown, Sparkles } from "lucide-react";
import { useEstiloVisual } from "../hooks/useEstiloVisual";

export const SelectorEstiloDropdown: React.FC = () => {
  const { estilo, modo, cambiarEstilo, estiloInfo, estilosDisponibles } = useEstiloVisual();
  const [abierto, setAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const esOscuro = modo === "oscuro";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getButtonStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#251E20] border border-[#4D3339] text-[#EDE6DF] hover:bg-[#2F2629]"
          : "bg-[#FCFAF7] border border-[#6B1D2F]/30 text-[#2C1810] hover:bg-[#F5EFEB]";
      case "dark-lawfirm":
        return esOscuro
          ? "bg-[#181C23] border border-[#2D333F] text-[#E2E8F0] hover:bg-[#222730]"
          : "bg-white border border-slate-300 text-slate-900 hover:bg-slate-50";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#1E293B] border-2 border-slate-700 text-slate-100 shadow-[2px_2px_0px_#020617] hover:bg-[#283548]"
          : "bg-white border-2 border-[#0F172A] text-slate-800 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50";
    }
  };

  const getDropdownMenuStyles = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] text-[#EDE6DF] shadow-2xl";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] text-[#E2E8F0] shadow-2xl";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 text-slate-100 shadow-[4px_4px_0px_#020617]";
      }
    } else {
      return "bg-white border-2 border-slate-800 text-slate-900 shadow-xl";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${getButtonStyles()}`}
        title="Cambiar Estilo Visual Judicial"
      >
        <Palette className="w-3.5 h-3.5 text-[#9A7B3E]" />
        <span className="hidden sm:inline font-bold">Estilo:</span>
        <span className="truncate max-w-[130px] font-medium">{estiloInfo.nombre}</span>
        <div className="flex items-center gap-1 ml-0.5">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: estiloInfo.colores.primario }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: estiloInfo.colores.acento }}
          />
        </div>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {abierto && (
        <div className={`absolute right-0 mt-2 w-72 rounded-2xl p-2 z-50 text-left animate-in fade-in-50 zoom-in-95 duration-100 ${getDropdownMenuStyles()}`}>
          <div className="px-2.5 py-1.5 border-b border-current/15 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">
              Estilos Visuales de Ley y Normativa
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#9A7B3E]" />
          </div>

          <div className="flex flex-col gap-1.5">
            {estilosDisponibles.map((e) => {
              const seleccionado = e.id === estilo;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => {
                    cambiarEstilo(e.id);
                    setAbierto(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                    seleccionado
                      ? esOscuro
                        ? "bg-slate-700/60 border-slate-500 font-semibold"
                        : "bg-slate-100 border-slate-900 shadow-2xs font-semibold"
                      : esOscuro
                      ? "border-transparent hover:bg-slate-700/40 opacity-80 hover:opacity-100"
                      : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{e.nombre}</span>
                      <div className="flex items-center gap-0.5">
                        <span
                          className="w-2 h-2 rounded-full border border-black/20"
                          style={{ backgroundColor: e.colores.primario }}
                        />
                        <span
                          className="w-2 h-2 rounded-full border border-black/20"
                          style={{ backgroundColor: e.colores.fondo }}
                        />
                        <span
                          className="w-2 h-2 rounded-full border border-black/20"
                          style={{ backgroundColor: e.colores.acento }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] opacity-70 leading-tight">
                      {e.subtitulo} &bull; {e.referencia}
                    </span>
                  </div>

                  {seleccionado && (
                    <div className="w-5 h-5 rounded-full bg-[#9A7B3E] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
