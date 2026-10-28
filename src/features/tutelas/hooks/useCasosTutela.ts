"use client";

import { useState, useEffect, useCallback } from "react";
import { CasoTutelaDTO, NuevoCasoTutelaInput } from "../types";
import {
  listarCasosTutelaAction,
  crearCasoTutelaAction,
} from "../actions/tutelas-clientes.actions";

export function useCasosTutela() {
  const [casos, setCasos] = useState<CasoTutelaDTO[]>([]);
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string | null>(
    null
  );
  const [cargandoCasos, setCargandoCasos] = useState(true);
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [guardandoNuevo, setGuardandoNuevo] = useState(false);
  const [errorNuevo, setErrorNuevo] = useState<string | null>(null);

  const cargarCasos = useCallback(async () => {
    setCargandoCasos(true);
    const data = await listarCasosTutelaAction();
    setCasos(data);
    setCargandoCasos(false);
  }, []);

  useEffect(() => {
    cargarCasos();
  }, [cargarCasos]);

  const casoSeleccionado =
    casos.find((c) => c.id === casoSeleccionadoId) || null;

  const crearNuevoCaso = useCallback(
    async (input: NuevoCasoTutelaInput): Promise<boolean> => {
      setGuardandoNuevo(true);
      setErrorNuevo(null);
      const res = await crearCasoTutelaAction(input);
      setGuardandoNuevo(false);

      if (res.success && res.caso) {
        setCasos((prev) => [res.caso!, ...prev]);
        setCasoSeleccionadoId(res.caso.id);
        setModalNuevoAbierto(false);
        return true;
      } else {
        setErrorNuevo(res.error || "Error al guardar el cliente.");
        return false;
      }
    },
    []
  );

  return {
    casos,
    casoSeleccionado,
    casoSeleccionadoId,
    seleccionarCaso: setCasoSeleccionadoId,
    cargandoCasos,
    modalNuevoAbierto,
    abrirModalNuevo: () => {
      setErrorNuevo(null);
      setModalNuevoAbierto(true);
    },
    cerrarModalNuevo: () => setModalNuevoAbierto(false),
    crearNuevoCaso,
    guardandoNuevo,
    errorNuevo,
  };
}

