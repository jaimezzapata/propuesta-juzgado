"use client";

import React from "react";
import {
  Link2,
  Trash2,
  Sparkles,
  MousePointerClick,
  RotateCcw,
} from "lucide-react";
import { ItemVinculoVisual } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface PanelVinculosActivosProps {
  esJefe: boolean;
  vinculos: ItemVinculoVisual[];
  edicionesManualesCount: number;
  onCambiarValorGlobal: (id: string, nuevoValor: string) => void;
  onEliminarVinculo: (id: string) => void;
  onRestaurarEdicionesManuales: () => void;
}

export const PanelVinculosActivos: React.FC<PanelVinculosActivosProps> = ({
  esJefe,
  vinculos,
  edicionesManualesCount,
  onCambiarValorGlobal,
  onEliminarVinculo,
  onRestaurarEdicionesManuales,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  return (
    <div className={`p-4 flex flex-col gap-3 ${tema.card}`}>
      <div className="flex items-center justify-between border-b border-current/15 pb-2.5">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-[#9A7B3E] shrink-0" />
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider">
              {esJefe
                ? `Campos y Variables del Formato (${vinculos.length})`
                : `Campos para Diligenciar (${vinculos.length})`}
            </h2>
            <p className="text-[10px] opacity-75">
              {esJefe
                ? "Edite o configure datos que se actualizan en todo el documento"
                : "Diligencie los datos autorizados; cambian en todas sus menciones"}
            </p>
          </div>
        </div>
      </div>

      {edicionesManualesCount > 0 && (
        <div className="p-2 bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold">
            {edicionesManualesCount} cambio(s) directo(s) en la hoja
          </span>
          <button
            type="button"
            onClick={onRestaurarEdicionesManuales}
            className="text-[10px] font-bold underline cursor-pointer opacity-85 hover:opacity-100"
          >
            Deshacer
          </button>
        </div>
      )}

      {vinculos.length === 0 ? (
        <div className="py-8 text-center text-xs opacity-70">
          Seleccione cualquier palabra en la hoja con el mouse o presione{" "}
          <strong>Detectar con IA</strong> para convertirla en dato global.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 max-h-[calc(100vh-285px)] min-h-[380px] overflow-y-auto pr-1">
          {vinculos.map((v) => (
            <div
              key={v.id}
              className={`p-2.5 flex flex-col gap-1.5 ${tema.subpanel}`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  {v.origen === "ia" ? (
                    <Sparkles className="w-3 h-3 text-[#9A7B3E] shrink-0" />
                  ) : (
                    <MousePointerClick className="w-3 h-3 text-sky-500 shrink-0" />
                  )}
                  <span className="text-[11px] font-black text-[#9A7B3E] truncate">
                    {v.etiqueta}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 ${tema.badgeNeutro}`}
                  >
                    {v.ocurrencias}x
                  </span>

                  {v.fueReemplazado && (
                    <button
                      type="button"
                      onClick={() => onCambiarValorGlobal(v.id, "")}
                      className="p-0.5 opacity-75 hover:opacity-100 hover:text-amber-500 cursor-pointer"
                      title="Restaurar al texto original"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}

                  {esJefe && (
                    <button
                      type="button"
                      onClick={() => onEliminarVinculo(v.id)}
                      className="p-0.5 opacity-65 hover:opacity-100 hover:text-red-500 cursor-pointer"
                      title="Eliminar variable y dejar texto original fijo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <span className="text-[10px] opacity-75 truncate">
                Original:{" "}
                <strong className="font-semibold">
                  &ldquo;{v.textoOriginal}&rdquo;
                </strong>
              </span>

              <input
                type="text"
                value={v.textoMostrado}
                onChange={(e) => onCambiarValorGlobal(v.id, e.target.value)}
                className={`w-full h-8 px-2.5 text-xs font-bold outline-none transition-colors ${
                  v.fueReemplazado ? tema.inputReemplazado : tema.input
                }`}
                title="Cambiar este texto actualizará todas las menciones en el documento"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
