"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormatoMaestro, FormFormatoMaestroValues, TipoFormato } from "../types";

interface CrearEditarFormatoModalProps {
  isOpen: boolean;
  onClose: () => void;
  formato: FormatoMaestro | null;
  onGuardar: (data: FormFormatoMaestroValues) => Promise<boolean>;
}

export const CrearEditarFormatoModal: React.FC<CrearEditarFormatoModalProps> = ({
  isOpen,
  onClose,
  formato,
  onGuardar,
}) => {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<TipoFormato>("AUTO_ADMISORIO");
  const [plantilla, setPlantilla] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formato) {
      setCodigo(formato.codigo);
      setTitulo(formato.titulo);
      setDescripcion(formato.descripcion);
      setTipo(formato.tipo);
      setPlantilla(formato.plantilla);
    } else {
      setCodigo("");
      setTitulo("");
      setDescripcion("");
      setTipo("AUTO_ADMISORIO");
      setPlantilla("");
    }
  }, [formato, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !plantilla) return;

    setIsSubmitting(true);
    await onGuardar({ codigo, titulo, descripcion, tipo, plantilla });
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={formato ? `Editar Formato: ${formato.codigo}` : "Nuevo Formato Maestro"}
      subtitle="Exclusivo del Jefe de Despacho // Plantilla base inmutable para gestores"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Código *"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="AUT-ADM-01"
            disabled={!!formato}
            required
          />
          <div className="sm:col-span-2">
            <Input
              label="Título del Formato *"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Auto Admisorio con Medida Cautelar..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              Tipo Procesal *
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoFormato)}
              className="w-full px-3 py-2 bg-white text-black font-medium border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            >
              <option value="AUTO_ADMISORIO">Auto Admisorio</option>
              <option value="MEDIDA_PROVISIONAL">Medida Cautelar Provisional</option>
              <option value="AUTO_TRASLADO">Auto de Traslado</option>
              <option value="PROYECTO_SENTENCIA">Proyecto de Sentencia</option>
              <option value="OTRO">Otro Trámite</option>
            </select>
          </div>

          <Input
            label="Descripción / Criterio de Uso"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Indicado para tutelas de salud urgente..."
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              Cuerpo de la Plantilla Judicial *
            </label>
            <span className="text-[10px] font-bold text-neutral-600">
              Variables: {"{{RADICADO}}"}, {"{{ACCIONANTE}}"}, {"{{ACCIONADO}}"}
            </span>
          </div>
          <textarea
            rows={10}
            value={plantilla}
            onChange={(e) => setPlantilla(e.target.value)}
            placeholder="Redacte la estructura judicial oficial..."
            className="w-full p-3 bg-white text-black font-mono text-xs border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {formato ? "Guardar Modificaciones" : "Crear Formato Oficial"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
