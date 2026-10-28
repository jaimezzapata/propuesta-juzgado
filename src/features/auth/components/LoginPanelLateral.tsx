"use client";

import React from "react";
import { Scale, PenLine, Check, X, RotateCcw, Sparkles } from "lucide-react";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { useLemaLogin } from "../hooks/useLemaLogin";

export const LoginPanelLateral: React.FC = () => {
  const { estilo } = useEstiloVisual();
  const {
    lema,
    editando,
    borrador,
    setBorrador,
    abrirEdicion,
    cancelarEdicion,
    guardarLema,
    restaurarPorDefecto,
    alternarSiguienteSugerido,
    esPersonalizado,
  } = useLemaLogin();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      guardarLema();
    } else if (e.key === "Escape") {
      cancelarEdicion();
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-sm p-4 text-white">
      <div className="flex flex-col gap-3 group">
        <div className="flex items-center justify-between gap-2">
          <Scale className="w-6 h-6 text-amber-300/75" />

          {!editando && (
            <button
              type="button"
              onClick={abrirEdicion}
              title="Personalizar lema del despacho"
              className="px-2 py-1 rounded-full bg-black/30 hover:bg-black/60 text-white/45 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-200 flex items-center gap-1.5 text-[10px] font-medium cursor-pointer opacity-60 group-hover:opacity-100"
            >
              <PenLine className="w-3 h-3 text-[#D4AF37]" />
              <span>Editar lema</span>
            </button>
          )}
        </div>

        {!editando ? (
          <p
            onClick={abrirEdicion}
            title="Haga clic para editar el lema"
            className={`text-xl sm:text-2xl xl:text-3xl font-light text-slate-100/90 leading-relaxed tracking-wide cursor-pointer hover:text-white transition-colors ${
              estilo === "editorial-notarial" ? "font-serif italic" : ""
            }`}
          >
            &ldquo;{lema}&rdquo;
          </p>
        ) : (
          <div className="flex flex-col gap-2.5 bg-black/55 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/40 shadow-xl">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
              Personalizar Lema Institucional
            </label>
            <textarea
              value={borrador}
              onChange={(e) => setBorrador(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              maxLength={160}
              autoFocus
              placeholder="Escriba aquí el lema que desee mostrar..."
              className="w-full p-2.5 text-sm text-white bg-white/10 border border-white/20 focus:border-[#D4AF37] rounded-lg outline-none resize-none leading-snug placeholder:text-white/40"
            />

            <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={alternarSiguienteSugerido}
                  title="Probar un lema jurídico sugerido"
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Sugerir</span>
                </button>

                {esPersonalizado && (
                  <button
                    type="button"
                    onClick={restaurarPorDefecto}
                    title="Restaurar el lema original por defecto"
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white/75 hover:text-amber-300 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Original</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white/75 hover:text-white cursor-pointer transition-colors"
                  title="Cancelar (Esc)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => guardarLema()}
                  className="px-2.5 py-1 rounded bg-[#9A7B3E] hover:bg-[#B38F48] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Guardar lema (Enter)"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
