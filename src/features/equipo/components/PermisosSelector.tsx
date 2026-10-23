import React from "react";
import { Check } from "lucide-react";
import { Permiso, LISTA_PERMISOS } from "../types";

interface PermisosSelectorProps {
  seleccionados: Permiso[];
  onToggle: (permiso: Permiso) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export const PermisosSelector: React.FC<PermisosSelectorProps> = ({
  seleccionados,
  onToggle,
  onSelectAll,
  onDeselectAll,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-black">
          Permisos y Atribuciones Procesales:
        </label>
        {onSelectAll && onDeselectAll && (
          <div className="flex items-center gap-2 text-[11px] font-bold">
            <button
              type="button"
              onClick={onSelectAll}
              className="text-black underline hover:text-neutral-700"
            >
              Marcar todos
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onDeselectAll}
              className="text-neutral-600 underline hover:text-black"
            >
              Desmarcar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
        {LISTA_PERMISOS.map((p) => {
          const marcado = seleccionados.includes(p.id);
          return (
            <div
              key={p.id}
              onClick={() => onToggle(p.id)}
              className={`p-2.5 border-2 border-[#0F172A] cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                marcado
                  ? "bg-[#0F2537] text-white shadow-[2px_2px_0px_#0F172A] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white hover:bg-neutral-50 text-[#0F172A] shadow-[1px_1px_0px_#0F172A]"
              }`}
            >
              <div
                className={`w-4 h-4 mt-0.5 border-2 border-[#0F172A] flex items-center justify-center flex-shrink-0 ${
                  marcado ? "bg-[#9A7B3E] text-white" : "bg-white"
                }`}
              >
                {marcado && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div className="flex-1">
                <span className={`text-xs font-black uppercase tracking-tight block ${marcado ? "text-[#9A7B3E]" : "text-[#0F172A]"}`}>
                  {p.nombre}
                </span>
                <p className={`text-[11px] font-medium leading-tight mt-0.5 ${marcado ? "text-neutral-200" : "text-neutral-700"}`}>
                  {p.descripcion}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
