"use client";

import React, { useState } from "react";
import { FilePlus2, X, Check } from "lucide-react";
import { CrearDocumentoDesdeCeroInput } from "../types";
import { SesionUsuario } from "@/features/auth/types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface ModalCrearDocumentoJudicialProps {
  abierto: boolean;
  guardando: boolean;
  usuario: SesionUsuario;
  onCerrar: () => void;
  onCrearDocumento: (input: CrearDocumentoDesdeCeroInput) => Promise<void>;
}

export const ModalCrearDocumentoJudicial: React.FC<
  ModalCrearDocumentoJudicialProps
> = ({ abierto, guardando, usuario, onCerrar, onCrearDocumento }) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  const [codigo, setCodigo] = useState("F-TUT-03 V.01");
  const [tituloFormato, setTituloFormato] = useState(
    "Requerimiento Previo de Incidente de Desacato"
  );
  const [descripcionFormato, setDescripcionFormato] = useState(
    "Auto de requerimiento previo por incumplimiento a fallo de tutela"
  );
  const [tituloActoProcesal, setTituloActoProcesal] = useState(
    "AUTO DE REQUERIMIENTO PREVIO POR DESACATO CONSTITUCIONAL"
  );
  const [cuerpoTexto, setCuerpoTexto] = useState(
    "En la ciudad de Medellín, Antioquia, en fecha 28 de octubre de 2026, procede el Despacho a atender el escrito presentado por MARÍA EUGENIA LÓPEZ RESTREPO, identificada con cédula de ciudadanía N° 43.512.890, mediante el cual informa el presunto incumplimiento de EPS SURA S.A. - REGIONAL ANTIOQUIA frente a la protección del derecho fundamental a la Salud Integral y Vida en Condiciones Dignas.\n\nSeñala la accionante que persiste la omisión respecto de Autorización y entrega inmediata de medicamento biológico de alto costo y valoración prioritaria por especialista en reumatología, recibiendo notificaciones en la dirección física Calle 50 # 45-12, Barrio La Candelaria, teléfono 300 412 8900 y correo maria.lopez@correo.co."
  );
  const [resuelveTexto, setResuelveTexto] = useState(
    "PRIMERO: REQUERIR a EPS SURA S.A. - REGIONAL ANTIOQUIA para que en el término de cuarenta y ocho (48) horas acredite el cumplimiento integral del fallo de tutela proferido a favor de MARÍA EUGENIA LÓPEZ RESTREPO.\n\nSEGUNDO: COMUNICAR la presente determinación al correo electrónico maria.lopez@correo.co."
  );

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCrearDocumento({
      codigo,
      tituloFormato,
      descripcionFormato,
      tituloActoProcesal,
      parrafosCuerpo: cuerpoTexto.split(/\n+/).filter((p) => p.trim()),
      parrafosResuelve: resuelveTexto.split(/\n+/).filter((p) => p.trim()),
      firmanteNombre: usuario.nombre,
      firmanteCargo: usuario.cargo,
    });
  };

  const getModalBox = () => {
    if (esOscuro) {
      return estilo === "neo-brutalista"
        ? "bg-[#1E293B] border-2 border-slate-600 text-slate-100 shadow-[6px_6px_0px_#020617]"
        : "bg-[#181C23] border border-[#C5A880] text-slate-100 rounded-2xl shadow-2xl";
    }
    return estilo === "neo-brutalista"
      ? "bg-white border-2 border-[#0F172A] text-[#0F172A] shadow-[6px_6px_0px_#0F172A]"
      : "bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-2xl";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-2xl p-5 flex flex-col gap-3 max-h-[90vh] overflow-y-auto ${getModalBox()}`}
      >
        <div className="flex items-center justify-between border-b border-current/15 pb-2.5">
          <div className="flex items-center gap-2">
            <FilePlus2 className="w-4 h-4 text-[#9A7B3E]" />
            <h3 className="text-sm font-black uppercase tracking-wider">
              Crear Nuevo Documento / Formato Oficial (.DOCX)
            </h3>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="p-1 opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Código SIGCMA *
            </label>
            <input
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full h-8 px-2.5 font-mono border border-current/30 bg-transparent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold uppercase block mb-1">
              Nombre del Formato para el Catálogo *
            </label>
            <input
              required
              value={tituloFormato}
              onChange={(e) => setTituloFormato(e.target.value)}
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Descripción Breve *
            </label>
            <input
              required
              value={descripcionFormato}
              onChange={(e) => setDescripcionFormato(e.target.value)}
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Título Central en la Hoja *
            </label>
            <input
              required
              value={tituloActoProcesal}
              onChange={(e) => setTituloActoProcesal(e.target.value)}
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="text-[10px] font-bold uppercase block mb-1">
            Cuerpo / Consideraciones del Documento (1 párrafo por línea) *
          </label>
          <textarea
            required
            rows={4}
            value={cuerpoTexto}
            onChange={(e) => setCuerpoTexto(e.target.value)}
            className="w-full p-2.5 text-xs leading-relaxed border border-current/30 bg-transparent"
          />
        </div>

        <div className="text-xs">
          <label className="text-[10px] font-bold uppercase block mb-1">
            Parte Resolutiva / Disposiciones (RESUELVE)
          </label>
          <textarea
            rows={3}
            value={resuelveTexto}
            onChange={(e) => setResuelveTexto(e.target.value)}
            className="w-full p-2.5 text-xs leading-relaxed border border-current/30 bg-transparent"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-current/15">
          <button
            type="button"
            onClick={onCerrar}
            className="h-8 px-3 text-xs font-bold border border-current/25 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="h-8 px-4 text-xs font-black bg-[#0F2537] text-white flex items-center gap-1.5 cursor-pointer border-2 border-[#0F172A] disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {guardando
                ? "Generando .DOCX..."
                : "Crear Formato Word y Guardar para Gestores"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

