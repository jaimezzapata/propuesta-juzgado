"use client";

import { useState, useEffect } from "react";
import { FormatoMaestro, FormFormatoMaestroValues, TipoFormato } from "../types";
import { extraerTextoDeArchivo } from "../utils/fileExtractor";

interface UseEditorFormatoProps {
  formatoInicial: FormatoMaestro | null;
  onGuardar: (data: FormFormatoMaestroValues) => Promise<boolean>;
}

export function useEditorFormato({ formatoInicial, onGuardar }: UseEditorFormatoProps) {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<TipoFormato>("AUTO_ADMISORIO");
  const [plantilla, setPlantilla] = useState("");
  const [archivoCargado, setArchivoCargado] = useState<string | null>(null);
  const [archivoBuffer, setArchivoBuffer] = useState<ArrayBuffer | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabVisualizacion, setTabVisualizacion] = useState<"editor" | "preview" | "split">("split");

  useEffect(() => {
    if (formatoInicial) {
      setCodigo(formatoInicial.codigo);
      setTitulo(formatoInicial.titulo);
      setDescripcion(formatoInicial.descripcion);
      setTipo(formatoInicial.tipo);
      setPlantilla(formatoInicial.plantilla);
      setArchivoCargado(null);
      setArchivoBuffer(null);
    } else {
      setCodigo(`FOR-${Date.now().toString().slice(-4)}`);
      setTitulo("");
      setDescripcion("");
      setTipo("AUTO_ADMISORIO");
      setPlantilla("");
      setArchivoCargado(null);
      setArchivoBuffer(null);
    }
    setErrorArchivo(null);
  }, [formatoInicial]);

  const procesarArchivo = async (file: File) => {
    setIsExtracting(true);
    setErrorArchivo(null);
    try {
      const res = await extraerTextoDeArchivo(file);
      if (res.success && res.text) {
        setPlantilla(res.text);
        setArchivoCargado(res.nombreArchivo);
        if (res.arrayBuffer) {
          setArchivoBuffer(res.arrayBuffer);
        }
        if (!titulo) {
          const nombreLimpio = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
          setTitulo(nombreLimpio);
        }
      } else {
        setErrorArchivo(res.error || "No se pudo leer el contenido del archivo.");
      }
    } catch (err: any) {
      setErrorArchivo(err?.message || "Error al procesar el archivo.");
    } finally {
      setIsExtracting(false);
    }
  };

  const insertarVariable = (variable: string) => {
    setPlantilla((prev) => `${prev} {{${variable}}}`);
  };

  const limpiarFormato = () => {
    setPlantilla("");
    setArchivoCargado(null);
    setArchivoBuffer(null);
    setErrorArchivo(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !plantilla) return false;

    setIsSubmitting(true);
    const ok = await onGuardar({ codigo, titulo, descripcion, tipo, plantilla });
    setIsSubmitting(false);
    return ok;
  };

  return {
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
    archivoBuffer,
    isExtracting,
    errorArchivo,
    isSubmitting,
    tabVisualizacion,
    setTabVisualizacion,
    procesarArchivo,
    insertarVariable,
    limpiarFormato,
    submit,
  };
}
