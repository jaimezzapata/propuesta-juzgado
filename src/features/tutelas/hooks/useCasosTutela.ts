"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Rol } from "@/features/auth/types";
import {
  CasoTutelaDTO,
  EstadoCasoTutela,
  NuevoCasoTutelaInput,
} from "../types";
import {
  listarCasosTutelaAction,
  crearCasoTutelaAction,
  actualizarEstadoYGestorCasoAction,
} from "../actions/tutelas-clientes.actions";
import {
  calcularMetricasGlobalesTutelas,
  calcularMetricasPorGestor,
  GESTORES_OFICIALES_DESPACHO,
} from "../utils/analitica-tutelas.utils";

export function useCasosTutela(rolUsuario: Rol = "GESTOR") {
  const [casos, setCasos] = useState<CasoTutelaDTO[]>([]);
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string | null>(
    null
  );
  const [cargandoCasos, setCargandoCasos] = useState(true);
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [guardandoNuevo, setGuardandoNuevo] = useState(false);
  const [errorNuevo, setErrorNuevo] = useState<string | null>(null);

  // Filtros para el Panel de Analítica del Jefe
  const [filtroGestor, setFiltroGestor] = useState<string>("TODOS");
  const [filtroEstado, setFiltroEstado] = useState<EstadoCasoTutela | "TODOS">(
    "TODOS"
  );

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

  const actualizarEstadoYGestor = useCallback(
    async (
      idCaso: string,
      nuevoEstado: EstadoCasoTutela,
      nuevoGestorNombre: string
    ): Promise<{ ok: boolean; mensaje: string }> => {
      const cargoEncontrado =
        GESTORES_OFICIALES_DESPACHO.find((g) => g.nombre === nuevoGestorNombre)
          ?.cargo || "Gestor Judicial";

      // Actualización optimista inmediata para reflejar las métricas al instante
      setCasos((prev) =>
        prev.map((c) =>
          c.id === idCaso
            ? {
                ...c,
                estado: nuevoEstado,
                gestorAsignadoNombre: nuevoGestorNombre,
                gestorAsignadoCargo: cargoEncontrado,
              }
            : c
        )
      );

      const res = await actualizarEstadoYGestorCasoAction(
        idCaso,
        nuevoEstado,
        nuevoGestorNombre,
        rolUsuario
      );

      if (!res.success) {
        await cargarCasos();
        return {
          ok: false,
          mensaje: res.error || "No se pudo actualizar el caso.",
        };
      }

      return {
        ok: true,
        mensaje: `Expediente actualizado: Estado "${nuevoEstado}" asignado a ${nuevoGestorNombre}.`,
      };
    },
    [rolUsuario, cargarCasos]
  );

  const metricasGlobales = useMemo(
    () => calcularMetricasGlobalesTutelas(casos),
    [casos]
  );

  const metricasPorGestor = useMemo(
    () => calcularMetricasPorGestor(casos),
    [casos]
  );

  const casosFiltradosAnalitica = useMemo(() => {
    return casos.filter((c) => {
      const coincideGestor =
        filtroGestor === "TODOS" || c.gestorAsignadoNombre === filtroGestor;
      const coincideEstado =
        filtroEstado === "TODOS" || c.estado === filtroEstado;
      return coincideGestor && coincideEstado;
    });
  }, [casos, filtroGestor, filtroEstado]);

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
    actualizarEstadoYGestor,
    metricasGlobales,
    metricasPorGestor,
    filtroGestor,
    setFiltroGestor,
    filtroEstado,
    setFiltroEstado,
    casosFiltradosAnalitica,
  };
}
