"use client";

import React from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertOctagon,
} from "lucide-react";
import { EstadoCasoTutela, MetricasGlobalesDespacho } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface TarjetasKpiGlobalesDespachoProps {
  metricas: MetricasGlobalesDespacho;
  filtroEstadoActivo: EstadoCasoTutela | "TODOS";
  onSeleccionarFiltroEstado: (estado: EstadoCasoTutela | "TODOS") => void;
}

export const TarjetasKpiGlobalesDespacho: React.FC<
  TarjetasKpiGlobalesDespachoProps
> = ({ metricas, filtroEstadoActivo, onSeleccionarFiltroEstado }) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const esOscuro = modo === "oscuro";

  const tarjetas = [
    {
      id: "TODOS" as const,
      titulo: "Total Expedientes",
      valor: metricas.totalCasos,
      subtexto: `${metricas.tasaEfectividadGlobal}% efectividad de cierre`,
      icono: Briefcase,
      colorBorde: "border-l-[#9A7B3E]",
      badgeClase: esOscuro
        ? "bg-[#9A7B3E]/25 text-[#F3E8C8]"
        : "bg-[#9A7B3E]/15 text-[#785D2B]",
    },
    {
      id: "RESUELTO" as const,
      titulo: "Casos Resueltos",
      valor: metricas.resueltos,
      subtexto: `${metricas.porcentajeResueltos}% del total radicado`,
      icono: CheckCircle2,
      colorBorde: "border-l-emerald-600",
      badgeClase: esOscuro
        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700"
        : "bg-emerald-100 text-emerald-900 border border-emerald-300",
    },
    {
      id: "PENDIENTE" as const,
      titulo: "Casos Pendientes",
      valor: metricas.pendientes,
      subtexto: `${metricas.porcentajePendientes}% en trámite activo`,
      icono: Clock,
      colorBorde: "border-l-amber-500",
      badgeClase: esOscuro
        ? "bg-amber-950/80 text-amber-300 border border-amber-700"
        : "bg-amber-100 text-amber-900 border border-amber-300",
    },
    {
      id: "DEVUELTO" as const,
      titulo: "Casos Devueltos",
      valor: metricas.devueltos,
      subtexto: `${metricas.porcentajeDevueltos}% en ajuste / corrección`,
      icono: RotateCcw,
      colorBorde: "border-l-sky-500",
      badgeClase: esOscuro
        ? "bg-sky-950/80 text-sky-300 border border-sky-700"
        : "bg-sky-100 text-sky-900 border border-sky-300",
    },
    {
      id: "PERDIDO" as const,
      titulo: "Casos Perdidos / Vencidos",
      valor: metricas.perdidos,
      subtexto: `${metricas.porcentajePerdidos}% fuera de término`,
      icono: AlertOctagon,
      colorBorde: "border-l-rose-600",
      badgeClase: esOscuro
        ? "bg-rose-950/80 text-rose-300 border border-rose-700"
        : "bg-rose-100 text-rose-900 border border-rose-300",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {tarjetas.map((t) => {
          const Icono = t.icono;
          const activa = filtroEstadoActivo === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                onSeleccionarFiltroEstado(
                  filtroEstadoActivo === t.id ? "TODOS" : t.id
                )
              }
              className={`p-3.5 text-left transition-all cursor-pointer border-l-4 ${
                t.colorBorde
              } ${tema.cardInteractiva(activa)}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider opacity-75">
                  {t.titulo}
                </span>
                <span className={`p-1.5 rounded ${t.badgeClase}`}>
                  <Icono className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl font-black tracking-tight">
                {t.valor}
              </div>
              <p className="text-[11px] opacity-75 mt-1 font-medium">
                {t.subtexto}
              </p>
            </button>
          );
        })}
      </div>

      {/* Barra de distribución global */}
      <div className={`px-4 py-3 ${tema.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
          <span className="font-black uppercase tracking-wider">
            Balance General del Despacho ({metricas.totalCasos} casos)
          </span>
          <div className="flex items-center gap-4 text-[11px] font-bold flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              Resueltos ({metricas.porcentajeResueltos}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Pendientes ({metricas.porcentajePendientes}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
              Devueltos ({metricas.porcentajeDevueltos}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
              Perdidos ({metricas.porcentajePerdidos}%)
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-slate-500/20 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${metricas.porcentajeResueltos}%` }}
            className="bg-emerald-600 h-full transition-all"
            title={`Resueltos: ${metricas.resueltos}`}
          />
          <div
            style={{ width: `${metricas.porcentajePendientes}%` }}
            className="bg-amber-500 h-full transition-all"
            title={`Pendientes: ${metricas.pendientes}`}
          />
          <div
            style={{ width: `${metricas.porcentajeDevueltos}%` }}
            className="bg-sky-500 h-full transition-all"
            title={`Devueltos: ${metricas.devueltos}`}
          />
          <div
            style={{ width: `${metricas.porcentajePerdidos}%` }}
            className="bg-rose-600 h-full transition-all"
            title={`Perdidos: ${metricas.perdidos}`}
          />
        </div>
      </div>
    </div>
  );
};

