// Datos maestros de la Propuesta Técnica - Juzgado de Familia 4 x SENA

export const PROPOSAL_META = {
  radicado: "EXP-2026-F04-IA-SENA",
  version: "1.2.0",
  fecha: "Octubre 2026",
  institucionReceptora: "Juzgado de Familia 4",
  equipoEjecutor: "Semillero de Investigación SENA (Instructores & Aprendices)",
  responsableDesarrollo: "Semillero de Investigación - Fábrica de Software SENA",
  contraparte: "Juzgado de Familia 4 (Jefe de Despacho & Sustanciadores)",
  estado: "PROPUESTA TÉCNICA OFICIAL (AJUSTADA POST-REUNIÓN)",
  fechaLimiteSprint: "5 de Diciembre de 2026",
  proximaVisitaUrgente: "Jueves 29 de Octubre de 2026"
};

export const MOCK_TUTELA_CASES = [
  {
    id: "caso-1",
    titulo: "Medicamento Oncológico no Suministrado",
    accionante: "María Elena Restrepo Gómez",
    identificacion: "CC. 43.890.123",
    accionado: "EPS Salud Total Ficticia S.A.",
    derechosVulnerados: ["Salud en Conexidad con la Vida", "Seguridad Social", "Dignidad Humana"],
    pretension: "Entrega inmediata del medicamento Pembrolizumab 100mg y tratamiento integral continuo sin dilaciones.",
    hechos: "La accionante es paciente diagnosticada con melanoma metastásico en estadio IV. Su médico tratante adscrito ordenó el suministro inmediato del fármaco. La entidad accionada ha emitido tres órdenes de autorización que posteriormente son anuladas por fallas en su plataforma de dispensación.",
    medidaCautelar: true,
    medidaCautelarTexto: "Ordenar a la EPS que en el término perentorio de 24 horas entregue los viales prescritos para el ciclo de quimioterapia programado.",
    tipoDocumento: "Auto Admisorio con Medida Provisional"
  },
  {
    id: "caso-2",
    titulo: "Transporte y Alojamiento para Menor de Edad",
    accionante: "Carlos Alberto Mejía Duque",
    identificacion: "CC. 71.234.567",
    accionado: "Nueva EPS Ficticia Regional Antioquia",
    derechosVulnerados: ["Derechos Prevalentes de los Niños", "Salud", "Vida Digna"],
    pretension: "Viáticos completos de transporte intermunicipal, hospedaje y alimentación para el menor y un acompañante desde municipio rural hasta hospital de III nivel.",
    hechos: "El menor de 6 años padece cardiopatía congénita severa y requiere controles mensuales en centro cardiovascular especializado a 180 km de su lugar de residencia. Los padres carecen de capacidad económica comprobada según puntaje Sisbén A1.",
    medidaCautelar: false,
    medidaCautelarTexto: "",
    tipoDocumento: "Auto Admisorio y Requerimiento de Informes"
  },
  {
    id: "caso-3",
    titulo: "Insumos y Silla de Ruedas para Adulto Mayor",
    accionante: "Rosa Inés Morales Vda. de Ruiz",
    identificacion: "CC. 21.456.789",
    accionado: "Savia Salud Ficticia EPS",
    derechosVulnerados: ["Vida Digna", "Salud", "Protección Especial al Adulto Mayor"],
    pretension: "Dotación bimensual de pañales desechables tipo sabanilla, crema antiescaras y asignación de silla de ruedas neurológica prescrita por fisiatría.",
    hechos: "La accionante de 84 años sufrió Accidente Cerebrovascular isquémico que le causó hemiplejía total e incontinencia. Su única cuidadora es su hija quien devenga menos de un salario mínimo.",
    medidaCautelar: true,
    medidaCautelarTexto: "Disponer la entrega preventiva de insumos para evitar laceraciones dérmicas y deterioro de la salud.",
    tipoDocumento: "Proyecto de Sentencia de Tutela (Fallo)"
  },
  {
    id: "caso-4",
    titulo: "Negativa de Grado y Derecho a la Educación",
    accionante: "Andrés Felipe Gómez Restrepo",
    identificacion: "CC. 1.020.345.678",
    accionado: "Institución Universitaria Metropolitana",
    derechosVulnerados: ["Educación", "Debido Proceso Administrativo", "Igualdad"],
    pretension: "Inclusión inmediata en la ceremonia de graduación o expedición del acta de grado por ventanilla al haber completado el 100% de los créditos y requisitos.",
    hechos: "El accionante cursó y aprobó la totalidad del plan de estudios del programa de Derecho. La universidad condiciona su titulación al pago retroactivo de un ajuste arancelario no contemplado en el reglamento estudiantil vigente.",
    medidaCautelar: false,
    medidaCautelarTexto: "",
    tipoDocumento: "Auto Admisorio y Requerimiento de Informes"
  },
  {
    id: "caso-5",
    titulo: "Pago Oportuno de Licencia de Maternidad",
    accionante: "Laura Sofía Martínez Gil",
    identificacion: "CC. 32.789.012",
    accionado: "EPS Sanitas Ficticia S.A.",
    derechosVulnerados: ["Mínimo Vital de la Madre y el Recién Nacido", "Seguridad Social"],
    pretension: "Liquidación y pago inmediato de las 18 semanas de licencia de maternidad legalmente causadas.",
    hechos: "La accionante dio a luz el 15 de enero de 2026. Cotizó ininterrumpidamente durante todo el período de gestación como trabajadora dependiente. La EPS se niega a cancelar la prestación económica alegando inconsistencias en la planilla PILA del empleador ya subsanadas.",
    medidaCautelar: true,
    medidaCautelarTexto: "Ordenar el giro inmediato del subsidio económico de maternidad en favor de la accionante y su hijo recién nacido.",
    tipoDocumento: "Proyecto de Sentencia de Tutela (Fallo)"
  }
];

