import React from "react";
import { Users, UserCheck, ShieldAlert, Key } from "lucide-react";
import { Usuario } from "../types";

interface EquipoStatsBarProps {
  gestores: Usuario[];
}

export const EquipoStatsBar: React.FC<EquipoStatsBarProps> = ({ gestores }) => {
  const total = gestores.length;
  const activos = gestores.filter((g) => g.activo).length;
  const inactivos = total - activos;
  const permisosPromedio =
    total > 0
      ? (gestores.reduce((acc, g) => acc + g.permisos.length, 0) / total).toFixed(1)
      : "0";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3">
        <div className="p-2 bg-[#FACC15] border border-black text-black">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-neutral-600 block">
            Total Gestores
          </span>
          <span className="text-xl font-black text-black">{total}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3">
        <div className="p-2 bg-emerald-300 border border-black text-black">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-neutral-600 block">
            Gestores Activos
          </span>
          <span className="text-xl font-black text-emerald-800">{activos}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3">
        <div className="p-2 bg-neutral-200 border border-black text-black">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-neutral-600 block">
            Inactivos / Pausa
          </span>
          <span className="text-xl font-black text-neutral-700">{inactivos}</span>
        </div>
      </div>

      <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3">
        <div className="p-2 bg-black text-[#FACC15] border border-black">
          <Key className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-neutral-600 block">
            Promedio Atribuciones
          </span>
          <span className="text-xl font-black text-black">{permisosPromedio} / 6</span>
        </div>
      </div>
    </div>
  );
};
