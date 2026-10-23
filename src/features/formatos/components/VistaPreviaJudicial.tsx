import React from "react";
import { Scale, FileCheck, Copy } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface VistaPreviaJudicialProps {
  titulo: string;
  codigo: string;
  contenido: string;
}

export const VistaPreviaJudicial: React.FC<VistaPreviaJudicialProps> = ({
  titulo,
  codigo,
  contenido,
}) => {
  const palabras = contenido ? contenido.trim().split(/\s+/).length : 0;

  const copiarTexto = () => {
    if (contenido) {
      navigator.clipboard.writeText(contenido);
      alert("Texto copiado al portapapeles.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A]">
      {/* Barra superior de la vista previa */}
      <div className="bg-[#0F2537] text-white p-2.5 border-b-2 border-[#0F172A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#9A7B3E]" />
          <span className="text-xs font-black uppercase tracking-wider text-white">
            Vista Previa de Documento Oficial
          </span>
          {codigo && <Badge variant="gold" size="sm">{codigo}</Badge>}
        </div>

        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="text-neutral-300">{palabras} palabras</span>
          <button
            type="button"
            onClick={copiarTexto}
            className="p-1 text-white hover:text-[#9A7B3E] flex items-center gap-1"
            title="Copiar texto"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hoja judicial simulada (Formato de lectura) */}
      <div className="p-6 overflow-y-auto max-h-[520px] bg-white text-[#0F172A]">
        <div className="max-w-2xl mx-auto border-2 border-dashed border-neutral-300 p-8 bg-[#FAFAFA] shadow-sm relative">
          {/* Membrete Oficial */}
          <div className="text-center pb-5 mb-5 border-b border-neutral-300">
            <div className="w-8 h-8 mx-auto mb-2 text-[#0F2537] flex items-center justify-center">
              <Scale className="w-7 h-7" />
            </div>
            <h4 className="text-[11px] font-black tracking-widest uppercase text-[#0F2537]">
              REPÚBLICA DE COLOMBIA
            </h4>
            <h5 className="text-[10px] font-bold tracking-wider uppercase text-[#9A7B3E]">
              RAMA JUDICIAL DEL PODER PÚBLICO
            </h5>
            <p className="text-[10px] font-bold text-neutral-600 uppercase mt-0.5">
              JUZGADO CUARTO DE FAMILIA DE ORALIDAD — MEDELLÍN
            </p>
          </div>

          {/* Título */}
          <div className="text-center mb-6">
            <h3 className="text-sm font-black uppercase text-[#0F172A] underline underline-offset-4">
              {titulo || "TÍTULO DE LA PROVIDENCIA"}
            </h3>
          </div>

          {/* Cuerpo del texto */}
          {contenido ? (
            <div className="text-xs font-serif leading-relaxed text-justify text-neutral-900 whitespace-pre-wrap">
              {contenido}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-400 text-xs italic">
              Escribe en el editor o carga un archivo para visualizar la providencia judicial aquí en tiempo real.
            </div>
          )}

          {/* Pie de firma del despacho */}
          <div className="mt-10 pt-6 border-t border-neutral-300 text-center">
            <span className="text-[11px] font-black uppercase block text-[#0F2537]">
              DR. JUAN PABLO VELÁSQUEZ
            </span>
            <span className="text-[10px] font-bold text-neutral-600 block">
              Juez Cuarto de Familia de Oralidad
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
