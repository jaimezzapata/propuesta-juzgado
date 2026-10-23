"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormatoMaestro, FormAsignarValues } from "../types";
import { Usuario } from "@/features/equipo/types";

interface AsignarFormatoModalProps {
  formato: FormatoMaestro | null;
  gestores: Usuario[];
  onClose: () => void;
  onAsignar: (data: FormAsignarValues) => Promise<boolean>;
}

export const AsignarFormatoModal: React.FC<AsignarFormatoModalProps> = ({
  formato,
  gestores,
  onClose,
  onAsignar,
}) => {
  const [gestorId, setGestorId] = useState(gestores[0]?.id || "");
  const [radicado, setRadicado] = useState("0500131100042026001");
  const [accionante, setAccionante] = useState("");
  const [accionado, setAccionado] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!formato) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gestorId || !radicado) return;

    setIsSubmitting(true);
    await onAsignar({
      formatoId: formato.id,
      gestorId,
      radicado,
      accionante,
      accionado,
      instrucciones,
    });
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={!!formato}
      onClose={onClose}
      title={`Asignar Formato: ${formato.codigo}`}
      subtitle={`${formato.titulo} // El gestor podrá manipularlo sin alterar la plantilla oficial`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Seleccionar Gestor Asignado *
          </label>
          <select
            value={gestorId}
            onChange={(e) => setGestorId(e.target.value)}
            className="w-full px-3 py-2 bg-white text-black font-bold border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            required
          >
            {gestores.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre} — {g.cargo} ({g.email})
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Radicado de la Tutela (23 dígitos) *"
          value={radicado}
          onChange={(e) => setRadicado(e.target.value)}
          placeholder="05001311000420260012300"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Accionante (Ciudadano)"
            value={accionante}
            onChange={(e) => setAccionante(e.target.value)}
            placeholder="María Eugenia Restrepo"
          />
          <Input
            label="Accionado (Entidad / EPS)"
            value={accionado}
            onChange={(e) => setAccionado(e.target.value)}
            placeholder="Savia Salud EPS"
          />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Instrucciones Específicas del Despacho
          </label>
          <textarea
            rows={3}
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
            placeholder="Ej: Verificar si el medicamento oncológico está POS, requerir en 48 horas..."
            className="w-full p-2.5 bg-white text-black text-xs font-medium border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Confirmar y Asignar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
