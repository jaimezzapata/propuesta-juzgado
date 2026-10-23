"use client";

import React, { useEffect, useRef, useState } from "react";
import { Scale, FileCheck, Copy, Eye, FileSpreadsheet } from "lucide-react";
import { renderAsync } from "docx-preview";
import { Badge } from "@/components/ui/Badge";

interface VistaPreviaJudicialProps {
  titulo: string;
  codigo: string;
  contenido: string;
  archivoBuffer?: ArrayBuffer | null;
}

export const VistaPreviaJudicial: React.FC<VistaPreviaJudicialProps> = ({
  titulo,
  codigo,
  contenido,
  archivoBuffer,
}) => {
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [modoDocx, setModoDocx] = useState(false);
  const [errorDocx, setErrorDocx] = useState<string | null>(null);

  useEffect(() => {
    if (archivoBuffer && docxContainerRef.current) {
      setErrorDocx(null);
      setModoDocx(true);
      docxContainerRef.current.innerHTML = "";
      renderAsync(archivoBuffer, docxContainerRef.current, undefined, {
        inWrapper: false,
        ignoreWidth: true,
        breakPages: false,
      }).catch((err) => {
        setErrorDocx(err?.message || "Error al renderizar formato Word.");
        setModoDocx(false);
      });
    } else {
      setModoDocx(false);
    }
  }, [archivoBuffer]);

  const esHtml = contenido && /<\/?[a-z][\s\S]*>/i.test(contenido);
  const palabras = contenido ? contenido.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length : 0;

  const copiarTexto = () => {
    if (contenido) {
      const textoLimpio = esHtml ? contenido.replace(/<[^>]*>/g, " ") : contenido;
      navigator.clipboard.writeText(textoLimpio);
      alert("Texto copiado al portapapeles.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A]">
      {/* Barra superior de la vista previa */}
      <div className="bg-[#0F2537] text-white p-3 border-b-2 border-[#0F172A] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#9A7B3E]" />
          <span className="text-xs font-black uppercase tracking-wider text-white">
            Vista Previa de Documento Oficial
          </span>
          {codigo && <Badge variant="gold" size="sm">{codigo}</Badge>}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold">
          {archivoBuffer && (
            <button
              type="button"
              onClick={() => setModoDocx(!modoDocx)}
              className="px-2 py-0.5 bg-[#9A7B3E] text-white border border-[#0F172A] flex items-center gap-1 shadow-[1px_1px_0px_#0F172A]"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              {modoDocx ? "Ver Formato Impreso" : "Ver Diseño Exacto Word"}
            </button>
          )}

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

      {/* Contenedor de visualización */}
      <div className="p-4 sm:p-6 overflow-y-auto min-h-[460px] max-h-[600px] bg-white text-[#0F172A]">
        {/* Si está en modo DOCX exacto */}
        <div
          ref={docxContainerRef}
          className={`${modoDocx && !errorDocx ? "block" : "hidden"} docx-render-container w-full`}
        />

        {/* Si está en modo HTML / Plantilla estándar */}
        {(!modoDocx || errorDocx) && (
          <div className="w-full max-w-3xl mx-auto border-2 border-dashed border-neutral-300 p-6 sm:p-10 bg-[#FAFAFA] shadow-sm relative">
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

            {/* Cuerpo del texto o Tablas HTML */}
            {contenido ? (
              esHtml ? (
                <div
                  className="judicial-html-content text-xs font-serif leading-relaxed text-neutral-900"
                  dangerouslySetInnerHTML={{ __html: contenido }}
                />
              ) : (
                <div className="text-xs font-serif leading-relaxed text-justify text-neutral-900 whitespace-pre-wrap">
                  {contenido}
                </div>
              )
            ) : (
              <div className="py-12 text-center text-neutral-400 text-xs italic">
                Escribe en el editor o carga un archivo (.docx) para visualizar la providencia judicial con sus tablas y estilos aquí.
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
        )}
      </div>

      <style jsx global>{`
        .judicial-html-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          border: 2px solid #0f172a;
          background-color: #ffffff;
        }
        .judicial-html-content th,
        .judicial-html-content td {
          border: 1px solid #0f172a;
          padding: 6px 10px;
          text-align: left;
          font-size: 0.8rem;
        }
        .judicial-html-content th {
          background-color: #0f2537;
          color: #ffffff;
          font-weight: 800;
          text-transform: uppercase;
        }
        .judicial-html-content tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .judicial-html-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        .judicial-html-content strong,
        .judicial-html-content b {
          font-weight: 800;
          color: #0f172a;
        }
        .docx-render-container {
          overflow-x: auto;
          background: #ffffff;
          padding: 1rem;
        }
        .docx-render-container .docx-wrapper {
          background: transparent !important;
          padding: 0 !important;
        }
        .docx-render-container .docx {
          margin: 0 auto !important;
          box-shadow: none !important;
          border: 1px solid #cbd5e1 !important;
          padding: 2rem !important;
        }
      `}</style>
    </div>
  );
};
