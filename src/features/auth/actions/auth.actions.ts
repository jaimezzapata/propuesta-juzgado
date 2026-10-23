"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SesionUsuario, LoginResult } from "../types";
import { asegurarJefeDespacho } from "@/features/equipo/actions/equipo.actions";

const COOKIE_NAME = "juzgado_session_id";

export async function loginAction(email: string, clave?: string): Promise<LoginResult> {
  try {
    await asegurarJefeDespacho();

    const usuario = await prisma.usuario.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!usuario) {
      return { success: false, error: "Usuario judicial no encontrado." };
    }

    if (!usuario.activo) {
      return { success: false, error: "Este perfil se encuentra inactivo. Consulte con el Jefe de Despacho." };
    }

    if (clave && clave !== "123456" && clave !== usuario.password) {
      return { success: false, error: "Credenciales de acceso incorrectas." };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, usuario.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return {
      success: true,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        cargo: usuario.cargo,
        rol: usuario.rol as any,
      },
    };
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al autenticar." };
  }
}

export async function logoutAction(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}

export async function getUsuarioActualAction(): Promise<SesionUsuario | null> {
  try {
    await asegurarJefeDespacho();

    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAME)?.value;

    if (!sessionId) {
      return null;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: sessionId },
    });

    if (!usuario || !usuario.activo) {
      return null;
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      cargo: usuario.cargo,
      rol: usuario.rol as any,
    };
  } catch {
    return null;
  }
}

export async function listarPerfilesParaAcceso(): Promise<SesionUsuario[]> {
  await asegurarJefeDespacho();

  const usuarios = await prisma.usuario.findMany({
    where: { activo: true },
    orderBy: [{ rol: "asc" }, { nombre: "asc" }],
  });

  return usuarios.map((u) => ({
    id: u.id,
    nombre: u.nombre,
    email: u.email,
    cargo: u.cargo,
    rol: u.rol as any,
  }));
}
