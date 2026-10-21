import React from 'react';
import { 
  FileCheck2, 
  ShieldAlert, 
  Cpu, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Lock, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { PROPOSAL_META } from '../data/proposalData';

export default function HeroDossier({ onNavigateToSimulator, onNavigateToDecisions }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
      {/* Official Dossier Stamp Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="b-stamp b-stamp-yellow">EXPEDIENTE OFICIAL</span>
          <span className="b-stamp b-stamp-red b-stamp-rotated">CONFIDENCIAL / TÉCNICO</span>
          <span className="b-stamp b-stamp-blue">CONVENIO SENA - JUZGADO 4</span>
        </div>
        <div className="font-mono text-xs text-neutral-600 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-3 py-1 border border-current">
          VERSIÓN: {PROPOSAL_META.version} // {PROPOSAL_META.fecha}
        </div>
      </div>

      {/* Main Hero Header Title */}
      <div className="b-card bg-[#ffffff] dark:bg-[#181b20] mb-8 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute right-2 -bottom-6 text-9xl font-black opacity-[0.04] dark:opacity-[0.06] select-none pointer-events-none font-mono">
          JUZGADO-04
        </div>

        <div className="inline-block bg-[#111111] text-[#ffe600] font-mono text-xs font-bold px-3 py-1 mb-4 border border-[#ffe600]">
          /// DOCUMENTO DE INGENIERÍA Y ACUERDO DE DESARROLLO
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-4">
          Asistente de IA para <br className="hidden sm:inline" />
          <span className="bg-[#ffe600] text-black px-2 py-0.5 inline-block -rotate-1 border-[2px] border-black my-1">
            Automatización Jurídica
          </span>
        </h1>

        <p className="text-lg sm:text-xl font-medium max-w-4xl text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed">
          Propuesta técnica para la reducción de carga operativa en el <strong>Juzgado de Familia 4</strong>. 
          Diseñado con enfoque de <strong>MVP acotado exclusivamente a Tutelas</strong>, arquitectura desacoplada, 
          protocolo estricto de <strong>Mocking de datos sintéticos</strong> y desarrollo integral 
          respaldado por la <strong>Fábrica de Software del SENA</strong> bajo estándares profesionales.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button 
            onClick={onNavigateToSimulator}
            className="b-btn b-btn-primary text-base font-bold"
          >
            <Sparkles size={18} />
            <span>Probar Simulador de Tutelas (MVP)</span>
            <ArrowRight size={18} />
          </button>

          <a 
            href="#arquitectura"
            className="b-btn b-btn-blue text-sm"
          >
            <Cpu size={16} />
            <span>Comparar Google vs Azure OpenAI</span>
          </a>

          <a 
            href="#equipo-raci"
            className="b-btn text-sm"
          >
            <Users size={16} />
            <span>Matriz de Roles y Responsabilidades</span>
          </a>
        </div>
      </div>

      {/* 4 Foundation Pillars Grid - Leaves nothing uncertain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div className="b-card bg-[#fffdf0] dark:bg-[#1a1c18] border-l-[8px] border-l-[#ffe600]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">PILAR 01</span>
            <FileCheck2 className="text-[#111111] dark:text-[#ffe600]" size={24} />
          </div>
          <h3 className="font-extrabold text-lg uppercase leading-tight mb-2">
            Módulo Único: Tutelas
          </h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
            MVP hiper-focalizado en el trámite constitucional de mayor volumen. Generación de autos admisoriales, medidas cautelares y proyectos de fallo en Word/PDF.
          </p>
          <div className="mt-3 inline-block font-mono text-[11px] bg-black text-[#ffe600] px-2 py-0.5 font-bold">
            0% DISPERSIÓN DE ALCANCE
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="b-card bg-[#fff5f5] dark:bg-[#201818] border-l-[8px] border-l-[#ff3333]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">PILAR 02</span>
            <Users className="text-[#ff3333]" size={24} />
          </div>
          <h3 className="font-extrabold text-lg uppercase leading-tight mb-2">
            Desarrollo Respaldado SENA
          </h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
            Arquitectura, lógica, seguridad y algoritmos desarrollados y garantizados por la <strong>Fábrica de Software SENA</strong>.
          </p>
          <div className="mt-3 inline-block font-mono text-[11px] bg-[#FFE600] text-black px-2 py-0.5 font-bold">
            CALIDAD Y RESPALDO INSTITUCIONAL
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="b-card bg-[#f0f7ff] dark:bg-[#141a24] border-l-[8px] border-l-[#0052ff]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">PILAR 03</span>
            <Lock className="text-[#0052ff]" size={24} />
          </div>
          <h3 className="font-extrabold text-lg uppercase leading-tight mb-2">
            Aislamiento 100% Mock Data
          </h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
            En fase SENA nunca se procesarán expedientes reales. Solo datos ficticios sintéticos. Datos reales únicamente los ingresa el Juzgado en producción.
          </p>
          <div className="mt-3 inline-block font-mono text-[11px] bg-[#0052ff] text-white px-2 py-0.5 font-bold">
            HABEAS DATA & LEY 1581 BLINDADOS
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="b-card bg-[#f3fff6] dark:bg-[#142218] border-l-[8px] border-l-[#00d665]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-neutral-500">PILAR 04</span>
            <Cpu className="text-[#00d665]" size={24} />
          </div>
          <h3 className="font-extrabold text-lg uppercase leading-tight mb-2">
            Ruta Dual de IA
          </h3>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
            <strong>Opción A:</strong> Google Gemini para inicio rápido en Sprint 1. <br/>
            <strong>Opción B:</strong> Azure OpenAI sujeto a validación de licencias de la Rama Judicial.
          </p>
          <div className="mt-3 inline-block font-mono text-[11px] bg-[#00d665] text-black px-2 py-0.5 font-bold">
            FLEXIBILIDAD SIN BLOQUEOS
          </div>
        </div>
      </div>
    </section>
  );
}
