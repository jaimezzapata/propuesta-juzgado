import mammoth from "mammoth";

export interface FileExtractionResult {
  success: boolean;
  text?: string;
  html?: string;
  arrayBuffer?: ArrayBuffer;
  nombreArchivo: string;
  error?: string;
}

export async function extraerTextoDeArchivo(file: File): Promise<FileExtractionResult> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  try {
    if (extension === "docx") {
      const arrayBuffer = await file.arrayBuffer();
      // mammoth.convertToHtml preserva tablas (table, tr, td), encabezados, negritas, alineación
      const resultHtml = await mammoth.convertToHtml({ arrayBuffer });
      return {
        success: true,
        text: resultHtml.value.trim(),
        html: resultHtml.value.trim(),
        arrayBuffer,
        nombreArchivo: file.name,
      };
    }

    if (["txt", "md", "rtf", "doc"].includes(extension) || file.type.startsWith("text/")) {
      const text = await file.text();
      return {
        success: true,
        text: text.trim(),
        html: text.trim().replace(/\n/g, "<br/>"),
        nombreArchivo: file.name,
      };
    }

    const rawText = await file.text();
    if (rawText && rawText.length > 0) {
      return {
        success: true,
        text: rawText.trim(),
        html: rawText.trim().replace(/\n/g, "<br/>"),
        nombreArchivo: file.name,
      };
    }

    return {
      success: false,
      nombreArchivo: file.name,
      error: `Formato de archivo no soportado (.${extension}). Utilice archivos .docx o .txt`,
    };
  } catch (err: any) {
    return {
      success: false,
      nombreArchivo: file.name,
      error: `Error al procesar el archivo: ${err?.message || "Lectura fallida"}`,
    };
  }
}
