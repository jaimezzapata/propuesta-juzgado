"use client";

import { useState, useEffect, useCallback } from "react";
import { MapaClavesIA, ProveedorIA } from "../types";
import {
  construirColaConmutacionIA,
  detectarProveedorPorApiKey,
  obtenerNombreProveedorIA,
} from "../utils/ia-detector.utils";

const STORAGE_IA_CLAVES = "juzgado_ia_mapa_claves";
const STORAGE_IA_KEY_LEGACY = "juzgado_ia_apikey";
const STORAGE_IA_PROVIDER = "juzgado_ia_proveedor";

export function useConfiguracionIA() {
  const [clavesIA, setClavesIA] = useState<MapaClavesIA>({});
  const [proveedorForzado, setProveedorForzado] = useState<ProveedorIA | "auto">(
    "auto"
  );
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    try {
      const guardadoMapa = localStorage.getItem(STORAGE_IA_CLAVES);
      const guardadaKeyLegacy =
        localStorage.getItem(STORAGE_IA_KEY_LEGACY) || "";
      const guardadoProv =
        (localStorage.getItem(STORAGE_IA_PROVIDER) as ProveedorIA | "auto") ||
        "auto";

      if (guardadoMapa) {
        setClavesIA(JSON.parse(guardadoMapa));
      } else if (guardadaKeyLegacy) {
        setClavesIA({ principal: guardadaKeyLegacy });
      }
      setProveedorForzado(guardadoProv);
    } catch {
      // Ignorar errores de parseo en localStorage
    }
  }, []);

  const colaActiva = construirColaConmutacionIA(
    clavesIA,
    proveedorForzado === "auto" ? undefined : proveedorForzado
  );

  const proveedorEfectivo: ProveedorIA =
    colaActiva.length > 0
      ? colaActiva[0].proveedor
      : clavesIA.principal
      ? detectarProveedorPorApiKey(clavesIA.principal)
      : "local";

  const guardarConfiguracionIA = useCallback(
    (nuevasClaves: MapaClavesIA, nuevoProveedor: ProveedorIA | "auto") => {
      const limpias: MapaClavesIA = {
        principal: nuevasClaves.principal?.trim() || "",
        gemini: nuevasClaves.gemini?.trim() || "",
        claude: nuevasClaves.claude?.trim() || "",
        openai: nuevasClaves.openai?.trim() || "",
        groq: nuevasClaves.groq?.trim() || "",
      };
      setClavesIA(limpias);
      setProveedorForzado(nuevoProveedor);
      localStorage.setItem(STORAGE_IA_CLAVES, JSON.stringify(limpias));
      localStorage.setItem(STORAGE_IA_PROVIDER, nuevoProveedor);
      setModalAbierto(false);
    },
    []
  );

  return {
    clavesIA,
    proveedorForzado,
    proveedorEfectivo,
    cantidadProveedoresEnCola: colaActiva.length,
    nombreProveedorActivo:
      colaActiva.length > 1
        ? `${obtenerNombreProveedorIA(proveedorEfectivo)} (+${
            colaActiva.length - 1
          } respaldo)`
        : obtenerNombreProveedorIA(proveedorEfectivo),
    tieneApiKey: colaActiva.length > 0,
    modalAbierto,
    abrirModalIA: () => setModalAbierto(true),
    cerrarModalIA: () => setModalAbierto(false),
    guardarConfiguracionIA,
  };
}
