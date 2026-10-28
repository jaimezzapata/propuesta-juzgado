"use client";

import React from "react";
import {
  ArrowLeft,
  Download,
  FileText,
  UserCheck,
  RotateCcw,
} from "lucide-react";
import {
  CasoTutelaDTO,
  ItemVinculoVisual,
  PlantillaDocumentoTutelaDTO,
} from "../types";
import { PanelVinculosActivos } from "./PanelVinculosActivos";
import { VisorHojaDocxInteractivo } from "./VisorHojaDocxInteractivo";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface VistaPasoEstudioDiligenciamientoProps {
  esJefe: boolean;
  plantillaActiva: PlantillaDocumentoTutelaDTO | null;
  casoSeleccionado: CasoTutelaDTO | null;
  nombreArchivo: string;
  bufferDocx: ArrayBuffer | null;
  vinculos: ItemVinculoVisual[];
  edicionesManualesCount: number;
  modoEdicionManual: boolean;
  onVolverAPasoFormato: () => void;
  onVolverAPasoCliente: () => void;
  onDesvincularCliente: () => void;
  onCambiarValorGlobal: (id: string, nuevoValor: string) => void;
  onEliminarVinculo: (id: string) => void;
  onRestaurarEdicionesManuales: () => void;
  onSeleccionarTextoMouse: (
    datos: { texto: string; x: number; y: number } | null
  ) => void;
  onRegistrarEdicionManual: (textoAnterior: string, textoNuevo: string) => void;
  onDescargarDocx: () => void;
}

export const VistaPasoEstudioDiligenciamiento: React.FC<
  VistaPasoEstudioDiligenciamientoProps
> = ({
  esJefe,
  plantillaActiva,
  casoSeleccionado,
  nombreArchivo,
  bufferDocx,
  vinculos,
  edicionesManualesCount,
  modoEdicionManual,
  onVolverAPasoFormato,
  onVolverAPasoCliente,
  onDesvincularCliente,
  onCambiarValorGlobal,
  onEliminarVinculo,
  onRestaurarEdicionesManuales,
  onSeleccionarTextoMouse,
  onRegistrarEdicionManual,
  onDescargarDocx,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  return (
    <div className="flex flex-col gap-3.5">
      {/* Barra superior compacta del Paso 3 */}
      <div
        className={`px-3.5 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 ${tema.card}`}
      >
        <div className="flex items-center gap-2.5 flex-wrap text-xs">
          <button
            type="button"
            onClick={onVolverAPasoCliente}
            className={`h-8 px-2.5 font-bold flex items-center gap-1 cursor-pointer ${tema.botonSecundario(
              false
            )}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Paso Anterior</span>
          </button>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 ${tema.subpanel}`}
          >
            <FileText className="w-3.5 h-3.5 text-[#9A7B3E]" />
            <span className="font-bold">
              {plantillaActiva?.titulo || nombreArchivo}
            </span>
            <button
              type="button"
              onClick={onVolverAPasoFormato}
              className="text-[10px] underline ml-1 opacity-80 hover:opacity-100 cursor-pointer"
            >
              Cambiar
            </button>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 ${tema.subpanel}`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-bold">
              {casoSeleccionado
                ? casoSeleccionado.clienteNombre
                : "Sin cliente (Texto original / Manual)"}
            </span>
            {casoSeleccionado && (
              <button
                type="button"
                onClick={onDesvincularCliente}
                className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 ml-1 cursor-pointer"
                title="Restaurar los datos originales del documento"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Quitar
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onDescargarDocx}
          className={`h-8 px-4 text-xs font-black flex items-center justify-center gap-2 cursor-pointer ${tema.botonPrimario}`}
        >
          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Descargar Documento Word (.DOCX)</span>
        </button>
      </div>

      {/* Estudio a ancho completo: 3/12 panel de campos + 9/12 hoja Word */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-4 xl:col-span-3">
          <PanelVinculosActivos
            esJefe={esJefe}
            vinculos={vinculos}
            edicionesManualesCount={edicionesManualesCount}
            onCambiarValorGlobal={onCambiarValorGlobal}
            onEliminarVinculo={onEliminarVinculo}
            onRestaurarEdicionesManuales={onRestaurarEdicionesManuales}
          />
        </div>

        <div className="lg:col-span-8 xl:col-span-9">
          <VisorHojaDocxInteractivo
            esJefe={esJefe}
            bufferDocx={bufferDocx}
            textosResaltados={vinculos}
            modoEdicionManual={modoEdicionManual}
            onSeleccionarTextoMouse={onSeleccionarTextoMouse}
            onRegistrarEdicionManual={onRegistrarEdicionManual}
          />
        </div>
      </div>
    </div>
  );
};
