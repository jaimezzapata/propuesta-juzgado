"use client";

import React, { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginView } from "@/features/auth/components/LoginView";
import { TopBar } from "@/components/ui/TopBar";
import { FormatosJefeView } from "@/features/formatos/components/FormatosJefeView";
import { EquipoView } from "@/features/equipo/components/EquipoView";
import { BandejaGestorView } from "@/features/formatos/components/BandejaGestorView";

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

  const [seccionJefe, setSeccionJefe] = useState<"formatos" | "equipo">("formatos");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-black border-t-[#FACC15] animate-spin" />
        <span className="text-xs font-black uppercase text-black">
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

  const esJefe = usuario.rol === "JEFE_DESPACHO";

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black">
      <TopBar usuario={usuario} onLogout={cerrarSesion} />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        {esJefe ? (
          <div className="flex flex-col gap-6">
            {/* Pestañas de control del Jefe */}
            <div className="flex border-b-2 border-black gap-2">
              <button
                type="button"
                onClick={() => setSeccionJefe("formatos")}
                className={`px-5 py-2.5 font-black uppercase text-xs border-2 border-b-0 border-black transition-all ${
                  seccionJefe === "formatos"
                    ? "bg-[#FACC15] text-black shadow-[3px_-2px_0px_#000]"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                1. Formatos y Asignaciones del Despacho
              </button>
              <button
                type="button"
                onClick={() => setSeccionJefe("equipo")}
                className={`px-5 py-2.5 font-black uppercase text-xs border-2 border-b-0 border-black transition-all ${
                  seccionJefe === "equipo"
                    ? "bg-[#FACC15] text-black shadow-[3px_-2px_0px_#000]"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                2. Perfiles de Gestores
              </button>
            </div>

            {seccionJefe === "formatos" ? (
              <FormatosJefeView jefeId={usuario.id} />
            ) : (
              <EquipoView />
            )}
          </div>
        ) : (
          /* Vista del Gestor: Solo bandeja de casos asignados */
          <BandejaGestorView
            gestorId={usuario.id}
            nombreGestor={usuario.nombre}
          />
        )}
      </main>
    </div>
  );
}
