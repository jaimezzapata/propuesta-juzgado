export type TipoEstiloVisual =
  | "neo-brutalista"
  | "editorial-notarial"
  | "dark-lawfirm";

export type ModoColor = "claro" | "oscuro";

export interface EstiloVisualInfo {
  id: TipoEstiloVisual;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  referencia: string;
  colores: {
    primario: string;
    secundario: string;
    fondo: string;
    superficie: string;
    acento: string;
    texto: string;
  };
}

export const ESTILOS_DISPONIBLES: EstiloVisualInfo[] = [
  {
    id: "neo-brutalista",
    nombre: "Neo-Brutalismo Judicial",
    subtitulo: "Oficial Rama Judicial",
    descripcion: "Bordes sólidos contundentes, sombras duras de bloque y azul petróleo institucional.",
    referencia: "Directriz Institucional de Despacho",
    colores: {
      primario: "#0F2537",
      secundario: "#0F172A",
      fondo: "#F8FAFC",
      superficie: "#FFFFFF",
      acento: "#9A7B3E",
      texto: "#0F172A",
    },
  },
  {
    id: "editorial-notarial",
    nombre: "Editorial Notarial & Legal",
    subtitulo: "Prestigio Diplomático",
    descripcion: "Inspirado en minutas consulares: vinotinto noble, fondos cálidos pergamino y tipografía serif clásica.",
    referencia: "Referente Inmigración Simple",
    colores: {
      primario: "#5A1624",
      secundario: "#6B1D2F",
      fondo: "#F7F3EE",
      superficie: "#FCFAF7",
      acento: "#B38646",
      texto: "#2C1810",
    },
  },
  {
    id: "dark-lawfirm",
    nombre: "Bufete Corporativo Dark",
    subtitulo: "Alto Litigio Internacional",
    descripcion: "Obsidiana solemne, grafito pulido y acentos en oro viejo/bronce para ambientes jurídicos modernos.",
    referencia: "Referente Advokat House of Lawyers",
    colores: {
      primario: "#0D0F12",
      secundario: "#16191F",
      fondo: "#0A0C0E",
      superficie: "#15181E",
      acento: "#C5A880",
      texto: "#F3F4F6",
    },
  },
];
