import React from "react";
import { UserPlus, Search, UserX } from "lucide-react";
import { Usuario } from "../types";
import { GestorCard } from "./GestorCard";
import { Button } from "@/components/ui/Button";

interface GestoresListProps {
  gestores: Usuario[];
  busqueda: string;
  setBusqueda: (val: string) => void;
  filtroActivo: "todos" | "activos" | "inactivos";
  setFiltroActivo: (filtro: "todos" | "activos" | "inactivos") => void;
  onAbrirCrear: () => void;
  onEditarPermisos: (gestor: Usuario) => void;
  onAlternarEstado: (id: string, activo: boolean) => void;
  onEliminar: (id: string, nombre: string) => void;
}

export const GestoresList: React.FC<GestoresListProps> = ({
  gestores,
  busqueda,
  setBusqueda,
  filtroActivo,
  setFiltroActivo,
  onAbrirCrear,
  onEditarPermisos,
  onAlternarEstado,
  onEliminar,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, cargo o correo institucional..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-bold border border-black focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex border border-black bg-neutral-100 p-0.5 text-xs font-bold">
            {(["todos", "activos", "inactivos"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFiltroActivo(f)}
                className={`px-2.5 py-1 uppercase text-[10px] transition-all ${
                  filtroActivo === f ? "bg-black text-[#FACC15]" : "text-black hover:bg-neutral-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onAbrirCrear}
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Gestor
          </Button>
        </div>
      </div>

      {gestores.length === 0 ? (
        <div className="bg-white border-2 border-black border-dashed p-10 text-center flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-neutral-100 border border-black text-neutral-500">
            <UserX className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase text-black">
              No se encontraron gestores judiciales
            </h4>
            <p className="text-xs font-medium text-neutral-600 mt-1 max-w-sm">
              {busqueda
                ? "No hay resultados para el criterio de búsqueda especificado."
                : "El Dr. Juan Pablo Velásquez aún no ha registrado gestores para su despacho judicial."}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={onAbrirCrear} className="mt-2">
            Crear Primer Gestor
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gestores.map((gestor) => (
            <GestorCard
              key={gestor.id}
              gestor={gestor}
              onEditarPermisos={onEditarPermisos}
              onAlternarEstado={onAlternarEstado}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
};
