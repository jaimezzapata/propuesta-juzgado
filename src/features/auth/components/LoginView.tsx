"use client";

import React, { useState } from "react";
import { Scale, Lock, LogIn, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
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
      <div className="w-full max-w-md bg-white border-3 border-black shadow-[8px_8px_0px_#000]">
        {/* Cabecera Brutalista */}
        <div className="bg-[#FACC15] border-b-3 border-black p-6 text-black flex items-center gap-3">
          <div className="p-2.5 bg-black text-[#FACC15] border-2 border-black">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-800 block">
              Rama Judicial de Colombia
            </span>
            <h1 className="text-xl font-black uppercase tracking-tight text-black">
              Juzgado 4° de Familia
            </h1>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-black">
              Autenticación Institucional
            </h2>
            <p className="text-xs font-semibold text-neutral-600 mt-0.5">
              Ingrese con sus credenciales o seleccione su perfil asignado.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-600 text-red-900 font-bold text-xs">
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
          <div className="pt-4 border-t-2 border-black">
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-700 block mb-2">
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
                    className={`p-2.5 border-2 border-black flex items-center justify-between text-left transition-all ${
                      esJefe
                        ? "bg-[#FACC15] hover:bg-[#F5C518] shadow-[2px_2px_0px_#000]"
                        : "bg-white hover:bg-neutral-100 shadow-[2px_2px_0px_#000]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 bg-black text-white">
                        {esJefe ? (
                          <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
                        ) : (
                          <UserCheck className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-black text-black block leading-tight">
                          {p.nombre}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-800">
                          {p.cargo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={esJefe ? "black" : "neutral"} size="sm">
                        {esJefe ? "Jefe" : "Gestor"}
                      </Badge>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
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
