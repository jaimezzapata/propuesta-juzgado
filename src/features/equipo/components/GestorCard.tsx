import React from "react";
import { UserCheck, KeyRound, Trash2, Power, Mail, FileText } from "lucide-react";
import { Usuario, LISTA_PERMISOS } from "../types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface GestorCardProps {
  gestor: Usuario;
  onEditarPermisos: (gestor: Usuario) => void;
  onAlternarEstado: (id: string, activo: boolean) => void;
  onEliminar: (id: string, nombre: string) => void;
}

export const GestorCard: React.FC<GestorCardProps> = ({
  gestor,
  onEditarPermisos,
  onAlternarEstado,
  onEliminar,
}) => {
  return (
    <div
      className={`border-2 border-[#0F172A] p-4 flex flex-col justify-between transition-all ${
        gestor.activo
          ? "bg-white shadow-[4px_4px_0px_#0F172A]"
          : "bg-neutral-100 opacity-80 border-dashed shadow-[2px_2px_0px_#666]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0F2537] text-[#9A7B3E] border border-[#0F172A]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0F172A] leading-tight">
                {gestor.nombre}
              </h3>
              <p className="text-xs font-bold text-neutral-800">{gestor.cargo}</p>
            </div>
          </div>
          <Badge variant={gestor.activo ? "success" : "neutral"} size="sm">
            {gestor.activo ? "Activo" : "Inactivo"}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-neutral-700 mt-3 flex-wrap">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-black" />
            {gestor.email}
          </span>
          {gestor.documento && (
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-black" />
              {gestor.documento}
            </span>
          )}
        </div>

        <div className="mt-4 pt-3 border-t-2 border-black/20">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 block mb-1.5">
            Permisos autorizados ({gestor.permisos.length}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {gestor.permisos.length > 0 ? (
              gestor.permisos.map((pId) => {
                const info = LISTA_PERMISOS.find((lp) => lp.id === pId);
                return (
                  <Badge key={pId} variant="yellow" size="sm">
                    {info?.nombre || pId}
                  </Badge>
                );
              })
            ) : (
              <span className="text-xs italic text-neutral-500">
                Sin permisos asignados
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t-2 border-black">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEditarPermisos(gestor)}
          className="flex items-center gap-1.5"
        >
          <KeyRound className="w-3.5 h-3.5" />
          Permisos
        </Button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onAlternarEstado(gestor.id, gestor.activo)}
            title={gestor.activo ? "Desactivar gestor" : "Activar gestor"}
            className="p-1.5 border-2 border-black bg-white hover:bg-neutral-200 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Power
              className={`w-4 h-4 ${
                gestor.activo ? "text-emerald-700" : "text-neutral-400"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => onEliminar(gestor.id, gestor.nombre)}
            title="Eliminar perfil"
            className="p-1.5 border-2 border-black bg-white hover:bg-red-50 text-red-600 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
