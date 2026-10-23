"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Save, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FormatoAsignado, EstadoAsignacion } from "../types";
import { VistaPreviaJudicial } from "./VistaPreviaJudicial";

interface DiligenciarFormatoModalProps {
  asignacion: FormatoAsignado | null;
  onClose: () => void;
  onGuardar: (id: string, contenido: string, estado: EstadoAsignacion) => Promise<boolean>;
}

export const DiligenciarFormatoModal: React.FC<DiligenciarFormatoModalProps> = ({
  asignacion,
  onClose,
  onGuardar,
}) => {
  const [contenido, setContenido] = useState("");
  const [modo, setModo] = useState<"split" | "editor" | "preview">("split");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asignacion) {
      setContenido(asignacion.contenidoDiligenciado || asignacion.formato.plantilla);
    }
  }, [asignacion]);

  if (!asignacion) return null;

  const handleGuardar = async (nuevoEstado: EstadoAsignacion) => {
    setIsSubmitting(true);
    await onGuardar(asignacion.id, contenido, nuevoEstado);
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={!!asignacion}
      onClose={onClose}
      title={`Manipular: ${asignacion.formato.titulo}`}
      subtitle={`Radicado: ${asignacion.radicado} | Formato Base: ${asignacion.formato.codigo}`}
      maxWidth="full"
    >
      <div className="flex flex-col gap-4">
        {/* Banner de protección de formato maestro */}
        <div className="p-3.5 bg-[#0F2537] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] flex items-start gap-2.5 text-xs">
          <ShieldAlert className="w-5 h-5 text-[#9A7B3E] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-black uppercase tracking-wider text-[#9A7B3E] block">
              Modo de Manipulación de Caso Concreto
            </span>
            <p className="font-medium text-neutral-200 mt-0.5">
              Estás adaptando los hechos y datos de este caso específico.
              <strong className="text-white"> La plantilla oficial del despacho no sufrirá ninguna modificación.</strong>
            </p>
          </div>
        </div>

        {asignacion.instruccionesJefe && (
          <div className="bg-neutral-100 border border-[#0F172A] p-2.5 text-xs">
            <span className="font-bold text-[#0F2537] uppercase block text-[10px]">
              Instrucciones del Dr. Juan Pablo Velásquez (Jefe):
            </span>
            <p className="italic text-neutral-800 mt-0.5">
              {asignacion.instruccionesJefe}
            </p>
          </div>
        )}

        {/* Selector de visualización */}
        <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-2">
          <span className="text-xs font-black uppercase text-[#0F2537]">
            Redacción y Vista Previa del Caso
          </span>
          <div className="flex border border-[#0F172A] bg-white p-0.5 text-[10px] font-bold">
            {(["split", "editor", "preview"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                className={`px-3 py-1 uppercase transition-all ${
                  modo === m
                    ? "bg-[#0F2537] text-[#9A7B3E]"
                    : "text-[#0F172A] hover:bg-neutral-100"
                }`}
              >
                {m === "split" ? "Lado a Lado" : m === "editor" ? "Solo Editor" : "Solo Vista Previa"}
              </button>
            ))}
          </div>
        </div>

        {/* Editor y Vista Previa */}
        <div className={`grid gap-4 ${modo === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {(modo === "split" || modo === "editor") && (
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Texto del Expediente Particular
              </label>
              <textarea
                rows={14}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full p-3 bg-white text-[#0F172A] font-mono text-xs border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] focus:outline-none focus:ring-2 focus:ring-[#9A7B3E]"
              />
            </div>
          )}

          {(modo === "split" || modo === "preview") && (
            <VistaPreviaJudicial
              titulo={asignacion.formato.titulo}
              codigo={asignacion.radicado}
              contenido={contenido}
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-[#0F172A] flex-wrap">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cerrar sin Guardar
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleGuardar("EN_PROCESO")}
              isLoading={isSubmitting}
              className="flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Guardar Borrador
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleGuardar("COMPLETADO")}
              isLoading={isSubmitting}
              className="flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Marcar como Completado
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