export const AI_PROVIDERS = {
  gemini: {
    id: "gemini",
    nombre: "Google Gemini API (Prototipado Ágil)",
    proveedor: "Google Cloud Platform",
    tagline: "Ruta de inicio rápido recomendada para la fase inicial del MVP",
    ventajas: [
      "Disponibilidad inmediata de API keys sin burocracia de licenciamiento",
      "Experiencia previa consolidada del equipo técnico del SENA",
      "Ventana de contexto ultra amplia (ideal para expedientes extensos)",
      "Capacidad multimodal nativa para anexos escaneados en PDF",
      "Costo cero en capa de prototipado experimental"
    ],
    desventajas: [
      "Requiere validación posterior si el Juzgado exige infraestructura 100% Microsoft para producción"
    ],
    disponibilidad: "Inmediata (Sin trámite de licencias previas)",
    arquitecturaPath: "Cliente React -> Backend Express -> Gemini 1.5 Pro / Flash -> JSON estructurado",
    color: "#0055ff",
    badge: "INICIO RÁPIDO RECOMENDADO"
  },
  azure: {
    id: "azure",
    nombre: "Azure OpenAI (Licenciamiento Institucional)",
    proveedor: "Microsoft Azure Gov / Rama Judicial",
    tagline: "Ruta sujeta a confirmación de licencias activas del Juzgado",
    ventajas: [
      "Alineación con el ecosistema corporativo Microsoft 365 de la Rama Judicial",
      "Acuerdos de confidencialidad institucional preexistentes con Microsoft",
      "Aislamiento de red mediante Azure Private Endpoints",
      "Modelos GPT-4o / GPT-4o-mini con alta precisión jurídica"
    ],
    desventajas: [
      "Sujeto a gestión y aprobación de credenciales por la Dirección Ejecutiva de Administración Judicial (DEAJ)",
      "Dependencia externa previa para habilitar la conexión con el modelo"
    ],
    disponibilidad: "Sujeta a entrega de credenciales por el Juzgado",
    arquitecturaPath: "Cliente React -> Backend Express -> Azure OpenAI Service (Tenant Rama Judicial) -> JSON estructurado",
    color: "#ff6b00",
    badge: "SUJETO A LICENCIAS JUDICIALES"
  }
};

