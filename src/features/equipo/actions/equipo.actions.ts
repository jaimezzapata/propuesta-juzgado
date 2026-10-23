"use server";

import { prisma } from "@/lib/prisma";
import { FormGestorValues, Permiso, Usuario } from "../types";

const EMAIL_JEFE = "juanpablo.velasquez@ramajudicial.gov.co";

const TODOS_LOS_PERMISOS: Permiso[] = [
  "RADICAR_EXPEDIENTES",
  "ANALIZAR_TUTELAS",
  "GENERAR_PROVIDENCIAS",
  "APROBAR_PROVIDENCIAS",
  "ADMINISTRAR_EQUIPO",
  "CONFIGURAR_DESPACHO",
];

export async function asegurarJefeDespacho(): Promise<Usuario> {
  const jefeExistente = await prisma.usuario.findFirst({
    where: {
      OR: [{ rol: "JEFE_DESPACHO" }, { email: EMAIL_JEFE }],
    },
  });

  if (jefeExistente) {
    return jefeExistente as unknown as Usuario;
  }

  const nuevoJefe = await prisma.usuario.create({
    data: {
      nombre: "Dr. Juan Pablo Velásquez",
      cargo: "Juez Titular - Juzgado Cuarto de Familia",
      documento: "71.389.450",
      email: EMAIL_JEFE,
      rol: "JEFE_DESPACHO",
      activo: true,
      permisos: TODOS_LOS_PERMISOS,
    },
  });

  return nuevoJefe as unknown as Usuario;
}

export async function obtenerEquipo(): Promise<{
  jefe: Usuario | null;
  gestores: Usuario[];
}> {
  await asegurarJefeDespacho();

  const usuarios = await prisma.usuario.findMany({
    orderBy: [{ rol: "asc" }, { fechaCreacion: "asc" }],
  });

  const jefe = (usuarios.find((u) => u.rol === "JEFE_DESPACHO") ?? null) as unknown as Usuario | null;
  const gestores = usuarios.filter((u) => u.rol === "GESTOR") as unknown as Usuario[];

  return { jefe, gestores };
}

export async function crearGestorAction(
  data: FormGestorValues
): Promise<{ success: boolean; error?: string; gestor?: Usuario }> {
  try {
    const existe = await prisma.usuario.findUnique({
      where: { email: data.email.trim().toLowerCase() },
    });

    if (existe) {
      return { success: false, error: "Ya existe un usuario con este correo institucional." };
    }

    const nuevoGestor = await prisma.usuario.create({
      data: {
        nombre: data.nombre.trim(),
        cargo: data.cargo.trim(),
        documento: data.documento?.trim() || null,
        email: data.email.trim().toLowerCase(),
        rol: "GESTOR",
        activo: true,
        permisos: data.permisos,
      },
    });

    return { success: true, gestor: nuevoGestor as unknown as Usuario };
  } catch (error: any) {
    return { success: false, error: error?.message || "Error al registrar el gestor." };
  }
}

export async function actualizarPermisosAction(
  id: string,
  permisos: Permiso[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado." };
    }

    await prisma.usuario.update({
      where: { id },
      data: { permisos },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Error al actualizar permisos." };
  }
}

export async function alternarEstadoGestorAction(
  id: string,
  activo: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return { success: false, error: "Usuario no encontrado." };
    if (usuario.rol === "JEFE_DESPACHO") {
      return { success: false, error: "No es posible desactivar al Jefe de Despacho." };
    }

    await prisma.usuario.update({
      where: { id },
      data: { activo },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Error al cambiar estado." };
  }
}

export async function eliminarGestorAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return { success: false, error: "Usuario no encontrado." };
    if (usuario.rol === "JEFE_DESPACHO") {
      return { success: false, error: "No es posible eliminar al Jefe de Despacho." };
    }

    await prisma.usuario.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Error al eliminar gestor." };
  }
}
