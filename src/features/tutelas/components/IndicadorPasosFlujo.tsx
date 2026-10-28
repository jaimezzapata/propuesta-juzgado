"use client";

import React from "react";
import { Check } from "lucide-react";
import { DefinicionPasoFlujo, PasoFlujo } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface IndicadorPasosFlujoProps {
  pasos: DefinicionPasoFlujo[];
  pasoActual: PasoFlujo;
  onSeleccionarPaso: (paso: PasoFlujo) => void;
}

export const IndicadorPasosFlujo: React.FC<IndicadorPasosFlujoProps> = ({
  pasos,
  pasoActual,
  onSeleccionarPaso,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      {pasos.map((p) => {
        const esActivo = p.numero === pasoActual;
        const esCompletado = p.numero < pasoActual;

        return (
          <button
            key={p.numero}
            type="button"
            onClick={() => onSeleccionarPaso(p.numero)}
            className={`px-3.5 py-2.5 text-left flex items-center gap-3 cursor-pointer transition-all ${tema.cardInteractiva(
              esActivo
            )}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                esActivo
                  ? "bg-[#9A7B3E] text-white"
                  : esCompletado
                  ? "bg-emerald-600 text-white"
                  : modo === "oscuro"
                  ? "bg-slate-700 text-slate-200"
                  : "bg-slate-200 text-[#0F172A]"
              }`}
            >
              {esCompletado ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                p.numero
              )}
            </div>

            <div className="min-w-0">
              <span className="text-xs font-black block truncate leading-tight">
                {p.titulo}
              </span>
              <span className="text-[11px] opacity-75 block truncate leading-tight mt-0.5">
                {p.subtitulo}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
