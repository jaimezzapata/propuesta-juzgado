"use client";

import { useState, useEffect, useCallback } from "react";
import { Usuario, Permiso } from "../types";
import {
  obtenerEquipo,
  actualizarPermisosAction,
  alternarEstadoGestorAction,
  eliminarGestorAction,
} from "../actions/equipo.actions";

export function useEquipo() {
  const [jefe, setJefe] = useState<Usuario | null>(null);
  const [gestores, setGestores] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalCrearAbierto, setModalCrearAbierto] = useState<boolean>(false);
  const [gestorEditar, setGestorEditar] = useState<Usuario | null>(null);
  const [busqueda, setBusqueda] = useState<string>("");
  const [filtroActivo, setFiltroActivo] = useState<"todos" | "activos" | "inactivos">("todos");

  const recargar = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await obtenerEquipo();
      setJefe(data.jefe);
      setGestores(data.gestores);
    } catch (err: any) {
      setError(err?.message || "No fue posible cargar el equipo judicial.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const alternarEstado = async (id: string, actual: boolean) => {
    const res = await alternarEstadoGestorAction(id, !actual);
    if (res.success) {
      setGestores((prev) =>
        prev.map((g) => (g.id === id ? { ...g, activo: !actual } : g))
      );
    } else {
      alert(res.error || "No se pudo cambiar el estado.");
    }
  };

  const guardarPermisos = async (id: string, permisos: Permiso[]) => {
    const res = await actualizarPermisosAction(id, permisos);
    if (res.success) {
      setGestores((prev) =>
        prev.map((g) => (g.id === id ? { ...g, permisos } : g))
      );
      setGestorEditar(null);
    } else {
      alert(res.error || "No se pudieron actualizar los permisos.");
    }
  };

  const eliminarGestor = async (id: string, nombre: string) => {
    const confirmar = window.confirm(`¿Confirmas la eliminación del perfil de ${nombre}?`);
    if (!confirmar) return;

    const res = await eliminarGestorAction(id);
    if (res.success) {
      setGestores((prev) => prev.filter((g) => g.id !== id));
    } else {
      alert(res.error || "No se pudo eliminar el gestor.");
    }
  };

  const gestoresFiltrados = gestores.filter((g) => {
    const coincideTexto =
      g.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      g.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
      g.email.toLowerCase().includes(busqueda.toLowerCase());

    if (!coincideTexto) return false;
    if (filtroActivo === "activos") return g.activo;
    if (filtroActivo === "inactivos") return !g.activo;
    return true;
  });

  return {
    jefe,
    gestores: gestoresFiltrados,
    totalGestores: gestores.length,
    isLoading,
    error,
    busqueda,
    setBusqueda,
    filtroActivo,
    setFiltroActivo,
    modalCrearAbierto,
    setModalCrearAbierto,
    gestorEditar,
    setGestorEditar,
    recargar,
    alternarEstado,
    guardarPermisos,
    eliminarGestor,
  };
}
