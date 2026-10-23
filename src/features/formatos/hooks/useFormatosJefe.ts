"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FormatoMaestro,
  FormatoAsignado,
  FormFormatoMaestroValues,
  FormAsignarValues,
} from "../types";
import { Usuario } from "@/features/equipo/types";
import {
  obtenerFormatosMaestros,
  obtenerAsignacionesDespacho,
  crearFormatoMaestroAction,
  actualizarFormatoMaestroAction,
  asignarFormatoAction,
} from "../actions/formatos.actions";
import { obtenerEquipo } from "@/features/equipo/actions/equipo.actions";

export function useFormatosJefe(jefeId: string) {
  const [formatos, setFormatos] = useState<FormatoMaestro[]>([]);
  const [asignaciones, setAsignaciones] = useState<FormatoAsignado[]>([]);
  const [gestores, setGestores] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalFormatoAbierto, setModalFormatoAbierto] = useState(false);
  const [formatoEditar, setFormatoEditar] = useState<FormatoMaestro | null>(null);
  const [formatoAsignar, setFormatoAsignar] = useState<FormatoMaestro | null>(null);

  const cargarDatos = useCallback(async () => {
    setIsLoading(true);
    try {
      const [f, a, eq] = await Promise.all([
        obtenerFormatosMaestros(),
        obtenerAsignacionesDespacho(),
        obtenerEquipo(),
      ]);
      setFormatos(f);
      setAsignaciones(a);
      setGestores(eq.gestores.filter((g) => g.activo));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const guardarFormato = async (data: FormFormatoMaestroValues) => {
    if (formatoEditar) {
      const res = await actualizarFormatoMaestroAction(formatoEditar.id, data, jefeId);
      if (res.success) {
        await cargarDatos();
        setFormatoEditar(null);
        setModalFormatoAbierto(false);
        return true;
      }
      alert(res.error || "Error al actualizar formato.");
      return false;
    } else {
      const res = await crearFormatoMaestroAction(data, jefeId);
      if (res.success) {
        await cargarDatos();
        setModalFormatoAbierto(false);
        return true;
      }
      alert(res.error || "Error al crear formato maestro.");
      return false;
    }
  };

  const asignarAGestor = async (data: FormAsignarValues) => {
    const res = await asignarFormatoAction(data, jefeId);
    if (res.success) {
      await cargarDatos();
      setFormatoAsignar(null);
      return true;
    }
    alert(res.error || "Error al asignar formato.");
    return false;
  };

  return {
    formatos,
    asignaciones,
    gestores,
    isLoading,
    modalFormatoAbierto,
    setModalFormatoAbierto,
    formatoEditar,
    setFormatoEditar,
    formatoAsignar,
    setFormatoAsignar,
    guardarFormato,
    asignarAGestor,
    recargar: cargarDatos,
  };
}
