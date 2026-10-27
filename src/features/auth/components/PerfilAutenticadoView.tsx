"use client";

import React from "react";
import { ShieldCheck, UserCheck, KeyRound, Mail, FileText, CheckCircle2, LogOut } from "lucide-react";
import { SesionUsuario } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface PerfilAutenticadoViewProps {
  usuario: SesionUsuario;
  onLogout: () => void;
}

export const PerfilAutenticadoView: React.FC<PerfilAutenticadoViewProps> = ({
  usuario,
  onLogout,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const esJefe = usuario.rol === "JEFE_DESPACHO";
  const esOscuro = modo === "oscuro";

  const getBannerClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] shadow-lg rounded-2xl text-[#EDE6DF]";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] shadow-xl rounded-xl text-[#E2E8F0]";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 shadow-[4px_4px_0px_#020617] text-slate-100";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] border border-[#6B1D2F]/30 shadow-lg rounded-2xl text-[#2C1810]";
        case "dark-lawfirm":
          return "bg-white border border-[#C5A880] shadow-md rounded-xl text-[#111827]";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] text-[#0F172A]";
      }
    }
  };

  const getSubcardClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] shadow-md rounded-xl text-[#EDE6DF]";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] shadow-md rounded-xl text-[#E2E8F0]";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 shadow-[4px_4px_0px_#020617] text-slate-100";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] border border-[#6B1D2F]/25 shadow-md rounded-xl text-[#2C1810]";
        case "dark-lawfirm":
          return "bg-white border border-[#C5A880]/60 shadow-md rounded-xl text-[#111827]";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] text-[#0F172A]";
      }
    }
  };

  const getTableRowClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#1E1719] border border-[#4D3339]/60 rounded-lg text-[#EDE6DF]";
        case "dark-lawfirm":
          return "bg-[#101318] border border-[#2D333F] rounded-lg text-[#E2E8F0]";
        case "neo-brutalista":
        default:
          return "bg-[#0F172A] border border-slate-700 text-slate-100";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#F7F3EE] border border-[#6B1D2F]/15 rounded-lg text-[#2C1810]";
        case "dark-lawfirm":
          return "bg-slate-50 border border-slate-200 rounded-lg text-slate-800";
        case "neo-brutalista":
        default:
          return "bg-[#F8F9FA] border border-[#0F172A] text-[#0F172A]";
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 text-left">
      {/* Banner de Estado de Autenticación */}
      <div className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-200 ${getBannerClasses()}`}>
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 flex items-center justify-center shrink-0 ${
              estilo === "neo-brutalista"
                ? esOscuro
                  ? "bg-[#0F172A] text-[#D4AF37] border-2 border-slate-700 shadow-[2px_2px_0px_#020617]"
                  : "bg-[#0F2537] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
                : estilo === "editorial-notarial"
                ? "bg-[#5A1624] text-white rounded-xl shadow-md"
                : "bg-[#1E232B] text-[#C5A880] border border-[#C5A880]/40 rounded-lg"
            }`}
          >
            {esJefe ? <ShieldCheck className="w-8 h-8" /> : <UserCheck className="w-8 h-8" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider ${
                  estilo === "neo-brutalista"
                    ? esOscuro
                      ? "bg-[#0F172A] text-[#D4AF37] border border-slate-700"
                      : "bg-[#0F2537] text-white border border-[#0F172A]"
                    : estilo === "editorial-notarial"
                    ? "bg-[#5A1624] text-white rounded"
                    : "bg-[#C5A880] text-black rounded font-black"
                }`}
              >
                Sesión Judicial Activa
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider ${
                  esJefe
                    ? "bg-[#6B1D2F] text-white"
                    : "bg-[#9A7B3E] text-white"
                }`}
              >
                {esJefe ? "Jefe de Despacho" : "Gestor Judicial"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1.5 tracking-tight">
              {usuario.nombre}
            </h1>
            <p className="text-xs font-semibold opacity-75 mt-0.5">
              {usuario.cargo} &bull; Juzgado Cuarto de Familia de Oralidad de Medellín
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className={`px-4 py-2 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all self-stretch sm:self-auto justify-center ${
            estilo === "neo-brutalista"
              ? esOscuro
                ? "bg-[#9E2A2B] hover:bg-[#852223] text-white border-2 border-slate-700 shadow-[2px_2px_0px_#020617] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                : "bg-[#6B1D2F] hover:bg-[#541624] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              : estilo === "editorial-notarial"
              ? "bg-[#5A1624] hover:bg-[#43101B] text-white rounded-lg shadow-sm"
              : "bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/40 rounded-lg"
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Grid de Información de Identidad y Permisos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de Datos de Credencial */}
        <div className={`p-5 flex flex-col gap-4 ${getSubcardClasses()}`}>
          <div className="flex items-center gap-2 border-b pb-3 border-current/20">
            <KeyRound className="w-5 h-5 text-[#9A7B3E]" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              Datos de Autenticación
            </h2>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className={`flex items-center justify-between p-2.5 ${getTableRowClasses()}`}>
              <span className="font-bold opacity-75 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Correo Institucional:
              </span>
              <span className="font-mono font-bold">{usuario.email}</span>
            </div>

            <div className={`flex items-center justify-between p-2.5 ${getTableRowClasses()}`}>
              <span className="font-bold opacity-75 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Documento de Identidad:
              </span>
              <span className="font-mono font-bold">
                {usuario.documento || "No registrado"}
              </span>
            </div>

            <div className={`flex items-center justify-between p-2.5 ${getTableRowClasses()}`}>
              <span className="font-bold opacity-75">ID de Sesión (CUID):</span>
              <span className="font-mono text-[11px] opacity-90 px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded">
                {usuario.id}
              </span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Permisos Habilitados */}
        <div className={`p-5 flex flex-col gap-4 ${getSubcardClasses()}`}>
          <div className="flex items-center gap-2 border-b pb-3 border-current/20">
            <ShieldCheck className="w-5 h-5 text-[#9A7B3E]" />
            <h2 className="text-sm font-black uppercase tracking-wider">
              Permisos del Usuario
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {usuario.permisos && usuario.permisos.length > 0 ? (
              usuario.permisos.map((permiso) => (
                <span
                  key={permiso}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 ${
                    estilo === "neo-brutalista"
                      ? esOscuro
                        ? "bg-[#0F172A] text-slate-100 border border-slate-700 shadow-[1px_1px_0px_#020617]"
                        : "bg-[#F8F9FA] text-[#0F172A] border border-[#0F172A] shadow-[1px_1px_0px_#0F172A]"
                      : estilo === "editorial-notarial"
                      ? esOscuro
                        ? "bg-[#1E1719] text-[#EDE6DF] border border-[#4D3339] rounded-md"
                        : "bg-[#FAF7F2] text-[#5A1624] border border-[#6B1D2F]/20 rounded-md"
                      : "bg-[#101318] text-[#E2E8F0] border border-[#2D333F] rounded-md"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {permiso.replace(/_/g, " ")}
                </span>
              ))
            ) : (
              <span className="text-xs opacity-60 italic">
                Sin permisos especiales asignados.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
