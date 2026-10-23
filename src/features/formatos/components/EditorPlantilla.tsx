import React from "react";
import { Variable, Trash2 } from "lucide-react";

interface EditorPlantillaProps {
  plantilla: string;
  setPlantilla: (val: string) => void;
  onInsertarVariable: (varName: string) => void;
  onLimpiar?: () => void;
}

const VARIABLES_COMUNES = [
  { clave: "RADICADO", label: "Radicado" },
  { clave: "ACCIONANTE", label: "Accionante" },
  { clave: "ACCIONADO", label: "Accionado" },
  { clave: "DERECHOS", label: "Derechos" },
  { clave: "MEDIDA_URGENTE", label: "Medida Urgente" },
  { clave: "HECHOS", label: "Hechos" },
];

export const EditorPlantilla: React.FC<EditorPlantillaProps> = ({
  plantilla,
  setPlantilla,
  onInsertarVariable,
  onLimpiar,
}) => {
  return (
    <div className="flex flex-col gap-2 text-left">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
          Redacción / Texto del Formato *
        </label>
        {plantilla && onLimpiar && (
          <button
            type="button"
            onClick={onLimpiar}
            className="text-[11px] font-bold text-[#6B1D2F] flex items-center gap-1 hover:opacity-80"
          >
            <Trash2 className="w-3 h-3" />
            Limpiar editor
          </button>
        )}
      </div>

      {/* Barra de inserción de variables */}
      <div className="flex items-center gap-1.5 flex-wrap bg-neutral-100 p-2 border border-[#0F172A]">
        <span className="text-[10px] font-black uppercase text-[#0F2537] flex items-center gap-1">
          <Variable className="w-3 h-3 text-[#9A7B3E]" />
          Variables:
        </span>
        {VARIABLES_COMUNES.map((v) => (
          <button
            key={v.clave}
            type="button"
            onClick={() => onInsertarVariable(v.clave)}
            className="px-2 py-0.5 bg-white border border-[#0F172A] text-[10px] font-bold text-[#0F172A] hover:bg-[#9A7B3E] hover:text-white shadow-[1px_1px_0px_#0F172A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            + {v.label}
          </button>
        ))}
      </div>

      <textarea
        rows={16}
        value={plantilla}
        onChange={(e) => setPlantilla(e.target.value)}
        placeholder="Redacte desde cero la estructura oficial del despacho o cárguela desde un archivo..."
        className="w-full p-4 bg-white text-[#0F172A] font-mono text-xs sm:text-sm leading-relaxed border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] focus:outline-none focus:ring-2 focus:ring-[#9A7B3E] min-h-[460px] resize-y"
        required
      />
    </div>
  );
};
