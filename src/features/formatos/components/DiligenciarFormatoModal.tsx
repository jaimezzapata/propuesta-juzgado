"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Save, CheckCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FormatoAsignado, EstadoAsignacion } from "../types";

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
  const [estado, setEstado] = useState<EstadoAsignacion>("EN_PROCESO");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asignacion) {
      setContenido(asignacion.contenidoDiligenciado || asignacion.formato.plantilla);
      setEstado(asignacion.estado);
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
      title={`Diligenciar: ${asignacion.formato.titulo}`}
      subtitle={`Radicado: ${asignacion.radicado} | Formato Base: ${asignacion.formato.codigo}`}
      maxWidth="xl"
    >
      <div className="flex flex-col gap-4">
        {/* Banner de protección de plantilla */}
        <div className="p-3 bg-amber-100 border-2 border-black flex items-start gap-2.5 text-xs text-black">
          <ShieldAlert className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-black uppercase block">
              Modo de Manipulación de Caso Concreto
            </span>
            <p className="font-medium text-neutral-800">
              Puedes redactar y completar los hechos y datos de este caso específico.
              <strong> La plantilla oficial del despacho permanece protegida e inmutable.</strong>
            </p>
          </div>
        </div>

        {asignacion.instruccionesJefe && (
          <div className="bg-neutral-100 border border-black p-2.5 text-xs">
            <span className="font-bold text-black uppercase block text-[10px]">
              Instrucciones del Dr. Juan Pablo Velásquez (Jefe):
            </span>
            <p className="italic text-neutral-800 mt-0.5">
              {asignacion.instruccionesJefe}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Contenido y Redacción del Expediente
          </label>
          <textarea
            rows={14}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-3 bg-white text-black font-mono text-xs border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-black flex-wrap">
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
