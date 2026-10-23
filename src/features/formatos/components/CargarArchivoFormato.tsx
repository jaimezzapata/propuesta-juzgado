"use client";

import React, { useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface CargarArchivoFormatoProps {
  onArchivoSeleccionado: (file: File) => void;
  archivoCargado: string | null;
  isExtracting: boolean;
  error: string | null;
  onLimpiar?: () => void;
}

export const CargarArchivoFormato: React.FC<CargarArchivoFormatoProps> = ({
  onArchivoSeleccionado,
  archivoCargado,
  isExtracting,
  error,
  onLimpiar,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onArchivoSeleccionado(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onArchivoSeleccionado(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-[#9A7B3E]" />
          Cargar Formato Existente (.docx, .txt, .doc)
        </label>
        {archivoCargado && onLimpiar && (
          <button
            type="button"
            onClick={onLimpiar}
            className="text-[11px] font-bold text-[#6B1D2F] underline hover:opacity-80"
          >
            Quitar archivo
          </button>
        )}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`p-4 border-2 border-dashed border-[#0F172A] bg-white cursor-pointer select-none transition-all flex flex-col items-center justify-center gap-2 hover:bg-neutral-50 shadow-[2px_2px_0px_#0F172A] ${
          isExtracting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".docx,.txt,.doc,.rtf,.md"
          className="hidden"
          onChange={handleFileChange}
        />

        {isExtracting ? (
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F2537]">
            <div className="w-4 h-4 border-2 border-[#0F172A] border-t-[#9A7B3E] animate-spin" />
            Extrayendo contenido textual tal cual...
          </div>
        ) : archivoCargado ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Archivo cargado con éxito: <strong>{archivoCargado}</strong></span>
            <Badge variant="navy" size="sm">Leído tal cual</Badge>
          </div>
        ) : (
          <div className="text-center">
            <FileText className="w-6 h-6 text-[#9A7B3E] mx-auto mb-1" />
            <p className="text-xs font-bold text-[#0F172A]">
              Arrastra un archivo aquí o <span className="underline text-[#9A7B3E]">haz clic para explorar</span>
            </p>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              Se leerá el texto íntegro y se volcará al editor y a la vista previa oficial.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-2 bg-red-50 border border-[#6B1D2F] text-[#6B1D2F] text-xs font-bold flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
