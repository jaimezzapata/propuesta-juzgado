"use client";

import React from "react";
import { Scale, LogOut } from "lucide-react";
import { SesionUsuario } from "@/features/auth/types";
import { obtenerInicialesUsuario } from "@/features/auth/utils/usuario.utils";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface TopBarProps {
  usuario: SesionUsuario;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ usuario, onLogout }) => {
  const { estilo, modo } = useEstiloVisual();
  const esJefe = usuario.rol === "JEFE_DESPACHO";
  const esOscuro = modo === "oscuro";
  const iniciales = obtenerInicialesUsuario(usuario.nombre);

  // Clases adaptadas limpias y solemnes
  const getHeaderStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#25171B] text-[#EDE6DF] border-b border-[#4D3339] shadow-md"
          : "bg-[#5A1624] text-white border-b border-[#44101B] shadow-md";
      case "dark-lawfirm":
        return esOscuro
          ? "bg-[#0E1015] text-[#E2E8F0] border-b border-[#2D333F] shadow-lg"
          : "bg-[#111317] text-[#F3F4F6] border-b border-[#C5A880]/30 shadow-md";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#0B1120] text-slate-100 border-b-2 border-slate-700 shadow-[0_2px_0px_#020617]"
          : "bg-white text-[#0F172A] border-b-2 border-[#0F172A] shadow-[0_3px_0px_#0F172A]";
    }
  };

  const getAvatarCircleStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#3D2229] border border-amber-200/40 text-amber-200 shadow-xs"
          : "bg-[#FCFAF7] border border-amber-300/80 text-[#5A1624] shadow-xs";
      case "dark-lawfirm":
        return "bg-[#181C23] border border-[#C5A880] text-[#C5A880] shadow-xs";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#1E293B] border-2 border-slate-600 text-[#D4AF37] shadow-[2px_2px_0px_#020617]"
          : "bg-[#0F2537] border-2 border-[#0F172A] text-white shadow-[2px_2px_0px_#0F172A]";
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 h-12 transition-colors duration-200 ${getHeaderStyles()}`}
    >
      <div className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-2">
        {/* Identidad Institucional Compacta en una sola línea */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 flex items-center justify-center shrink-0 ${
              estilo === "neo-brutalista"
                ? esOscuro
                  ? "bg-[#1E293B] text-[#D4AF37] border-2 border-slate-700 shadow-[2px_2px_0px_#020617]"
                  : "bg-[#0F2537] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
                : estilo === "editorial-notarial"
                ? "bg-[#FCFAF7] text-[#5A1624] rounded-md shadow-xs"
                : "bg-[#1E232B] text-[#C5A880] border border-[#C5A880]/40 rounded-md"
            }`}
          >
            <Scale className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`text-xs sm:text-sm font-black tracking-tight truncate ${
                estilo === "editorial-notarial" ? "font-serif text-white text-base" : ""
              }`}
            >
              Juzgado 4° de Familia de Oralidad
            </span>

            <span className="hidden md:inline-block w-px h-3.5 bg-current opacity-20 shrink-0" />

            <span
              className={`hidden md:inline-block text-[10px] font-bold tracking-wider uppercase truncate ${
                estilo === "neo-brutalista"
                  ? esOscuro
                    ? "text-slate-400"
                    : "text-slate-500"
                  : estilo === "editorial-notarial"
                  ? "text-amber-200/90"
                  : "text-[#C5A880]"
              }`}
            >
              Rama Judicial &bull; Medellín
            </span>
          </div>
        </div>

        {/* Lateral derecho: Datos del usuario, círculo con iniciales y salida */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex flex-col items-end leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold leading-none">
                {usuario.nombre}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider leading-none ${
                  esJefe
                    ? estilo === "neo-brutalista"
                      ? "bg-[#6B1D2F] text-white border border-[#0F172A]"
                      : "bg-amber-400 text-black rounded-xs"
                    : estilo === "neo-brutalista"
                    ? "bg-[#9A7B3E] text-white border border-[#0F172A]"
                    : "bg-slate-200 text-slate-800 rounded-xs"
                }`}
              >
                {esJefe ? "Jefe" : "Gestor"}
              </span>
            </div>
            <span className="text-[10px] opacity-70 font-normal mt-0.5 leading-none">
              {usuario.cargo}
            </span>
          </div>

          {/* Círculo con las iniciales de la persona autenticada */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black tracking-tight select-none shrink-0 ${getAvatarCircleStyles()}`}
            title={`${usuario.nombre} — ${usuario.cargo}`}
            aria-label={`Iniciales de ${usuario.nombre}: ${iniciales}`}
          >
            {iniciales}
          </div>

          <span className="w-px h-5 bg-current opacity-15 shrink-0" />

          <button
            type="button"
            onClick={onLogout}
            className={`h-8 flex items-center gap-1.5 px-2.5 text-[11px] font-bold cursor-pointer transition-all ${
              estilo === "neo-brutalista"
                ? esOscuro
                  ? "bg-[#9E2A2B] hover:bg-[#852223] text-white border-2 border-slate-700 shadow-[2px_2px_0px_#020617] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  : "bg-[#6B1D2F] hover:bg-[#541624] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                : estilo === "editorial-notarial"
                ? "bg-black/20 hover:bg-black/40 text-white rounded-lg border border-white/20"
                : "bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/40 rounded-lg"
            }`}
            title="Cerrar Sesión Judicial"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