export const TEAM_ROLES = [
  {
    rol: "Fábrica de Software SENA",
    categoria: "DESARROLLO TECNOLÓGICO",
    responsables: "Equipo de Desarrollo de Software SENA",
    compromiso: "Diseño, construcción, integración de IA y aseguramiento de la calidad del software",
    tareas: [
      "Diseño y arquitectura completa de la aplicación web (Frontend, Backend, BD)",
      "Ingeniería de prompts jurídicos y conexión con los modelos de Inteligencia Artificial",
      "Construcción del Backend seguro en Node.js/Express y sanitización de datos",
      "Implementación de protocolos de seguridad y modelado de datos sintéticos (Mock Data)",
      "Pruebas de software, control de calidad, corrección de incidencias y entrega del MVP",
      "Soporte técnico y acompañamiento durante la fase de validación funcional"
    ],
    color: "#FFE600",
    badge: "DESARROLLO & INGENIERÍA"
  },
  {
    rol: "Juzgado de Familia 4",
    categoria: "VALIDACIÓN & ALCANCE",
    responsables: "Despacho Judicial (Juez y Equipo de Sustanciación)",
    compromiso: "Definición de criterios jurídicos, retroalimentación y validación funcional",
    tareas: [
      "Definición de las variables críticas y estructura jurídica de las Tutelas (MVP)",
      "Validación de la coherencia legal en los borradores y citas jurisprudenciales generadas",
      "Retroalimentación funcional en cada demostración periódica de entregables",
      "Ejecución de pruebas de validación con datos reales directamente en el despacho",
      "Emisión del visto bueno formal para la recepción del software"
    ],
    color: "#2563EB",
    badge: "CONTRAPARTE FUNCIONAL"
  }
];

export const RACI_MATRIX = [
  {
    actividad: "Definición de Requisitos y Formatos de Tutelas",
    sena: "Consulted (C)",
    juzgado: "Responsible / Accountable (R/A)"
  },
  {
    actividad: "Arquitectura de Software y Stack Tecnológico",
    sena: "Responsible / Accountable (R/A)",
    juzgado: "Informed (I)"
  },
  {
    actividad: "Orquestación y Conexión de Modelos de IA (Gemini / Azure)",
    sena: "Responsible / Accountable (R/A)",
    juzgado: "Consulted (C)"
  },
  {
    actividad: "Protocolo de Seguridad y Aislamiento de Datos (Mocking)",
    sena: "Responsible / Accountable (R/A)",
    juzgado: "Accountable / Validador (A)"
  },
  {
    actividad: "Desarrollo Frontend (UI/UX) y Backend (APIs)",
    sena: "Responsible / Accountable (R/A)",
    juzgado: "Informed (I)"
  },
  {
    actividad: "Validación Jurídica de Borradores de Providencias",
    sena: "Consulted / Soporte (C)",
    juzgado: "Responsible / Accountable (R/A exclusivo del Juzgado)"
  },
  {
    actividad: "Despliegue y Aceptación Final del MVP",
    sena: "Responsible (R)",
    juzgado: "Accountable / Aprobación (A)"
  }
];

export const RESEARCH_TEAM = [
  {
    id: "jaime-zapata",
    nombre: "Jaime Alberto Zapata Valencia",
    iniciales: "JZ",
    color: "#fde047",
    categoria: "Instructor Investigador"
  },
  {
    id: "jhon-valencia",
    nombre: "Jhon Freddy Valencia Gomez",
    iniciales: "JV",
    color: "#93c5fd",
    categoria: "Instructor Investigador"
  },
  {
    id: "deymer-miranda",
    nombre: "Deymer Miranda Montoya",
    iniciales: "DM",
    color: "#86efac",
    categoria: "Instructor Investigador"
  }
];

// Espacio reservado para Aprendices del Semillero (Máximo 3)
export const APPRENTICES_TEAM = [
  {
    id: "aprendiz-1",
    cupo: "Aprendiz Investigador 1",
    estado: "Por asignar (En vinculación)",
    iniciales: "A1"
  },
  {
    id: "aprendiz-2",
    cupo: "Aprendiz Investigador 2",
    estado: "Por asignar (En vinculación)",
    iniciales: "A2"
  },
  {
    id: "aprendiz-3",
    cupo: "Aprendiz Investigador 3",
    estado: "Por asignar (En vinculación)",
    iniciales: "A3"
  }
];

