"use client";

import { useState, useEffect, useCallback } from "react";
import { ProveedorIA } from "../types";
import {
  detectarProveedorPorApiKey,
  obtenerNombreProveedorIA,
} from "../utils/ia-detector.utils";

const STORAGE_IA_KEY = "juzgado_ia_apikey";
const STORAGE_IA_PROVIDER = "juzgado_ia_proveedor";

export function useConfiguracionIA() {
  const [apiKey, setApiKey] = useState("");
  const [proveedorForzado, setProveedorForzado] = useState<ProveedorIA | "auto">(
    "auto"
  );
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const guardadaKey = localStorage.getItem(STORAGE_IA_KEY) || "";
    const guardadoProv =
      (localStorage.getItem(STORAGE_IA_PROVIDER) as ProveedorIA | "auto") ||
      "auto";
    setApiKey(guardadaKey);
    setProveedorForzado(guardadoProv);
  }, []);

  const proveedorEfectivo: ProveedorIA =
    proveedorForzado !== "auto" && apiKey.trim()
      ? proveedorForzado
      : detectarProveedorPorApiKey(apiKey);

  const guardarConfiguracionIA = useCallback(
    (nuevaKey: string, nuevoProveedor: ProveedorIA | "auto") => {
      const limpia = nuevaKey.trim();
      setApiKey(limpia);
      setProveedorForzado(nuevoProveedor);
      localStorage.setItem(STORAGE_IA_KEY, limpia);
      localStorage.setItem(STORAGE_IA_PROVIDER, nuevoProveedor);
      setModalAbierto(false);
    },
    []
  );

  return {
    apiKey,
    proveedorForzado,
    proveedorEfectivo,
    nombreProveedorActivo: obtenerNombreProveedorIA(proveedorEfectivo),
    tieneApiKey: Boolean(apiKey.trim()),
    modalAbierto,
    abrirModalIA: () => setModalAbierto(true),
    cerrarModalIA: () => setModalAbierto(false),
    guardarConfiguracionIA,
  };
}

