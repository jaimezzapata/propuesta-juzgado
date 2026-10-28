"use server";

import { prisma } from "@/lib/prisma";
import {
  GuardarPlantillaTutelaInput,
  PlantillaDocumentoTutelaDTO,
  VinculoDatoDocumento,
} from "../types";
import {
  arrayBufferABase64,
  construirDocxDesdeCreador,
  extraerTextoPlanoDeDocx,
  generarPlantillaJudicialPorDefectoDocx,
} from "../utils/docx.utils";
import { detectarEntidadesJuridicasEnTexto } from "../utils/ia-detector.utils";

function construirPlantillasInicialesDemo(): PlantillaDocumentoTutelaDTO[] {
  const bufAuto = generarPlantillaJudicialPorDefectoDocx();
  const txtAuto = extraerTextoPlanoDeDocx(bufAuto);
  const vincAuto: VinculoDatoDocumento[] = detectarEntidadesJuridicasEnTexto(
    txtAuto
  ).map((h, idx) => ({
    id: `seed-auto-${idx}`,
    textoOriginal: h.textoOriginal,
    campoBD: h.campoBD,
    origen: "ia",
  }));

  const bufOficio = construirDocxDesdeCreador({
    codigo: "F-TUT-02 V.03",
    tituloFormato: "Oficio de Notificación de Tutela",
    descripcionFormato:
      "Comunicación urgente de 48 horas a la entidad accionada",
    tituloActoProcesal:
      "OFICIO DE NOTIFICACIÓN PERSONAL Y REQUERIMIENTO URGENTE",
    parrafosCuerpo: [
      "En la ciudad de Medellín, Antioquia, en fecha 28 de octubre de 2026, por medio del presente oficio se le notifica que este Despacho admitió la Acción de Tutela promovida por MARÍA EUGENIA LÓPEZ RESTREPO, identificada con cédula de ciudadanía N° 43.512.890, en contra de EPS SURA S.A. - REGIONAL ANTIOQUIA, por la presunta vulneración del derecho fundamental a la Salud Integral y Vida en Condiciones Dignas.",
      "Se advierte que la parte actora requiere con carácter urgente Autorización y entrega inmediata de medicamento biológico de alto costo y valoración prioritaria por especialista en reumatología. Los datos de ubicación de la parte accionante corresponden a la dirección física Calle 50 # 45-12, Barrio La Candelaria, teléfono 300 412 8900 y correo maria.lopez@correo.co.",
    ],
    parrafosResuelve: [
      "CONCEDER a EPS SURA S.A. - REGIONAL ANTIOQUIA el término improrrogable de cuarenta y ocho (48) horas contadas a partir del recibo de esta comunicación para rendir informe detallado sobre los hechos que motivan la acción constitucional.",
    ],
    firmanteNombre: "Dr. Juan Pablo Velásquez",
    firmanteCargo: "Juez Titular - Juzgado Cuarto de Familia",
  });
  const txtOficio = extraerTextoPlanoDeDocx(bufOficio);
  const vincOficio: VinculoDatoDocumento[] = detectarEntidadesJuridicasEnTexto(
    txtOficio
  ).map((h, idx) => ({
    id: `seed-oficio-${idx}`,
    textoOriginal: h.textoOriginal,
    campoBD: h.campoBD,
    origen: "ia",
  }));

  const fechaIso = new Date().toISOString();

  return [
    {
      id: "plantilla-auto-admisorio",
      codigo: "F-TUT-01 V.04",
      titulo: "Auto Admisorio de Acción de Tutela",
      descripcion:
        "Providencia de admisión, vinculación y traslado por 48 horas",
      nombreArchivo: "Auto_Admisorio_Tutela_Juzgado4.docx",
      docxBase64: arrayBufferABase64(bufAuto),
      vinculos: vincAuto,
      creadoPor: "Dr. Juan Pablo Velásquez",
      fechaActualizacion: fechaIso,
    },
    {
      id: "plantilla-oficio-notificacion",
      codigo: "F-TUT-02 V.03",
      titulo: "Oficio de Notificación a Accionado",
      descripcion:
        "Oficio formal para notificar la admisión y requerir informe",
      nombreArchivo: "Oficio_Notificacion_Tutela.docx",
      docxBase64: arrayBufferABase64(bufOficio),
      vinculos: vincOficio,
      creadoPor: "Dr. Juan Pablo Velásquez",
      fechaActualizacion: fechaIso,
    },
  ];
}

