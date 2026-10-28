"use client";

import React, { useState, useEffect } from "react";
import { X, Link2, Repeat, Check } from "lucide-react";
import {
  CAMPOS_BASE_DATOS,
  CampoBaseDatosId,
  SeleccionTextoActiva,
} from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface PopoverVincularSeleccionProps {
  seleccion: SeleccionTextoActiva | null;
  onConvertirEnVariableGlobal: (nuevoValor?: string) => void;
  onVincularCampoBD: (campoBD: CampoBaseDatosId) => void;
  onCerrar: () => void;
}

export const PopoverVincularSeleccion: React.FC<
  PopoverVincularSeleccionProps
> = ({
  seleccion,
  onConvertirEnVariableGlobal,
  onVincularCampoBD,
  onCerrar,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const [nuevoValor, setNuevoValor] = useState("");

  useEffect(() => {
    if (seleccion) {
      setNuevoValor(seleccion.texto);
    }
  }, [seleccion]);

  if (!seleccion) return null;

  return (
    <div
      className={`fixed z-50 w-80 p-3 text-left animate-in fade-in-50 duration-150 ${tema.modalContenedor}`}
      style={{
        left: `${Math.min(
          Math.max(16, seleccion.x - 160),
          typeof window !== "undefined" ? window.innerWidth - 336 : 400
        )}px`,
        top: `${Math.max(60, seleccion.y - 8)}px`,
      }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-current/15 pb-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Repeat className="w-3.5 h-3.5 text-[#9A7B3E] shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-wider truncate">
            Convertir en Dato Dinámico
          </span>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          className="p-0.5 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 mb-2 text-[10px]">
        <span className="truncate opacity-80">
          Original:{" "}
          <strong className="font-bold text-[#9A7B3E]">
            &ldquo;{seleccion.textoOriginalBase}&rdquo;
          </strong>
        </span>
        <span className="px-1.5 py-0.5 bg-[#0F2537] text-[#D4AF37] font-mono font-bold shrink-0">
          {seleccion.ocurrenciasEnDocumento} mención(es)
        </span>
      </div>

      <div className={`p-2 mb-2.5 flex flex-col gap-1.5 ${tema.subpanel}`}>
        <label className="text-[10px] font-bold uppercase tracking-wide opacity-85">
          Cambiar en todas las menciones:
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={nuevoValor}
            onChange={(e) => setNuevoValor(e.target.value)}
            placeholder="Escriba el nuevo valor..."
            className={`flex-1 h-7 px-2 text-xs outline-none ${tema.input}`}
          />
          <button
            type="button"
            onClick={() => onConvertirEnVariableGlobal(nuevoValor)}
            className="h-7 px-2.5 text-[11px] font-black bg-[#9A7B3E] hover:bg-[#856932] text-white flex items-center gap-1 cursor-pointer shrink-0 border border-[#0F172A]"
          >
            <Check className="w-3 h-3" />
            <span>Aplicar</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider opacity-75">
        <Link2 className="w-3 h-3 text-[#9A7B3E]" />
        <span>O vincular con campo de BD:</span>
      </div>

      <div className="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
        {CAMPOS_BASE_DATOS.map((campo) => (
          <button
            key={campo.id}
            type="button"
            onClick={() => onVincularCampoBD(campo.id)}
            className="w-full px-2 py-1 text-left text-[11px] font-semibold hover:bg-[#0F2537] hover:text-white transition-colors cursor-pointer flex items-center justify-between gap-2"
          >
            <span className="truncate">{campo.etiqueta}</span>
            <span className="text-[9px] uppercase opacity-70 shrink-0">
              {campo.categoria}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
