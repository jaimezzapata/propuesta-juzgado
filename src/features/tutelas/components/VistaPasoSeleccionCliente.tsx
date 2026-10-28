"use client";

import React from "react";
import {
  UserPlus,
  Building,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { CasoTutelaDTO } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface VistaPasoSeleccionClienteProps {
  tituloVista: string;
  subtituloVista: string;
  casos: CasoTutelaDTO[];
  casoSeleccionado: CasoTutelaDTO | null;
  cargando: boolean;
  mostrarBotonesPaso?: boolean;
  onSeleccionarYContinuar: (id: string | null) => void;
  onAbrirModalNuevo: () => void;
  onVolverPasoAnterior?: () => void;
}

export const VistaPasoSeleccionCliente: React.FC<
  VistaPasoSeleccionClienteProps
> = ({
  tituloVista,
  subtituloVista,
  casos,
  casoSeleccionado,
  cargando,
  mostrarBotonesPaso = true,
  onSeleccionarYContinuar,
  onAbrirModalNuevo,
  onVolverPasoAnterior,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-base font-black">{tituloVista}</h2>
          <p className="text-xs opacity-75">{subtituloVista}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {mostrarBotonesPaso && onVolverPasoAnterior && (
            <button
              type="button"
              onClick={onVolverPasoAnterior}
              className={`h-8 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer ${tema.botonSecundario(
                false
              )}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cambiar Formato</span>
            </button>
          )}

          {mostrarBotonesPaso && (
            <button
              type="button"
              onClick={() => onSeleccionarYContinuar(null)}
              className={`h-8 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer ${tema.botonSecundario(
                false
              )}`}
            >
              <span>Diligenciar a mano (sin cliente)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onAbrirModalNuevo}
            className="h-8 px-3 text-xs font-black bg-[#9A7B3E] hover:bg-[#856932] text-white flex items-center gap-1.5 cursor-pointer border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Registrar Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {cargando ? (
        <div className="py-12 text-center text-xs opacity-65">
          Consultando clientes y expedientes en PostgreSQL...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {casos.map((c) => {
            const activo = casoSeleccionado?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSeleccionarYContinuar(c.id)}
                className={`p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all ${tema.cardInteractiva(
                  activo
                )}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 truncate ${tema.badgeNeutro}`}
                    >
                      {c.radicado}
                    </span>
                    {activo && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3" /> Activo
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-black leading-snug">
                      {c.clienteNombre}
                    </h3>
                    <span className="text-xs font-mono opacity-80">
                      C.C. {c.clienteDocumento} &bull; {c.clienteCiudad}
                    </span>
                  </div>

                  <div className={`p-2.5 text-xs flex flex-col gap-1 ${tema.subpanel}`}>
                    <span className="flex items-center gap-1.5 font-bold text-[#9A7B3E] truncate">
                      <Building className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{c.entidadAccionada}</span>
                    </span>
                    <span className="text-[11px] opacity-85 truncate">
                      <strong>Derecho:</strong> {c.derechoInvocado}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5 text-[11px] opacity-80">
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3 h-3 shrink-0 text-[#9A7B3E]" />
                      <span className="truncate">{c.clienteEmail}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 shrink-0 text-[#9A7B3E]" />
                      <span>{c.clienteTelefono}</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSeleccionarYContinuar(c.id);
                  }}
                  className={`w-full h-8 px-3 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${tema.botonPrimario}`}
                >
                  <span>Usar datos de este cliente</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
