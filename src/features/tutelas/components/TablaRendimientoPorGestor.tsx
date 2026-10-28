"use client";

import React from "react";
import { Users, Award, Timer } from "lucide-react";
import { MetricaRendimientoGestor } from "../types";
import { obtenerInicialesUsuario } from "@/features/auth/utils/usuario.utils";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface TablaRendimientoPorGestorProps {
  metricasPorGestor: MetricaRendimientoGestor[];
  filtroGestorActivo: string;
  onSeleccionarGestor: (nombreGestor: string) => void;
}

export const TablaRendimientoPorGestor: React.FC<
  TablaRendimientoPorGestorProps
> = ({ metricasPorGestor, filtroGestorActivo, onSeleccionarGestor }) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const esOscuro = modo === "oscuro";

  return (
    <div className={`p-4 flex flex-col gap-3.5 ${tema.card}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#9A7B3E]" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider">
              Rendimiento y Productividad por Gestor Judicial
            </h3>
            <p className="text-[11px] opacity-70">
              Haga clic sobre cualquier gestor para filtrar sus expedientes en la tabla inferior
            </p>
          </div>
        </div>
        {filtroGestorActivo !== "TODOS" && (
          <button
            type="button"
            onClick={() => onSeleccionarGestor("TODOS")}
            className={`px-2.5 py-1 text-[11px] font-bold cursor-pointer ${tema.botonSecundario(
              false
            )}`}
          >
            Ver todos los gestores
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {metricasPorGestor.map((g) => {
          const activo = filtroGestorActivo === g.nombreGestor;
          const iniciales = obtenerInicialesUsuario(g.nombreGestor);
          const total = Math.max(g.totalAsignados, 1);

          return (
            <div
              key={g.nombreGestor}
              onClick={() =>
                onSeleccionarGestor(activo ? "TODOS" : g.nombreGestor)
              }
              className={`p-3.5 cursor-pointer transition-all flex flex-col justify-between gap-3 ${tema.cardInteractiva(
                activo
              )}`}
            >
              {/* Cabecera del Gestor */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#6B1D2F] text-white font-black text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]">
                    {iniciales}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black truncate">
                      {g.nombreGestor}
                    </h4>
                    <p className="text-[11px] opacity-75 truncate">
                      {g.cargoGestor}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-2 py-0.5 text-[11px] font-black flex items-center gap-1 shrink-0 ${tema.badgeNeutro}`}
                >
                  <Award className="w-3 h-3 text-[#9A7B3E]" />
                  <span>{g.tasaEfectividad}%</span>
                </div>
              </div>

              {/* Contadores por Estado */}
              <div className="grid grid-cols-5 gap-1.5 text-center">
                <div className={`p-1.5 rounded ${tema.subpanel}`}>
                  <div className="text-sm font-black">{g.totalAsignados}</div>
                  <div className="text-[9px] font-bold uppercase opacity-75">
                    Total
                  </div>
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    esOscuro
                      ? "bg-emerald-950/50 border-emerald-700/70 text-emerald-300"
                      : "bg-emerald-50 border-emerald-300 text-emerald-900"
                  }`}
                >
                  <div className="text-sm font-black">{g.resueltos}</div>
                  <div className="text-[9px] font-bold uppercase">Resueltos</div>
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    esOscuro
                      ? "bg-amber-950/50 border-amber-700/70 text-amber-300"
                      : "bg-amber-50 border-amber-300 text-amber-900"
                  }`}
                >
                  <div className="text-sm font-black">{g.pendientes}</div>
                  <div className="text-[9px] font-bold uppercase">Pend.</div>
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    esOscuro
                      ? "bg-sky-950/50 border-sky-700/70 text-sky-300"
                      : "bg-sky-50 border-sky-300 text-sky-900"
                  }`}
                >
                  <div className="text-sm font-black">{g.devueltos}</div>
                  <div className="text-[9px] font-bold uppercase">Devueltos</div>
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    esOscuro
                      ? "bg-rose-950/50 border-rose-700/70 text-rose-300"
                      : "bg-rose-50 border-rose-300 text-rose-900"
                  }`}
                >
                  <div className="text-sm font-black">{g.perdidos}</div>
                  <div className="text-[9px] font-bold uppercase">Perdidos</div>
                </div>
              </div>

              {/* Barra proporcional del gestor + término promedio */}
              <div className="flex flex-col gap-1.5">
                <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(g.resueltos / total) * 100}%` }}
                    className="bg-emerald-600 h-full"
                  />
                  <div
                    style={{ width: `${(g.pendientes / total) * 100}%` }}
                    className="bg-amber-500 h-full"
                  />
                  <div
                    style={{ width: `${(g.devueltos / total) * 100}%` }}
                    className="bg-sky-500 h-full"
                  />
                  <div
                    style={{ width: `${(g.perdidos / total) * 100}%` }}
                    className="bg-rose-600 h-full"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] opacity-75 font-semibold">
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3 text-[#9A7B3E]" />
                    Promedio término restante: {g.diasPromedioRestantes} días
                  </span>
                  <span>{activo ? "Filtro activo ✓" : "Filtrar casos →"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

