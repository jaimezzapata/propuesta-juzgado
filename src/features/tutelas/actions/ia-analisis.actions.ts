"use server";

import {
  CAMPOS_BASE_DATOS,
  CampoBaseDatosId,
  ProveedorIA,
  ResultadoDeteccionIA,
} from "../types";
import {
  detectarEntidadesJuridicasEnTexto,
  detectarProveedorPorApiKey,
  obtenerNombreProveedorIA,
} from "../utils/ia-detector.utils";

const CAMPOS_VALIDOS = new Set<CampoBaseDatosId>(
  CAMPOS_BASE_DATOS.map((c) => c.id)
);

function construirPromptSistema(): string {
  const listaCampos = CAMPOS_BASE_DATOS.map(
    (c) => `- "${c.id}": ${c.etiqueta} (${c.descripcion})`
  ).join("\n");

  return `Eres un asistente jurídico experto en documentos judiciales de Colombia.
Tu tarea es leer el texto de un documento de tutela o providencia y detectar fragmentos exactos de texto (nombres de clientes/accionantes, cédulas, radicados, correos, teléfonos, direcciones, ciudades, entidades accionadas, derechos invocados, fechas, objeto/pretensión, juez y cargo) que correspondan a los siguientes campos de base de datos:

${listaCampos}

REGLAS ESTRICTAS:
1. "textoOriginal" DEBE ser una subcadena EXACTA, literal e idéntica a como aparece en el documento (respetando mayúsculas, tildes y signos internos, sin incluir puntos finales de oración).
2. NO inventes marcadores como {{}} ni modifiques el texto.
3. Responde ÚNICAMENTE con un arreglo JSON válido con el formato:
[{"textoOriginal": "fragmento exacto en el documento", "campoBD": "id_del_campo"}]`;
}

function extraerJsonDeRespuesta(respuestaTexto: string): Array<{
  textoOriginal: string;
  campoBD: CampoBaseDatosId;
}> {
  try {
    const matchArray = respuestaTexto.match(/\[[\s\S]*\]/);
    if (!matchArray) return [];
    const parsed = JSON.parse(matchArray[0]);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item: any) =>
          item &&
          typeof item.textoOriginal === "string" &&
          item.textoOriginal.trim().length >= 3 &&
          CAMPOS_VALIDOS.has(item.campoBD)
      )
      .map((item: any) => ({
        textoOriginal: item.textoOriginal.trim(),
        campoBD: item.campoBD as CampoBaseDatosId,
      }));
  } catch {
    return [];
  }
}

async function llamarGeminiAPI(
  apiKey: string,
  textoDocumento: string
): Promise<Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>> {
  const modelos = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  const prompt = `${construirPromptSistema()}\n\nDOCUMENTO A ANALIZAR:\n"""\n${textoDocumento}\n"""`;

  for (const modelo of modelos) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const texto =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      const extraidos = extraerJsonDeRespuesta(texto);
      if (extraidos.length > 0) return extraidos;
    }
  }

  throw new Error("No se obtuvo respuesta válida de Google Gemini.");
}

async function llamarOpenAIAPI(
  apiKey: string,
  textoDocumento: string
): Promise<Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.1,
      messages: [
        { role: "system", content: construirPromptSistema() },
        {
          role: "user",
          content: `Analiza este documento judicial y devuelve el JSON:\n\n${textoDocumento}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI respondió con estado ${res.status}`);
  }

  const data = await res.json();
  const contenido = data?.choices?.[0]?.message?.content || "[]";
  return extraerJsonDeRespuesta(contenido);
}

async function llamarClaudeAPI(
  apiKey: string,
  textoDocumento: string
): Promise<Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1500,
      temperature: 0.1,
      system: construirPromptSistema(),
      messages: [
        {
          role: "user",
          content: `Analiza este documento judicial y devuelve únicamente el arreglo JSON:\n\n${textoDocumento}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Claude API respondió con estado ${res.status}`);
  }

  const data = await res.json();
  const contenido = data?.content?.[0]?.text || "[]";
  return extraerJsonDeRespuesta(contenido);
}

export async function analizarVariablesDocumentoConIAAction(
  textoDocumento: string,
  apiKeyUsuario?: string,
  proveedorForzado?: ProveedorIA
): Promise<ResultadoDeteccionIA> {
  const textoLimpio = textoDocumento.trim();
  if (!textoLimpio) {
    return {
      success: false,
      proveedorUsado: "local",
      vinculosDetectados: [],
      mensaje: "El documento no contiene texto legible para analizar.",
    };
  }

  const apiKey = apiKeyUsuario?.trim() || "";
  const proveedor: ProveedorIA = apiKey
    ? proveedorForzado && proveedorForzado !== "local"
      ? proveedorForzado
      : detectarProveedorPorApiKey(apiKey)
    : "local";

  const hallazgosLocales = detectarEntidadesJuridicasEnTexto(textoLimpio);

  if (proveedor !== "local" && apiKey) {
    try {
      let hallazgosIA: Array<{
        textoOriginal: string;
        campoBD: CampoBaseDatosId;
      }> = [];

      if (proveedor === "gemini") {
        hallazgosIA = await llamarGeminiAPI(apiKey, textoLimpio);
      } else if (proveedor === "claude") {
        hallazgosIA = await llamarClaudeAPI(apiKey, textoLimpio);
      } else if (proveedor === "openai") {
        hallazgosIA = await llamarOpenAIAPI(apiKey, textoLimpio);
      }

      // Filtrar solo fragmentos que realmente existan literalmente en el documento y fusionar con los locales
      const verificados = hallazgosIA.filter((h) =>
        textoLimpio.includes(h.textoOriginal)
      );

      const mapaUnico = new Map<string, CampoBaseDatosId>();
      for (const h of [...verificados, ...hallazgosLocales]) {
        if (!mapaUnico.has(h.textoOriginal)) {
          mapaUnico.set(h.textoOriginal, h.campoBD);
        }
      }

      const combinados = Array.from(mapaUnico.entries()).map(
        ([textoOriginal, campoBD]) => ({ textoOriginal, campoBD })
      );

      return {
        success: true,
        proveedorUsado: proveedor,
        vinculosDetectados: combinados,
        mensaje: `Análisis completado con ${obtenerNombreProveedorIA(
          proveedor
        )}: ${combinados.length} datos reemplazables detectados.`,
      };
    } catch {
      // Si la API Key falla o no tiene saldo, respaldamos transparentemente con el motor jurídico local
      return {
        success: true,
        proveedorUsado: "local",
        vinculosDetectados: hallazgosLocales,
        mensaje: `La API Key de ${obtenerNombreProveedorIA(
          proveedor
        )} no respondió; se aplicó el Motor Semántico Jurídico detectando ${
          hallazgosLocales.length
        } datos.`,
      };
    }
  }

  return {
    success: true,
    proveedorUsado: "local",
    vinculosDetectados: hallazgosLocales,
    mensaje: `Análisis automático completado: ${hallazgosLocales.length} datos reemplazables detectados en el documento.`,
  };
}

