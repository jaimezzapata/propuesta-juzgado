"use client";

import React, { useState } from "react";
import { Scale, LogIn, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { SesionUsuario } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface LoginFormCardProps {
  perfiles: SesionUsuario[];
  onLogin: (email: string, clave?: string) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
}

export const LoginFormCard: React.FC<LoginFormCardProps> = ({
  perfiles,
  onLogin,
  isSubmitting,
  error,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("123456");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await onLogin(email, clave);
  };

  const getCardClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20]/95 backdrop-blur-md border border-[#4D3339] shadow-2xl rounded-2xl text-[#EDE6DF]";
        case "dark-lawfirm":
          return "bg-[#181C23]/95 backdrop-blur-md border border-[#2D333F] shadow-2xl rounded-xl text-[#E2E8F0]";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] border-2 border-slate-600 shadow-[6px_6px_0px_#020617] rounded-none text-slate-100";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7]/95 backdrop-blur-md border border-[#6B1D2F]/30 shadow-2xl rounded-2xl text-[#2C1810]";
        case "dark-lawfirm":
          return "bg-white/95 backdrop-blur-md border border-[#C5A880] shadow-2xl rounded-xl text-[#111827]";
        case "neo-brutalista":
        default:
          return "bg-white border-2 border-[#0F172A] shadow-[8px_8px_0px_#0F172A] rounded-none text-[#0F172A]";
      }
    }
  };

  const getHeaderClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#331A20] text-[#EDE6DF] border-b border-[#4D3339]";
        case "dark-lawfirm":
          return "bg-[#0E1015] text-[#C5A880] border-b border-[#2D333F]";
        case "neo-brutalista":
        default:
          return "bg-[#0B1120] text-slate-100 border-b-2 border-slate-600";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#5A1624] text-white border-b border-[#44101B]";
        case "dark-lawfirm":
          return "bg-[#111317] text-white border-b border-[#C5A880]/30";
        case "neo-brutalista":
        default:
          return "bg-[#0F2537] text-white border-b-2 border-[#0F172A]";
      }
    }
  };

  const getButtonClasses = () => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#6B1D2F] hover:bg-[#541624] text-white font-serif tracking-wide shadow-md rounded-xl";
        case "dark-lawfirm":
          return "bg-[#C5A880] hover:bg-[#B5966B] text-black font-bold shadow-lg rounded-lg";
        case "neo-brutalista":
        default:
          return "bg-[#9A7B3E] hover:bg-[#866933] text-white font-black border-2 border-slate-600 shadow-[2px_2px_0px_#020617] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#5A1624] hover:bg-[#48121D] text-white font-serif tracking-wide shadow-md rounded-xl";
        case "dark-lawfirm":
          return "bg-[#111317] hover:bg-[#202530] text-[#C5A880] border border-[#C5A880] font-bold shadow-lg rounded-lg";
        case "neo-brutalista":
        default:
          return "bg-[#9A7B3E] hover:bg-[#866933] text-white font-black border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
      }
    }
  };

  const getInputClasses = () => {
    if (esOscuro) {
      return "bg-[#0F172A] border-2 border-slate-600 text-slate-100 focus:border-[#D4AF37]";
    } else {
      return "bg-white border-2 border-[#0F172A] text-[#0F172A] focus:bg-slate-50";
    }
  };

  return (
    <div className={`w-full max-w-md overflow-hidden transition-all duration-200 ${getCardClasses()}`}>
      {/* Cabecera Institucional Concisa */}
      <div className={`p-6 flex items-center gap-4 ${getHeaderClasses()}`}>
        <div
          className={`w-12 h-12 flex items-center justify-center shrink-0 ${
            estilo === "neo-brutalista"
              ? esOscuro
                ? "bg-[#0F172A] text-[#D4AF37] border-2 border-slate-600 shadow-[2px_2px_0px_#020617]"
                : "bg-[#9A7B3E] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
              : estilo === "editorial-notarial"
              ? "bg-[#FCFAF7] text-[#5A1624] rounded-xl shadow-sm"
              : "bg-[#1E232B] text-[#C5A880] border border-[#C5A880]/40 rounded-lg"
          }`}
        >
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight leading-snug">
            Juzgado 4° de Familia
          </h1>
          <span className="text-[11px] opacity-75 block font-medium">
            Acceso al Despacho
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 text-left">
        {error && (
          <div className="p-2.5 bg-rose-500/15 border-2 border-rose-500 text-rose-300 font-bold text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-bold block mb-1">Correo Institucional</label>
            <input
              type="email"
              placeholder="usuario@ramajudicial.gov.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3.5 py-2.5 text-xs font-medium focus:outline-none transition-all ${getInputClasses()} ${estilo === "neo-brutalista" ? "rounded-none shadow-[2px_2px_0px_#020617]" : "rounded-lg"}`}
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Contraseña Judicial</label>
            <input
              type="password"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs font-medium focus:outline-none transition-all ${getInputClasses()} ${estilo === "neo-brutalista" ? "rounded-none shadow-[2px_2px_0px_#020617]" : "rounded-lg"}`}
            />
            <span className="text-[10px] opacity-65 block mt-1">
              Clave demo por defecto: <span className="font-mono font-bold">123456</span>
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 w-full py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all ${getButtonClasses()}`}
          >
            <LogIn className="w-4 h-4" />
            <span>Ingresar al Despacho</span>
          </button>
        </form>

        {/* Perfiles Rápidos */}
        <div className="pt-3 border-t border-current/15">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-65 block mb-2">
            Perfiles Rápidos del Juzgado:
          </span>
          <div className="flex flex-col gap-1.5">
            {perfiles.map((p) => {
              const esJefe = p.rol === "JEFE_DESPACHO";
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onLogin(p.email, "123456")}
                  disabled={isSubmitting}
                  className={`p-2.5 border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                    esOscuro
                      ? "border-slate-700 bg-[#0F172A]/80 hover:bg-[#152033]"
                      : "border-slate-300 bg-white hover:bg-slate-50"
                  } ${estilo === "neo-brutalista" ? "rounded-none shadow-[1px_1px_0px_#0F172A]" : "rounded-lg"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 text-slate-400">
                      {esJefe ? <ShieldCheck className="w-4 h-4 text-[#9A7B3E]" /> : <UserCheck className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="font-bold block leading-tight">{p.nombre}</span>
                      <span className="text-[10px] opacity-70 block">{p.cargo}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
