"use client";

import React from "react";
import { Check, Sparkles, Scale, BookOpen, Building2 } from "lucide-react";
import { useEstiloVisual } from "../hooks/useEstiloVisual";
import { TipoEstiloVisual } from "../types";
import { BotonToggleModoColor } from "./BotonToggleModoColor";

export const PanelEstilosCards: React.FC = () => {
  const { estilo, modo, cambiarEstilo, estilosDisponibles } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  const getIcon = (id: TipoEstiloVisual) => {
    switch (id) {
      case "neo-brutalista":
        return <Scale className="w-5 h-5 text-[#9A7B3E]" />;
      case "editorial-notarial":
        return <BookOpen className="w-5 h-5 text-[#6B1D2F]" />;
      case "dark-lawfirm":
        return <Building2 className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  const getContainerStyles = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] shadow-xl text-[#EDE6DF] rounded-2xl";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] shadow-2xl text-[#E2E8F0] rounded-xl";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 shadow-[4px_4px_0px_#020617] text-slate-100";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] border border-[#6B1D2F]/30 shadow-md text-[#2C1810] rounded-2xl";
        case "dark-lawfirm":
          return "bg-white border border-[#C5A880] shadow-md text-[#111827] rounded-xl";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] text-[#0F172A]";
      }
    }
  };

  return (
    <div className={`p-6 flex flex-col gap-5 transition-all duration-200 ${getContainerStyles()}`}>
      <div className="flex items-center justify-between border-b pb-3 border-current/20 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#9A7B3E]" />
          <h2 className="text-sm font-black uppercase tracking-wider">
            Estilos Visuales de Leyes y Normativa Jurídica
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <BotonToggleModoColor mostrarTexto />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {estilosDisponibles.map((e) => {
          const activo = e.id === estilo;
          return (
            <div
              key={e.id}
              onClick={() => cambiarEstilo(e.id)}
              className={`p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 text-left relative ${
                activo
                  ? esOscuro
                    ? "border-slate-500 shadow-[4px_4px_0px_#020617] bg-[#0F172A] scale-[1.01]"
                    : "border-[#0F172A] shadow-[4px_4px_0px_#0F172A] bg-slate-50/80 scale-[1.01]"
                  : esOscuro
                  ? "border-slate-700/80 hover:border-slate-500 bg-[#0F172A]/40 opacity-75 hover:opacity-100"
                  : "border-slate-300 hover:border-slate-700 bg-white opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 border border-current/20 rounded-lg bg-black/5 dark:bg-white/10 shadow-2xs">
                    {getIcon(e.id)}
                  </div>
                  {activo ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#9A7B3E] text-white">
                      <Check className="w-3 h-3 stroke-[3]" /> Activo
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold opacity-60 uppercase">
                      Clic para aplicar
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-black leading-tight">
                    {e.nombre}
                  </h3>
                  <span className="text-[10px] font-bold text-[#9A7B3E] uppercase block mt-0.5">
                    {e.referencia}
                  </span>
                </div>

                <p className="text-[11px] opacity-75 leading-relaxed font-normal">
                  {e.descripcion}
                </p>
              </div>

              {/* Muestra de Paleta de Colores */}
              <div className="pt-3 border-t border-current/20 flex items-center justify-between">
                <span className="text-[10px] font-bold opacity-60 uppercase">
                  Paleta de Color:
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-sm border border-black/30 shadow-2xs"
                    style={{ backgroundColor: e.colores.primario }}
                    title="Color Principal"
                  />
                  <span
                    className="w-4 h-4 rounded-sm border border-black/30 shadow-2xs"
                    style={{ backgroundColor: e.colores.fondo }}
                    title="Fondo"
                  />
                  <span
                    className="w-4 h-4 rounded-sm border border-black/30 shadow-2xs"
                    style={{ backgroundColor: e.colores.acento }}
                    title="Acento"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
