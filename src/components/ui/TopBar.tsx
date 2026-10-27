"use client";

import React from "react";
import { Scale, LogOut, ShieldCheck, UserCheck } from "lucide-react";
import { SesionUsuario } from "@/features/auth/types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface TopBarProps {
  usuario: SesionUsuario;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ usuario, onLogout }) => {
  const { estilo, modo } = useEstiloVisual();
  const esJefe = usuario.rol === "JEFE_DESPACHO";
  const esOscuro = modo === "oscuro";

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

  const getUserBadgeStyles = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-[#1E1517] border border-[#4D3339] text-[#EDE6DF] rounded-xl"
          : "bg-[#45101A] border border-[#6B1D2F] text-white rounded-xl";
      case "dark-lawfirm":
        return "bg-[#181C23] border border-[#2D333F] text-[#E2E8F0] rounded-lg";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-[#1E293B] border-2 border-slate-700 shadow-[2px_2px_0px_#020617] text-slate-100"
          : "bg-slate-50 border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]";
    }
  };

  return (
    <header className={`sticky top-0 z-30 mb-6 transition-colors duration-200 ${getHeaderStyles()}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Identidad Institucional Oficial */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center shrink-0 ${
              estilo === "neo-brutalista"
                ? esOscuro
                  ? "bg-[#1E293B] text-[#D4AF37] border-2 border-slate-700 shadow-[2px_2px_0px_#020617]"
                  : "bg-[#0F2537] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
                : estilo === "editorial-notarial"
                ? "bg-[#FCFAF7] text-[#5A1624] rounded-lg shadow-sm"
                : "bg-[#1E232B] text-[#C5A880] border border-[#C5A880]/40 rounded-lg"
            }`}
          >
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-[10px] font-bold tracking-wide block uppercase ${
                estilo === "neo-brutalista"
                  ? esOscuro ? "text-slate-400" : "text-slate-500"
                  : estilo === "editorial-notarial"
                  ? "text-amber-200/90"
                  : "text-[#C5A880]"
              }`}
            >
              Rama Judicial de Colombia &bull; Distrito Medellín
            </span>
            <span
              className={`text-sm sm:text-base font-black tracking-tight ${
                estilo === "editorial-notarial" ? "font-serif text-white text-lg" : ""
              }`}
            >
              Juzgado 4° de Familia de Oralidad
            </span>
          </div>
        </div>

        {/* Perfil del Usuario y Salida */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Badge de Usuario */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 ${getUserBadgeStyles()}`}>
            <div
              className={`w-7 h-7 flex items-center justify-center text-xs font-bold ${
                estilo === "neo-brutalista"
                  ? esOscuro ? "bg-[#0F172A] text-[#D4AF37]" : "bg-[#0F172A] text-white"
                  : estilo === "editorial-notarial"
                  ? "bg-amber-100 text-[#5A1624] rounded-md"
                  : "bg-[#C5A880] text-black rounded-md"
              }`}
            >
              {esJefe ? <ShieldCheck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block leading-tight">{usuario.nombre}</span>
              <span className="text-[10px] opacity-75 font-normal">
                {usuario.cargo}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${
                esJefe
                  ? estilo === "neo-brutalista"
                    ? "bg-[#6B1D2F] text-white border border-slate-700"
                    : "bg-amber-400 text-black rounded"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {esJefe ? "Jefe" : "Gestor"}
            </span>
          </div>

          {/* Botón Salir */}
          <button
            type="button"
            onClick={onLogout}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
              estilo === "neo-brutalista"
                ? esOscuro
                  ? "bg-[#9E2A2B] hover:bg-[#852223] text-white border-2 border-slate-700 shadow-[2px_2px_0px_#020617] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  : "bg-[#6B1D2F] hover:bg-[#541624] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                : estilo === "editorial-notarial"
                ? "bg-black/20 hover:bg-black/40 text-white rounded-lg border border-white/20"
                : "bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/40 rounded-lg"
            }`}
            title="Cerrar Sesión Judicial"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
