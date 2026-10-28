const PREFIJOS_TITULOS = new Set([
  "dr",
  "dra",
  "abg",
  "abog",
  "lic",
  "mg",
  "mag",
  "esp",
  "ing",
  "sr",
  "sra",
]);

/**
 * Obtiene las iniciales (Nombre + Apellido) de un usuario judicial,
 * omitiendo títulos honoríficos o académicos como "Dr." o "Dra.".
 */
export function obtenerInicialesUsuario(nombreCompleto: string): string {
  if (!nombreCompleto || !nombreCompleto.trim()) {
    return "US";
  }

  const palabrasLimpias = nombreCompleto
    .trim()
    .split(/\s+/)
    .filter((palabra) => {
      const normalizada = palabra.replace(/\./g, "").toLowerCase();
      return normalizada.length > 0 && !PREFIJOS_TITULOS.has(normalizada);
    });

  if (palabrasLimpias.length === 0) {
    return nombreCompleto.trim().slice(0, 2).toUpperCase();
  }

  if (palabrasLimpias.length === 1) {
    return palabrasLimpias[0].slice(0, 2).toUpperCase();
  }

  if (palabrasLimpias.length === 2) {
    return `${palabrasLimpias[0][0]}${palabrasLimpias[1][0]}`.toUpperCase();
  }

  // Para 3 o más palabras (Primer Nombre + Segundo Nombre + Primer Apellido [+ Segundo Apellido])
  return `${palabrasLimpias[0][0]}${palabrasLimpias[2][0]}`.toUpperCase();
}

