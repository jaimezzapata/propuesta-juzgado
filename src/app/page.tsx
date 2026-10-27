"use client";

import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginView } from "@/features/auth/components/LoginView";
import { PerfilAutenticadoView } from "@/features/auth/components/PerfilAutenticadoView";
import { TopBar } from "@/components/ui/TopBar";

export default function Home() {
  const {
    usuario,
    perfiles,
    isLoading,
    isSubmitting,
    error,
    iniciarSesion,
    cerrarSesion,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-[#9A7B3E] rounded-full animate-spin" />
        <span className="text-xs font-bold text-current opacity-80">
          Iniciando sistema del Despacho Judicial...
        </span>
      </div>
    );
  }

  // Primera pantalla: Inicio de sesión si no hay usuario autenticado
  if (!usuario) {
    return (
      <LoginView
        perfiles={perfiles}
        onLogin={iniciarSesion}
        isSubmitting={isSubmitting}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar usuario={usuario} onLogout={cerrarSesion} />

      <main className="max-w-6xl mx-auto px-4 pb-12 pt-2">
        <PerfilAutenticadoView usuario={usuario} onLogout={cerrarSesion} />
      </main>
    </div>
  );
}
