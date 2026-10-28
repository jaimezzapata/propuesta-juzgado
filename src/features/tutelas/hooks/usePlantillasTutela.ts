"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CrearDocumentoDesdeCeroInput,
  PlantillaDocumentoTutelaDTO,
  VinculoDatoDocumento,
} from "../types";
import { SesionUsuario } from "@/features/auth/types";
import {
  eliminarPlantillaTutelaAction,
  guardarPlantillaTutelaAction,
  listarPlantillasTutelaAction,
} from "../actions/plantillas-tutela.actions";
import {
  arrayBufferABase64,
  construirDocxDesdeCreador,
  extraerTextoPlanoDeDocx,
} from "../utils/docx.utils";
import { detectarEntidadesJuridicasEnTexto } from "../utils/ia-detector.utils";

export function usePlantillasTutela(usuario: SesionUsuario) {
  const esJefe = usuario.rol === "JEFE_DESPACHO";
  const [plantillas, setPlantillas] = useState<PlantillaDocumentoTutelaDTO[]>(
    []
  );
  const [plantillaActivaId, setPlantillaActivaId] = useState<string | null>(
    null
  );
  const [cargandoPlantillas, setCargandoPlantillas] = useState(true);
  const [guardandoPlantilla, setGuardandoPlantilla] = useState(false);
  const [modalCrearDocAbierto, setModalCrearDocAbierto] = useState(false);

  const cargarCatalogo = useCallback(async () => {
    setCargandoPlantillas(true);
    const lista = await listarPlantillasTutelaAction();
    setPlantillas(lista);
    if (lista.length > 0 && !plantillaActivaId) {
      setPlantillaActivaId(lista[0].id);
    }
    setCargandoPlantillas(false);
  }, [plantillaActivaId]);

  useEffect(() => {
    cargarCatalogo();
  }, [cargarCatalogo]);

  const plantillaActiva =
    plantillas.find((p) => p.id === plantillaActivaId) || null;

  const guardarFormatoActual = useCallback(
    async (
      bufferBase: ArrayBuffer,
      vinculosActuales: VinculoDatoDocumento[],
      nombreArchivo: string,
      metadatosOpcionales?: {
        id?: string;
        codigo?: string;
        titulo?: string;
        descripcion?: string;
      }
    ): Promise<{ ok: boolean; mensaje: string }> => {
      if (!esJefe) {
        return {
          ok: false,
          mensaje: "Solo el Jefe de Despacho puede guardar o crear formatos.",
        };
      }

      setGuardandoPlantilla(true);
      const docxBase64 = arrayBufferABase64(bufferBase);

      // Al guardar el formato oficial limpiamos valores personalizados temporales
      const vinculosLimpios = vinculosActuales.map((v) => ({
        id: v.id,
        textoOriginal: v.textoOriginal,
        campoBD: v.campoBD,
        etiquetaPersonalizada: v.etiquetaPersonalizada,
        origen: v.origen,
      }));

      const res = await guardarPlantillaTutelaAction(
        {
          id: metadatosOpcionales?.id ?? plantillaActiva?.id,
          codigo:
            metadatosOpcionales?.codigo ||
            plantillaActiva?.codigo ||
            `F-TUT-0${plantillas.length + 1}`,
          titulo:
            metadatosOpcionales?.titulo ||
            plantillaActiva?.titulo ||
            nombreArchivo.replace(/\.docx$/i, "").replace(/_/g, " "),
          descripcion:
            metadatosOpcionales?.descripcion ||
            plantillaActiva?.descripcion ||
            "Formato oficial del despacho habilitado para diligenciamiento",
          nombreArchivo,
          docxBase64,
          vinculos: vinculosLimpios,
          creadoPor: usuario.nombre,
        },
        usuario.rol
      );

      setGuardandoPlantilla(false);

      if (res.success && res.plantilla) {
        setPlantillas((prev) => {
          const existe = prev.some((p) => p.id === res.plantilla!.id);
          if (existe) {
            return prev.map((p) =>
              p.id === res.plantilla!.id ? res.plantilla! : p
            );
          }
          return [res.plantilla!, ...prev];
        });
        setPlantillaActivaId(res.plantilla.id);
        return {
          ok: true,
          mensaje: `Formato "${res.plantilla.titulo}" guardado en el catálogo del Juzgado para uso de los gestores.`,
        };
      }

      return {
        ok: false,
        mensaje: res.error || "No se pudo guardar el formato.",
      };
    },
    [esJefe, plantillaActiva, plantillas.length, usuario.nombre, usuario.rol]
  );

  const crearNuevoDocumentoYGuardar = useCallback(
    async (
      input: CrearDocumentoDesdeCeroInput
    ): Promise<{
      ok: boolean;
      plantilla?: PlantillaDocumentoTutelaDTO;
      mensaje: string;
    }> => {
      if (!esJefe) {
        return {
          ok: false,
          mensaje: "Solo el Jefe de Despacho puede crear nuevos documentos.",
        };
      }

      setGuardandoPlantilla(true);
      const bufferNuevo = construirDocxDesdeCreador(input);
      const textoPlano = extraerTextoPlanoDeDocx(bufferNuevo);
      const vinculosAuto: VinculoDatoDocumento[] =
        detectarEntidadesJuridicasEnTexto(textoPlano).map((h, i) => ({
          id: `v-new-${i}-${Date.now()}`,
          textoOriginal: h.textoOriginal,
          campoBD: h.campoBD,
          origen: "ia",
        }));

      const nombreArchivo = `${input.tituloFormato
        .trim()
        .replace(/\s+/g, "_")}.docx`;

      const res = await guardarPlantillaTutelaAction(
        {
          id: `plantilla-${Date.now()}`,
          codigo: input.codigo,
          titulo: input.tituloFormato,
          descripcion: input.descripcionFormato,
          nombreArchivo,
          docxBase64: arrayBufferABase64(bufferNuevo),
          vinculos: vinculosAuto,
          creadoPor: usuario.nombre,
        },
        usuario.rol
      );

      setGuardandoPlantilla(false);

      if (res.success && res.plantilla) {
        setPlantillas((prev) => [res.plantilla!, ...prev]);
        setPlantillaActivaId(res.plantilla.id);
        setModalCrearDocAbierto(false);
        return {
          ok: true,
          plantilla: res.plantilla,
          mensaje: `Documento "${res.plantilla.titulo}" creado y publicado para los gestores del despacho.`,
        };
      }

      return {
        ok: false,
        mensaje: res.error || "Error al crear el documento.",
      };
    },
    [esJefe, usuario.nombre, usuario.rol]
  );

  const eliminarFormato = useCallback(
    async (
      idPlantilla: string
    ): Promise<{ ok: boolean; mensaje: string }> => {
      if (!esJefe) {
        return {
          ok: false,
          mensaje: "Solo el Jefe de Despacho puede eliminar formatos.",
        };
      }

      const encontrada = plantillas.find((p) => p.id === idPlantilla);
      const res = await eliminarPlantillaTutelaAction(idPlantilla, usuario.rol);

      if (res.success) {
        setPlantillas((prev) => {
          const restantes = prev.filter((p) => p.id !== idPlantilla);
          if (plantillaActivaId === idPlantilla) {
            setPlantillaActivaId(restantes[0]?.id || null);
          }
          return restantes;
        });

        return {
          ok: true,
          mensaje: `Formato "${
            encontrada?.titulo || idPlantilla
          }" eliminado del catálogo del Despacho.`,
        };
      }

      return {
        ok: false,
        mensaje: res.error || "No se pudo eliminar el formato.",
      };
    },
    [esJefe, plantillas, plantillaActivaId, usuario.rol]
  );

  return {
    esJefe,
    plantillas,
    plantillaActiva,
    plantillaActivaId,
    seleccionarPlantilla: setPlantillaActivaId,
    cargandoPlantillas,
    guardandoPlantilla,
    modalCrearDocAbierto,
    abrirModalCrearDoc: () => setModalCrearDocAbierto(true),
    cerrarModalCrearDoc: () => setModalCrearDocAbierto(false),
    guardarFormatoActual,
    crearNuevoDocumentoYGuardar,
    eliminarFormato,
  };
}

