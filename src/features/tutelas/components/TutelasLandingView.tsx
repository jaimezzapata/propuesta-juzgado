"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { SesionUsuario } from "@/features/auth/types";
import { useConfiguracionIA } from "../hooks/useConfiguracionIA";
import { useCasosTutela } from "../hooks/useCasosTutela";
import { usePlantillasTutela } from "../hooks/usePlantillasTutela";
import { useEditorDocumentoDocx } from "../hooks/useEditorDocumentoDocx";
import {
  PASOS_DILIGENCIAR,
  useNavegacionTutelas,
} from "../hooks/useNavegacionTutelas";
import { NavegacionSeccionesTutela } from "./NavegacionSeccionesTutela";
import { IndicadorPasosFlujo } from "./IndicadorPasosFlujo";
import { VistaPasoSeleccionFormato } from "./VistaPasoSeleccionFormato";
import { VistaPasoSeleccionCliente } from "./VistaPasoSeleccionCliente";
import { VistaPasoEstudioDiligenciamiento } from "./VistaPasoEstudioDiligenciamiento";
import { FlujoGestionFormatosJefeView } from "./FlujoGestionFormatosJefeView";
import { PanelAnaliticaDespachoView } from "./PanelAnaliticaDespachoView";
import { PopoverVincularSeleccion } from "./PopoverVincularSeleccion";
import { ModalConfiguracionIA } from "./ModalConfiguracionIA";
import { ModalNuevoClienteTutela } from "./ModalNuevoClienteTutela";
import { ModalCrearDocumentoJudicial } from "./ModalCrearDocumentoJudicial";

interface TutelasLandingViewProps {
  usuario: SesionUsuario;
}

