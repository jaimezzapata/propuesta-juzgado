import React from "react";
import { ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";
import { Usuario, LISTA_PERMISOS } from "../types";
import { Badge } from "@/components/ui/Badge";

interface JefeProfileCardProps {
  jefe: Usuario | null;
}

export const JefeProfileCard: React.FC<JefeProfileCardProps> = ({ jefe }) => {
  if (!jefe) return null;

  return (
    <div className="bg-[#FACC15] border-3 border-black shadow-[6px_6px_0px_#000] p-6 text-black flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-black text-[#FACC15] border-2 border-black shadow-[2px_2px_0px_#000]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-black uppercase tracking-tight text-black">
              {jefe.nombre}
            </h2>
            <Badge variant="black" size="md">
              Jefe de Despacho
            </Badge>
          </div>
          <p className="text-sm font-bold text-neutral-900 mt-0.5">
            {jefe.cargo}
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-800 mt-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-black" />
              {jefe.email}
            </span>
            {jefe.documento && (
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-black" />
                C.C. {jefe.documento}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] w-full md:w-auto">
        <span className="text-[11px] font-black uppercase tracking-wider block text-neutral-600 mb-1">
          Facultades de Autoridad:
        </span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-bold text-black">
          {LISTA_PERMISOS.map((p) => (
            <span key={p.id} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              {p.nombre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
