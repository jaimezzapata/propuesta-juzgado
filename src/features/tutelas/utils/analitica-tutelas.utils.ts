import {
  CasoTutelaDTO,
  MetricaRendimientoGestor,
  MetricasGlobalesDespacho,
} from "../types";

export const GESTORES_OFICIALES_DESPACHO = [
  {
    nombre: "Dra. Laura Cristina Gómez",
    cargo: "Oficial Mayor / Sustanciadora",
  },
  {
    nombre: "Dr. Carlos Alberto Restrepo",
    cargo: "Escribiente Judicial",
  },
  {
    nombre: "Dra. Juliana Andrea Vélez",
    cargo: "Sustanciadora de Tutelas",
  },
];

export function calcularMetricasGlobalesTutelas(
  casos: CasoTutelaDTO[]
): MetricasGlobalesDespacho {
  const totalCasos = casos.length;
  if (totalCasos === 0) {
    return {
      totalCasos: 0,
      pendientes: 0,
      resueltos: 0,
      devueltos: 0,
      perdidos: 0,
      porcentajeResueltos: 0,
      porcentajePendientes: 0,
      porcentajeDevueltos: 0,
      porcentajePerdidos: 0,
      tasaEfectividadGlobal: 0,
    };
  }

  let pendientes = 0;
  let resueltos = 0;
  let devueltos = 0;
  let perdidos = 0;

  for (const c of casos) {
    switch (c.estado) {
      case "RESUELTO":
        resueltos++;
        break;
      case "DEVUELTO":
        devueltos++;
        break;
      case "PERDIDO":
        perdidos++;
        break;
      case "PENDIENTE":
      default:
        pendientes++;
        break;
    }
  }

  const porcentaje = (valor: number) => Math.round((valor / totalCasos) * 100);
  const cerrados = resueltos + perdidos;
  const tasaEfectividadGlobal =
    cerrados > 0
      ? Math.round((resueltos / cerrados) * 100)
      : porcentaje(resueltos);

  return {
    totalCasos,
    pendientes,
    resueltos,
    devueltos,
    perdidos,
    porcentajeResueltos: porcentaje(resueltos),
    porcentajePendientes: porcentaje(pendientes),
    porcentajeDevueltos: porcentaje(devueltos),
    porcentajePerdidos: porcentaje(perdidos),
    tasaEfectividadGlobal,
  };
}

export function calcularMetricasPorGestor(
  casos: CasoTutelaDTO[]
): MetricaRendimientoGestor[] {
  const mapa = new Map<
    string,
    {
      cargo: string;
      pendientes: number;
      resueltos: number;
      devueltos: number;
      perdidos: number;
      sumaDias: number;
    }
  >();

  // Inicializar con los gestores oficiales para que siempre aparezcan en el análisis
  for (const g of GESTORES_OFICIALES_DESPACHO) {
    mapa.set(g.nombre, {
      cargo: g.cargo,
      pendientes: 0,
      resueltos: 0,
      devueltos: 0,
      perdidos: 0,
      sumaDias: 0,
    });
  }

  for (const c of casos) {
    const actual = mapa.get(c.gestorAsignadoNombre) || {
      cargo: c.gestorAsignadoCargo || "Gestor Judicial",
      pendientes: 0,
      resueltos: 0,
      devueltos: 0,
      perdidos: 0,
      sumaDias: 0,
    };

    if (c.estado === "RESUELTO") actual.resueltos++;
    else if (c.estado === "DEVUELTO") actual.devueltos++;
    else if (c.estado === "PERDIDO") actual.perdidos++;
    else actual.pendientes++;

    actual.sumaDias += c.diasTerminoRestantes;
    mapa.set(c.gestorAsignadoNombre, actual);
  }

  const resultado: MetricaRendimientoGestor[] = [];

  for (const [nombreGestor, datos] of mapa.entries()) {
    const totalAsignados =
      datos.pendientes + datos.resueltos + datos.devueltos + datos.perdidos;
    const tasaEfectividad =
      totalAsignados > 0
        ? Math.round((datos.resueltos / totalAsignados) * 100)
        : 0;
    const diasPromedioRestantes =
      totalAsignados > 0 ? Math.round(datos.sumaDias / totalAsignados) : 0;

    resultado.push({
      nombreGestor,
      cargoGestor: datos.cargo,
      totalAsignados,
      pendientes: datos.pendientes,
      resueltos: datos.resueltos,
      devueltos: datos.devueltos,
      perdidos: datos.perdidos,
      tasaEfectividad,
      diasPromedioRestantes,
    });
  }

  return resultado.sort((a, b) => b.totalAsignados - a.totalAsignados);
}

