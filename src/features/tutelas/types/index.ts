export type ModuloSistemaId = "tutelas" | "dashboard";

export type SeccionPrincipalTutela =
  | "diligenciar"
  | "formatos_jefe"
  | "clientes_bd"
  | "analitica_jefe";

export type EstadoCasoTutela =
  | "PENDIENTE"
  | "RESUELTO"
  | "DEVUELTO"
  | "PERDIDO";

export const ESTADOS_CASO_TUTELA: Array<{
  id: EstadoCasoTutela;
  etiqueta: string;
}> = [
  { id: "PENDIENTE", etiqueta: "Pendiente / En Trámite" },
  { id: "RESUELTO", etiqueta: "Resuelto / Fallado" },
  { id: "DEVUELTO", etiqueta: "Devuelto / En Corrección" },
  { id: "PERDIDO", etiqueta: "Perdido / Vencido" },
];

export type PasoFlujo = 1 | 2 | 3;

export interface DefinicionPasoFlujo {
  numero: PasoFlujo;
  titulo: string;
  subtitulo: string;
}

export type ProveedorIA = "gemini" | "claude" | "openai" | "groq" | "local";

export interface MapaClavesIA {
  principal?: string;
  gemini?: string;
  claude?: string;
  openai?: string;
  groq?: string;
}

export interface IntentoEjecucionIA {
  proveedor: ProveedorIA;
  modelo: string;
  exito: boolean;
  motivo?: string;
}

export type CampoBaseDatosId =
  | "radicado"
  | "clienteNombre"
  | "clienteDocumento"
  | "clienteEmail"
  | "clienteTelefono"
  | "clienteDireccion"
  | "clienteCiudad"
  | "entidadAccionada"
  | "derechoInvocado"
  | "hechosResumen"
  | "fechaRadicacion"
  | "funcionarioNombre"
  | "funcionarioCargo";

export interface DefinicionCampoBD {
  id: CampoBaseDatosId;
  etiqueta: string;
  categoria: "cliente" | "expediente" | "despacho";
  descripcion: string;
}

export const CAMPOS_BASE_DATOS: DefinicionCampoBD[] = [
  {
    id: "clienteNombre",
    etiqueta: "Nombre del Cliente (Accionante)",
    categoria: "cliente",
    descripcion: "Nombre completo del ciudadano que interpone la tutela",
  },
  {
    id: "clienteDocumento",
    etiqueta: "Cédula / Documento",
    categoria: "cliente",
    descripcion: "Número de cédula de ciudadanía o identificación",
  },
  {
    id: "clienteEmail",
    etiqueta: "Correo Electrónico",
    categoria: "cliente",
    descripcion: "Correo para notificaciones judiciales del accionante",
  },
  {
    id: "clienteTelefono",
    etiqueta: "Teléfono / Celular",
    categoria: "cliente",
    descripcion: "Contacto telefónico del ciudadano",
  },
  {
    id: "clienteDireccion",
    etiqueta: "Dirección de Residencia",
    categoria: "cliente",
    descripcion: "Dirección física registrada en el acta",
  },
  {
    id: "clienteCiudad",
    etiqueta: "Ciudad / Municipio",
    categoria: "cliente",
    descripcion: "Municipio de domicilio",
  },
  {
    id: "radicado",
    etiqueta: "Número de Radicado",
    categoria: "expediente",
    descripcion: "Código único de radicación de 23 dígitos",
  },
  {
    id: "entidadAccionada",
    etiqueta: "Entidad Accionada",
    categoria: "expediente",
    descripcion: "EPS, fondo de pensiones o entidad contra quien se dirige",
  },
  {
    id: "derechoInvocado",
    etiqueta: "Derecho Fundamental Invocado",
    categoria: "expediente",
    descripcion: "Derecho constitucional vulnerado",
  },
  {
    id: "hechosResumen",
    etiqueta: "Objeto / Pretensión del Caso",
    categoria: "expediente",
    descripcion: "Síntesis de la solicitud o medida requerida",
  },
  {
    id: "fechaRadicacion",
    etiqueta: "Fecha del Documento / Actuación",
    categoria: "expediente",
    descripcion: "Fecha formal del acta o auto",
  },
  {
    id: "funcionarioNombre",
    etiqueta: "Nombre del Juez / Funcionario",
    categoria: "despacho",
    descripcion: "Funcionario autenticado que suscribe el documento",
  },
  {
    id: "funcionarioCargo",
    etiqueta: "Cargo del Funcionario",
    categoria: "despacho",
    descripcion: "Cargo oficial en el Juzgado",
  },
];

