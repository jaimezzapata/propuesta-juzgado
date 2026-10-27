"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { TipoEstiloVisual, ModoColor, EstiloVisualInfo, ESTILOS_DISPONIBLES } from "../types";

interface EstiloVisualContextType {
  estilo: TipoEstiloVisual;
  modo: ModoColor;
  cambiarEstilo: (nuevoEstilo: TipoEstiloVisual) => void;
  cambiarModo: (nuevoModo: ModoColor) => void;
  toggleModo: () => void;
  estiloInfo: EstiloVisualInfo;
  estilosDisponibles: EstiloVisualInfo[];
}

const STORAGE_ESTILO_KEY = "juzgado_estilo_visual";
const STORAGE_MODO_KEY = "juzgado_modo_color";

const EstiloVisualContext = createContext<EstiloVisualContextType | undefined>(undefined);

export const EstiloVisualProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [estilo, setEstilo] = useState<TipoEstiloVisual>("neo-brutalista");
  const [modo, setModo] = useState<ModoColor>("claro");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const guardadoEstilo = localStorage.getItem(STORAGE_ESTILO_KEY) as TipoEstiloVisual;
    const guardadoModo = localStorage.getItem(STORAGE_MODO_KEY) as ModoColor;

    const estiloInicial: TipoEstiloVisual =
      guardadoEstilo && ESTILOS_DISPONIBLES.some((e) => e.id === guardadoEstilo)
        ? guardadoEstilo
        : "neo-brutalista";

    // Si guardó modo explícito lo usamos; de lo contrario, si el estilo es dark-lawfirm inicia oscuro, sino claro
    const modoInicial: ModoColor =
      guardadoModo === "oscuro" || guardadoModo === "claro"
        ? guardadoModo
        : estiloInicial === "dark-lawfirm"
        ? "oscuro"
        : "claro";

    setEstilo(estiloInicial);
    setModo(modoInicial);

    document.documentElement.setAttribute("data-estilo", estiloInicial);
    document.documentElement.setAttribute("data-modo", modoInicial);
    document.documentElement.classList.toggle("dark", modoInicial === "oscuro");
  }, []);

  const aplicarModo = (nuevoModo: ModoColor) => {
    setModo(nuevoModo);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_MODO_KEY, nuevoModo);
      document.documentElement.setAttribute("data-modo", nuevoModo);
      document.documentElement.classList.toggle("dark", nuevoModo === "oscuro");
    }
  };

  const cambiarModo = (nuevoModo: ModoColor) => {
    aplicarModo(nuevoModo);
  };

  const toggleModo = () => {
    const siguiente = modo === "claro" ? "oscuro" : "claro";
    aplicarModo(siguiente);
  };

  const cambiarEstilo = (nuevoEstilo: TipoEstiloVisual) => {
    setEstilo(nuevoEstilo);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_ESTILO_KEY, nuevoEstilo);
      document.documentElement.setAttribute("data-estilo", nuevoEstilo);

      // Si cambia al estilo dark-lawfirm y está en claro, sugerir o activar oscuro naturalmente
      if (nuevoEstilo === "dark-lawfirm" && modo === "claro") {
        aplicarModo("oscuro");
      } else if (nuevoEstilo !== "dark-lawfirm" && estilo === "dark-lawfirm" && modo === "oscuro") {
        // Al salir de dark-lawfirm, restablecer a claro para apreciar el estilo diurno
        aplicarModo("claro");
      }
    }
  };

  const estiloInfo = useMemo(() => {
    return ESTILOS_DISPONIBLES.find((e) => e.id === estilo) || ESTILOS_DISPONIBLES[0];
  }, [estilo]);

  return (
    <EstiloVisualContext.Provider
      value={{
        estilo,
        modo,
        cambiarEstilo,
        cambiarModo,
        toggleModo,
        estiloInfo,
        estilosDisponibles: ESTILOS_DISPONIBLES,
      }}
    >
      <div className={`estilo-${estilo} modo-${modo} min-h-screen transition-colors duration-200`}>
        {children}
      </div>
    </EstiloVisualContext.Provider>
  );
};

export function useEstiloVisual() {
  const context = useContext(EstiloVisualContext);
  if (!context) {
    throw new Error("useEstiloVisual debe utilizarse dentro de un EstiloVisualProvider");
  }
  return context;
}