export const TutelasLandingView: React.FC<TutelasLandingViewProps> = ({
  usuario,
}) => {
  const {
    clavesIA,
    proveedorForzado,
    proveedorEfectivo,
    nombreProveedorActivo,
    tieneApiKey,
    modalAbierto: modalIAAbierto,
    abrirModalIA,
    cerrarModalIA,
    guardarConfiguracionIA,
  } = useConfiguracionIA();

  const {
    esJefe,
    plantillas,
    plantillaActiva,
    plantillaActivaId,
    seleccionarPlantilla,
    cargandoPlantillas,
    guardandoPlantilla,
    modalCrearDocAbierto,
    abrirModalCrearDoc,
    cerrarModalCrearDoc,
    guardarFormatoActual,
    crearNuevoDocumentoYGuardar,
    eliminarFormato,
  } = usePlantillasTutela(usuario);

  const {
    seccionActiva,
    cambiarSeccion,
    pasoDiligenciar,
    setPasoDiligenciar,
    pasoFormatosJefe,
    setPasoFormatosJefe,
    irADiligenciarConFormato,
    irADiligenciarConCliente,
  } = useNavegacionTutelas(esJefe);

  const {
    casos,
    casoSeleccionado,
    seleccionarCaso,
    cargandoCasos,
    modalNuevoAbierto,
    abrirModalNuevo,
    cerrarModalNuevo,
    crearNuevoCaso,
    guardandoNuevo,
    errorNuevo,
    actualizarEstadoYGestor,
    metricasGlobales,
    metricasPorGestor,
    filtroGestor,
    setFiltroGestor,
    filtroEstado,
    setFiltroEstado,
    casosFiltradosAnalitica,
  } = useCasosTutela(usuario.rol);

  const {
    nombreArchivo,
    esArchivoRecienSubido,
    marcarArchivoComoGuardado,
    bufferParaGuardarPlantilla,
    bufferDocxActualizado,
    vinculos,
    textosResaltadosActivos,
    edicionesManualesCount,
    modoEdicionManual,
    toggleModoEdicionManual,
    analizandoIA,
    mensajeEstado,
    setMensajeEstado,
    limpiarMensaje,
    seleccionActiva,
    capturarSeleccionMouse,
    cerrarSeleccionMouse,
    subirArchivoDocx,
    ejecutarDeteccionIA,
    convertirSeleccionEnVariableGlobal,
    vincularTextoSeleccionadoACampoBD,
    actualizarValorVariableGlobal,
    eliminarVinculo,
    registrarEdicionManual,
    restaurarEdicionesManuales,
    descargarDocxFinal,
  } = useEditorDocumentoDocx(
    usuario,
    plantillaActiva,
    casoSeleccionado,
    clavesIA,
    proveedorEfectivo
  );

  const handleGuardarFormatoParaGestores = async (metadatos: {
    codigo: string;
    titulo: string;
    descripcion: string;
  }) => {
    if (!bufferParaGuardarPlantilla) return;
    const res = await guardarFormatoActual(
      bufferParaGuardarPlantilla,
      vinculos,
      nombreArchivo,
      {
        id: esArchivoRecienSubido
          ? `plantilla-${Date.now()}`
          : plantillaActiva?.id,
        codigo: metadatos.codigo,
        titulo: metadatos.titulo,
        descripcion: metadatos.descripcion,
      }
    );
    if (res.ok) {
      marcarArchivoComoGuardado();
      cambiarSeccion("diligenciar");
      setPasoDiligenciar(1);
    }
    setMensajeEstado(res.mensaje);
  };

  const handleEditarFormatoExistente = (idPlantilla: string) => {
    seleccionarPlantilla(idPlantilla);
    cambiarSeccion("formatos_jefe");
    setPasoFormatosJefe(2);
  };

  const handleEliminarFormatoExistente = async (idPlantilla: string) => {
    const res = await eliminarFormato(idPlantilla);
    setMensajeEstado(res.mensaje);
  };

  return (
    <div className="py-2.5 flex flex-col gap-3.5 text-left animate-fadeIn">
      {/* Navegación principal por secciones separadas */}
      <NavegacionSeccionesTutela
        esJefe={esJefe}
        seccionActiva={seccionActiva}
        tieneApiKey={tieneApiKey}
        nombreProveedorIA={nombreProveedorActivo}
        onCambiarSeccion={cambiarSeccion}
        onAbrirModalIA={abrirModalIA}
      />

      {/* Notificación de estado */}
      {mensajeEstado && (
        <div className="px-4 py-2.5 bg-[#0F2537] text-white text-xs flex items-center justify-between gap-2 border-l-4 border-[#9A7B3E]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{mensajeEstado}</span>
          </div>
          <button
            type="button"
            onClick={limpiarMensaje}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SECCIÓN 1: DILIGENCIAR DOCUMENTO (Flujo paso a paso 1 -> 2 -> 3) */}
      {seccionActiva === "diligenciar" && (
        <div className="flex flex-col gap-3.5">
          <IndicadorPasosFlujo
            pasos={PASOS_DILIGENCIAR}
            pasoActual={pasoDiligenciar}
            onSeleccionarPaso={setPasoDiligenciar}
          />

          {pasoDiligenciar === 1 && (
            <VistaPasoSeleccionFormato
              esJefe={esJefe}
              plantillas={plantillas}
              plantillaActivaId={plantillaActivaId}
              cargando={cargandoPlantillas}
              onElegirYContinuar={(id) => {
                seleccionarPlantilla(id);
                irADiligenciarConFormato();
              }}
              onEditarFormatoJefe={handleEditarFormatoExistente}
              onEliminarFormatoJefe={handleEliminarFormatoExistente}
              onIrACrearFormatoJefe={() => {
                cambiarSeccion("formatos_jefe");
                setPasoFormatosJefe(1);
              }}
            />
          )}

          {pasoDiligenciar === 2 && (
            <VistaPasoSeleccionCliente
              tituloVista="Paso 2: Seleccione el Cliente / Caso de la Base de Datos"
              subtituloVista="Elija el ciudadano para reemplazar automáticamente sus datos en el formato seleccionado"
              casos={casos}
              casoSeleccionado={casoSeleccionado}
              cargando={cargandoCasos}
              mostrarBotonesPaso={true}
              onSeleccionarYContinuar={(id) => {
                seleccionarCaso(id);
                irADiligenciarConCliente();
              }}
              onAbrirModalNuevo={abrirModalNuevo}
              onVolverPasoAnterior={() => setPasoDiligenciar(1)}
            />
          )}

          {pasoDiligenciar === 3 && (
            <VistaPasoEstudioDiligenciamiento
              esJefe={esJefe}
              plantillaActiva={plantillaActiva}
              casoSeleccionado={casoSeleccionado}
              nombreArchivo={nombreArchivo}
              bufferDocx={bufferDocxActualizado}
              vinculos={textosResaltadosActivos}
              edicionesManualesCount={edicionesManualesCount}
              modoEdicionManual={modoEdicionManual}
              onVolverAPasoFormato={() => setPasoDiligenciar(1)}
              onVolverAPasoCliente={() => setPasoDiligenciar(2)}
              onDesvincularCliente={() => seleccionarCaso(null)}
              onCambiarValorGlobal={actualizarValorVariableGlobal}
              onEliminarVinculo={eliminarVinculo}
              onRestaurarEdicionesManuales={restaurarEdicionesManuales}
              onSeleccionarTextoMouse={capturarSeleccionMouse}
              onRegistrarEdicionManual={registrarEdicionManual}
              onDescargarDocx={descargarDocxFinal}
            />
          )}
        </div>
      )}

      {/* SECCIÓN 2: CREAR Y ADMINISTRAR FORMATOS (Flujo paso a paso exclusivo Jefe) */}
      {seccionActiva === "formatos_jefe" && esJefe && (
        <FlujoGestionFormatosJefeView
          pasoActual={pasoFormatosJefe}
          plantillas={plantillas}
          plantillaActiva={plantillaActiva}
          plantillaActivaId={plantillaActivaId}
          esArchivoRecienSubido={esArchivoRecienSubido}
          nombreArchivo={nombreArchivo}
          bufferDocx={bufferDocxActualizado}
          vinculos={textosResaltadosActivos}
          edicionesManualesCount={edicionesManualesCount}
          modoEdicionManual={modoEdicionManual}
          analizandoIA={analizandoIA}
          guardandoPlantilla={guardandoPlantilla}
          onCambiarPaso={setPasoFormatosJefe}
          onSubirArchivo={subirArchivoDocx}
          onAbrirModalCrearDoc={abrirModalCrearDoc}
          onSeleccionarPlantillaExistente={seleccionarPlantilla}
          onUsarFormatoParaDiligenciar={(id) => {
            seleccionarPlantilla(id);
            irADiligenciarConFormato();
          }}
          onEliminarFormato={handleEliminarFormatoExistente}
          onDetectarConIA={ejecutarDeteccionIA}
          onToggleEdicionManual={toggleModoEdicionManual}
          onCambiarValorGlobal={actualizarValorVariableGlobal}
          onEliminarVinculo={eliminarVinculo}
          onRestaurarEdicionesManuales={restaurarEdicionesManuales}
          onSeleccionarTextoMouse={capturarSeleccionMouse}
          onRegistrarEdicionManual={registrarEdicionManual}
          onGuardarFormatoParaGestores={handleGuardarFormatoParaGestores}
        />
      )}

      {/* SECCIÓN 3: DIRECTORIO DE CLIENTES / CASOS */}
      {seccionActiva === "clientes_bd" && (
        <VistaPasoSeleccionCliente
          tituloVista="Directorio de Clientes y Casos de Tutela (PostgreSQL)"
          subtituloVista="Consulte o registre ciudadanos y haga clic en cualquiera para diligenciar su documento"
          casos={casos}
          casoSeleccionado={casoSeleccionado}
          cargando={cargandoCasos}
          mostrarBotonesPaso={false}
          onSeleccionarYContinuar={(id) => {
            seleccionarCaso(id);
            irADiligenciarConCliente();
          }}
          onAbrirModalNuevo={abrirModalNuevo}
        />
      )}

      {/* SECCIÓN 4: PANEL DE ANALÍTICA Y CONTROL DE GESTORES (Exclusivo Jefe) */}
      {seccionActiva === "analitica_jefe" && esJefe && (
        <PanelAnaliticaDespachoView
          metricasGlobales={metricasGlobales}
          metricasPorGestor={metricasPorGestor}
          casosFiltrados={casosFiltradosAnalitica}
          filtroGestor={filtroGestor}
          filtroEstado={filtroEstado}
          onCambiarFiltroGestor={setFiltroGestor}
          onCambiarFiltroEstado={setFiltroEstado}
          onActualizarEstadoYGestor={async (idCaso, estado, gestor) => {
            const res = await actualizarEstadoYGestor(idCaso, estado, gestor);
            setMensajeEstado(res.mensaje);
          }}
          onIrADiligenciarCaso={(idCaso) => {
            seleccionarCaso(idCaso);
            irADiligenciarConCliente();
          }}
        />
      )}

      {/* Popover flotante de selección de palabras (solo Jefe) */}
      {esJefe && (
        <PopoverVincularSeleccion
          seleccion={seleccionActiva}
          onConvertirEnVariableGlobal={convertirSeleccionEnVariableGlobal}
          onVincularCampoBD={vincularTextoSeleccionadoACampoBD}
          onCerrar={cerrarSeleccionMouse}
        />
      )}

      {/* Modales */}
      <ModalCrearDocumentoJudicial
        abierto={modalCrearDocAbierto}
        guardando={guardandoPlantilla}
        usuario={usuario}
        onCerrar={cerrarModalCrearDoc}
        onCrearDocumento={async (input) => {
          const res = await crearNuevoDocumentoYGuardar(input);
          setMensajeEstado(res.mensaje);
          if (res.ok) {
            setPasoFormatosJefe(2);
          }
        }}
      />

      <ModalConfiguracionIA
        abierto={modalIAAbierto}
        clavesActuales={clavesIA}
        proveedorForzadoActual={proveedorForzado}
        onCerrar={cerrarModalIA}
        onGuardar={guardarConfiguracionIA}
      />

      <ModalNuevoClienteTutela
        abierto={modalNuevoAbierto}
        guardando={guardandoNuevo}
        error={errorNuevo}
        onCerrar={cerrarModalNuevo}
        onCrear={async (input) => {
          const ok = await crearNuevoCaso(input);
          if (ok && seccionActiva === "diligenciar") {
            setPasoDiligenciar(3);
          }
          return ok;
        }}
      />
    </div>
  );
};
