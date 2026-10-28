"use client";

import React from "react";
import { SesionUsuario } from "@/features/auth/types";
import { useDashboardOperativo } from "../hooks/useDashboardOperativo";
import { AccesosDirectosModulos } from "./AccesosDirectosModulos";

interface DashboardOperativoViewProps {
  usuario: SesionUsuario;
  onLogout: () => void;
}

export const DashboardOperativoView: React.FC<DashboardOperativoViewProps> = ({
  usuario,
}) => {
  const { modulos } = useDashboardOperativo(usuario);

  return (
    <div className="py-3 text-left animate-fadeIn">
      {/* Cuadrícula limpia y espaciosa de módulos operativos */}
      <AccesosDirectosModulos modulos={modulos} />
    </div>
  );
};
