"use client";

import React from "react";
import { SesionUsuario } from "../types";
import { LoginPanelLateral } from "./LoginPanelLateral";
import { LoginFormCard } from "./LoginFormCard";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";

interface LoginViewProps {
  perfiles: SesionUsuario[];
  onLogin: (email: string, clave?: string) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  perfiles,
  onLogin,
  isSubmitting,
  error,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const esOscuro = modo === "oscuro";

  // Color base hacia el cual se desvanece el degradado en el lado derecho
  const getBaseColorClass = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro ? "bg-[#100E10]" : "bg-[#1A1718]";
      case "dark-lawfirm":
        return esOscuro ? "bg-[#090B0E]" : "bg-[#11141A]";
      case "neo-brutalista":
      default:
        return esOscuro ? "bg-[#0B1120]" : "bg-[#0F172A]";
    }
  };

  // Degradado horizontal que acompaña la transición de la imagen hacia el color sólido
  const getGradientOverlayClass = () => {
    switch (estilo) {
      case "editorial-notarial":
        return esOscuro
          ? "bg-gradient-to-r from-[#100E10]/40 via-[#100E10]/70 to-[#100E10]"
          : "bg-gradient-to-r from-[#1A1718]/30 via-[#1A1718]/65 to-[#1A1718]";
      case "dark-lawfirm":
        return esOscuro
          ? "bg-gradient-to-r from-[#090B0E]/40 via-[#090B0E]/70 to-[#090B0E]"
          : "bg-gradient-to-r from-[#11141A]/30 via-[#11141A]/65 to-[#11141A]";
      case "neo-brutalista":
      default:
        return esOscuro
          ? "bg-gradient-to-r from-[#0B1120]/40 via-[#0B1120]/70 to-[#0B1120]"
          : "bg-gradient-to-r from-[#0F172A]/30 via-[#0F172A]/65 to-[#0F172A]";
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden transition-colors duration-300 ${getBaseColorClass()}`}
    >
      {/* Imagen con máscara de degradado: visible al 100% en el lado izquierdo y desvaneciéndose hacia la derecha */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-left bg-no-repeat pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `url('/images/judicial-bg.jpg')`,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 85%)",
        }}
      />

      {/* Capa de degradado complementaria que asegura una transición limpia y sin cortes hacia el fondo derecho */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${getGradientOverlayClass()}`}
      />

      {/* Distribución de dos paneles equilibrada, limpia y con slogan */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
        <LoginPanelLateral />
        <LoginFormCard
          perfiles={perfiles}
          onLogin={onLogin}
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  );
};
