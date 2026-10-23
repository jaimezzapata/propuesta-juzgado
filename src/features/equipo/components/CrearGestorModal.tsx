import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PermisosSelector } from "./PermisosSelector";
import { useCrearGestorForm } from "../hooks/useCrearGestorForm";
import { LISTA_PERMISOS } from "../types";

interface CrearGestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreado: () => void;
}

export const CrearGestorModal: React.FC<CrearGestorModalProps> = ({
  isOpen,
  onClose,
  onCreado,
}) => {
  const {
    values,
    errores,
    isSubmitting,
    errorGeneral,
    handleChange,
    alternarPermiso,
    seleccionarTodos,
    deseleccionarTodos,
    handleSubmit,
  } = useCrearGestorForm(() => {
    onCreado();
    onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo Gestor Judicial"
      subtitle="Creación de perfil y asignación de permisos para el despacho"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorGeneral && (
          <div className="p-3 bg-red-100 border-2 border-red-600 text-red-900 font-bold text-xs">
            {errorGeneral}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nombre Completo *"
            name="nombre"
            placeholder="Ej: Dra. Marcela Gómez"
            value={values.nombre}
            onChange={handleChange}
            error={errores.nombre}
          />
          <Input
            label="Documento de Identidad"
            name="documento"
            placeholder="C.C. 1.036.542.110"
            value={values.documento}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Cargo en el Despacho *"
            name="cargo"
            placeholder="Ej: Sustanciador Grado 1"
            value={values.cargo}
            onChange={handleChange}
            error={errores.cargo}
          />
          <Input
            label="Correo Institucional *"
            name="email"
            type="email"
            placeholder="marcela.gomez@ramajudicial.gov.co"
            value={values.email}
            onChange={handleChange}
            error={errores.email}
          />
        </div>

        <div className="pt-2 border-t-2 border-black">
          <PermisosSelector
            seleccionados={values.permisos}
            onToggle={alternarPermiso}
            onSelectAll={() => seleccionarTodos(LISTA_PERMISOS.map((p) => p.id))}
            onDeselectAll={deseleccionarTodos}
          />
          {errores.permisos && (
            <p className="text-xs font-bold text-red-600 mt-1">{errores.permisos}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-black mt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Crear y Autorizar Gestor
          </Button>
        </div>
      </form>
    </Modal>
  );
};
