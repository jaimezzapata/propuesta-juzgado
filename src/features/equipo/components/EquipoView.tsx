"use client";

import React from "react";
import { Scale } from "lucide-react";
import { useEquipo } from "../hooks/useEquipo";
import { JefeProfileCard } from "./JefeProfileCard";
import { EquipoStatsBar } from "./EquipoStatsBar";
import { GestoresList } from "./GestoresList";
import { CrearGestorModal } from "./CrearGestorModal";
import { EditarPermisosModal } from "./EditarPermisosModal";

export const EquipoView: React.FC = () => {
  const {
    jefe,
    gestores,
    isLoading,
    error,
    busqueda,
    setBusqueda,
    filtroActivo,
    setFiltroActivo,
    modalCrearAbierto,
    setModalCrearAbierto,
    gestorEditar,
    setGestorEditar,
    recargar,
    alternarEstado,
    guardarPermisos,
    eliminarGestor,
  } = useEquipo();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-black border-t-[#FACC15] animate-spin" />
        <span className="text-xs font-black uppercase tracking-wider text-black">
          Cargando despacho y equipo judicial...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-2 border-red-600 p-5 text-red-950 font-bold max-w-lg mx-auto my-10 shadow-[4px_4px_0px_#000]">
        <h3 className="uppercase text-sm mb-1">Error de conexión</h3>
        <p className="text-xs">{error}</p>
        <button
          onClick={recargar}
          className="mt-3 px-3 py-1.5 bg-black text-white text-xs uppercase font-bold border border-black shadow-[2px_2px_0px_#000]"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado Institucional */}
      <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#FACC15] border-2 border-black">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">
              Rama Judicial de Colombia // Juzgado 4° de Familia
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black">
              Gestión del Despacho y Equipo de Gestores
            </h1>
          </div>
        </div>
      </div>

      {/* Tarjeta del Jefe de Despacho (Dr. Juan Pablo Velásquez) */}
      <JefeProfileCard jefe={jefe} />

      {/* Métricas y resumen del equipo */}
      <EquipoStatsBar gestores={gestores} />

      {/* Lista interactiva de gestores con filtros */}
      <GestoresList
        gestores={gestores}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtroActivo={filtroActivo}
        setFiltroActivo={setFiltroActivo}
        onAbrirCrear={() => setModalCrearAbierto(true)}
        onEditarPermisos={(g) => setGestorEditar(g)}
        onAlternarEstado={alternarEstado}
        onEliminar={eliminarGestor}
      />

      {/* Modal para crear nuevo gestor */}
      <CrearGestorModal
        isOpen={modalCrearAbierto}
        onClose={() => setModalCrearAbierto(false)}
        onCreado={recargar}
      />

      {/* Modal para modificar permisos de gestor */}
      <EditarPermisosModal
        gestor={gestorEditar}
        onClose={() => setGestorEditar(null)}
        onGuardar={guardarPermisos}
      />
    </div>
  );
};