// Cronograma de Trabajo y Reuniones Clave
export const PROJECT_SCHEDULE = [
  {
    id: "visita-urgente",
    fecha: "Jueves 29 de Octubre de 2026",
    titulo: "Visita Técnica y Delimitación Precisa del Alcance",
    prioridad: "URGENTE",
    objetivo: "Reunión presencial en el Juzgado de Familia 4 para delimitar de manera exhaustiva el alcance del MVP, recolectar los formatos oficiales con líneas resaltadas y formalizar las reglas del flujo de trabajo.",
    entregables: ["Delimitación final del backlog", "Mapeo de variables en documentos base", "Definición de permisos Jefe vs Sustanciador"],
    estado: "PROGRAMADA - CRÍTICA"
  },
  {
    id: "seguimiento-nov",
    fecha: "Miércoles 18 de Noviembre de 2026",
    titulo: "Demostración de Avances Semillero SENA",
    prioridad: "SEGUIMIENTO",
    objetivo: "Sesión de prueba del prototipo funcional con el equipo judicial: validación del módulo de audio a texto, precisión del sustituidor de líneas resaltadas y corrección de prompts.",
    entregables: ["Demostración funcional del MVP", "Revisión de velocidad y reducción de clics", "Ajustes de retroalimentación"],
    estado: "PENDIENTE"
  },
  {
    id: "cierre-trimestre",
    fecha: "Viernes 5 de Diciembre de 2026",
    titulo: "Cierre Trimestral y Entrega de Módulos Consolidados",
    prioridad: "ENTREGA FORMAL",
    objetivo: "Cierre del ciclo académico del Semillero de Investigación SENA. Entrega formal de lo consolidado en el periodo: aplicación web operativa, métricas de plantillas y protocolos de privacidad local.",
    entregables: ["Código fuente documentado", "Manual de usuario para Jefe y Sustanciadores", "Informe final de investigación aplicada"],
    estado: "HITO FINAL TRIMESTRE"
  }
];

// Jerarquía de Roles y Control de Acceso (Admin / Jefe vs Trabajadores)
export const ROLE_HIERARCHY = {
  admin: {
    nombre: "Administrador / Jefe de Despacho (Juez)",
    descripcion: "Control total y gobernanza de los formatos judiciales y analítica del despacho.",
    permisos: [
      "Crear nuevas plantillas maestras y definir variables con líneas resaltadas",
      "Editar y modificar la redacción base de las plantillas oficiales (Exclusivo)",
      "Asignar plantillas específicas a cada funcionario o sustanciador",
      "Consultar el panel de métricas, estadísticas de uso y tiempos de respuesta por plantilla",
      "Aprobar y emitir el visto bueno final de los documentos antes de firma"
    ]
  },
  trabajador: {
    nombre: "Sustanciador / Funcionario Judicial",
    descripcion: "Operación ágil del despacho: generación y diligenciamiento de providencias en mínimos clics.",
    permisos: [
      "Gestionar casos utilizando las plantillas asignadas por el Jefe",
      "Cargar hechos, expedientes o grabaciones de audio del caso",
      "Recibir correcciones y sugerencias del Asistente de Prompts para evitar alucinaciones",
      "Generar en 1 clic el documento final con las variables sustituidas",
      "Descargar el documento terminado (.docx / PDF) listo para revisión del Juez",
      "Restricción de seguridad: No puede alterar ni borrar la plantilla maestra oficial"
    ]
  }
};

