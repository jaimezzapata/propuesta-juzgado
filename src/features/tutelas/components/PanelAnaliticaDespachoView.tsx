"use client";

import React from "react";
import { BarChart3, FileCheck2, FilterX, ShieldCheck } from "lucide-react";
import {
  CasoTutelaDTO,
  ESTADOS_CASO_TUTELA,
  EstadoCasoTutela,
  MetricaRendimientoGestor,
  MetricasGlobalesDespacho,
} from "../types";
import { GESTORES_OFICIALES_DESPACHO } from "../utils/analitica-tutelas.utils";
import { TarjetasKpiGlobalesDespacho } from "./TarjetasKpiGlobalesDespacho";
import { TablaRendimientoPorGestor } from "./TablaRendimientoPorGestor";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface PanelAnaliticaDespachoViewProps {
  metricasGlobales: MetricasGlobalesDespacho;
  metricasPorGestor: MetricaRendimientoGestor[];
  casosFiltrados: CasoTutelaDTO[];
  filtroGestor: string;
  filtroEstado: EstadoCasoTutela | "TODOS";
  onCambiarFiltroGestor: (gestor: string) => void;
  onCambiarFiltroEstado: (estado: EstadoCasoTutela | "TODOS") => void;
  onActualizarEstadoYGestor: (
    idCaso: string,
    nuevoEstado: EstadoCasoTutela,
    nuevoGestorNombre: string
  ) => void;
  onIrADiligenciarCaso: (idCaso: string) => void;
}

export const PanelAnaliticaDespachoView: React.FC<
  PanelAnaliticaDespachoViewProps
> = ({
  metricasGlobales,
  metricasPorGestor,
  casosFiltrados,
  filtroGestor,
  filtroEstado,
  onCambiarFiltroGestor,
  onCambiarFiltroEstado,
  onActualizarEstadoYGestor,
  onIrADiligenciarCaso,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const esOscuro = modo === "oscuro";

  const obtenerBadgeEstado = (estado: EstadoCasoTutela) => {
    switch (estado) {
      case "RESUELTO":
        return esOscuro
          ? "bg-emerald-950/80 text-emerald-300 border-emerald-700"
          : "bg-emerald-100 text-emerald-900 border-emerald-400";
      case "DEVUELTO":
        return esOscuro
          ? "bg-sky-950/80 text-sky-300 border-sky-700"
          : "bg-sky-100 text-sky-900 border-sky-400";
      case "PERDIDO":
        return esOscuro
          ? "bg-rose-950/80 text-rose-300 border-rose-700"
          : "bg-rose-100 text-rose-900 border-rose-400";
      case "PENDIENTE":
      default:
        return esOscuro
          ? "bg-amber-950/80 text-amber-300 border-amber-700"
          : "bg-amber-100 text-amber-900 border-amber-400";
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Encabezado Ejecutivo del Juez / Jefe */}
      <div className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${tema.card}`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-[#0F2537] text-[#D4AF37]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider">
              Panel de Analítica y Control de Gestión del Despacho
            </h2>
            <p className="text-xs opacity-75">
              Monitoreo en tiempo real de casos resueltos, pendientes, devueltos y perdidos por cada gestor judicial
            </p>
          </div>
        </div>
        <span className={`px-2.5 py-1 text-[11px] font-black flex items-center gap-1.5 ${tema.badgeNeutro}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B3E]" />
          <span>Vista Exclusiva Jefe / Juez</span>
        </span>
      </div>

      {/* 1. Tarjetas KPI Globales */}
      <TarjetasKpiGlobalesDespacho
        metricas={metricasGlobales}
        filtroEstadoActivo={filtroEstado}
        onSeleccionarFiltroEstado={onCambiarFiltroEstado}
      />

      {/* 2. Rendimiento Desglosado por cada Gestor */}
      <TablaRendimientoPorGestor
        metricasPorGestor={metricasPorGestor}
        filtroGestorActivo={filtroGestor}
        onSeleccionarGestor={onCambiarFiltroGestor}
      />

      {/* 3. Tabla Interactiva de Auditoría, Reasignación y Estado de Casos */}
      <div className={`p-4 flex flex-col gap-3 ${tema.card}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/10 pb-2.5">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider">
              Detalle de Expedientes Auditados ({casosFiltrados.length})
            </h3>
            <p className="text-[11px] opacity-70">
              Puede reasignar el gestor responsable o cambiar el estado procesal para actualizar las métricas en vivo
            </p>
          </div>

          {(filtroGestor !== "TODOS" || filtroEstado !== "TODOS") && (
            <button
              type="button"
              onClick={() => {
                onCambiarFiltroGestor("TODOS");
                onCambiarFiltroEstado("TODOS");
              }}
              className={`px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 cursor-pointer ${tema.botonSecundario(
                false
              )}`}
            >
              <FilterX className="w-3.5 h-3.5 text-[#9A7B3E]" />
              <span>Limpiar filtros ({filtroGestor !== "TODOS" ? filtroGestor : ""} {filtroEstado !== "TODOS" ? filtroEstado : ""})</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-current/15 text-[10px] font-black uppercase tracking-wider opacity-75">
                <th className="py-2 pr-3">Radicado / Fecha</th>
                <th className="py-2 px-3">Accionante / Entidad</th>
                <th className="py-2 px-3">Gestor Asignado</th>
                <th className="py-2 px-3">Estado del Caso</th>
                <th className="py-2 px-3 text-center">Término</th>
                <th className="py-2 pl-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              {casosFiltrados.map((c) => (
                <tr key={c.id} className="hover:bg-current/5 transition-colors">
                  <td className="py-2.5 pr-3 align-middle">
                    <div className="font-mono font-bold text-[11px]">
                      {c.radicado}
                    </div>
                    <div className="text-[10px] opacity-70">
                      {c.fechaRadicacion}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 align-middle max-w-[260px]">
                    <div className="font-black truncate">{c.clienteNombre}</div>
                    <div className="text-[11px] opacity-75 truncate">
                      vs. {c.entidadAccionada}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 align-middle">
                    <select
                      value={c.gestorAsignadoNombre}
                      onChange={(e) =>
                        onActualizarEstadoYGestor(
                          c.id,
                          c.estado,
                          e.target.value
                        )
                      }
                      className={`px-2 py-1 text-xs font-bold rounded cursor-pointer ${tema.input}`}
                    >
                      {GESTORES_OFICIALES_DESPACHO.map((g) => (
                        <option key={g.nombre} value={g.nombre}>
                          {g.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 px-3 align-middle">
                    <select
                      value={c.estado}
                      onChange={(e) =>
                        onActualizarEstadoYGestor(
                          c.id,
                          e.target.value as EstadoCasoTutela,
                          c.gestorAsignadoNombre
                        )
                      }
                      className={`px-2.5 py-1 text-[11px] font-black uppercase rounded border cursor-pointer ${obtenerBadgeEstado(
                        c.estado
                      )}`}
                    >
                      {ESTADOS_CASO_TUTELA.map((est) => (
                        <option
                          key={est.id}
                          value={est.id}
                          className="bg-slate-900 text-white"
                        >
                          {est.etiqueta}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 px-3 align-middle text-center">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-black rounded ${
                        c.diasTerminoRestantes <= 2
                          ? "bg-rose-600 text-white"
                          : tema.badgeNeutro
                      }`}
                    >
                      {c.diasTerminoRestantes} días
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 align-middle text-right">
                    <button
                      type="button"
                      onClick={() => onIrADiligenciarCaso(c.id)}
                      className={`px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer ${tema.botonPrimario}`}
                    >
                      <FileCheck2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>Diligenciar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

