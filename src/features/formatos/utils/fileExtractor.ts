import mammoth from "mammoth";

export interface FileExtractionResult {
  success: boolean;
  text?: string;
  nombreArchivo: string;
  error?: string;
}

export async function extraerTextoDeArchivo(file: File): Promise<FileExtractionResult> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  try {
    if (extension === "docx") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return {
        success: true,
        text: result.value.trim(),
        nombreArchivo: file.name,
      };
    }

    if (["txt", "md", "rtf", "doc"].includes(extension) || file.type.startsWith("text/")) {
      const text = await file.text();
      return {
        success: true,
        text: text.trim(),
        nombreArchivo: file.name,
      };
    }

    // Si es un archivo de texto genérico o no binario
    const rawText = await file.text();
    if (rawText && rawText.length > 0) {
      return {
        success: true,
        text: rawText.trim(),
        nombreArchivo: file.name,
      };
    }

    return {
      success: false,
      nombreArchivo: file.name,
      error: `Formato de archivo no soportado (.${extension}). Utilice archivos .docx, .txt o .rtf`,
    };
  } catch (err: any) {
    return {
      success: false,
      nombreArchivo: file.name,
      error: `Error al procesar el archivo: ${err?.message || "Lectura fallida"}`,
    };
  }
}
