import React from "react";
import { Scale, LogOut, ShieldCheck, UserCheck } from "lucide-react";
import { SesionUsuario } from "@/features/auth/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TopBarProps {
  usuario: SesionUsuario;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ usuario, onLogout }) => {
  const esJefe = usuario.rol === "JEFE_DESPACHO";

  return (
    <header className="bg-black text-white border-b-3 border-black p-4 mb-6 shadow-[0px_4px_0px_#000]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FACC15] text-black border border-black">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] block">
              Rama Judicial de Colombia // Distrito Medellín
            </span>
            <span className="text-base font-black uppercase text-white tracking-tight">
              Juzgado 4° de Familia de Oralidad
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white text-black">
              {esJefe ? (
                <ShieldCheck className="w-4 h-4 text-black" />
              ) : (
                <UserCheck className="w-4 h-4 text-black" />
              )}
            </div>
            <div className="text-left">
              <span className="text-xs font-black text-white block leading-tight">
                {usuario.nombre}
              </span>
              <span className="text-[10px] font-bold text-neutral-400">
                {usuario.cargo}
              </span>
            </div>
            <Badge variant={esJefe ? "yellow" : "white"} size="sm">
              {esJefe ? "Jefe de Despacho" : "Gestor"}
            </Badge>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs"
            title="Cerrar Sesión Judicial"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
};
