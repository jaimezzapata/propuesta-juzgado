import React from 'react';
import { Scale, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { PROPOSAL_META } from '../data/proposalData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white border-t-[4px] border-[#ffe600] font-mono text-xs py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 bg-[#ffe600] text-black font-black flex items-center justify-center text-xs">
              J4
            </span>
            <span className="font-bold text-sm text-[#ffe600] tracking-wider uppercase">
              JUZGADO DE FAMILIA 4 x SENA FÁBRICA DE SOFTWARE
            </span>
          </div>
          <p className="text-neutral-400 max-w-xl text-[11px] leading-relaxed">
            Página de presentación interactiva de la Propuesta Técnica para el Asistente de IA en Automatización Jurídica. 
            Elaborado por el equipo de desarrollo de la Fábrica de Software SENA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={scrollToTop}
            className="b-btn text-xs py-1.5 px-3 bg-neutral-800 text-white hover:bg-neutral-700"
            title="Volver arriba"
          >
            <ArrowUp size={14} />
            <span>Inicio</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[10px]">
        <div>
          RADICADO: {PROPOSAL_META.radicado} • VERSIÓN: {PROPOSAL_META.version} • {PROPOSAL_META.fecha}
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#00d665]" />
          <span>DISEÑO BRUTALISTA INSTITUCIONAL • CERO AMBIGÜEDADES</span>
        </div>
      </div>
    </footer>
  );
}
