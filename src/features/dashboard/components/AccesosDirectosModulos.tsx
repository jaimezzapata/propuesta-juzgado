"use client";

import React from "react";
import { Scale, FileText, PenTool, CalendarClock, Inbox, FolderGit2, ArrowUpRight } from "lucide-react";
import { ModuloAccesoDirecto } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface AccesosDirectosModulosProps {
  modulos: ModuloAccesoDirecto[];
}

export const AccesosDirectosModulos: React.FC<AccesosDirectosModulosProps> = ({ modulos }) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  const renderIcon = (icono: string) => {
    switch (icono) {
      case "Scale":
        return <Scale className="w-5 h-5 text-[#9A7B3E]" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-sky-500" />;
      case "PenTool":
        return <PenTool className="w-5 h-5 text-emerald-500" />;
      case "CalendarClock":
        return <CalendarClock className="w-5 h-5 text-amber-500" />;
      case "Inbox":
        return <Inbox className="w-5 h-5 text-indigo-500" />;
      case "FolderGit2":
      default:
        return <FolderGit2 className="w-5 h-5 text-purple-500" />;
    }
  };

  const getCardClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] border border-[#4D3339] hover:border-[#6B1D2F] text-[#EDE6DF] rounded-xl shadow-md";
        case "dark-lawfirm":
          return "bg-[#181C23] border border-[#2D333F] hover:border-[#C5A880] text-[#E2E8F0] rounded-lg shadow-lg";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-700 hover:border-slate-500 text-slate-100 shadow-[3px_3px_0px_#020617] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] border border-[#6B1D2F]/25 hover:border-[#6B1D2F] text-[#2C1810] rounded-xl shadow-md";
        case "dark-lawfirm":
          return "bg-white border border-[#C5A880]/60 hover:border-[#C5A880] text-[#111827] rounded-lg shadow-md";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] hover:bg-slate-50 text-[#0F172A] shadow-[3px_3px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none";
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado compacto del área de trabajo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/15 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <h1 className="text-lg sm:text-xl font-black tracking-tight">
            Módulos de Gestión Procesal
          </h1>
          <span className="text-[11px] opacity-70">
            Seleccione el flujo correspondiente para sustanciar expedientes
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold opacity-70 px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded self-start sm:self-auto shrink-0">
          6 Módulos Activos
        </span>
      </div>

      {/* Cuadrícula amplia y respirable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulos.map((m) => (
          <a
            key={m.id}
            href={m.ruta}
            className={`p-6 flex flex-col justify-between transition-all duration-150 group cursor-pointer min-h-[170px] ${getCardClasses()}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-black/5 dark:bg-white/10 rounded-lg">
                    {renderIcon(m.icono)}
                  </div>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-black/10 dark:bg-white/10 rounded">
                    {m.codigo}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <h2 className="text-base font-black leading-snug group-hover:text-[#9A7B3E] transition-colors">
                {m.titulo}
              </h2>
              <p className="text-xs opacity-75 mt-1.5 leading-relaxed">
                {m.descripcion}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-bold opacity-70 group-hover:opacity-100">
              <span className="text-[11px]">Acceder a la bandeja</span>
              <span className="text-[#9A7B3E] group-hover:translate-x-1 transition-transform inline-block">
                Ingresar &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
