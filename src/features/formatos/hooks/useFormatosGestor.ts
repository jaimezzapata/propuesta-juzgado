"use client";

import { useState, useEffect, useCallback } from "react";
import { FormatoAsignado, EstadoAsignacion } from "../types";
import {
  obtenerMisAsignacionesGestor,
  guardarDiligenciamientoAction,
} from "../actions/formatos.actions";

export function useFormatosGestor(gestorId: string) {
  const [asignaciones, setAsignaciones] = useState<FormatoAsignado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [asignacionActiva, setAsignacionActiva] = useState<FormatoAsignado | null>(null);

  const cargarMisAsignaciones = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await obtenerMisAsignacionesGestor(gestorId);
      setAsignaciones(data);
    } finally {
      setIsLoading(false);
    }
  }, [gestorId]);

  useEffect(() => {
    cargarMisAsignaciones();
  }, [cargarMisAsignaciones]);

  const guardarAvance = async (
    asignacionId: string,
    contenido: string,
    estado: EstadoAsignacion
  ) => {
    const res = await guardarDiligenciamientoAction(
      asignacionId,
      gestorId,
      contenido,
      estado
    );
    if (res.success) {
      await cargarMisAsignaciones();
      setAsignacionActiva(null);
      return true;
    }
    alert(res.error || "Error al guardar avances.");
    return false;
  };

  return {
    asignaciones,
    isLoading,
    asignacionActiva,
    setAsignacionActiva,
    guardarAvance,
    recargar: cargarMisAsignaciones,
  };
}
