"use server";

import { prisma } from "@/lib/prisma";
import { CasoTutelaDTO, NuevoCasoTutelaInput } from "../types";

const CASOS_DEMO_INICIALES: NuevoCasoTutelaInput[] = [
  {
    radicado: "05001-31-10-004-2026-00189-00",
    clienteNombre: "CARLOS ANDRÉS GIRALDO MÚNERA",
    clienteDocumento: "71.784.920",
    clienteEmail: "carlos.giraldo@notificaciones.co",
    clienteTelefono: "310 548 9211",
    clienteDireccion: "Carrera 70 # 44B-28, Barrio Laureles",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "NUEVA EPS S.A. - ZONAL ANTIOQUIA",
    derechoInvocado: "Salud, Mínimo Vital y Seguridad Social",
    hechosResumen:
      "Programación inmediata de cirugía oftalmológica de retina y suministro de insumos posoperatorios",
    fechaRadicacion: "29 de octubre de 2026",
  },
  {
    radicado: "05001-31-10-004-2026-00204-00",
    clienteNombre: "LUZ DARY MONTOYA ECHEVERRI",
    clienteDocumento: "42.891.034",
    clienteEmail: "luzdary.montoya@correo.co",
    clienteTelefono: "314 820 3319",
    clienteDireccion: "Calle 38 Sur # 41-55, Envigado",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "ADMINISTRADORA COLOMBIANA DE PENSIONES - COLPENSIONES",
    derechoInvocado: "Derecho Fundamental de Petición y Debido Proceso",
    hechosResumen:
      "Resolución de fondo sobre reconocimiento de pensión de sobrevivientes radicada hace más de cuatro meses",
    fechaRadicacion: "30 de octubre de 2026",
  },
  {
    radicado: "05001-31-10-004-2026-00215-00",
    clienteNombre: "SANTIAGO ALEJANDRO OSPINA VÉLEZ",
    clienteDocumento: "1.037.619.442",
    clienteEmail: "santiago.ospina@juridico.co",
    clienteTelefono: "301 677 4502",
    clienteDireccion: "Transversal 39B # 73-18, Belén",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "INSTITUTO COLOMBIANO DE BIENESTAR FAMILIAR - ICBF",
    derechoInvocado: "Derechos Prevalentes de los Niños, Niñas y Adolescentes",
    hechosResumen:
      "Restablecimiento inmediato de derechos familiares y designación de defensor de familia especializado",
    fechaRadicacion: "31 de octubre de 2026",
  },
  {
    radicado: "05001-31-10-004-2026-00142-00",
    clienteNombre: "MARÍA EUGENIA LÓPEZ RESTREPO",
    clienteDocumento: "43.512.890",
    clienteEmail: "maria.lopez@correo.co",
    clienteTelefono: "300 412 8900",
    clienteDireccion: "Calle 50 # 45-12, Barrio La Candelaria",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "EPS SURA S.A. - REGIONAL ANTIOQUIA",
    derechoInvocado: "Salud Integral y Vida en Condiciones Dignas",
    hechosResumen:
      "Autorización y entrega inmediata de medicamento biológico de alto costo y valoración prioritaria por especialista en reumatología",
    fechaRadicacion: "28 de octubre de 2026",
  },
];

async function asegurarTablaYDatosCasosTutela(): Promise<void> {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "casos_tutela" (
      "id" TEXT NOT NULL,
      "radicado" TEXT NOT NULL,
      "clienteNombre" TEXT NOT NULL,
      "clienteDocumento" TEXT NOT NULL,
      "clienteEmail" TEXT NOT NULL,
      "clienteTelefono" TEXT NOT NULL,
      "clienteDireccion" TEXT NOT NULL,
      "clienteCiudad" TEXT NOT NULL DEFAULT 'Medellín, Antioquia',
      "entidadAccionada" TEXT NOT NULL,
      "derechoInvocado" TEXT NOT NULL,
      "hechosResumen" TEXT NOT NULL,
      "fechaRadicacion" TEXT NOT NULL,
      "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "casos_tutela_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "casos_tutela_radicado_key" ON "casos_tutela"("radicado");
  `);

  const conteo = await prisma.casoTutela.count();
  if (conteo === 0) {
    for (const c of CASOS_DEMO_INICIALES) {
      await prisma.casoTutela.create({ data: c });
    }
  }
}

export async function listarCasosTutelaAction(): Promise<CasoTutelaDTO[]> {
  try {
    await asegurarTablaYDatosCasosTutela();
    const registros = await prisma.casoTutela.findMany({
      orderBy: { fechaCreacion: "asc" },
    });

    return registros.map((r) => ({
      id: r.id,
      radicado: r.radicado,
      clienteNombre: r.clienteNombre,
      clienteDocumento: r.clienteDocumento,
      clienteEmail: r.clienteEmail,
      clienteTelefono: r.clienteTelefono,
      clienteDireccion: r.clienteDireccion,
      clienteCiudad: r.clienteCiudad,
      entidadAccionada: r.entidadAccionada,
      derechoInvocado: r.derechoInvocado,
      hechosResumen: r.hechosResumen,
      fechaRadicacion: r.fechaRadicacion,
    }));
  } catch {
    return CASOS_DEMO_INICIALES.map((c, idx) => ({
      id: `demo-caso-${idx + 1}`,
      ...c,
    }));
  }
}

export async function crearCasoTutelaAction(
  input: NuevoCasoTutelaInput
): Promise<{ success: boolean; caso?: CasoTutelaDTO; error?: string }> {
  try {
    await asegurarTablaYDatosCasosTutela();

    const nuevo = await prisma.casoTutela.create({
      data: {
        radicado: input.radicado.trim(),
        clienteNombre: input.clienteNombre.trim().toUpperCase(),
        clienteDocumento: input.clienteDocumento.trim(),
        clienteEmail: input.clienteEmail.trim(),
        clienteTelefono: input.clienteTelefono.trim(),
        clienteDireccion: input.clienteDireccion.trim(),
        clienteCiudad: input.clienteCiudad.trim() || "Medellín, Antioquia",
        entidadAccionada: input.entidadAccionada.trim().toUpperCase(),
        derechoInvocado: input.derechoInvocado.trim(),
        hechosResumen: input.hechosResumen.trim(),
        fechaRadicacion: input.fechaRadicacion.trim(),
      },
    });

    return {
      success: true,
      caso: {
        id: nuevo.id,
        radicado: nuevo.radicado,
        clienteNombre: nuevo.clienteNombre,
        clienteDocumento: nuevo.clienteDocumento,
        clienteEmail: nuevo.clienteEmail,
        clienteTelefono: nuevo.clienteTelefono,
        clienteDireccion: nuevo.clienteDireccion,
        clienteCiudad: nuevo.clienteCiudad,
        entidadAccionada: nuevo.entidadAccionada,
        derechoInvocado: nuevo.derechoInvocado,
        hechosResumen: nuevo.hechosResumen,
        fechaRadicacion: nuevo.fechaRadicacion,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "No se pudo registrar el caso en la base de datos.",
    };
  }
}

