import React from "react";
import { Clock, CheckCircle2, User, FileText } from "lucide-react";
import { FormatoAsignado } from "../types";
import { Badge } from "@/components/ui/Badge";

interface AsignacionesDespachoListProps {
  asignaciones: FormatoAsignado[];
}

export const AsignacionesDespachoList: React.FC<AsignacionesDespachoListProps> = ({
  asignaciones,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
        <h2 className="text-base font-black uppercase tracking-tight text-black">
          Control de Formatos Asignados a Gestores
        </h2>
        <p className="text-xs font-semibold text-neutral-600 mt-0.5">
          Monitoreo en tiempo real del trabajo sustanciador del equipo.
        </p>
      </div>

      {asignaciones.length === 0 ? (
        <div className="bg-white border-2 border-black border-dashed p-8 text-center text-neutral-600 text-xs font-bold">
          No hay expedientes ni formatos asignados actualmente.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {asignaciones.map((a) => (
            <div
              key={a.id}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-black text-black">
                    Rad: {a.radicado}
                  </span>
                  <Badge
                    variant={
                      a.estado === "COMPLETADO"
                        ? "success"
                        : a.estado === "EN_PROCESO"
                        ? "yellow"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {a.estado.replace(/_/g, " ")}
                  </Badge>
                </div>

                <h4 className="text-sm font-bold text-black mt-2">
                  {a.formato.titulo}
                </h4>

                <div className="bg-neutral-50 border border-black p-2.5 mt-2.5 text-xs flex flex-col gap-1">
                  <span className="font-bold text-black flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-black" />
                    Gestor: {a.gestor.nombre} ({a.gestor.cargo})
                  </span>
                  {a.accionante && (
                    <span className="text-neutral-700">
                      <strong>Accionante:</strong> {a.accionante}
                    </span>
                  )}
                  {a.accionado && (
                    <span className="text-neutral-700">
                      <strong>Accionado:</strong> {a.accionado}
                    </span>
                  )}
                  {a.instruccionesJefe && (
                    <p className="text-[11px] italic text-neutral-800 mt-1 border-t border-neutral-300 pt-1">
                      <strong>Instrucción Jefe:</strong> {a.instruccionesJefe}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-300 flex items-center justify-between text-[11px] font-semibold text-neutral-600">
                <span>Código: {a.formato.codigo}</span>
                <span>Asignado el {new Date(a.fechaAsignacion).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