// Métricas de Uso de Plantillas para el Perfil Administrador
export const TEMPLATE_USAGE_METRICS = [
  {
    id: "medida-salud",
    plantilla: "Auto Admisorio con Medida Provisional (Salud)",
    usosMes: 142,
    tiempoPromedioMin: 3.5,
    tasaAprobacionDirecta: "94%",
    sustanciadoresAsignados: 4,
    ahorroHorasMes: 68
  },
  {
    id: "auto-tramite",
    plantilla: "Auto Admisorio y Requerimiento de Informes",
    usosMes: 98,
    tiempoPromedioMin: 2.8,
    tasaAprobacionDirecta: "97%",
    sustanciadoresAsignados: 5,
    ahorroHorasMes: 45
  },
  {
    id: "fallo-salud",
    plantilla: "Proyecto de Sentencia Tutela (Fallo de Fondo)",
    usosMes: 64,
    tiempoPromedioMin: 6.2,
    tasaAprobacionDirecta: "91%",
    sustanciadoresAsignados: 3,
    ahorroHorasMes: 52
  }
];

// Base de Conocimiento Legal Integrada (Para anclar la IA y evitar alucinaciones)
export const LEGAL_KNOWLEDGE_BASE = [
  {
    norma: "Decreto 2591 de 1991",
    ambito: "Reglamentario de la Acción de Tutela (Arts. 1 a 56)",
    aplicacion: "Plazos perentorios de 10 días, procedencia de medidas provisionales inmediatas."
  },
  {
    norma: "Decreto 1069 de 2015 / Dto. 333 de 2021",
    ambito: "Reglas de Reparto de Acciones Constitucionales",
    aplicacion: "Competencia de Juzgados de Familia frente a entidades de orden nacional/departamental."
  },
  {
    norma: "Ley Estatutaria 1751 de 2015",
    ambito: "Derecho Fundamental a la Salud",
    aplicacion: "Principio de integralidad, continuidad del tratamiento y sujetos de especial protección."
  },
  {
    norma: "Sentencias Hito Corte Constitucional",
    ambito: "Jurisprudencia Vinculante (T-760/08, SU-508/20, T-016/22)",
    aplicacion: "Criterios unificados para exoneración de copagos, transporte y medicamentos no PBS."
  }
];

// Nuevas Funcionalidades Específicas Acordadas en la Reunión
export const CORE_NEW_FEATURES = [
  {
    id: "lineas-resaltadas",
    titulo: "Sustitución en Documento Base con Líneas Resaltadas",
    tagline: "Preservación total del texto legal original del despacho",
    descripcion: "El Jefe carga su plantilla con fragmentos resaltados en amarillo (datos variables). La IA analiza el caso y sustituye única y exclusivamente esas líneas, dejando intacto el rigor normativo preaprobado por el Juez."
  },
  {
    id: "anti-alucinacion-prompt",
    titulo: "Generación de Prompts Exactos & Asistente Corrector",
    tagline: "Independiente de la destreza de redacción del usuario",
    descripcion: "La herramienta autogenera prompts matemáticamente estructurados contra la base legal. Además, analiza el texto del sustanciador y le sugiere correcciones previas para garantizar que no falte ningún dato sustancial."
  },
  {
    id: "transcripcion-audio",
    titulo: "Lectura y Transcripción de Audios (Voz a Texto)",
    tagline: "Escuchar el caso para redactar la providencia",
    descripcion: "Módulo capaz de procesar grabaciones de audiencias, declaraciones o notas de voz del sustanciador, transcribir el audio fielmente a texto y estructurar automáticamente los hechos y pretensiones del caso."
  },
  {
    id: "privacidad-no-cloud",
    titulo: "Procesamiento Local de Variables (Zero-Cloud Leakage)",
    tagline: "Cumplimiento estricto: El expediente no se sube a la nube",
    descripcion: "Los datos de personas y el documento final residen y se ensamblan en el entorno local del Juzgado. La IA sólo recibe peticiones anonimizadas o motores ejecutados localmente, garantizando reserva legal absoluta."
  },
  {
    id: "maxima-automatizacion",
    titulo: "Operación en Mínimos Clics",
    tagline: "Aceleración del trámite judicial sin fricción operativa",
    descripcion: "Flujo optimizado para que el sustanciador pase del caso (o audio) al documento Word/PDF listo para aprobación en apenas 1 o 2 interacciones, eliminando formularios engorrosos."
  }
];
