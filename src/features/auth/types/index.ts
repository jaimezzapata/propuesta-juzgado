import { Rol } from "@/features/equipo/types";

export interface SesionUsuario {
  id: string;
  nombre: string;
  email: string;
  cargo: string;
  rol: Rol;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  usuario?: SesionUsuario;
}
