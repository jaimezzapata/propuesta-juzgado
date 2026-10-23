"use client";

import { useState, useEffect, useCallback } from "react";
import { SesionUsuario } from "../types";
import {
  getUsuarioActualAction,
  loginAction,
  logoutAction,
  listarPerfilesParaAcceso,
} from "../actions/auth.actions";

export function useAuth() {
  const [usuario, setUsuario] = useState<SesionUsuario | null>(null);
  const [perfiles, setPerfiles] = useState<SesionUsuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const cargarEstado = useCallback(async () => {
    setIsLoading(true);
    try {
      const [actual, disponibles] = await Promise.all([
        getUsuarioActualAction(),
        listarPerfilesParaAcceso(),
      ]);
      setUsuario(actual);
      setPerfiles(disponibles);
    } catch (err: any) {
      setError(err?.message || "Error al verificar sesión.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarEstado();
  }, [cargarEstado]);

  const iniciarSesion = async (email: string, clave?: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await loginAction(email, clave);
      if (res.success && res.usuario) {
        setUsuario(res.usuario);
        return true;
      } else {
        setError(res.error || "No fue posible iniciar sesión.");
        return false;
      }
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const cerrarSesion = async () => {
    setIsLoading(true);
    await logoutAction();
    setUsuario(null);
    const disponibles = await listarPerfilesParaAcceso();
    setPerfiles(disponibles);
    setIsLoading(false);
  };

  return {
    usuario,
    perfiles,
    isLoading,
    isSubmitting,
    error,
    setError,
    iniciarSesion,
    cerrarSesion,
    recargarPerfiles: cargarEstado,
  };
}
