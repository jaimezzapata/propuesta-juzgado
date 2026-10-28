"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FONDOS_JUDICIALES_LOGIN,
  FondoJudicialLogin,
  STORAGE_KEY_FONDO_LOGIN,
} from "../utils/fondos-login.utils";

export function useFondoLogin() {
  const [indiceActivo, setIndiceActivo] = useState<number>(0);

  useEffect(() => {
    const idGuardado = localStorage.getItem(STORAGE_KEY_FONDO_LOGIN);
    if (idGuardado) {
      const idx = FONDOS_JUDICIALES_LOGIN.findIndex((f) => f.id === idGuardado);
      if (idx >= 0) {
        setIndiceActivo(idx);
      }
    }
  }, []);

  // Precargar la siguiente imagen en segundo plano para una transición instantánea
  useEffect(() => {
    const siguienteIdx = (indiceActivo + 1) % FONDOS_JUDICIALES_LOGIN.length;
    const img = new Image();
    img.src = FONDOS_JUDICIALES_LOGIN[siguienteIdx].url;
  }, [indiceActivo]);

  const cambiarSiguienteFondo = useCallback(() => {
    setIndiceActivo((prev) => {
      const nuevoIndice = (prev + 1) % FONDOS_JUDICIALES_LOGIN.length;
      localStorage.setItem(
        STORAGE_KEY_FONDO_LOGIN,
        FONDOS_JUDICIALES_LOGIN[nuevoIndice].id
      );
      return nuevoIndice;
    });
  }, []);

  const fondoActual: FondoJudicialLogin =
    FONDOS_JUDICIALES_LOGIN[indiceActivo] || FONDOS_JUDICIALES_LOGIN[0];

  return {
    fondoActual,
    indiceActivo,
    totalFondos: FONDOS_JUDICIALES_LOGIN.length,
    cambiarSiguienteFondo,
  };
}

