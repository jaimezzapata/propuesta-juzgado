"use server";

import { prisma } from "@/lib/prisma";
import {
  FormatoMaestro,
  FormatoAsignado,
  FormFormatoMaestroValues,
  FormAsignarValues,
  EstadoAsignacion,
} from "../types";
import { asegurarJefeDespacho } from "@/features/equipo/actions/equipo.actions";

const FORMATOS_SEMILLA = [
  {
    codigo: "AUT-ADM-MC-01",
    titulo: "Auto Admisorio con Medida Cautelar Provisional",
    tipo: "MEDIDA_PROVISIONAL" as const,
    descripcion: "Para casos urgentes de salud y riesgo vital inminente con órdenes perentorias de 48 horas.",
    plantilla: `REPÚBLICA DE COLOMBIA
RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO DE FAMILIA DE ORALIDAD
MEDELLÍN - ANTIOQUIA

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}}
ACCIONADO: {{ACCIONADO}}
DERECHO FUNDAMENTAL: SALUD EN CONEXIDAD CON LA VIDA DIGNA

AUTO INTERLOCUTORIO No. {{NUMERO_AUTO}}

Visto el informe secretarial que antecede y revisada la solicitud de tutela impetrada por {{ACCIONANTE}} contra {{ACCIONADO}}, el Despacho procede a resolver sobre su admisión y solicitud de medida provisional.

CONSIDERACIONES
1. De los hechos expuestos se evidencia situación de urgencia manifiesta y riesgo para la integridad del accionante.
2. Cumplidos los requisitos del Decreto 2591 de 1991, procede la adopción de medidas urgentes cautelares.

RESUELVE:
PRIMERO: ADMITIR la acción de tutela instaurada por {{ACCIONANTE}} contra {{ACCIONADO}}.
SEGUNDO: DECRETAR MEDIDA CAUTELAR PROVISIONAL inmediata, ordenando a {{ACCIONADO}} que en el término perentorio de CUARENTA Y OCHO (48) HORAS autorice y suministre los procedimientos requeridos.
TERCERO: CORRER TRASLADO a la entidad accionada por el término de dos (2) días para que rinda informe pormenorizado.

NOTIFÍQUESE Y CÚMPLASE,

DR. JUAN PABLO VELÁSQUEZ
Juez Cuarto de Familia de Oralidad`,
  },
  {
    codigo: "AUT-ADM-ORD-02",
    titulo: "Auto Admisorio Ordinario y Requerimiento de Informes",
    tipo: "AUTO_ADMISORIO" as const,
    descripcion: "Trámite constitucional ordinario con término de contestación y vinculación de terceros.",
    plantilla: `REPÚBLICA DE COLOMBIA
RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO DE FAMILIA DE ORALIDAD

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}}
ACCIONADO: {{ACCIONADO}}

AUTO DE SUSTANCIACIÓN

Avócase el conocimiento de la presente acción de tutela interpuesta por {{ACCIONANTE}} en contra de {{ACCIONADO}}.

DISPONE:
PRIMERO: ADMITIR la acción constitucional de tutela de la referencia.
SEGUNDO: VINCULAR al trámite a las entidades correspondientes y requerir a {{ACCIONADO}} para que rinda informe sobre los hechos materia de la tutela en el término de dos (2) días.

NOTIFÍQUESE,

DR. JUAN PABLO VELÁSQUEZ
Juez Titular`,
  },
  {
    codigo: "SEN-TUT-PRI-03",
    titulo: "Proyecto de Sentencia de Primera Instancia",
    tipo: "PROYECTO_SENTENCIA" as const,
    descripcion: "Estructura de fallo con problema jurídico, consideraciones y parte resolutiva.",
    plantilla: `REPÚBLICA DE COLOMBIA
JUZGADO CUARTO DE FAMILIA DE ORALIDAD

SENTENCIA DE TUTELA No. {{NUMERO_SENTENCIA}}
RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}}
ACCIONADO: {{ACCIONADO}}

I. ANTECEDENTES Y HECHOS RELEVANTES
{{HECHOS_RELEVANTES}}

II. PROBLEMA JURÍDICO
Determinar si la entidad accionada vulneró los derechos fundamentales invocados.

III. CONSIDERACIONES DE LA CORTE CONSTITUCIONAL
(Cita de sentencias hito aplicables)

IV. DECISIÓN
PRIMERO: AMPARAR los derechos fundamentales de {{ACCIONANTE}}.
SEGUNDO: ORDENAR a {{ACCIONADO}} el cumplimiento perentorio de lo resuelto.

COMUNÍQUESE Y CÚMPLASE,

DR. JUAN PABLO VELÁSQUEZ
Juez de Familia`,
  },
];

export async function asegurarFormatosBase(jefeId: string) {
  const conteo = await prisma.formatoMaestro.count();
  if (conteo === 0) {
    for (const f of FORMATOS_SEMILLA) {
      await prisma.formatoMaestro.create({
        data: {
          codigo: f.codigo,
          titulo: f.titulo,
          tipo: f.tipo,
          descripcion: f.descripcion,
          plantilla: f.plantilla,
          activo: true,
          creadoPorId: jefeId,
        },
      });
    }
  }
}

