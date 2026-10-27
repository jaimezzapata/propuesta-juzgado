"use client";

import React from "react";
import { Scale } from "lucide-react";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

export const LoginPanelLateral: React.FC = () => {
  const { estilo } = useEstiloVisual();

  return (
    <div className="hidden lg:flex flex-col justify-center max-w-sm p-4 text-white select-none">
      <div className="flex flex-col gap-3">
        <Scale className="w-6 h-6 text-amber-300/75" />
        <p
          className={`text-2xl xl:text-3xl font-light text-slate-100/90 leading-relaxed tracking-wide ${
            estilo === "editorial-notarial" ? "font-serif italic" : ""
          }`}
        >
          &ldquo;Justicia pronta, celeridad y garantía procesal.&rdquo;
        </p>
      </div>
    </div>
  );
};