export interface CasoTutelaDTO {
  id: string;
  radicado: string;
  clienteNombre: string;
  clienteDocumento: string;
  clienteEmail: string;
  clienteTelefono: string;
  clienteDireccion: string;
  clienteCiudad: string;
  entidadAccionada: string;
  derechoInvocado: string;
  hechosResumen: string;
  fechaRadicacion: string;
  estado: EstadoCasoTutela;
  gestorAsignadoNombre: string;
  gestorAsignadoCargo: string;
  diasTerminoRestantes: number;
}

export interface NuevoCasoTutelaInput {
  radicado: string;
  clienteNombre: string;
  clienteDocumento: string;
  clienteEmail: string;
  clienteTelefono: string;
  clienteDireccion: string;
  clienteCiudad: string;
  entidadAccionada: string;
  derechoInvocado: string;
  hechosResumen: string;
  fechaRadicacion: string;
  estado?: EstadoCasoTutela;
  gestorAsignadoNombre?: string;
}

export interface MetricasGlobalesDespacho {
  totalCasos: number;
  pendientes: number;
  resueltos: number;
  devueltos: number;
  perdidos: number;
  porcentajeResueltos: number;
  porcentajePendientes: number;
  porcentajeDevueltos: number;
  porcentajePerdidos: number;
  tasaEfectividadGlobal: number;
}

export interface MetricaRendimientoGestor {
  nombreGestor: string;
  cargoGestor: string;
  totalAsignados: number;
  pendientes: number;
  resueltos: number;
  devueltos: number;
  perdidos: number;
  tasaEfectividad: number;
  diasPromedioRestantes: number;
}

/**
 * Representa una palabra o frase del documento convertida en dato dinámico:
 * - Conserva siempre `textoOriginal` (nunca usa sintaxis {{}}).
 * - Puede vincularse a un `campoBD` (para llenarse al elegir un cliente)
 *   y/o tener un `valorPersonalizado` editable que cambia simultáneamente
 *   todas las apariciones de esa palabra en el documento.
 */
export interface VinculoDatoDocumento {
  id: string;
  textoOriginal: string;
  campoBD?: CampoBaseDatosId;
  etiquetaPersonalizada?: string;
  valorPersonalizado?: string;
  origen: "ia" | "seleccion_manual";
}

export interface ItemVinculoVisual {
  id: string;
  etiqueta: string;
  textoOriginal: string;
  textoMostrado: string;
  campoBD?: CampoBaseDatosId;
  valorPersonalizado?: string;
  fueReemplazado: boolean;
  ocurrencias: number;
  origen: "ia" | "seleccion_manual";
}

export interface ResultadoDeteccionIA {
  success: boolean;
  proveedorUsado: ProveedorIA;
  modeloUsado?: string;
  intentosRealizados?: IntentoEjecucionIA[];
  vinculosDetectados: Array<{
    textoOriginal: string;
    campoBD: CampoBaseDatosId;
  }>;
  mensaje: string;
}

export interface SeleccionTextoActiva {
  texto: string;
  textoOriginalBase: string;
  ocurrenciasEnDocumento: number;
  x: number;
  y: number;
}

export interface PlantillaDocumentoTutelaDTO {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  nombreArchivo: string;
  docxBase64: string;
  vinculos: VinculoDatoDocumento[];
  creadoPor: string;
  fechaActualizacion: string;
}

export interface GuardarPlantillaTutelaInput {
  id?: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  nombreArchivo: string;
  docxBase64: string;
  vinculos: VinculoDatoDocumento[];
  creadoPor: string;
}

export interface CrearDocumentoDesdeCeroInput {
  codigo: string;
  tituloFormato: string;
  descripcionFormato: string;
  tituloActoProcesal: string;
  parrafosCuerpo: string[];
  parrafosResuelve: string[];
  firmanteNombre: string;
  firmanteCargo: string;
}
