"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LEMA_POR_DEFECTO_LOGIN,
  LEMAS_SUGERIDOS_LOGIN,
  STORAGE_KEY_LEMA_LOGIN,
} from "../utils/fondos-login.utils";

export function useLemaLogin() {
  const [lema, setLema] = useState<string>(LEMA_POR_DEFECTO_LOGIN);
  const [editando, setEditando] = useState<boolean>(false);
  const [borrador, setBorrador] = useState<string>(LEMA_POR_DEFECTO_LOGIN);

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY_LEMA_LOGIN);
    if (guardado && guardado.trim().length > 0) {
      setLema(guardado);
      setBorrador(guardado);
    }
  }, []);

  const abrirEdicion = useCallback(() => {
    setBorrador(lema);
    setEditando(true);
  }, [lema]);

  const cancelarEdicion = useCallback(() => {
    setBorrador(lema);
    setEditando(false);
  }, [lema]);

  const guardarLema = useCallback(
    (textoOpcional?: string) => {
      const textoFinal = (textoOpcional ?? borrador).trim();
      const nuevoLema =
        textoFinal.length > 0 ? textoFinal : LEMA_POR_DEFECTO_LOGIN;
      setLema(nuevoLema);
      setBorrador(nuevoLema);
      localStorage.setItem(STORAGE_KEY_LEMA_LOGIN, nuevoLema);
      setEditando(false);
    },
    [borrador]
  );

  const restaurarPorDefecto = useCallback(() => {
    setLema(LEMA_POR_DEFECTO_LOGIN);
    setBorrador(LEMA_POR_DEFECTO_LOGIN);
    localStorage.removeItem(STORAGE_KEY_LEMA_LOGIN);
    setEditando(false);
  }, []);

  const alternarSiguienteSugerido = useCallback(() => {
    const idxActual = LEMAS_SUGERIDOS_LOGIN.indexOf(borrador);
    const siguiente =
      LEMAS_SUGERIDOS_LOGIN[(idxActual + 1) % LEMAS_SUGERIDOS_LOGIN.length];
    setBorrador(siguiente);
  }, [borrador]);

  return {
    lema,
    editando,
    borrador,
    setBorrador,
    abrirEdicion,
    cancelarEdicion,
    guardarLema,
    restaurarPorDefecto,
    alternarSiguienteSugerido,
    esPersonalizado: lema !== LEMA_POR_DEFECTO_LOGIN,
  };
}

