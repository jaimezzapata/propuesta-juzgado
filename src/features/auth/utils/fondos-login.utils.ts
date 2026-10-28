export interface FondoJudicialLogin {
  id: string;
  titulo: string;
  url: string;
  posicion?: string;
}

export const FONDOS_JUDICIALES_LOGIN: FondoJudicialLogin[] = [
  {
    id: "palacio-principal",
    titulo: "Despacho Judicial Clásico",
    url: "/images/judicial-bg.jpg",
    posicion: "center",
  },
  {
    id: "biblioteca-juridica",
    titulo: "Biblioteca de Jurisprudencia",
    url: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=85",
    posicion: "center",
  },
  {
    id: "columnas-tribunal",
    titulo: "Arquitectura de Alta Corte",
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85",
    posicion: "center",
  },
  {
    id: "estrado-solemne",
    titulo: "Estrado y Garantía Procesal",
    url: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1920&q=85",
    posicion: "center",
  },
  {
    id: "archivo-expedientes",
    titulo: "Archivo Histórico Judicial",
    url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=85",
    posicion: "center",
  },
];

export const STORAGE_KEY_FONDO_LOGIN = "juzgado_login_bg_id";

export const STORAGE_KEY_LEMA_LOGIN = "juzgado_login_lema_personalizado";

export const LEMA_POR_DEFECTO_LOGIN =
  "Justicia pronta, celeridad y garantía procesal.";

export const LEMAS_SUGERIDOS_LOGIN: string[] = [
  "Justicia pronta, celeridad y garantía procesal.",
  "Protección efectiva de los derechos fundamentales y la familia.",
  "Rigor jurídico, transparencia y servicio al ciudadano.",
  "Donde hay justicia, prevalece la dignidad humana.",
];