async function asegurarTablaPlantillasTutela(): Promise<void> {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "plantillas_tutela" (
      "id" TEXT NOT NULL,
      "codigo" TEXT NOT NULL,
      "titulo" TEXT NOT NULL,
      "descripcion" TEXT NOT NULL,
      "nombreArchivo" TEXT NOT NULL,
      "docxBase64" TEXT NOT NULL,
      "vinculosJson" TEXT NOT NULL,
      "creadoPor" TEXT NOT NULL,
      "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "plantillas_tutela_pkey" PRIMARY KEY ("id")
    );
  `);

  const filas = (await prisma.$queryRawUnsafe(
    `SELECT COUNT(*)::int AS total FROM "plantillas_tutela";`
  )) as Array<{ total: number }>;

  if (!filas[0] || filas[0].total === 0) {
    const iniciales = construirPlantillasInicialesDemo();
    for (const p of iniciales) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "plantillas_tutela" ("id", "codigo", "titulo", "descripcion", "nombreArchivo", "docxBase64", "vinculosJson", "creadoPor", "fechaActualizacion")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
         ON CONFLICT ("id") DO NOTHING;`,
        p.id,
        p.codigo,
        p.titulo,
        p.descripcion,
        p.nombreArchivo,
        p.docxBase64,
        JSON.stringify(p.vinculos),
        p.creadoPor
      );
    }
  }
}

export async function listarPlantillasTutelaAction(): Promise<
  PlantillaDocumentoTutelaDTO[]
> {
  try {
    await asegurarTablaPlantillasTutela();
    const registros = (await prisma.$queryRawUnsafe(
      `SELECT "id", "codigo", "titulo", "descripcion", "nombreArchivo", "docxBase64", "vinculosJson", "creadoPor", "fechaActualizacion"
       FROM "plantillas_tutela"
       ORDER BY "fechaActualizacion" DESC;`
    )) as Array<{
      id: string;
      codigo: string;
      titulo: string;
      descripcion: string;
      nombreArchivo: string;
      docxBase64: string;
      vinculosJson: string;
      creadoPor: string;
      fechaActualizacion: Date;
    }>;

    return registros.map((r) => ({
      id: r.id,
      codigo: r.codigo,
      titulo: r.titulo,
      descripcion: r.descripcion,
      nombreArchivo: r.nombreArchivo,
      docxBase64: r.docxBase64,
      vinculos: JSON.parse(r.vinculosJson || "[]") as VinculoDatoDocumento[],
      creadoPor: r.creadoPor,
      fechaActualizacion: new Date(r.fechaActualizacion).toISOString(),
    }));
  } catch {
    return construirPlantillasInicialesDemo();
  }
}

export async function guardarPlantillaTutelaAction(
  input: GuardarPlantillaTutelaInput,
  rolUsuario: string
): Promise<{
  success: boolean;
  plantilla?: PlantillaDocumentoTutelaDTO;
  error?: string;
}> {
  if (rolUsuario !== "JEFE_DESPACHO") {
    return {
      success: false,
      error:
        "Permiso denegado: Únicamente el Jefe de Despacho puede crear, cargar o guardar formatos oficiales.",
    };
  }

  try {
    await asegurarTablaPlantillasTutela();
    const idFinal = input.id || `plantilla-${Date.now()}`;
    const vinculosStr = JSON.stringify(input.vinculos);

    await prisma.$executeRawUnsafe(
      `INSERT INTO "plantillas_tutela" ("id", "codigo", "titulo", "descripcion", "nombreArchivo", "docxBase64", "vinculosJson", "creadoPor", "fechaActualizacion")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
       ON CONFLICT ("id") DO UPDATE SET
         "codigo" = EXCLUDED."codigo",
         "titulo" = EXCLUDED."titulo",
         "descripcion" = EXCLUDED."descripcion",
         "nombreArchivo" = EXCLUDED."nombreArchivo",
         "docxBase64" = EXCLUDED."docxBase64",
         "vinculosJson" = EXCLUDED."vinculosJson",
         "creadoPor" = EXCLUDED."creadoPor",
         "fechaActualizacion" = CURRENT_TIMESTAMP;`,
      idFinal,
      input.codigo.trim(),
      input.titulo.trim(),
      input.descripcion.trim(),
      input.nombreArchivo.trim(),
      input.docxBase64,
      vinculosStr,
      input.creadoPor
    );

    return {
      success: true,
      plantilla: {
        id: idFinal,
        codigo: input.codigo.trim(),
        titulo: input.titulo.trim(),
        descripcion: input.descripcion.trim(),
        nombreArchivo: input.nombreArchivo.trim(),
        docxBase64: input.docxBase64,
        vinculos: input.vinculos,
        creadoPor: input.creadoPor,
        fechaActualizacion: new Date().toISOString(),
      },
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Error al guardar el formato en la base de datos.",
    };
  }
}

