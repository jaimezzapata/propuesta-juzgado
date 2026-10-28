"use client";

import React, { useEffect, useRef } from "react";
import { MousePointerClick, PenLine } from "lucide-react";
import { ItemVinculoVisual } from "../types";
import { useEstiloVisual } from "@/features/estilos/hooks/useEstiloVisual";
import { obtenerClasesTemaTutelas } from "../utils/estilos-tema.utils";

interface VisorHojaDocxInteractivoProps {
  esJefe: boolean;
  bufferDocx: ArrayBuffer | null;
  textosResaltados: ItemVinculoVisual[];
  modoEdicionManual: boolean;
  onSeleccionarTextoMouse: (
    datos: { texto: string; x: number; y: number } | null
  ) => void;
  onRegistrarEdicionManual: (textoAnterior: string, textoNuevo: string) => void;
}

export const VisorHojaDocxInteractivo: React.FC<
  VisorHojaDocxInteractivoProps
> = ({
  esJefe,
  bufferDocx,
  textosResaltados,
  modoEdicionManual,
  onSeleccionarTextoMouse,
  onRegistrarEdicionManual,
}) => {
  const { estilo, modo } = useEstiloVisual();
  const tema = obtenerClasesTemaTutelas(estilo, modo);
  const contenedorDocxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelado = false;

    async function renderizarWordExacto() {
      if (!bufferDocx || !contenedorDocxRef.current) return;
      const docxPreview = await import("docx-preview");
      if (cancelado || !contenedorDocxRef.current) return;

      contenedorDocxRef.current.innerHTML = "";

      await docxPreview.renderAsync(
        bufferDocx,
        contenedorDocxRef.current,
        undefined,
        {
          className: "docx-judicial-viewer",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          useBase64URL: true,
        }
      );

      if (cancelado || !contenedorDocxRef.current) return;

      const parrafos = contenedorDocxRef.current.querySelectorAll("p, td p");
      parrafos.forEach((p) => {
        const elementoP = p as HTMLElement;

        textosResaltados.forEach((item) => {
          const buscado = item.textoMostrado;
          if (buscado && elementoP.textContent?.includes(buscado)) {
            elementoP.style.position = "relative";
            const spans = elementoP.querySelectorAll("span");
            spans.forEach((sp) => {
              if (sp.textContent && sp.textContent.includes(buscado)) {
                sp.style.backgroundColor = item.fueReemplazado
                  ? "rgba(16, 185, 129, 0.22)"
                  : "rgba(154, 123, 62, 0.20)";
                sp.style.borderBottom = item.fueReemplazado
                  ? "2px solid #059669"
                  : "1.5px dashed #9A7B3E";
                sp.style.padding = "0 2px";
                sp.style.borderRadius = "2px";
                sp.title = item.fueReemplazado
                  ? `Reemplazado desde BD • Texto original: "${item.textoOriginal}"`
                  : `Dato vinculado • Texto original: "${item.textoOriginal}"`;
              }
            });
          }
        });

        if (modoEdicionManual) {
          const spansTexto = elementoP.querySelectorAll("span");
          spansTexto.forEach((sp) => {
            const spanEl = sp as HTMLElement;
            if (!spanEl.textContent?.trim()) return;
            spanEl.contentEditable = "true";
            spanEl.style.outline = "none";
            spanEl.style.cursor = "text";
            let valorInicial = spanEl.textContent || "";

            spanEl.onfocus = () => {
              valorInicial = spanEl.textContent || "";
              spanEl.style.backgroundColor = "rgba(250, 204, 21, 0.30)";
              spanEl.style.boxShadow = "0 0 0 1px #9A7B3E";
            };

            spanEl.onblur = () => {
              spanEl.style.backgroundColor = "";
              spanEl.style.boxShadow = "";
              const valorFinal = spanEl.textContent || "";
              if (valorInicial && valorFinal && valorInicial !== valorFinal) {
                onRegistrarEdicionManual(valorInicial, valorFinal);
              }
            };
          });
        }
      });
    }

    renderizarWordExacto();
    return () => {
      cancelado = true;
    };
  }, [bufferDocx, textosResaltados, modoEdicionManual, onRegistrarEdicionManual]);

  const handleMouseUp = () => {
    if (modoEdicionManual) return;
    const selection = window.getSelection();
    const texto = selection?.toString().trim() || "";

    if (texto.length >= 2 && texto.length <= 160 && selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      onSeleccionarTextoMouse({
        texto,
        x: rect.left + rect.width / 2,
        y: rect.bottom + 14,
      });
    }
  };

  return (
    <div className={`flex flex-col overflow-hidden ${tema.lienzoVisorDocx}`}>
      {/* Barra de guía superior de la hoja */}
      <div className="px-4 py-2 bg-[#0F2537] text-white flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2">
          {modoEdicionManual && esJefe ? (
            <>
              <PenLine className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-300">
                Modo Edición Manual Activo: Haga clic en cualquier texto de la hoja para modificarlo
              </span>
            </>
          ) : esJefe ? (
            <>
              <MousePointerClick className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                <strong>Jefe de Despacho:</strong> Sombrea cualquier palabra en la hoja para habilitarla como variable global
              </span>
            </>
          ) : (
            <span>
              <strong>Vista Previa Oficial:</strong> El formato base está protegido; diligencie los campos habilitados en el panel izquierdo
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 inline-block bg-[#9A7B3E]/50 border border-dashed border-[#D4AF37]" />
            Original Vinculado
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 inline-block bg-emerald-500/50 border border-emerald-400" />
            Reemplazado
          </span>
        </div>
      </div>

      {/* Lienzo amplio del documento Word (.docx) */}
      <div
        onMouseUp={handleMouseUp}
        className="overflow-x-auto overflow-y-auto h-[calc(100vh-225px)] min-h-[480px] p-2 sm:p-4 flex justify-center"
      >
        <div
          ref={contenedorDocxRef}
          className="docx-container-override w-full flex flex-col items-center"
        />
      </div>
    </div>
  );
};
