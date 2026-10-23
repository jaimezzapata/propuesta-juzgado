"use client";

import { useState } from "react";
import { FormGestorValues, Permiso } from "../types";
import { crearGestorAction } from "../actions/equipo.actions";

const PERMISOS_DEFAULT: Permiso[] = [
  "RADICAR_EXPEDIENTES",
  "ANALIZAR_TUTELAS",
  "GENERAR_PROVIDENCIAS",
];

const VALORES_INICIALES: FormGestorValues = {
  nombre: "",
  documento: "",
  cargo: "Sustanciador de Tutelas",
  email: "",
  permisos: PERMISOS_DEFAULT,
};

export function useCrearGestorForm(onSuccess: () => void) {
  const [values, setValues] = useState<FormGestorValues>(VALORES_INICIALES);
  const [errores, setErrores] = useState<Partial<Record<keyof FormGestorValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errores[name as keyof FormGestorValues]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const alternarPermiso = (permiso: Permiso) => {
    setValues((prev) => {
      const existe = prev.permisos.includes(permiso);
      const nuevos = existe
        ? prev.permisos.filter((p) => p !== permiso)
        : [...prev.permisos, permiso];
      return { ...prev, permisos: nuevos };
    });
  };

  const seleccionarTodos = (todos: Permiso[]) => {
    setValues((prev) => ({ ...prev, permisos: todos }));
  };

  const deseleccionarTodos = () => {
    setValues((prev) => ({ ...prev, permisos: [] }));
  };

  const validar = (): boolean => {
    const err: Partial<Record<keyof FormGestorValues, string>> = {};

    if (!values.nombre.trim()) {
      err.nombre = "El nombre completo es obligatorio.";
    }
    if (!values.cargo.trim()) {
      err.cargo = "El cargo o rol es obligatorio.";
    }
    if (!values.email.trim()) {
      err.email = "El correo institucional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      err.email = "Ingrese un correo electrónico válido.";
    }
    if (values.permisos.length === 0) {
      err.permisos = "Debe asignar al menos un permiso al gestor.";
    }

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGeneral(null);

    if (!validar()) return;

    setIsSubmitting(true);
    try {
      const res = await crearGestorAction(values);
      if (res.success) {
        setValues(VALORES_INICIALES);
        onSuccess();
      } else {
        setErrorGeneral(res.error || "No se pudo crear el gestor.");
      }
    } catch (err: any) {
      setErrorGeneral(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errores,
    isSubmitting,
    errorGeneral,
    handleChange,
    alternarPermiso,
    seleccionarTodos,
    deseleccionarTodos,
    handleSubmit,
  };
}
