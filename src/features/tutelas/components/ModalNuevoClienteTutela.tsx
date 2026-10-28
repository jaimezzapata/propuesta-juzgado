"use client";

import React, { useState } from "react";
import { UserPlus, X, Check } from "lucide-react";
import { NuevoCasoTutelaInput } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface ModalNuevoClienteTutelaProps {
  abierto: boolean;
  guardando: boolean;
  error: string | null;
  onCerrar: () => void;
  onCrear: (input: NuevoCasoTutelaInput) => Promise<boolean>;
}

const ESTADO_INICIAL: NuevoCasoTutelaInput = {
  radicado: "05001-31-10-004-2026-00290-00",
  clienteNombre: "",
  clienteDocumento: "",
  clienteEmail: "",
  clienteTelefono: "",
  clienteDireccion: "",
  clienteCiudad: "Medellín, Antioquia",
  entidadAccionada: "",
  derechoInvocado: "Salud Integral y Mínimo Vital",
  hechosResumen: "",
  fechaRadicacion: "28 de octubre de 2026",
};

export const ModalNuevoClienteTutela: React.FC<
  ModalNuevoClienteTutelaProps
> = ({ abierto, guardando, error, onCerrar, onCrear }) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";
  const [form, setForm] = useState<NuevoCasoTutelaInput>(ESTADO_INICIAL);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onCrear(form);
    if (ok) setForm(ESTADO_INICIAL);
  };

  const getModalBox = () => {
    if (esOscuro) {
      return estilo === "neo-brutalista"
        ? "bg-[#1E293B] border-2 border-slate-600 text-slate-100 shadow-[6px_6px_0px_#020617]"
        : "bg-[#181C23] border border-[#C5A880] text-slate-100 rounded-2xl shadow-2xl";
    }
    return estilo === "neo-brutalista"
      ? "bg-white border-2 border-[#0F172A] text-[#0F172A] shadow-[6px_6px_0px_#0F172A]"
      : "bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-2xl";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg p-5 flex flex-col gap-3 max-h-[90vh] overflow-y-auto ${getModalBox()}`}
      >
        <div className="flex items-center justify-between border-b border-current/15 pb-2.5">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#9A7B3E]" />
            <h3 className="text-sm font-black uppercase tracking-wider">
              Registrar Cliente / Caso de Tutela
            </h3>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="p-1 opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-2 text-xs font-bold bg-red-500/15 border border-red-500 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Nombre del Cliente (Accionante) *
            </label>
            <input
              required
              value={form.clienteNombre}
              onChange={(e) =>
                setForm({ ...form, clienteNombre: e.target.value })
              }
              placeholder="Ej: JORGE IVÁN MEJÍA"
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Cédula / Documento *
            </label>
            <input
              required
              value={form.clienteDocumento}
              onChange={(e) =>
                setForm({ ...form, clienteDocumento: e.target.value })
              }
              placeholder="Ej: 71.234.567"
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Número de Radicado *
            </label>
            <input
              required
              value={form.radicado}
              onChange={(e) => setForm({ ...form, radicado: e.target.value })}
              className="w-full h-8 px-2.5 font-mono border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Entidad Accionada *
            </label>
            <input
              required
              value={form.entidadAccionada}
              onChange={(e) =>
                setForm({ ...form, entidadAccionada: e.target.value })
              }
              placeholder="Ej: SALUD TOTAL EPS S.A."
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Correo Electrónico *
            </label>
            <input
              required
              type="email"
              value={form.clienteEmail}
              onChange={(e) =>
                setForm({ ...form, clienteEmail: e.target.value })
              }
              placeholder="correo@ejemplo.co"
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Teléfono / Celular *
            </label>
            <input
              required
              value={form.clienteTelefono}
              onChange={(e) =>
                setForm({ ...form, clienteTelefono: e.target.value })
              }
              placeholder="300 000 0000"
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Dirección *
            </label>
            <input
              required
              value={form.clienteDireccion}
              onChange={(e) =>
                setForm({ ...form, clienteDireccion: e.target.value })
              }
              placeholder="Calle 10 # 20-30"
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase block mb-1">
              Derecho Fundamental *
            </label>
            <input
              required
              value={form.derechoInvocado}
              onChange={(e) =>
                setForm({ ...form, derechoInvocado: e.target.value })
              }
              className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="text-[10px] font-bold uppercase block mb-1">
            Síntesis del Objeto / Pretensión *
          </label>
          <input
            required
            value={form.hechosResumen}
            onChange={(e) =>
              setForm({ ...form, hechosResumen: e.target.value })
            }
            placeholder="Ej: Entrega de tratamiento integral ordenado por médico tratante"
            className="w-full h-8 px-2.5 border border-current/30 bg-transparent"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-current/15">
          <button
            type="button"
            onClick={onCerrar}
            className="h-8 px-3 text-xs font-bold border border-current/25 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="h-8 px-4 text-xs font-black bg-[#0F2537] text-white flex items-center gap-1.5 cursor-pointer border-2 border-[#0F172A] disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{guardando ? "Guardando..." : "Guardar y Seleccionar"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

