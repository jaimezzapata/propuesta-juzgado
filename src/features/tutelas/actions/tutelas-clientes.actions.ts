"use server";

import { prisma } from "@/lib/prisma";
import { Rol } from "@/features/auth/types";
import {
  CasoTutelaDTO,
  EstadoCasoTutela,
  NuevoCasoTutelaInput,
} from "../types";
import { GESTORES_OFICIALES_DESPACHO } from "../utils/analitica-tutelas.utils";

interface CasoDemoSemilla extends NuevoCasoTutelaInput {
  estado: EstadoCasoTutela;
  gestorAsignadoNombre: string;
  gestorAsignadoCargo: string;
  diasTerminoRestantes: number;
}

const CASOS_DEMO_INICIALES: CasoDemoSemilla[] = [
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
    estado: "RESUELTO",
    gestorAsignadoNombre: "Dra. Laura Cristina Gómez",
    gestorAsignadoCargo: "Oficial Mayor / Sustanciadora",
    diasTerminoRestantes: 6,
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
    estado: "PENDIENTE",
    gestorAsignadoNombre: "Dra. Laura Cristina Gómez",
    gestorAsignadoCargo: "Oficial Mayor / Sustanciadora",
    diasTerminoRestantes: 4,
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
    estado: "DEVUELTO",
    gestorAsignadoNombre: "Dr. Carlos Alberto Restrepo",
    gestorAsignadoCargo: "Escribiente Judicial",
    diasTerminoRestantes: 2,
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
    estado: "RESUELTO",
    gestorAsignadoNombre: "Dra. Laura Cristina Gómez",
    gestorAsignadoCargo: "Oficial Mayor / Sustanciadora",
    diasTerminoRestantes: 8,
  },
  {
    radicado: "05001-31-10-004-2026-00228-00",
    clienteNombre: "JORGE ELIÉCER PATIÑO SALDARRIAGA",
    clienteDocumento: "70.119.504",
    clienteEmail: "jorge.patino@ciudadano.co",
    clienteTelefono: "312 745 8810",
    clienteDireccion: "Circular 4 # 71-19, Laureles",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "SAVIA SALUD EPS - ALIANZA MEDELLÍN ANTIOQUIA",
    derechoInvocado: "Salud, Diagnóstico Efectivo y Continuidad Médica",
    hechosResumen:
      "Práctica urgente de resonancia magnética contrastada y junta médica oncológica prioritaria",
    fechaRadicacion: "27 de octubre de 2026",
    estado: "RESUELTO",
    gestorAsignadoNombre: "Dr. Carlos Alberto Restrepo",
    gestorAsignadoCargo: "Escribiente Judicial",
    diasTerminoRestantes: 7,
  },
  {
    radicado: "05001-31-10-004-2026-00239-00",
    clienteNombre: "DIANA MARCELA QUINTERO ARANGO",
    clienteDocumento: "1.152.440.918",
    clienteEmail: "diana.quintero@notificaciones.co",
    clienteTelefono: "304 519 2088",
    clienteDireccion: "Carrera 43A # 14-85, El Poblado",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "UNIDAD PARA LA ATENCIÓN Y REPARACIÓN INTEGRAL A LAS VÍCTIMAS",
    derechoInvocado: "Mínimo Vital, Igualdad y Reparación Administrativa",
    hechosResumen:
      "Asignación de fecha cierta y desembolso efectivo de indemnización administrativa reconocida por resolución",
    fechaRadicacion: "26 de octubre de 2026",
    estado: "PENDIENTE",
    gestorAsignadoNombre: "Dra. Juliana Andrea Vélez",
    gestorAsignadoCargo: "Sustanciadora de Tutelas",
    diasTerminoRestantes: 3,
  },
  {
    radicado: "05001-31-10-004-2026-00246-00",
    clienteNombre: "HÉCTOR DARÍO LONDOÑO TAMAYO",
    clienteDocumento: "8.314.792",
    clienteEmail: "hector.londono@correo.co",
    clienteTelefono: "318 690 1140",
    clienteDireccion: "Calle 65 # 52-14, Prado Centro",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "FONDO NACIONAL DE PRESTACIONES SOCIALES DEL MAGISTERIO - FOMAG",
    derechoInvocado: "Seguridad Social en Salud y Entrega de Medicamentos",
    hechosResumen:
      "Suministro continuo sin fraccionamientos de tratamiento cardiológico permanente para adulto mayor",
    fechaRadicacion: "24 de octubre de 2026",
    estado: "PERDIDO",
    gestorAsignadoNombre: "Dr. Carlos Alberto Restrepo",
    gestorAsignadoCargo: "Escribiente Judicial",
    diasTerminoRestantes: 0,
  },
  {
    radicado: "05001-31-10-004-2026-00253-00",
    clienteNombre: "PAULA ANDREA CASTAÑO ZAPATA",
    clienteDocumento: "1.017.209.331",
    clienteEmail: "paula.castano@abogados.co",
    clienteTelefono: "320 411 7650",
    clienteDireccion: "Carrera 80 # 32-110, Belén La Palma",
    clienteCiudad: "Medellín, Antioquia",
    entidadAccionada: "SECRETARÍA DE EDUCACIÓN DISTRITAL DE MEDELLÍN",
    derechoInvocado: "Educación Inclusiva y Dignidad Humana",
    hechosResumen:
      "Asignación de docente de apoyo pedagógico especializado y transporte escolar adaptado para menor con discapacidad",
    fechaRadicacion: "30 de octubre de 2026",
    estado: "RESUELTO",
    gestorAsignadoNombre: "Dra. Juliana Andrea Vélez",
    gestorAsignadoCargo: "Sustanciadora de Tutelas",
    diasTerminoRestantes: 9,
  },
];

