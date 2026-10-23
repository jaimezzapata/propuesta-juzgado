"use client";

import React, { useState } from "react";
import { Scale, LogIn, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { SesionUsuario } from "../types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface LoginViewProps {
  perfiles: SesionUsuario[];
  onLogin: (email: string, clave?: string) => Promise<boolean>;
  isSubmitting: boolean;
  error: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  perfiles,
  onLogin,
  isSubmitting,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("123456");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await onLogin(email, clave);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-3 border-[#0F172A] shadow-[8px_8px_0px_#0F172A]">
        {/* Cabecera Brutalista con Paleta Judicial */}
        <div className="bg-[#0F2537] border-b-3 border-[#0F172A] p-6 text-white flex items-center gap-3">
          <div className="p-2.5 bg-[#9A7B3E] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9A7B3E] block">
              Rama Judicial de Colombia
            </span>
            <h1 className="text-xl font-black uppercase tracking-tight text-white">
              Juzgado 4° de Familia
            </h1>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0F172A]">
              Autenticación Institucional
            </h2>
            <p className="text-xs font-semibold text-neutral-600 mt-0.5">
              Ingrese con sus credenciales o seleccione su perfil asignado.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-[#6B1D2F] text-[#6B1D2F] font-bold text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="usuario@ramajudicial.gov.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Contraseña Judicial"
              type="password"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              helperText="Clave por defecto de demostración: 123456"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="mt-2 w-full flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Ingresar al Despacho
            </Button>
          </form>

          {/* Acceso Rápido por Perfil */}
          <div className="pt-4 border-t-2 border-[#0F172A]">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0F172A] block mb-2">
              Perfiles Activos en el Despacho:
            </span>
            <div className="flex flex-col gap-2">
              {perfiles.map((p) => {
                const esJefe = p.rol === "JEFE_DESPACHO";
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onLogin(p.email, "123456")}
                    disabled={isSubmitting}
                    className={`p-2.5 border-2 border-[#0F172A] flex items-center justify-between text-left transition-all ${
                      esJefe
                        ? "bg-[#0F2537] text-white hover:bg-[#183952] shadow-[2px_2px_0px_#0F172A]"
                        : "bg-white hover:bg-neutral-100 text-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1 ${esJefe ? "bg-[#9A7B3E] text-white" : "bg-[#0F172A] text-white"}`}>
                        {esJefe ? (
                          <ShieldCheck className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className={`text-xs font-black block leading-tight ${esJefe ? "text-white" : "text-[#0F172A]"}`}>
                          {p.nombre}
                        </span>
                        <span className={`text-[10px] font-bold ${esJefe ? "text-[#9A7B3E]" : "text-neutral-600"}`}>
                          {p.cargo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={esJefe ? "gold" : "slate"} size="sm">
                        {esJefe ? "Jefe" : "Gestor"}
                      </Badge>
                      <ArrowRight className={`w-3.5 h-3.5 ${esJefe ? "text-[#9A7B3E]" : "text-[#0F172A]"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
