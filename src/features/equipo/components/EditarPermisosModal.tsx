"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PermisosSelector } from "./PermisosSelector";
import { Usuario, Permiso, LISTA_PERMISOS } from "../types";

interface EditarPermisosModalProps {
  gestor: Usuario | null;
  onClose: () => void;
  onGuardar: (id: string, permisos: Permiso[]) => Promise<void>;
}

export const EditarPermisosModal: React.FC<EditarPermisosModalProps> = ({
  gestor,
  onClose,
  onGuardar,
}) => {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (gestor) {
      setPermisos(gestor.permisos);
    }
  }, [gestor]);

  if (!gestor) return null;

  const alternarPermiso = (p: Permiso) => {
    setPermisos((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleGuardar = async () => {
    setIsSaving(true);
    await onGuardar(gestor.id, permisos);
    setIsSaving(false);
  };

  return (
    <Modal
      isOpen={!!gestor}
      onClose={onClose}
      title={`Permisos: ${gestor.nombre}`}
      subtitle={`Cargo: ${gestor.cargo} | ${gestor.email}`}
      maxWidth="lg"
    >
      <div className="flex flex-col gap-4">
        <PermisosSelector
          seleccionados={permisos}
          onToggle={alternarPermiso}
          onSelectAll={() => setPermisos(LISTA_PERMISOS.map((p) => p.id))}
          onDeselectAll={() => setPermisos([])}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-black mt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button type="button" variant="primary" onClick={handleGuardar} isLoading={isSaving}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </Modal>
  );
};
