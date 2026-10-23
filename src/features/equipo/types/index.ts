export type Rol = "JEFE_DESPACHO" | "GESTOR";

export type Permiso =
  | "RADICAR_EXPEDIENTES"
  | "ANALIZAR_TUTELAS"
  | "GENERAR_PROVIDENCIAS"
  | "APROBAR_PROVIDENCIAS"
  | "ADMINISTRAR_EQUIPO"
  | "CONFIGURAR_DESPACHO";

export interface Usuario {
  id: string;
  nombre: string;
  documento?: string | null;
  cargo: string;
  email: string;
  rol: Rol;
  activo: boolean;
  permisos: Permiso[];
  fechaCreacion: Date | string;
  fechaActualizacion: Date | string;
}

export interface PermisoInfo {
  id: Permiso;
  nombre: string;
  descripcion: string;
  categoria: "Operativo" | "Decisorio" | "Administración";
}

export const LISTA_PERMISOS: PermisoInfo[] = [
  {
    id: "RADICAR_EXPEDIENTES",
    nombre: "Radicación de Expedientes",
    descripcion: "Registrar y digitalizar tutelas con código de 23 dígitos.",
    categoria: "Operativo",
  },
  {
    id: "ANALIZAR_TUTELAS",
    nombre: "Análisis Fáctico y Criterios",
    descripcion: "Examinar derechos invocados, urgencias y medidas cautelares.",
    categoria: "Operativo",
  },
  {
    id: "GENERAR_PROVIDENCIAS",
    nombre: "Generación de Borradores IA",
    descripcion: "Compilar borradores de autos admisiorios y sentencias.",
    categoria: "Operativo",
  },
  {
    id: "APROBAR_PROVIDENCIAS",
    nombre: "Aprobación y Visto Bueno",
    descripcion: "Validar borradores para firma oficial del Juez.",
    categoria: "Decisorio",
  },
  {
    id: "ADMINISTRAR_EQUIPO",
    nombre: "Administración del Personal",
    descripcion: "Crear perfiles de gestores y gestionar sus permisos.",
    categoria: "Administración",
  },
  {
    id: "CONFIGURAR_DESPACHO",
    nombre: "Configuración del Juzgado",
    descripcion: "Modificar membretes, parámetros judiciales y plantillas.",
    categoria: "Administración",
  },
];

export interface FormGestorValues {
  nombre: string;
  documento: string;
  cargo: string;
  email: string;
  permisos: Permiso[];
}