interface FilaCasoTutelaRaw {
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
  estado: string | null;
  gestorAsignadoNombre: string | null;
  gestorAsignadoCargo: string | null;
  diasTerminoRestantes: number | null;
}

function obtenerCargoGestor(nombre: string): string {
  const encontrado = GESTORES_OFICIALES_DESPACHO.find(
    (g) => g.nombre === nombre
  );
  return encontrado ? encontrado.cargo : "Gestor Judicial del Despacho";
}

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
      "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
      "gestorAsignadoNombre" TEXT NOT NULL DEFAULT 'Dra. Laura Cristina Gómez',
      "gestorAsignadoCargo" TEXT NOT NULL DEFAULT 'Oficial Mayor / Sustanciadora',
      "diasTerminoRestantes" INTEGER NOT NULL DEFAULT 5,
      "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "fechaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "casos_tutela_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "casos_tutela"
      ADD COLUMN IF NOT EXISTS "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
      ADD COLUMN IF NOT EXISTS "gestorAsignadoNombre" TEXT NOT NULL DEFAULT 'Dra. Laura Cristina Gómez',
      ADD COLUMN IF NOT EXISTS "gestorAsignadoCargo" TEXT NOT NULL DEFAULT 'Oficial Mayor / Sustanciadora',
      ADD COLUMN IF NOT EXISTS "diasTerminoRestantes" INTEGER NOT NULL DEFAULT 5;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "casos_tutela_radicado_key" ON "casos_tutela"("radicado");
  `);

  const conteoResult = await prisma.$queryRawUnsafe<Array<{ total: bigint }>>(
    `SELECT COUNT(*) as total FROM "casos_tutela"`
  );
  const conteo = Number(conteoResult?.[0]?.total ?? 0);

  if (conteo < CASOS_DEMO_INICIALES.length) {
    for (let i = 0; i < CASOS_DEMO_INICIALES.length; i++) {
      const c = CASOS_DEMO_INICIALES[i];
      const idSemilla = `caso-oficial-${i + 1}`;
      await prisma.$executeRawUnsafe(
        `INSERT INTO "casos_tutela" (
          "id", "radicado", "clienteNombre", "clienteDocumento", "clienteEmail",
          "clienteTelefono", "clienteDireccion", "clienteCiudad", "entidadAccionada",
          "derechoInvocado", "hechosResumen", "fechaRadicacion",
          "estado", "gestorAsignadoNombre", "gestorAsignadoCargo", "diasTerminoRestantes"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT ("radicado") DO UPDATE SET
          "gestorAsignadoNombre" = EXCLUDED."gestorAsignadoNombre",
          "gestorAsignadoCargo" = EXCLUDED."gestorAsignadoCargo",
          "diasTerminoRestantes" = EXCLUDED."diasTerminoRestantes"`,
        idSemilla,
        c.radicado,
        c.clienteNombre,
        c.clienteDocumento,
        c.clienteEmail,
        c.clienteTelefono,
        c.clienteDireccion,
        c.clienteCiudad,
        c.entidadAccionada,
        c.derechoInvocado,
        c.hechosResumen,
        c.fechaRadicacion,
        c.estado,
        c.gestorAsignadoNombre,
        c.gestorAsignadoCargo,
        c.diasTerminoRestantes
      );
    }
  }
}

function mapearFilaADTO(r: FilaCasoTutelaRaw): CasoTutelaDTO {
  const estadoValido: EstadoCasoTutela =
    r.estado === "RESUELTO" ||
    r.estado === "DEVUELTO" ||
    r.estado === "PERDIDO" ||
    r.estado === "PENDIENTE"
      ? r.estado
      : "PENDIENTE";

  const gestorNombre =
    r.gestorAsignadoNombre || "Dra. Laura Cristina Gómez";

  return {
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
    estado: estadoValido,
    gestorAsignadoNombre: gestorNombre,
    gestorAsignadoCargo:
      r.gestorAsignadoCargo || obtenerCargoGestor(gestorNombre),
    diasTerminoRestantes:
      typeof r.diasTerminoRestantes === "number" ? r.diasTerminoRestantes : 5,
  };
}

export async function listarCasosTutelaAction(): Promise<CasoTutelaDTO[]> {
  try {
    await asegurarTablaYDatosCasosTutela();
    const registros = await prisma.$queryRawUnsafe<FilaCasoTutelaRaw[]>(
      `SELECT
        "id", "radicado", "clienteNombre", "clienteDocumento", "clienteEmail",
        "clienteTelefono", "clienteDireccion", "clienteCiudad", "entidadAccionada",
        "derechoInvocado", "hechosResumen", "fechaRadicacion",
        "estado", "gestorAsignadoNombre", "gestorAsignadoCargo", "diasTerminoRestantes"
       FROM "casos_tutela"
       ORDER BY "fechaCreacion" ASC`
    );

    return registros.map(mapearFilaADTO);
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

    const idNuevo = `caso-${Date.now()}`;
    const estadoInicial: EstadoCasoTutela = input.estado || "PENDIENTE";
    const gestorNombre =
      input.gestorAsignadoNombre || "Dra. Laura Cristina Gómez";
    const gestorCargo = obtenerCargoGestor(gestorNombre);

    await prisma.$executeRawUnsafe(
      `INSERT INTO "casos_tutela" (
        "id", "radicado", "clienteNombre", "clienteDocumento", "clienteEmail",
        "clienteTelefono", "clienteDireccion", "clienteCiudad", "entidadAccionada",
        "derechoInvocado", "hechosResumen", "fechaRadicacion",
        "estado", "gestorAsignadoNombre", "gestorAsignadoCargo", "diasTerminoRestantes"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      idNuevo,
      input.radicado.trim(),
      input.clienteNombre.trim().toUpperCase(),
      input.clienteDocumento.trim(),
      input.clienteEmail.trim(),
      input.clienteTelefono.trim(),
      input.clienteDireccion.trim(),
      input.clienteCiudad.trim() || "Medellín, Antioquia",
      input.entidadAccionada.trim().toUpperCase(),
      input.derechoInvocado.trim(),
      input.hechosResumen.trim(),
      input.fechaRadicacion.trim(),
      estadoInicial,
      gestorNombre,
      gestorCargo,
      10
    );

    return {
      success: true,
      caso: {
        id: idNuevo,
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
        estado: estadoInicial,
        gestorAsignadoNombre: gestorNombre,
        gestorAsignadoCargo: gestorCargo,
        diasTerminoRestantes: 10,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      error:
        err?.message || "No se pudo registrar el caso en la base de datos.",
    };
  }
}

export async function actualizarEstadoYGestorCasoAction(
  idCaso: string,
  nuevoEstado: EstadoCasoTutela,
  nuevoGestorNombre: string,
  rolUsuario: Rol
): Promise<{ success: boolean; error?: string }> {
  if (rolUsuario !== "JEFE_DESPACHO") {
    return {
      success: false,
      error:
        "Permiso denegado: Solo el Jefe de Despacho puede reasignar o cambiar estados de auditoría.",
    };
  }

  try {
    await asegurarTablaYDatosCasosTutela();
    const cargo = obtenerCargoGestor(nuevoGestorNombre);

    await prisma.$executeRawUnsafe(
      `UPDATE "casos_tutela"
       SET "estado" = $1,
           "gestorAsignadoNombre" = $2,
           "gestorAsignadoCargo" = $3,
           "fechaActualizacion" = CURRENT_TIMESTAMP
       WHERE "id" = $4`,
      nuevoEstado,
      nuevoGestorNombre,
      cargo,
      idCaso
    );

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Error al actualizar el estado del expediente.",
    };
  }
}
