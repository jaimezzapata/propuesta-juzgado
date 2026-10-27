"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SesionUsuario, LoginResult, Permiso } from "../types";

const COOKIE_NAME = "juzgado_session_id";
const EMAIL_JEFE = "juanpablo.velasquez@ramajudicial.gov.co";

const TODOS_LOS_PERMISOS: Permiso[] = [
  "RADICAR_EXPEDIENTES",
  "ANALIZAR_TUTELAS",
  "GENERAR_PROVIDENCIAS",
  "APROBAR_PROVIDENCIAS",
  "ADMINISTRAR_EQUIPO",
  "CONFIGURAR_DESPACHO",
];

export async function asegurarUsuariosDemo(): Promise<void> {
  const conteo = await prisma.usuario.count();
  if (conteo === 0) {
    // 1. Jefe de Despacho
    await prisma.usuario.create({
      data: {
        nombre: "Dr. Juan Pablo Velásquez",
        cargo: "Juez Titular - Juzgado Cuarto de Familia",
        documento: "71.389.450",
        email: EMAIL_JEFE,
        password: "123456",
        rol: "JEFE_DESPACHO",
        activo: true,
        permisos: TODOS_LOS_PERMISOS,
      },
    });

    // 2. Gestor Sustanciador 1
    await prisma.usuario.create({
      data: {
        nombre: "Dra. Laura Cristina Gómez",
        cargo: "Oficial Mayor / Sustanciadora",
        documento: "1.017.234.890",
        email: "laura.gomez@ramajudicial.gov.co",
        password: "123456",
        rol: "GESTOR",
        activo: true,
        permisos: ["RADICAR_EXPEDIENTES", "ANALIZAR_TUTELAS", "GENERAR_PROVIDENCIAS"],
      },
    });

    // 3. Gestor Sustanciador 2
    await prisma.usuario.create({
      data: {
        nombre: "Dr. Carlos Alberto Restrepo",
        cargo: "Escribiente Judicial",
        documento: "98.765.432",
        email: "carlos.restrepo@ramajudicial.gov.co",
        password: "123456",
        rol: "GESTOR",
        activo: true,
        permisos: ["RADICAR_EXPEDIENTES", "GENERAR_PROVIDENCIAS"],
      },
    });
  }
}

export async function loginAction(email: string, clave?: string): Promise<LoginResult> {
  try {
    await asegurarUsuariosDemo();

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
        documento: usuario.documento,
        permisos: usuario.permisos as Permiso[],
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
    await asegurarUsuariosDemo();

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
      documento: usuario.documento,
      permisos: usuario.permisos as Permiso[],
    };
  } catch {
    return null;
  }
}

export async function listarPerfilesParaAcceso(): Promise<SesionUsuario[]> {
  await asegurarUsuariosDemo();

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
    documento: u.documento,
    permisos: u.permisos as Permiso[],
  }));
}

