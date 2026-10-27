export type Rol = "JEFE_DESPACHO" | "GESTOR";

export type Permiso =
  | "RADICAR_EXPEDIENTES"
  | "ANALIZAR_TUTELAS"
  | "GENERAR_PROVIDENCIAS"
  | "APROBAR_PROVIDENCIAS"
  | "ADMINISTRAR_EQUIPO"
  | "CONFIGURAR_DESPACHO";

export interface SesionUsuario {
  id: string;
  nombre: string;
  email: string;
  cargo: string;
  rol: Rol;
  documento?: string | null;
  permisos?: Permiso[];
}

export interface LoginResult {
  success: boolean;
  error?: string;
  usuario?: SesionUsuario;
}

