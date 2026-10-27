"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Sun, Moon, Check, Sparkles, Scale, BookOpen, Building2 } from "lucide-react";
import { useEstiloVisual } from "../hooks/useEstiloVisual";
import { TipoEstiloVisual } from "../types";

export const WidgetAparienciaFlotante: React.FC = () => {
  const { estilo, modo, cambiarEstilo, toggleModo, estiloInfo, estilosDisponibles } = useEstiloVisual();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const esOscuro = modo === "oscuro";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPillStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#251E20] border border-[#4D3339] text-[#EDE6DF] shadow-xl rounded-full"
          : "bg-[#FCFAF7] border border-[#6B1D2F]/30 text-[#2C1810] shadow-lg rounded-full";
      case "dark-lawfirm":
        return esOscuro
          ? "bg-[#181C23] border border-[#2D333F] text-[#E2E8F0] shadow-2xl rounded-full"
          : "bg-white border border-slate-300 text-slate-800 shadow-lg rounded-full";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#1E293B] border-2 border-slate-700 text-slate-100 shadow-[3px_3px_0px_#020617] rounded-none"
          : "bg-white border-2 border-[#0F172A] text-slate-800 shadow-[3px_3px_0px_#0F172A] rounded-none";
    }
  };

  const getPopoverStyles = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] text-[#EDE6DF] shadow-2xl rounded-2xl";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] text-[#E2E8F0] shadow-2xl rounded-xl";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 text-slate-100 shadow-[4px_4px_0px_#020617] rounded-none";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] border border-[#6B1D2F]/30 text-[#2C1810] shadow-2xl rounded-2xl";
        case "dark-lawfirm":
          return "bg-white border border-slate-300 text-slate-900 shadow-xl rounded-xl";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] text-slate-900 shadow-[4px_4px_0px_#0F172A] rounded-none";
      }
    }
  };

  const getIcon = (id: TipoEstiloVisual) => {
    switch (id) {
      case "neo-brutalista":
        return <Scale className="w-4 h-4 text-[#9A7B3E]" />;
      case "editorial-notarial":
        return <BookOpen className="w-4 h-4 text-[#6B1D2F] dark:text-amber-200" />;
      case "dark-lawfirm":
        return <Building2 className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none" ref={widgetRef}>
      {/* Popover desplegable hacia arriba */}
      {menuAbierto && (
        <div
          className={`absolute bottom-full right-0 mb-3 w-72 p-3 z-50 text-left animate-in fade-in-50 slide-in-from-bottom-2 duration-150 ${getPopoverStyles()}`}
        >
          <div className="flex items-center justify-between border-b pb-2 mb-2 border-current/15">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7B3E]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Apariencia del Despacho
              </span>
            </div>
            <span className="text-[10px] opacity-60 font-medium">Leyes y Normativa</span>
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
                  }}
                  className={`w-full p-2 border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    seleccionado
                      ? esOscuro
                        ? "bg-slate-700/60 border-slate-500 font-semibold"
                        : "bg-slate-100 border-slate-900 shadow-2xs font-semibold"
                      : esOscuro
                      ? "border-transparent hover:bg-slate-700/40 opacity-80 hover:opacity-100"
                      : "bg-transparent border-transparent hover:bg-slate-100/70 opacity-80 hover:opacity-100"
                  } ${estilo === "neo-brutalista" ? "rounded-none" : "rounded-lg"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-black/5 dark:bg-white/10 shrink-0">
                      {getIcon(e.id)}
                    </div>
                    <div>
                      <span className="text-xs font-bold block leading-tight">{e.nombre}</span>
                      <span className="text-[10px] opacity-65 leading-tight block">
                        {e.referencia}
                      </span>
                    </div>
                  </div>

                  {seleccionado && (
                    <div className="w-5 h-5 rounded-full bg-[#9A7B3E] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-current/15 flex items-center justify-between text-[11px]">
            <span className="font-semibold opacity-75">Modo de Iluminación:</span>
            <button
              type="button"
              onClick={toggleModo}
              className={`flex items-center gap-1.5 px-2.5 py-1 font-bold rounded cursor-pointer transition-all ${
                esOscuro
                  ? "bg-[#0F172A] text-amber-300 border border-slate-600 hover:bg-slate-900"
                  : "bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200"
              }`}
            >
              {esOscuro ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-700" />}
              <span>{esOscuro ? "Oscuro" : "Claro"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Píldora Flotante Compacta y Sutil */}
      <div className={`flex items-center gap-1 p-1 pl-2 transition-all duration-200 ${getPillStyles()}`}>
        {/* Botón rápido Claro / Oscuro (1 solo clic) */}
        <button
          type="button"
          onClick={toggleModo}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          title={esOscuro ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          aria-label={esOscuro ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {esOscuro ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          )}
        </button>

        <span className="w-px h-4 bg-current opacity-20 mx-0.5" />

        {/* Botón de Selector de Estilo */}
        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer rounded-full"
          title="Personalizar Apariencia Legal"
        >
          <Palette className="w-3.5 h-3.5 text-[#9A7B3E]" />
          <span className="text-[11px] font-semibold max-w-[110px] truncate hidden sm:inline">
            {estiloInfo.nombre}
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/30 shrink-0"
            style={{ backgroundColor: estiloInfo.colores.primario }}
          />
        </button>
      </div>
    </div>
  );
};
