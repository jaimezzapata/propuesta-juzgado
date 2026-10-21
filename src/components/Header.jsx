import React from 'react';
import { Scale, ShieldCheck, Moon, Sun, FileText, CheckCircle2 } from 'lucide-react';
import { PROPOSAL_META } from '../data/proposalData';

export default function Header({ isDark, setIsDark }) {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f4ea] dark:bg-[#0f1115] border-b-[3px] border-[#111111] dark:border-[#f3f4f6]">
      {/* Upper Judicial Ticker */}
      <div className="judicial-ticker">
        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 font-bold text-[#ffe600]">
            <Scale size={15} /> RAMA JUDICIAL x SENA
          </span>
          <span className="text-[#888888]">|</span>
          <span>RADICADO: <strong className="text-white">{PROPOSAL_META.radicado}</strong></span>
          <span className="text-[#888888]">|</span>
          <span>ESTADO: <span className="bg-[#FFE600] text-black px-2 py-0.5 text-xs font-bold uppercase">{PROPOSAL_META.estado}</span></span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs text-[#aaaaaa]">ALCANCE TÉCNICO: MVP TUTELAS</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffe600] border-[2px] border-[#111111] dark:border-[#f3f4f6] flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#f3f4f6] text-[#111111]">
            J4
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight uppercase leading-none">
              Juzgado de Familia 4 <span className="text-[#ff6600] font-mono text-xs ml-1 bg-[#ffe600] text-black px-1.5 py-0.5 border border-black">SENA</span>
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
              Propuesta Técnica de Asistente IA para Automatización Jurídica
            </p>
          </div>
        </div>

        {/* Section Navigation Quick Links */}
        <nav className="hidden lg:flex items-center gap-2 font-mono text-xs">
          <a href="#vision" className="px-2 py-1 hover:bg-[#ffe600] hover:text-black border border-transparent hover:border-black transition-all">
            1. Definición
          </a>
          <a href="#mvp-simulador" className="px-2 py-1 bg-[#ffe600] text-black border border-black font-bold shadow-[2px_2px_0px_#000]">
            2. MVP Tutelas (Simulador)
          </a>
          <a href="#arquitectura" className="px-2 py-1 hover:bg-[#ffe600] hover:text-black border border-transparent hover:border-black transition-all">
            3. Stack & IA
          </a>
          <a href="#seguridad" className="px-2 py-1 hover:bg-[#ffe600] hover:text-black border border-transparent hover:border-black transition-all">
            4. Seguridad / Mocking
          </a>
          <a href="#equipo-raci" className="px-2 py-1 hover:bg-[#ffe600] hover:text-black border border-transparent hover:border-black transition-all">
            5. Gobernanza
          </a>
          <a href="#formalizacion" className="px-2 py-1 hover:bg-[#ffe600] hover:text-black border border-transparent hover:border-black transition-all">
            6. Fases y Visto Bueno
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            title="Alternar Modo Oscuro Brutalista"
            className="b-btn p-2 text-xs"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} className="text-[#ffe600]" /> : <Moon size={16} />}
          </button>
        </div>
      </div>
      
      {/* Decorative hazard top indicator */}
      <div className="hazard-stripes"></div>
    </header>
  );
}
