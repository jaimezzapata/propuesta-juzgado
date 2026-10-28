"use client";

import { useMemo } from "react";
import { ModuloAccesoDirecto } from "../types";
import { SesionUsuario } from "@/features/auth/types";

export function useDashboardOperativo(usuario: SesionUsuario) {
  const esJefe = usuario.rol === "JEFE_DESPACHO";

  // Módulos clave del despacho según rol judicial
  const modulos: ModuloAccesoDirecto[] = useMemo(
    () => [
      {
        id: "tutelas_modulo",
        titulo: "Bandeja de Tutelas",
        codigo: "TUT-01",
        descripcion: "Sustanciación prioritaria de acciones de tutela, incidentes de desacato y medidas cautelares.",
        icono: "Scale",
        ruta: "#tutelas",
      },
      {
        id: "procesos_ordinarios",
        titulo: "Gestión de Procesos Familia",
        codigo: "EXP-02",
        descripcion: "Fijación de audiencias, alimentos, custodia, cesación de efectos civiles y sucesiones.",
        icono: "FileText",
        ruta: "#procesos",
      },
      {
        id: "providencias",
        titulo: esJefe ? "Firma y Emisión de Providencias" : "Elaboración de Autos",
        codigo: "PRV-03",
        descripcion: esJefe
          ? "Rúbrica digital de autos interlocutorios y sentencias para notificación inmediata."
          : "Redacción y sustanciación de proyectos de auto para aval judicial del Juez.",
        icono: "PenTool",
        ruta: "#providencias",
      },
      {
        id: "estados_electronicos",
        titulo: "Fijación en Estados y Traslados",
        codigo: "NOT-04",
        descripcion: "Publicación de providencias en el estado diario y control de términos procesales públicos.",
        icono: "CalendarClock",
        ruta: "#estados",
      },
      {
        id: "radicacion_reparto",
        titulo: "Radicación y Reparto",
        codigo: "REP-05",
        descripcion: "Ingreso de memoriales, demandas nuevas y asignación de expedientes por sustanciador.",
        icono: "Inbox",
        ruta: "#radicacion",
      },
      {
        id: "archivo_expedientes",
        titulo: "Expediente Digital e Hitos",
        codigo: "DIG-06",
        descripcion: "Consulta de actuaciones foliadas, anexos procesales y trazabilidad integral del CENDOJ.",
        icono: "FolderGit2",
        ruta: "#archivo",
      },
    ],
    [esJefe]
  );

  return {
    modulos,
  };
}

