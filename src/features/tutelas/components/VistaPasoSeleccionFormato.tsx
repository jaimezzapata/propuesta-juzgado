"use client";

import React from "react";
import { FileText, ArrowRight, Check, UserCheck } from "lucide-react";
import { PlantillaDocumentoTutelaDTO } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface VistaPasoSeleccionFormatoProps {
  plantillas: PlantillaDocumentoTutelaDTO[];
  plantillaActivaId: string | null;
  cargando: boolean;
  onElegirYContinuar: (id: string) => void;
}

export const VistaPasoSeleccionFormato: React.FC<
  VistaPasoSeleccionFormatoProps
> = ({ plantillas, plantillaActivaId, cargando, onElegirYContinuar }) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  if (cargando) {
    return (
      <div className="py-12 text-center text-xs font-bold opacity-70">
        Cargando catálogo oficial de formatos del Despacho...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-black">
            Paso 1: Seleccione el Formato Oficial a Diligenciar
          </h2>
          <p className="text-xs opacity-75">
            Elija la providencia, acta u oficio autorizado por el Jefe de Despacho
          </p>
        </div>
        <span
          className={`text-xs font-mono font-bold px-2.5 py-1 self-start sm:self-auto ${tema.badgeNeutro}`}
        >
          {plantillas.length} Formato(s) Disponibles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plantillas.map((p) => {
          const activa = p.id === plantillaActivaId;
          return (
            <div
              key={p.id}
              onClick={() => onElegirYContinuar(p.id)}
              className={`p-4 flex flex-col justify-between gap-3.5 cursor-pointer transition-all ${tema.cardInteractiva(
                activa
              )}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-[#0F2537] text-[#D4AF37]">
                    {p.codigo}
                  </span>
                  {activa && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" /> Activo
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-[#9A7B3E]/15 text-[#9A7B3E] shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black leading-snug">
                      {p.titulo}
                    </h3>
                    <p className="text-xs opacity-80 mt-1 leading-relaxed">
                      {p.descripcion}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-current/15 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] opacity-80">
                  <span className="flex items-center gap-1 truncate">
                    <UserCheck className="w-3 h-3 text-[#9A7B3E] shrink-0" />
                    <span className="truncate">{p.creadoPor}</span>
                  </span>
                  <span className="font-mono font-bold shrink-0">
                    {p.vinculos.length} campos
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElegirYContinuar(p.id);
                  }}
                  className={`w-full h-8 px-3 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${tema.botonPrimario}`}
                >
                  <span>Usar este formato</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