export async function obtenerFormatosMaestros(): Promise<FormatoMaestro[]> {
  const jefe = await asegurarJefeDespacho();
  await asegurarFormatosBase(jefe.id);

  const formatos = await prisma.formatoMaestro.findMany({
    orderBy: { fechaCreacion: "asc" },
    include: {
      creadoPor: { select: { id: true, nombre: true, cargo: true } },
    },
  });

  return formatos as unknown as FormatoMaestro[];
}

export async function crearFormatoMaestroAction(
  data: FormFormatoMaestroValues,
  jefeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: jefeId } });
    if (!usuario || usuario.rol !== "JEFE_DESPACHO") {
      return { success: false, error: "Solo el Jefe de Despacho tiene autorización para crear formatos maestros." };
    }

    const existe = await prisma.formatoMaestro.findUnique({
      where: { codigo: data.codigo.trim().toUpperCase() },
    });
    if (existe) {
      return { success: false, error: "Ya existe un formato con ese código institucional." };
    }

    await prisma.formatoMaestro.create({
      data: {
        codigo: data.codigo.trim().toUpperCase(),
        titulo: data.titulo.trim(),
        descripcion: data.descripcion.trim(),
        tipo: data.tipo,
        plantilla: data.plantilla,
        activo: true,
        creadoPorId: jefeId,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al crear formato maestro." };
  }
}

export async function actualizarFormatoMaestroAction(
  id: string,
  data: Partial<FormFormatoMaestroValues>,
  jefeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: jefeId } });
    if (!usuario || usuario.rol !== "JEFE_DESPACHO") {
      return { success: false, error: "Solo el Jefe de Despacho puede modificar los formatos maestros." };
    }

    await prisma.formatoMaestro.update({
      where: { id },
      data: {
        ...(data.titulo && { titulo: data.titulo.trim() }),
        ...(data.descripcion && { descripcion: data.descripcion.trim() }),
        ...(data.tipo && { tipo: data.tipo }),
        ...(data.plantilla && { plantilla: data.plantilla }),
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al actualizar formato." };
  }
}

export async function asignarFormatoAction(
  data: FormAsignarValues,
  jefeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const formato = await prisma.formatoMaestro.findUnique({
      where: { id: data.formatoId },
    });
    if (!formato) return { success: false, error: "Formato no encontrado." };

    let contenidoInicial = formato.plantilla
      .replace(/{{RADICADO}}/g, data.radicado.trim())
      .replace(/{{ACCIONANTE}}/g, (data.accionante || "").trim().toUpperCase())
      .replace(/{{ACCIONADO}}/g, (data.accionado || "").trim().toUpperCase());

    await prisma.formatoAsignado.create({
      data: {
        radicado: data.radicado.trim(),
        accionante: data.accionante?.trim() || null,
        accionado: data.accionado?.trim() || null,
        instruccionesJefe: data.instrucciones?.trim() || null,
        contenidoDiligenciado: contenidoInicial,
        estado: "ASIGNADO",
        formatoId: data.formatoId,
        gestorId: data.gestorId,
        asignadoPorId: jefeId,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al asignar formato." };
  }
}

export async function obtenerAsignacionesDespacho(): Promise<FormatoAsignado[]> {
  const asignaciones = await prisma.formatoAsignado.findMany({
    orderBy: { fechaAsignacion: "desc" },
    include: {
      formato: true,
      gestor: { select: { id: true, nombre: true, cargo: true, email: true } },
      asignadoPor: { select: { id: true, nombre: true } },
    },
  });

  return asignaciones as unknown as FormatoAsignado[];
}

export async function obtenerMisAsignacionesGestor(
  gestorId: string
): Promise<FormatoAsignado[]> {
  const asignaciones = await prisma.formatoAsignado.findMany({
    where: { gestorId },
    orderBy: { fechaAsignacion: "desc" },
    include: {
      formato: true,
      gestor: { select: { id: true, nombre: true, cargo: true, email: true } },
      asignadoPor: { select: { id: true, nombre: true } },
    },
  });

  return asignaciones as unknown as FormatoAsignado[];
}

export async function guardarDiligenciamientoAction(
  asignacionId: string,
  gestorId: string,
  contenido: string,
  estado: EstadoAsignacion
): Promise<{ success: boolean; error?: string }> {
  try {
    const asignacion = await prisma.formatoAsignado.findUnique({
      where: { id: asignacionId },
    });

    if (!asignacion) {
      return { success: false, error: "Asignación no encontrada." };
    }

    if (asignacion.gestorId !== gestorId) {
      return { success: false, error: "No tienes autorización para manipular este expediente." };
    }

    await prisma.formatoAsignado.update({
      where: { id: asignacionId },
      data: {
        contenidoDiligenciado: contenido,
        estado,
      },
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al guardar avances del expediente." };
  }
}
