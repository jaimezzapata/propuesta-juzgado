"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";

interface BotonCambiarFondoLoginProps {
  tituloFondo: string;
  indiceActual: number;
  totalFondos: number;
  onCambiarFondo: () => void;
}

export const BotonCambiarFondoLogin: React.FC<BotonCambiarFondoLoginProps> = ({
  tituloFondo,
  indiceActual,
  totalFondos,
  onCambiarFondo,
}) => {
  return (
    <button
      type="button"
      onClick={onCambiarFondo}
      title={`Cambiar fotografía de fondo (${tituloFondo})`}
      className="fixed bottom-4 left-4 z-20 px-2.5 py-1.5 rounded-full bg-black/35 hover:bg-black/65 text-white/60 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 text-[11px] font-medium cursor-pointer group select-none"
    >
      <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]/75 group-hover:text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
      <span className="hidden sm:inline opacity-75 group-hover:opacity-100 transition-opacity">
        {tituloFondo}
      </span>
      <span className="text-[10px] font-mono opacity-55 group-hover:opacity-90">
        {indiceActual + 1}/{totalFondos}
      </span>
    </button>
  );
};

