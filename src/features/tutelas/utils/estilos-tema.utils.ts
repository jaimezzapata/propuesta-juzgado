import { ModoColor, TipoEstiloVisual } from "@/features/estilos/types";

export interface ClasesTemaTutelas {
  card: string;
  cardInteractiva: (activa: boolean) => string;
  subpanel: string;
  input: string;
  inputReemplazado: string;
  botonPrimario: string;
  botonAccionVino: string;
  botonSecundario: (activo?: boolean) => string;
  badgeNeutro: string;
  lienzoVisorDocx: string;
  modalContenedor: string;
}

/**
 * Centraliza todas las clases de color y contraste para Modo Claro y Modo Oscuro
 * en los 3 estilos visuales del sistema, evitando duplicación (Principio DRY).
 */
export function obtenerClasesTemaTutelas(
  estilo: TipoEstiloVisual,
  modo: ModoColor
): ClasesTemaTutelas {
  const esOscuro = modo === "oscuro";

  const card = (() => {
    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] text-[#EDE6DF] border border-[#4D3339] rounded-xl shadow-md";
        case "dark-lawfirm":
          return "bg-[#181C23] text-[#E2E8F0] border border-[#2D333F] rounded-xl shadow-lg";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] text-[#F1F5F9] border-2 border-slate-600 shadow-[3px_3px_0px_#020617]";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] text-[#2C1810] border border-[#6B1D2F]/25 rounded-xl shadow-sm";
        case "dark-lawfirm":
          return "bg-white text-[#111827] border border-[#C5A880]/70 rounded-xl shadow-sm";
        case "neo-brutalista":
        default:
          return "bg-white text-[#0F172A] border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A]";
      }
    }
  })();

  const cardInteractiva = (activa: boolean) => {
    if (activa) {
      if (esOscuro) {
        return estilo === "neo-brutalista"
          ? "bg-[#0F2537] text-white border-2 border-[#D4AF37] shadow-[4px_4px_0px_#020617]"
          : "bg-[#2C2225] text-white border-2 border-[#D4AF37] rounded-xl shadow-lg";
      }
      return estilo === "neo-brutalista"
        ? "bg-[#F8FAFC] text-[#0F172A] border-2 border-[#0F172A] ring-2 ring-[#9A7B3E] shadow-[4px_4px_0px_#0F172A]"
        : "bg-white text-[#0F172A] border-2 border-[#9A7B3E] rounded-xl shadow-md";
    }

    if (esOscuro) {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#251E20] hover:bg-[#2E2528] text-[#EDE6DF] border border-[#4D3339] hover:border-[#D4AF37] rounded-xl shadow-md";
        case "dark-lawfirm":
          return "bg-[#181C23] hover:bg-[#1E242D] text-[#E2E8F0] border border-[#2D333F] hover:border-[#C5A880] rounded-xl shadow-lg";
        case "neo-brutalista":
        default:
          return "bg-[#1E293B] hover:bg-[#26354D] text-[#F1F5F9] border-2 border-slate-600 hover:border-[#D4AF37] shadow-[3px_3px_0px_#020617]";
      }
    } else {
      switch (estilo) {
        case "editorial-notarial":
          return "bg-[#FCFAF7] hover:bg-white text-[#2C1810] border border-[#6B1D2F]/25 hover:border-[#6B1D2F] rounded-xl shadow-sm";
        case "dark-lawfirm":
          return "bg-white hover:bg-slate-50 text-[#111827] border border-[#C5A880]/70 hover:border-[#A28256] rounded-xl shadow-sm";
        case "neo-brutalista":
        default:
          return "bg-white hover:bg-slate-50 text-[#0F172A] border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A]";
      }
    }
  };

  const subpanel = esOscuro
    ? "bg-[#0F172A]/80 border border-slate-700 text-[#E2E8F0]"
    : "bg-slate-50 border border-slate-200 text-[#0F172A]";

  const input = esOscuro
    ? "bg-[#0F172A] text-[#F1F5F9] border border-slate-600 focus:border-[#D4AF37] placeholder:text-slate-400"
    : "bg-white text-[#0F172A] border border-slate-400 focus:border-[#0F2537] placeholder:text-slate-400";

  const inputReemplazado = esOscuro
    ? "bg-[#064E3B]/45 text-[#ECFDF5] border-2 border-[#10B981] focus:border-[#34D399]"
    : "bg-[#ECFDF5] text-[#064E3B] border-2 border-[#059669] focus:border-[#047857]";

  const botonPrimario =
    estilo === "neo-brutalista"
      ? esOscuro
        ? "bg-[#0F2537] hover:bg-[#16354F] text-white border-2 border-slate-500 shadow-[2px_2px_0px_#020617] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        : "bg-[#0F2537] hover:bg-[#16354F] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      : "bg-[#0F2537] hover:bg-[#16354F] text-white rounded-lg shadow-sm";

  const botonAccionVino =
    estilo === "neo-brutalista"
      ? esOscuro
        ? "bg-[#8E2438] hover:bg-[#731C2D] text-white border-2 border-slate-500 shadow-[2px_2px_0px_#020617]"
        : "bg-[#6B1D2F] hover:bg-[#541624] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
      : "bg-[#6B1D2F] hover:bg-[#541624] text-white rounded-lg shadow-sm";

  const botonSecundario = (activo = false) => {
    if (activo) {
      return esOscuro
        ? "bg-[#9A7B3E] text-white border-2 border-[#D4AF37] shadow-[2px_2px_0px_#020617]"
        : "bg-[#9A7B3E] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]";
    }
    if (esOscuro) {
      return estilo === "neo-brutalista"
        ? "bg-[#0F172A] hover:bg-slate-800 text-[#F1F5F9] border-2 border-slate-600 shadow-[2px_2px_0px_#020617]"
        : "bg-[#222731] hover:bg-[#2B313D] text-[#E2E8F0] border border-slate-600 rounded-lg";
    }
    return estilo === "neo-brutalista"
      ? "bg-white hover:bg-slate-100 text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
      : "bg-white hover:bg-slate-100 text-[#111827] border border-slate-300 rounded-lg";
  };

  const badgeNeutro = esOscuro
    ? "bg-[#0F172A] text-[#D4AF37] border border-slate-600"
    : "bg-slate-100 text-[#0F172A] border border-slate-300";

  const lienzoVisorDocx =
    estilo === "neo-brutalista"
      ? esOscuro
        ? "bg-[#0B1120] border-2 border-slate-600 shadow-[3px_3px_0px_#020617]"
        : "bg-slate-200 border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A]"
      : esOscuro
      ? "bg-[#11141B] border border-slate-700 rounded-xl shadow-lg"
      : "bg-slate-200/80 border border-slate-300 rounded-xl shadow-inner";

  const modalContenedor = esOscuro
    ? estilo === "neo-brutalista"
      ? "bg-[#1E293B] text-[#F1F5F9] border-2 border-slate-500 shadow-[6px_6px_0px_#020617]"
      : "bg-[#181C23] text-[#E2E8F0] border border-[#C5A880] rounded-2xl shadow-2xl"
    : estilo === "neo-brutalista"
    ? "bg-white text-[#0F172A] border-2 border-[#0F172A] shadow-[6px_6px_0px_#0F172A]"
    : "bg-white text-[#111827] border border-slate-300 rounded-2xl shadow-2xl";

  return {
    card,
    cardInteractiva,
    subpanel,
    input,
    inputReemplazado,
    botonPrimario,
    botonAccionVino,
    botonSecundario,
    badgeNeutro,
    lienzoVisorDocx,
    modalContenedor,
  };
}

