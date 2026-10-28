"use client";

import React, { useRef } from "react";
import {
  Upload,
  FilePlus2,
  FolderOpen,
  Sparkles,
  PenLine,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import {
  ItemVinculoVisual,
  PasoFlujo,
  PlantillaDocumentoTutelaDTO,
} from "../types";
import { IndicadorPasosFlujo } from "./IndicadorPasosFlujo";
import { PASOS_FORMATOS_JEFE } from "../hooks/useNavegacionTutelas";
import { PanelVinculosActivos } from "./PanelVinculosActivos";
import { VisorHojaDocxInteractivo } from "./VisorHojaDocxInteractivo";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface FlujoGestionFormatosJefeViewProps {
  pasoActual: PasoFlujo;
  plantillas: PlantillaDocumentoTutelaDTO[];
  plantillaActivaId: string | null;
  nombreArchivo: string;
  bufferDocx: ArrayBuffer | null;
  vinculos: ItemVinculoVisual[];
  edicionesManualesCount: number;
  modoEdicionManual: boolean;
  analizandoIA: boolean;
  guardandoPlantilla: boolean;
  onCambiarPaso: (paso: PasoFlujo) => void;
  onSubirArchivo: (file: File) => Promise<void>;
  onAbrirModalCrearDoc: () => void;
  onSeleccionarPlantillaExistente: (id: string) => void;
  onDetectarConIA: () => void;
  onToggleEdicionManual: () => void;
  onCambiarValorGlobal: (id: string, nuevoValor: string) => void;
  onEliminarVinculo: (id: string) => void;
  onRestaurarEdicionesManuales: () => void;
  onSeleccionarTextoMouse: (
    datos: { texto: string; x: number; y: number } | null
  ) => void;
  onRegistrarEdicionManual: (textoAnterior: string, textoNuevo: string) => void;
  onGuardarFormatoParaGestores: () => Promise<void>;
}

export const FlujoGestionFormatosJefeView: React.FC<
  FlujoGestionFormatosJefeViewProps
> = ({
  pasoActual,
  plantillas,
  plantillaActivaId,
  nombreArchivo,
  bufferDocx,
  vinculos,
  edicionesManualesCount,
  modoEdicionManual,
  analizandoIA,
  guardandoPlantilla,
  onCambiarPaso,
  onSubirArchivo,
  onAbrirModalCrearDoc,
  onSeleccionarPlantillaExistente,
  onDetectarConIA,
  onToggleEdicionManual,
  onCambiarValorGlobal,
  onEliminarVinculo,
  onRestaurarEdicionesManuales,
  onSeleccionarTextoMouse,
  onRegistrarEdicionManual,
  onGuardarFormatoParaGestores,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3.5">
      <IndicadorPasosFlujo
        pasos={PASOS_FORMATOS_JEFE}
        pasoActual={pasoActual}
        onSeleccionarPaso={onCambiarPaso}
      />

      {/* PASO 1: Elegir origen del documento */}
      {pasoActual === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                await onSubirArchivo(file);
                onCambiarPaso(2);
              }
              e.target.value = "";
            }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all ${tema.cardInteractiva(
              false
            )}`}
          >
            <div>
              <div className="w-10 h-10 bg-[#0F2537] text-[#D4AF37] flex items-center justify-center mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black">
                1. Cargar Archivo Word (.DOCX)
              </h3>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Suba un formato oficial desde su computador conservando el 100%
                de sus márgenes, tablas y encabezados.
              </p>
            </div>
            <span className="text-xs font-black text-[#9A7B3E] flex items-center gap-1">
              Seleccionar archivo .docx <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div
            onClick={onAbrirModalCrearDoc}
            className={`p-5 flex flex-col justify-between gap-4 cursor-pointer transition-all ${tema.cardInteractiva(
              false
            )}`}
          >
            <div>
              <div className="w-10 h-10 bg-[#6B1D2F] text-white flex items-center justify-center mb-3">
                <FilePlus2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black">
                2. Crear Nuevo Documento Desde Cero
              </h3>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Redacte una nueva providencia u oficio y genere automáticamente
                el formato Word con encabezado SIGCMA.
              </p>
            </div>
            <span className="text-xs font-black text-[#9A7B3E] flex items-center gap-1">
              Abrir redactor judicial <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className={`p-5 flex flex-col justify-between gap-3 ${tema.card}`}>
            <div>
              <div className="w-10 h-10 bg-[#9A7B3E] text-white flex items-center justify-center mb-3">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black">
                3. Editar Formato Existente
              </h3>
              <p className="text-xs opacity-80 mt-1">
                Seleccione una plantilla actual para ajustar sus variables:
              </p>
              <select
                value={plantillaActivaId || ""}
                onChange={(e) => onSeleccionarPlantillaExistente(e.target.value)}
                className={`w-full h-8 px-2 mt-2 text-xs font-bold outline-none ${tema.input}`}
              >
                {plantillas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.codigo} — {p.titulo}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => onCambiarPaso(2)}
              className={`w-full h-8 px-3 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${tema.botonPrimario}`}
            >
              <span>Configurar este formato</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Configurar Variables con IA, Selección con Mouse y Edición */}
      {pasoActual === 2 && (
        <div className="flex flex-col gap-3.5">
          <div className={`px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 ${tema.card}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => onCambiarPaso(1)}
                className={`h-8 px-2.5 text-xs font-bold flex items-center gap-1 cursor-pointer ${tema.botonSecundario(
                  false
                )}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Origen
              </button>

              <button
                type="button"
                onClick={onDetectarConIA}
                disabled={analizandoIA}
                className={`h-8 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${tema.botonPrimario}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {analizandoIA ? "Analizando..." : "Detectar Variables con IA"}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleEdicionManual}
                className={`h-8 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer ${tema.botonSecundario(
                  modoEdicionManual
                )}`}
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>
                  {modoEdicionManual
                    ? "Edición de Texto Base: Activa"
                    : "Editar Texto Base en la Hoja"}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onCambiarPaso(3)}
              className={`h-8 px-4 text-xs font-black flex items-center gap-1.5 cursor-pointer ${tema.botonAccionVino}`}
            >
              <span>Continuar a Guardar y Publicar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-4 xl:col-span-3">
              <PanelVinculosActivos
                esJefe={true}
                vinculos={vinculos}
                edicionesManualesCount={edicionesManualesCount}
                onCambiarValorGlobal={onCambiarValorGlobal}
                onEliminarVinculo={onEliminarVinculo}
                onRestaurarEdicionesManuales={onRestaurarEdicionesManuales}
              />
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <VisorHojaDocxInteractivo
                esJefe={true}
                bufferDocx={bufferDocx}
                textosResaltados={vinculos}
                modoEdicionManual={modoEdicionManual}
                onSeleccionarTextoMouse={onSeleccionarTextoMouse}
                onRegistrarEdicionManual={onRegistrarEdicionManual}
              />
            </div>
          </div>
        </div>
      )}

      {/* PASO 3: Confirmación a ancho completo (Resumen izquierda + Vista previa derecha) */}
      {pasoActual === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className={`lg:col-span-4 p-5 flex flex-col gap-4 ${tema.card}`}>
            <div className="flex items-center gap-2.5 border-b border-current/15 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h3 className="text-sm font-black">
                  Paso 3: Publicar Formato Oficial
                </h3>
                <p className="text-xs opacity-75">
                  Quedará disponible para los gestores del despacho
                </p>
              </div>
            </div>

            <div className={`p-3.5 text-xs flex flex-col gap-2 ${tema.subpanel}`}>
              <div>
                <strong>Archivo Word Base:</strong> {nombreArchivo}
              </div>
              <div>
                <strong>Variables Habilitadas:</strong> {vinculos.length} campo(s)
              </div>
              <div>
                <strong>Cambios Estructurales:</strong> {edicionesManualesCount}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                disabled={guardandoPlantilla}
                onClick={onGuardarFormatoParaGestores}
                className={`w-full h-9 px-4 text-xs font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${tema.botonAccionVino}`}
              >
                <Save className="w-4 h-4" />
                <span>
                  {guardandoPlantilla
                    ? "Guardando en Catálogo..."
                    : "Guardar y Publicar Formato Oficial"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onCambiarPaso(2)}
                className={`w-full h-8 px-3 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${tema.botonSecundario(
                  false
                )}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Configurar Variables</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <VisorHojaDocxInteractivo
              esJefe={false}
              bufferDocx={bufferDocx}
              textosResaltados={vinculos}
              modoEdicionManual={false}
              onSeleccionarTextoMouse={() => {}}
              onRegistrarEdicionManual={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};
