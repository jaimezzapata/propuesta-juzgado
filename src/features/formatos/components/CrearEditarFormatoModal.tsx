"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormatoMaestro, FormFormatoMaestroValues, TipoFormato } from "../types";
import { useEditorFormato } from "../hooks/useEditorFormato";
import { CargarArchivoFormato } from "./CargarArchivoFormato";
import { EditorPlantilla } from "./EditorPlantilla";
import { VistaPreviaJudicial } from "./VistaPreviaJudicial";

interface CrearEditarFormatoModalProps {
  isOpen: boolean;
  onClose: () => void;
  formato: FormatoMaestro | null;
  onGuardar: (data: FormFormatoMaestroValues) => Promise<boolean>;
}

export const CrearEditarFormatoModal: React.FC<CrearEditarFormatoModalProps> = ({
  isOpen,
  onClose,
  formato,
  onGuardar,
}) => {
  const {
    codigo,
    setCodigo,
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    tipo,
    setTipo,
    plantilla,
    setPlantilla,
    archivoCargado,
    isExtracting,
    errorArchivo,
    isSubmitting,
    tabVisualizacion,
    setTabVisualizacion,
    procesarArchivo,
    insertarVariable,
    limpiarFormato,
    submit,
  } = useEditorFormato({ formatoInicial: formato, onGuardar });

  const handleFormSubmit = async (e: React.FormEvent) => {
    const ok = await submit(e);
    if (ok) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={formato ? `Editar Formato: ${formato.codigo}` : "Generar Formato Oficial"}
      subtitle="Creación desde cero o carga de archivo con vista previa judicial en vivo"
      maxWidth="full"
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        {/* Selector de modo de vista: Dividido / Editor / Vista Previa */}
        <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-2 flex-wrap gap-2">
          <span className="text-xs font-black uppercase text-[#0F2537]">
            Configuración y Contenido del Formato
          </span>
          <div className="flex border border-[#0F172A] bg-white p-0.5 text-[10px] font-bold">
            {(["split", "editor", "preview"] as const).map((modo) => (
              <button
                key={modo}
                type="button"
                onClick={() => setTabVisualizacion(modo)}
                className={`px-3 py-1 uppercase transition-all ${
                  tabVisualizacion === modo
                    ? "bg-[#0F2537] text-[#9A7B3E]"
                    : "text-[#0F172A] hover:bg-neutral-100"
                }`}
              >
                {modo === "split" ? "Lado a Lado" : modo === "editor" ? "Solo Editor" : "Solo Vista Previa"}
              </button>
            ))}
          </div>
        </div>

        {/* Metadatos del formato */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Código Institucional *"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="AUT-ADM-01"
            disabled={!!formato}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Título del Formato *"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Auto Admisorio con Medida Cautelar..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Tipo Procesal *
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoFormato)}
              className="w-full px-3 py-2 bg-white text-[#0F172A] font-bold border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] focus:outline-none focus:ring-2 focus:ring-[#9A7B3E]"
            >
              <option value="AUTO_ADMISORIO">Auto Admisorio Ordinario</option>
              <option value="MEDIDA_PROVISIONAL">Auto Admisorio con Medida Provisional</option>
              <option value="AUTO_TRASLADO">Auto de Traslado y Requerimiento</option>
              <option value="PROYECTO_SENTENCIA">Proyecto de Sentencia</option>
              <option value="OTRO">Otro Formato Judicial</option>
            </select>
          </div>

          <Input
            label="Criterio de Uso / Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Para tutelas de salud urgente con riesgo vital..."
          />
        </div>

        {/* Carga de Archivo (Lee tal cual) */}
        <CargarArchivoFormato
          onArchivoSeleccionado={procesarArchivo}
          archivoCargado={archivoCargado}
          isExtracting={isExtracting}
          error={errorArchivo}
          onLimpiar={limpiarFormato}
        />

        {/* Panel principal: Editor y Vista Previa */}
        <div
          className={`grid gap-4 ${
            tabVisualizacion === "split"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {(tabVisualizacion === "split" || tabVisualizacion === "editor") && (
            <EditorPlantilla
              plantilla={plantilla}
              setPlantilla={setPlantilla}
              onInsertarVariable={insertarVariable}
              onLimpiar={limpiarFormato}
            />
          )}

          {(tabVisualizacion === "split" || tabVisualizacion === "preview") && (
            <VistaPreviaJudicial
              titulo={titulo}
              codigo={codigo}
              contenido={plantilla}
            />
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-[#0F172A]">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {formato ? "Guardar Modificaciones" : "Guardar y Habilitar Formato"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
