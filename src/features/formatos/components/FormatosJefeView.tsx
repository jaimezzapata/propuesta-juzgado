"use client";

import React, { useState } from "react";
import { useFormatosJefe } from "../hooks/useFormatosJefe";
import { FormatosMaestrosList } from "./FormatosMaestrosList";
import { AsignacionesDespachoList } from "./AsignacionesDespachoList";
import { CrearEditarFormatoModal } from "./CrearEditarFormatoModal";
import { AsignarFormatoModal } from "./AsignarFormatoModal";

interface FormatosJefeViewProps {
  jefeId: string;
}

export const FormatosJefeView: React.FC<FormatosJefeViewProps> = ({ jefeId }) => {
  const {
    formatos,
    asignaciones,
    gestores,
    isLoading,
    modalFormatoAbierto,
    setModalFormatoAbierto,
    formatoEditar,
    setFormatoEditar,
    formatoAsignar,
    setFormatoAsignar,
    guardarFormato,
    asignarAGestor,
  } = useFormatosJefe(jefeId);

  const [tab, setTab] = useState<"formatos" | "asignaciones">("formatos");

  if (isLoading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-black border-t-[#FACC15] animate-spin" />
        <span className="text-xs font-bold uppercase text-black">
          Cargando formatos del despacho...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Selector de Pestaña Brutalista */}
      <div className="flex border-b-2 border-black gap-2">
        <button
          type="button"
          onClick={() => setTab("formatos")}
          className={`px-4 py-2 font-black uppercase text-xs border-2 border-b-0 border-black transition-all ${
            tab === "formatos"
              ? "bg-[#FACC15] text-black shadow-[2px_-2px_0px_#000]"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          Formatos Maestros ({formatos.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("asignaciones")}
          className={`px-4 py-2 font-black uppercase text-xs border-2 border-b-0 border-black transition-all ${
            tab === "asignaciones"
              ? "bg-[#FACC15] text-black shadow-[2px_-2px_0px_#000]"
              : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          Asignaciones a Gestores ({asignaciones.length})
        </button>
      </div>

      {tab === "formatos" ? (
        <FormatosMaestrosList
          formatos={formatos}
          onCrear={() => {
            setFormatoEditar(null);
            setModalFormatoAbierto(true);
          }}
          onEditar={(f) => {
            setFormatoEditar(f);
            setModalFormatoAbierto(true);
          }}
          onAsignar={(f) => setFormatoAsignar(f)}
        />
      ) : (
        <AsignacionesDespachoList asignaciones={asignaciones} />
      )}

      <CrearEditarFormatoModal
        isOpen={modalFormatoAbierto}
        onClose={() => {
          setModalFormatoAbierto(false);
          setFormatoEditar(null);
        }}
        formato={formatoEditar}
        onGuardar={guardarFormato}
      />

      <AsignarFormatoModal
        formato={formatoAsignar}
        gestores={gestores}
        onClose={() => setFormatoAsignar(null)}
        onAsignar={asignarAGestor}
      />
    </div>
  );
};
