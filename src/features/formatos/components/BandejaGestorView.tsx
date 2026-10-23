"use client";

import React, { useState } from "react";
import { Inbox, FileEdit, CheckCircle2, AlertCircle } from "lucide-react";
import { useFormatosGestor } from "../hooks/useFormatosGestor";
import { DiligenciarFormatoModal } from "./DiligenciarFormatoModal";
import { FormatoAsignado } from "../types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BandejaGestorViewProps {
  gestorId: string;
  nombreGestor: string;
}

export const BandejaGestorView: React.FC<BandejaGestorViewProps> = ({
  gestorId,
  nombreGestor,
}) => {
  const { asignaciones, isLoading, guardarAvance } = useFormatosGestor(gestorId);
  const [asignacionEditar, setAsignacionEditar] = useState<FormatoAsignado | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-black border-t-[#FACC15] animate-spin" />
        <span className="text-xs font-bold uppercase text-black">
          Cargando bandeja de expedientes asignados...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#FACC15] border-2 border-black">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">
              Bandeja Personal del Gestor
            </span>
            <h2 className="text-xl font-black uppercase text-black">
              Expedientes y Formatos Asignados: {nombreGestor}
            </h2>
          </div>
        </div>
      </div>

      {asignaciones.length === 0 ? (
        <div className="bg-white border-2 border-black border-dashed p-10 text-center flex flex-col items-center justify-center gap-2">
          <AlertCircle className="w-8 h-8 text-neutral-400" />
          <h4 className="text-sm font-black uppercase text-black">
            Bandeja al día
          </h4>
          <p className="text-xs font-medium text-neutral-600 max-w-md">
            No tienes expedientes asignados por el Dr. Juan Pablo Velásquez en este momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {asignaciones.map((a) => (
            <div
              key={a.id}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-black text-black">
                    Radicado: {a.radicado}
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

                <h3 className="text-sm font-black text-black mt-2">
                  {a.formato.titulo}
                </h3>

                <div className="bg-neutral-50 border border-black p-2.5 mt-3 text-xs flex flex-col gap-1">
                  {a.accionante && (
                    <span>
                      <strong>Accionante:</strong> {a.accionante}
                    </span>
                  )}
                  {a.accionado && (
                    <span>
                      <strong>Accionado:</strong> {a.accionado}
                    </span>
                  )}
                  {a.instruccionesJefe && (
                    <p className="text-[11px] italic text-neutral-800 mt-1 border-t border-neutral-200 pt-1">
                      <strong>Instrucción del Jefe:</strong> {a.instruccionesJefe}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-600">
                  Formato: {a.formato.codigo}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setAsignacionEditar(a)}
                  className="flex items-center gap-1.5"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  Manipular / Diligenciar Caso
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DiligenciarFormatoModal
        asignacion={asignacionEditar}
        onClose={() => setAsignacionEditar(null)}
        onGuardar={guardarAvance}
      />
    </div>
  );
};
