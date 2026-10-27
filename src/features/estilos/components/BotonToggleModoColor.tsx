"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useEstiloVisual } from "../hooks/useEstiloVisual";

interface BotonToggleModoColorProps {
  className?: string;
  mostrarTexto?: boolean;
}

export const BotonToggleModoColor: React.FC<BotonToggleModoColorProps> = ({
  className = "",
  mostrarTexto = false,
}) => {
  const { modo, toggleModo, estilo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  const getButtonStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#3D101A] border border-[#6B1D2F] text-amber-200 hover:bg-[#4D1522]"
          : "bg-[#FCFAF7] border border-[#6B1D2F]/30 text-[#5A1624] hover:bg-[#F5EFEB]";
      case "dark-lawfirm":
        return esOscuro
          ? "bg-[#161920] border border-[rgba(197,168,128,0.4)] text-[#C5A880] hover:bg-[#1E232E]"
          : "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#0B1320] border-2 border-white/80 text-amber-300 shadow-[2px_2px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          : "bg-white border-2 border-[#0F172A] text-slate-800 shadow-[2px_2px_0px_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
    }
  };

  return (
    <button
      type="button"
      onClick={toggleModo}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${getButtonStyles()} ${className}`}
      title={esOscuro ? "Activar Modo Claro" : "Activar Modo Oscuro"}
      aria-label={esOscuro ? "Activar Modo Claro" : "Activar Modo Oscuro"}
    >
      {esOscuro ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-700 animate-in spin-in-90 duration-200" />
      )}
      {mostrarTexto ? (
        <span>{esOscuro ? "Modo Claro" : "Modo Oscuro"}</span>
      ) : (
        <span className="hidden sm:inline font-semibold">
          {esOscuro ? "Claro" : "Oscuro"}
        </span>
      )}
    </button>
  );
};
