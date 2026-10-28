"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  CAMPOS_BASE_DATOS,
  CampoBaseDatosId,
  CasoTutelaDTO,
  ItemVinculoVisual,
  PlantillaDocumentoTutelaDTO,
  ProveedorIA,
  SeleccionTextoActiva,
  VinculoDatoDocumento,
} from "../types";
import { SesionUsuario } from "@/features/auth/types";
import {
  base64AArrayBuffer,
  contarOcurrenciasEnTexto,
  extraerTextoPlanoDeDocx,
  generarDocxConReemplazos,
  generarPlantillaJudicialPorDefectoDocx,
  resolverValorActivoVinculo,
} from "../utils/docx.utils";
import { analizarVariablesDocumentoConIAAction } from "../actions/ia-analisis.actions";

export function useEditorDocumentoDocx(
  usuario: SesionUsuario,
  plantillaActiva: PlantillaDocumentoTutelaDTO | null,
  casoSeleccionado: CasoTutelaDTO | null,
  apiKey: string,
  proveedorEfectivo: ProveedorIA
) {
  const esJefe = usuario.rol === "JEFE_DESPACHO";

  const [nombreArchivo, setNombreArchivo] = useState<string>(
    "Auto_Admisorio_Tutela_Juzgado4.docx"
  );
  const [bufferOriginal, setBufferOriginal] = useState<ArrayBuffer | null>(
    null
  );
  const [esArchivoRecienSubido, setEsArchivoRecienSubido] =
    useState<boolean>(false);
  const [vinculos, setVinculos] = useState<VinculoDatoDocumento[]>([]);
  const [edicionesManuales, setEdicionesManuales] = useState<
    Array<{ buscar: string; nuevo: string }>
  >([]);
  const [modoEdicionManual, setModoEdicionManual] = useState<boolean>(false);
  const [analizandoIA, setAnalizandoIA] = useState<boolean>(false);
  const [mensajeEstado, setMensajeEstado] = useState<string | null>(null);
  const [seleccionActiva, setSeleccionActiva] =
    useState<SeleccionTextoActiva | null>(null);

  const textoPlanoOriginal = useMemo(() => {
    if (!bufferOriginal) return "";
    return extraerTextoPlanoDeDocx(bufferOriginal);
  }, [bufferOriginal]);

  // Sincronizar cuando se selecciona una plantilla oficial del catálogo
  useEffect(() => {
    if (plantillaActiva) {
      const buf = base64AArrayBuffer(plantillaActiva.docxBase64);
      setBufferOriginal(buf);
      setNombreArchivo(plantillaActiva.nombreArchivo);
      setVinculos(plantillaActiva.vinculos || []);
      setEdicionesManuales([]);
      setSeleccionActiva(null);
      setEsArchivoRecienSubido(false);
    } else if (!bufferOriginal) {
      const buf = generarPlantillaJudicialPorDefectoDocx();
      setBufferOriginal(buf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantillaActiva?.id, plantillaActiva?.fechaActualizacion]);

  // Subir un archivo .docx propio (exclusivo para Jefe de Despacho)
  const subirArchivoDocx = useCallback(
    async (file: File) => {
      if (!esJefe) {
        setMensajeEstado(
          "Solo el Jefe de Despacho está autorizado para cargar nuevos formatos."
        );
        return;
      }

      if (!file.name.toLowerCase().endsWith(".docx")) {
        setMensajeEstado(
          "Por favor seleccione un archivo de Word válido (.docx)."
        );
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      setBufferOriginal(arrayBuffer);
      setNombreArchivo(file.name);
      setEdicionesManuales([]);
      setSeleccionActiva(null);
      setEsArchivoRecienSubido(true);

      setAnalizandoIA(true);
      const texto = extraerTextoPlanoDeDocx(arrayBuffer);
      const res = await analizarVariablesDocumentoConIAAction(
        texto,
        apiKey,
        proveedorEfectivo
      );
      setAnalizandoIA(false);

      if (res.success) {
        setVinculos(
          res.vinculosDetectados.map((v, i) => ({
            id: `v-upload-${i}-${Date.now()}`,
            textoOriginal: v.textoOriginal,
            campoBD: v.campoBD,
            origen: "ia",
          }))
        );
        setMensajeEstado(
          `${res.mensaje} Puede guardar este formato en el catálogo para los gestores.`
        );
      }
    },
    [esJefe, apiKey, proveedorEfectivo]
  );

  // Función 1: Ejecutar análisis con IA bajo demanda (Jefe de Despacho)
  const ejecutarDeteccionIA = useCallback(async () => {
    if (!bufferOriginal || !esJefe) return;
    setAnalizandoIA(true);
    setMensajeEstado("Analizando documento con Inteligencia Artificial...");

    const texto = extraerTextoPlanoDeDocx(bufferOriginal);
    const res = await analizarVariablesDocumentoConIAAction(
      texto,
      apiKey,
      proveedorEfectivo
    );
    setAnalizandoIA(false);

    if (res.success) {
      setVinculos((prev) => {
        const manuales = prev.filter((p) => p.origen === "seleccion_manual");
        const textosManuales = new Set(manuales.map((m) => m.textoOriginal));
        const nuevosIA: VinculoDatoDocumento[] = res.vinculosDetectados
          .filter((d) => !textosManuales.has(d.textoOriginal))
          .map((d, idx) => ({
            id: `v-ia-${idx}-${Date.now()}`,
            textoOriginal: d.textoOriginal,
            campoBD: d.campoBD,
            origen: "ia",
          }));
        return [...manuales, ...nuevosIA];
      });
      setMensajeEstado(res.mensaje);
    } else {
      setMensajeEstado(res.mensaje);
    }
  }, [bufferOriginal, esJefe, apiKey, proveedorEfectivo]);

  // Capturar selección con el mouse (solo Jefe de Despacho puede crear nuevas variables)
  const capturarSeleccionMouse = useCallback(
    (datos: { texto: string; x: number; y: number } | null) => {
      if (!esJefe || !datos) {
        setSeleccionActiva(null);
        return;
      }

      const textoCapturado = datos.texto.trim();
      let textoOriginalBase = textoCapturado;

      for (const v of vinculos) {
        const valorMostrado = resolverValorActivoVinculo(
          v,
          casoSeleccionado,
          usuario
        );
        if (valorMostrado === textoCapturado) {
          textoOriginalBase = v.textoOriginal;
          break;
        }
      }

      const ocurrencias = Math.max(
        1,
        contarOcurrenciasEnTexto(textoPlanoOriginal, textoOriginalBase)
      );

      setSeleccionActiva({
        texto: textoCapturado,
        textoOriginalBase,
        ocurrenciasEnDocumento: ocurrencias,
        x: datos.x,
        y: datos.y,
      });
    },
    [esJefe, vinculos, casoSeleccionado, usuario, textoPlanoOriginal]
  );

  // Función 2A: Convertir palabra seleccionada en variable editable global
  const convertirSeleccionEnVariableGlobal = useCallback(
    (nuevoValorOpcional?: string, etiquetaOpcional?: string) => {
      if (!seleccionActiva || !esJefe) return;
      const { textoOriginalBase, ocurrenciasEnDocumento } = seleccionActiva;
      const valorLimpio = nuevoValorOpcional?.trim();

      setVinculos((prev) => {
        const filtrados = prev.filter(
          (item) => item.textoOriginal !== textoOriginalBase
        );
        return [
          {
            id: `v-var-${Date.now()}`,
            textoOriginal: textoOriginalBase,
            etiquetaPersonalizada:
              etiquetaOpcional?.trim() || "Dato Habilitado para Diligenciar",
            valorPersonalizado:
              valorLimpio && valorLimpio !== textoOriginalBase
                ? valorLimpio
                : undefined,
            origen: "seleccion_manual",
          },
          ...filtrados,
        ];
      });

      setSeleccionActiva(null);
      window.getSelection()?.removeAllRanges();
      setMensajeEstado(
        `Palabra "${textoOriginalBase}" habilitada como variable (${ocurrenciasEnDocumento} mención(es) en el documento).`
      );
    },
    [seleccionActiva, esJefe]
  );

  // Función 2B: Vincular palabra seleccionada a un campo de la Base de Datos
  const vincularTextoSeleccionadoACampoBD = useCallback(
    (campoBD: CampoBaseDatosId) => {
      if (!seleccionActiva || !esJefe) return;
      const { textoOriginalBase, ocurrenciasEnDocumento } = seleccionActiva;

      setVinculos((prev) => {
        const filtrados = prev.filter(
          (item) => item.textoOriginal !== textoOriginalBase
        );
        return [
          {
            id: `v-man-${Date.now()}`,
            textoOriginal: textoOriginalBase,
            campoBD,
            origen: "seleccion_manual",
          },
          ...filtrados,
        ];
      });

      setSeleccionActiva(null);
      window.getSelection()?.removeAllRanges();
      setMensajeEstado(
        `"${textoOriginalBase}" vinculada a la base de datos en sus ${ocurrenciasEnDocumento} aparición(es).`
      );
    },
    [seleccionActiva, esJefe]
  );

  // Diligenciar el valor de una variable (disponible tanto para Jefe como para Gestores)
  const actualizarValorVariableGlobal = useCallback(
    (idVinculo: string, nuevoValor: string) => {
      setVinculos((prev) =>
        prev.map((v) =>
          v.id === idVinculo
            ? {
                ...v,
                valorPersonalizado:
                  nuevoValor.trim() === "" || nuevoValor === v.textoOriginal
                    ? undefined
                    : nuevoValor,
              }
            : v
        )
      );
    },
    []
  );

  const eliminarVinculo = useCallback(
    (idVinculo: string) => {
      if (!esJefe) return;
      setVinculos((prev) => prev.filter((v) => v.id !== idVinculo));
      setMensajeEstado(
        "Variable eliminada: ese fragmento vuelve a ser texto fijo del formato."
      );
    },
    [esJefe]
  );

  // Función 3: Registrar edición manual realizada sobre el documento (solo Jefe de Despacho)
  const registrarEdicionManual = useCallback(
    (textoAnterior: string, textoNuevo: string) => {
      if (!esJefe) return;
      const ant = textoAnterior.trim();
      const nvo = textoNuevo.trim();
      if (!ant || ant === nvo) return;

      setEdicionesManuales((prev) => {
        const idxExistente = prev.findIndex((e) => e.nuevo === ant);
        if (idxExistente >= 0) {
          const copia = [...prev];
          copia[idxExistente] = {
            buscar: copia[idxExistente].buscar,
            nuevo: nvo,
          };
          return copia;
        }
        return [...prev, { buscar: ant, nuevo: nvo }];
      });
    },
    [esJefe]
  );

  // Buffer del formato base con las ediciones estructurales del Jefe (para guardar en catálogo)
  const bufferParaGuardarPlantilla = useMemo(() => {
    if (!bufferOriginal) return null;
    return generarDocxConReemplazos(
      bufferOriginal,
      [],
      null,
      usuario,
      edicionesManuales
    );
  }, [bufferOriginal, usuario, edicionesManuales]);

  // Buffer .docx dinámico con los reemplazos de cliente/gestor y ediciones manuales
  const bufferDocxActualizado = useMemo(() => {
    if (!bufferOriginal) return null;
    return generarDocxConReemplazos(
      bufferOriginal,
      vinculos,
      casoSeleccionado,
      usuario,
      edicionesManuales
    );
  }, [
    bufferOriginal,
    vinculos,
    casoSeleccionado,
    usuario,
    edicionesManuales,
  ]);

  const textosResaltadosActivos: ItemVinculoVisual[] = useMemo(() => {
    return vinculos.map((v) => {
      const textoMostrado = resolverValorActivoVinculo(
        v,
        casoSeleccionado,
        usuario
      );
      const defCampo = v.campoBD
        ? CAMPOS_BASE_DATOS.find((c) => c.id === v.campoBD)
        : undefined;
      const ocurrencias = Math.max(
        1,
        contarOcurrenciasEnTexto(textoPlanoOriginal, v.textoOriginal)
      );

      return {
        id: v.id,
        etiqueta:
          defCampo?.etiqueta ||
          v.etiquetaPersonalizada ||
          "Campo Editable del Formato",
        textoOriginal: v.textoOriginal,
        textoMostrado,
        campoBD: v.campoBD,
        valorPersonalizado: v.valorPersonalizado,
        fueReemplazado: textoMostrado !== v.textoOriginal,
        ocurrencias,
        origen: v.origen,
      };
    });
  }, [vinculos, casoSeleccionado, usuario, textoPlanoOriginal]);

  const descargarDocxFinal = useCallback(() => {
    if (!bufferDocxActualizado) return;
    const blob = new Blob([bufferDocxActualizado], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const sufijo = casoSeleccionado
      ? `_${casoSeleccionado.clienteNombre.split(" ")[0]}`
      : "_Diligenciado";
    a.href = url;
    a.download = nombreArchivo.replace(/\.docx$/i, `${sufijo}.docx`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [bufferDocxActualizado, nombreArchivo, casoSeleccionado]);

  return {
    esJefe,
    nombreArchivo,
    esArchivoRecienSubido,
    marcarArchivoComoGuardado: () => setEsArchivoRecienSubido(false),
    bufferParaGuardarPlantilla,
    bufferDocxActualizado,
    vinculos,
    textosResaltadosActivos,
    edicionesManualesCount: edicionesManuales.length,
    modoEdicionManual: esJefe ? modoEdicionManual : false,
    toggleModoEdicionManual: () => {
      if (!esJefe) return;
      setModoEdicionManual((prev) => !prev);
      setSeleccionActiva(null);
    },
    analizandoIA,
    mensajeEstado,
    setMensajeEstado,
    limpiarMensaje: () => setMensajeEstado(null),
    seleccionActiva,
    capturarSeleccionMouse,
    cerrarSeleccionMouse: () => setSeleccionActiva(null),
    subirArchivoDocx,
    ejecutarDeteccionIA,
    convertirSeleccionEnVariableGlobal,
    vincularTextoSeleccionadoACampoBD,
    actualizarValorVariableGlobal,
    eliminarVinculo,
    registrarEdicionManual,
    restaurarEdicionesManuales: () => setEdicionesManuales([]),
    descargarDocxFinal,
  };
}
