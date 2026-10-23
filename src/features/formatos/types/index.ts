export type TipoFormato =
  | "AUTO_ADMISORIO"
  | "MEDIDA_PROVISIONAL"
  | "AUTO_TRASLADO"
  | "PROYECTO_SENTENCIA"
  | "OTRO";

export type EstadoAsignacion = "ASIGNADO" | "EN_PROCESO" | "COMPLETADO";

export interface FormatoMaestro {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  tipo: TipoFormato;
  plantilla: string;
  activo: boolean;
  creadoPorId: string;
  creadoPor?: {
    id: string;
    nombre: string;
    cargo: string;
  };
  fechaCreacion: Date | string;
  fechaActualizacion: Date | string;
}

export interface FormatoAsignado {
  id: string;
  radicado: string;
  accionante?: string | null;
  accionado?: string | null;
  instruccionesJefe?: string | null;
  contenidoDiligenciado?: string | null;
  estado: EstadoAsignacion;
  formatoId: string;
  formato: FormatoMaestro;
  gestorId: string;
  gestor: {
    id: string;
    nombre: string;
    cargo: string;
    email: string;
  };
  asignadoPorId: string;
  asignadoPor?: {
    id: string;
    nombre: string;
  };
  fechaAsignacion: Date | string;
  fechaActualizacion: Date | string;
}

export interface FormFormatoMaestroValues {
  codigo: string;
  titulo: string;
  descripcion: string;
  tipo: TipoFormato;
  plantilla: string;
}

export interface FormAsignarValues {
  formatoId: string;
  gestorId: string;
  radicado: string;
  accionante: string;
  accionado: string;
  instrucciones: string;
}
