"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Upload,
  FilePlus2,
  Sparkles,
  PenLine,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  FileText,
  Check,
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
  plantillaActiva: PlantillaDocumentoTutelaDTO | null;
  plantillaActivaId: string | null;
  esArchivoRecienSubido: boolean;
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
  onUsarFormatoParaDiligenciar: (id: string) => void;
  onEliminarFormato: (id: string) => Promise<void>;
  onDetectarConIA: () => void;
  onToggleEdicionManual: () => void;
  onCambiarValorGlobal: (id: string, nuevoValor: string | undefined) => void;
  onEliminarVinculo: (id: string) => void;
  onRestaurarEdicionesManuales: () => void;
  onSeleccionarTextoMouse: (
    datos: { texto: string; x: number; y: number } | null
  ) => void;
  onRegistrarEdicionManual: (textoAnterior: string, textoNuevo: string) => void;
  onGuardarFormatoParaGestores: (metadatos: {
    codigo: string;
    titulo: string;
    descripcion: string;
  }) => Promise<void>;
}

export const FlujoGestionFormatosJefeView: React.FC<
  FlujoGestionFormatosJefeViewProps
> = ({
  pasoActual,
  plantillas,
  plantillaActiva,
  plantillaActivaId,
  esArchivoRecienSubido,
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
  onUsarFormatoParaDiligenciar,
  onEliminarFormato,
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

  const [codigoForm, setCodigoForm] = useState("");
  const [tituloForm, setTituloForm] = useState("");
  const [descripcionForm, setDescripcionForm] = useState("");

  useEffect(() => {
    if (esArchivoRecienSubido) {
      setCodigoForm(`F-TUT-0${plantillas.length + 1} V.01`);
      setTituloForm(nombreArchivo.replace(/\.docx$/i, "").replace(/_/g, " "));
      setDescripcionForm(
        "Formato cargado en Word y configurado para diligenciamiento"
      );
    } else if (plantillaActiva) {
      setCodigoForm(plantillaActiva.codigo);
      setTituloForm(plantillaActiva.titulo);
      setDescripcionForm(plantillaActiva.descripcion);
    }
  }, [esArchivoRecienSubido, plantillaActiva, nombreArchivo, plantillas.length]);

  return (
    <div className="flex flex-col gap-4">
      <IndicadorPasosFlujo
        pasos={PASOS_FORMATOS_JEFE}
        pasoActual={pasoActual}
        onSeleccionarPaso={onCambiarPaso}
      />

      {/* PASO 1: Crear/Cargar nuevo formato + Catálogo de Formatos Creados */}
      {pasoActual === 1 && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className={`p-5 flex items-start gap-4 cursor-pointer transition-all ${tema.cardInteractiva(
                false
              )}`}
            >
              <div className="w-11 h-11 bg-[#0F2537] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-black">
                  Cargar Archivo Word (.DOCX) desde el Equipo
                </h3>
                <p className="text-xs opacity-80 leading-relaxed">
                  Suba un documento Word existente conservando el 100% de sus
                  márgenes, encabezados SIGCMA y tablas para convertirlo en
                  formato del despacho.
                </p>
                <span className="text-xs font-black text-[#9A7B3E] flex items-center gap-1 mt-1">
                  Subir archivo .docx <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div
              onClick={onAbrirModalCrearDoc}
              className={`p-5 flex items-start gap-4 cursor-pointer transition-all ${tema.cardInteractiva(
                false
              )}`}
            >
              <div className="w-11 h-11 bg-[#6B1D2F] text-white flex items-center justify-center shrink-0">
                <FilePlus2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-black">
                  Crear Nuevo Documento Oficial Desde Cero
                </h3>
                <p className="text-xs opacity-80 leading-relaxed">
                  Redacte un nuevo formato judicial (auto, oficio o requerimiento)
                  y publíquelo automáticamente en el catálogo de formatos.
                </p>
                <span className="text-xs font-black text-[#9A7B3E] flex items-center gap-1 mt-1">
                  Abrir creador de documentos <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Catálogo de Formatos Creados: Seleccionar, Editar o Eliminar */}
          <div className="flex flex-col gap-3 pt-2 border-t border-current/15">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-black">
                  Formatos Creados y Publicados en el Despacho ({plantillas.length})
                </h3>
                <p className="text-xs opacity-75">
                  Seleccione cualquier formato para usarlo, editar sus variables/texto o eliminarlo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {plantillas.map((p) => {
                const esActiva = p.id === plantillaActivaId;
                return (
                  <div
                    key={p.id}
                    className={`p-4 flex flex-col justify-between gap-3 ${tema.cardInteractiva(
                      esActiva
                    )}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-[#0F2537] text-[#D4AF37]">
                          {p.codigo}
                        </span>
                        {esActiva && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white flex items-center gap-1">
                            <Check className="w-3 h-3" /> Seleccionado
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-[#9A7B3E] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-black leading-snug">
                            {p.titulo}
                          </h4>
                          <p className="text-xs opacity-80 mt-1 leading-relaxed">
                            {p.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-current/15 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] opacity-75">
                        <span>{p.vinculos.length} variables</span>
                        <span className="truncate max-w-[140px]">
                          {p.nombreArchivo}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onUsarFormatoParaDiligenciar(p.id)}
                          className={`flex-1 h-8 px-2.5 text-xs font-black flex items-center justify-center gap-1 cursor-pointer ${tema.botonPrimario}`}
                        >
                          <span>Usar</span>
                          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSeleccionarPlantillaExistente(p.id);
                            onCambiarPaso(2);
                          }}
                          className={`h-8 px-2.5 text-xs font-bold flex items-center gap-1 cursor-pointer ${tema.botonSecundario(
                            false
                          )}`}
                          title="Editar variables, texto o nombre de este formato"
                        >
                          <PenLine className="w-3.5 h-3.5 text-[#9A7B3E]" />
                          <span>Editar</span>
                        </button>

                        {plantillas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onEliminarFormato(p.id)}
                            className={`h-8 px-2 text-xs font-bold flex items-center justify-center cursor-pointer hover:text-red-500 ${tema.botonSecundario(
                              false
                            )}`}
                            title="Eliminar formato"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <ArrowLeft className="w-3.5 h-3.5" /> Catálogo
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
              <span>Continuar a Guardar Formato</span>
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

      {/* PASO 3: Editar Datos del Formato y Guardar en el Catálogo */}
      {pasoActual === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className={`lg:col-span-4 p-5 flex flex-col gap-3.5 ${tema.card}`}>
            <div className="flex items-center gap-2.5 border-b border-current/15 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h3 className="text-sm font-black">
                  Paso 3: Guardar y Publicar Formato
                </h3>
                <p className="text-xs opacity-75">
                  Ajuste los datos de identificación y guarde los cambios
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase block mb-1">
                  Código SIGCMA *
                </label>
                <input
                  type="text"
                  value={codigoForm}
                  onChange={(e) => setCodigoForm(e.target.value)}
                  className={`w-full h-8 px-2.5 font-mono font-bold outline-none ${tema.input}`}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase block mb-1">
                  Nombre del Formato *
                </label>
                <input
                  type="text"
                  value={tituloForm}
                  onChange={(e) => setTituloForm(e.target.value)}
                  className={`w-full h-8 px-2.5 font-bold outline-none ${tema.input}`}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase block mb-1">
                  Descripción *
                </label>
                <input
                  type="text"
                  value={descripcionForm}
                  onChange={(e) => setDescripcionForm(e.target.value)}
                  className={`w-full h-8 px-2.5 outline-none ${tema.input}`}
                />
              </div>
            </div>

            <div className={`p-3 text-xs flex flex-col gap-1.5 ${tema.subpanel}`}>
              <div>
                <strong>Archivo Base:</strong> {nombreArchivo}
              </div>
              <div>
                <strong>Variables Configuradas:</strong> {vinculos.length} campo(s)
              </div>
              <div>
                <strong>Ediciones en la Hoja:</strong> {edicionesManualesCount}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                disabled={guardandoPlantilla}
                onClick={() =>
                  onGuardarFormatoParaGestores({
                    codigo: codigoForm,
                    titulo: tituloForm,
                    descripcion: descripcionForm,
                  })
                }
                className={`w-full h-9 px-4 text-xs font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${tema.botonAccionVino}`}
              >
                <Save className="w-4 h-4" />
                <span>
                  {guardandoPlantilla
                    ? "Guardando Formato..."
                    : "Guardar Formato y Seleccionarlo"}
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
