"use client";

import { useState, useCallback } from "react";
import {
  DefinicionPasoFlujo,
  PasoFlujo,
  SeccionPrincipalTutela,
} from "../types";

export const PASOS_DILIGENCIAR: DefinicionPasoFlujo[] = [
  {
    numero: 1,
    titulo: "1. Elegir Formato",
    subtitulo: "Seleccione la plantilla oficial del despacho",
  },
  {
    numero: 2,
    titulo: "2. Vincular Cliente / Caso",
    subtitulo: "Elija el ciudadano o expediente de la base de datos",
  },
  {
    numero: 3,
    titulo: "3. Revisar y Descargar",
    subtitulo: "Ajuste los campos habilitados y exporte el Word",
  },
];

export const PASOS_FORMATOS_JEFE: DefinicionPasoFlujo[] = [
  {
    numero: 1,
    titulo: "1. Origen del Documento",
    subtitulo: "Suba un .docx, cree uno desde cero o elija uno actual",
  },
  {
    numero: 2,
    titulo: "2. Configurar Variables e IA",
    subtitulo: "Detecte con IA, seleccione palabras o edite la hoja",
  },
  {
    numero: 3,
    titulo: "3. Publicar para Gestores",
    subtitulo: "Confirme código SIGCMA y guarde en el catálogo",
  },
];

export function useNavegacionTutelas(esJefe: boolean) {
  const [seccionActiva, setSeccionActiva] =
    useState<SeccionPrincipalTutela>("diligenciar");
  const [pasoDiligenciar, setPasoDiligenciar] = useState<PasoFlujo>(1);
  const [pasoFormatosJefe, setPasoFormatosJefe] = useState<PasoFlujo>(1);

  const cambiarSeccion = useCallback(
    (nuevaSeccion: SeccionPrincipalTutela) => {
      if (nuevaSeccion === "formatos_jefe" && !esJefe) return;
      setSeccionActiva(nuevaSeccion);
    },
    [esJefe]
  );

  const irADiligenciarConFormato = useCallback(() => {
    setSeccionActiva("diligenciar");
    setPasoDiligenciar(2);
  }, []);

  const irADiligenciarConCliente = useCallback(() => {
    setSeccionActiva("diligenciar");
    setPasoDiligenciar(3);
  }, []);

  return {
    seccionActiva,
    cambiarSeccion,
    pasoDiligenciar,
    setPasoDiligenciar,
    pasoFormatosJefe,
    setPasoFormatosJefe,
    irADiligenciarConFormato,
    irADiligenciarConCliente,
  };
}

