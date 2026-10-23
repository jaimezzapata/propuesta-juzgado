import React from "react";
import { FileText, Plus, Edit3, Send } from "lucide-react";
import { FormatoMaestro } from "../types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface FormatosMaestrosListProps {
  formatos: FormatoMaestro[];
  onCrear: () => void;
  onEditar: (formato: FormatoMaestro) => void;
  onAsignar: (formato: FormatoMaestro) => void;
}

export const FormatosMaestrosList: React.FC<FormatosMaestrosListProps> = ({
  formatos,
  onCrear,
  onEditar,
  onAsignar,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
        <div>
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            Formatos Maestros del Despacho Judicial
          </h2>
          <p className="text-xs font-semibold text-neutral-600 mt-0.5">
            Plantillas oficiales autorizadas por el Dr. Juan Pablo Velásquez.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onCrear} className="flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Crear Nuevo Formato
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formatos.map((f) => (
          <div
            key={f.id}
            className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <Badge variant="black" size="sm">
                  {f.codigo}
                </Badge>
                <Badge variant="yellow" size="sm">
                  {f.tipo.replace(/_/g, " ")}
                </Badge>
              </div>

              <h3 className="text-sm font-black text-black mt-3 leading-snug">
                {f.titulo}
              </h3>
              <p className="text-xs font-medium text-neutral-700 mt-1.5 leading-relaxed">
                {f.descripcion}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEditar(f)}
                className="flex items-center gap-1 text-[11px]"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editar Plantilla
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAsignar(f)}
                className="flex items-center gap-1 text-[11px]"
              >
                <Send className="w-3.5 h-3.5" />
                Asignar a Gestor
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
