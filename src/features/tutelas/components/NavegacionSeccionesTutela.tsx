"use client";

import React from "react";
import {
  FileCheck2,
  FolderCog,
  Users,
  KeyRound,
  BarChart3,
} from "lucide-react";
import { SeccionPrincipalTutela } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface NavegacionSeccionesTutelaProps {
  esJefe: boolean;
  seccionActiva: SeccionPrincipalTutela;
  tieneApiKey: boolean;
  nombreProveedorIA: string;
  onCambiarSeccion: (seccion: SeccionPrincipalTutela) => void;
  onAbrirModalIA: () => void;
}

export const NavegacionSeccionesTutela: React.FC<
  NavegacionSeccionesTutelaProps
> = ({
  esJefe,
  seccionActiva,
  tieneApiKey,
  nombreProveedorIA,
  onCambiarSeccion,
  onAbrirModalIA,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  const getTabClasses = (activa: boolean) => {
    if (activa) {
      return tema.botonPrimario;
    }
    return tema.botonSecundario(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-current/15 pb-2.5">
      {/* Pestañas de Secciones Principales */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => onCambiarSeccion("diligenciar")}
          className={`h-8 px-3.5 text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${getTabClasses(
            seccionActiva === "diligenciar"
          )}`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Diligenciar Documento</span>
        </button>

        {esJefe && (
          <button
            type="button"
            onClick={() => onCambiarSeccion("formatos_jefe")}
            className={`h-8 px-3.5 text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${getTabClasses(
              seccionActiva === "formatos_jefe"
            )}`}
          >
            <FolderCog className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Crear y Administrar Formatos</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onCambiarSeccion("clientes_bd")}
          className={`h-8 px-3.5 text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${getTabClasses(
            seccionActiva === "clientes_bd"
          )}`}
        >
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Directorio de Clientes / Casos</span>
        </button>

        {esJefe && (
          <button
            type="button"
            onClick={() => onCambiarSeccion("analitica_jefe")}
            className={`h-8 px-3.5 text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${getTabClasses(
              seccionActiva === "analitica_jefe"
            )}`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Panel de Analítica y Gestores</span>
          </button>
        )}
      </div>

      {/* Botón de conexión IA (para Jefe de Despacho) */}
      {esJefe && (
        <button
          type="button"
          onClick={onAbrirModalIA}
          className={`h-8 px-3 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-auto ${tema.botonSecundario(
            false
          )}`}
          title="Configurar API Key (Gemini, Claude, ChatGPT)"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#9A7B3E]" />
          <span>
            Motor IA: {tieneApiKey ? nombreProveedorIA : "Configurar API Key"}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              tieneApiKey ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
        </button>
      )}
    </div>
  );
};
