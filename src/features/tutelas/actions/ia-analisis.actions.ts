"use server";

import {
  CAMPOS_BASE_DATOS,
  CampoBaseDatosId,
  IntentoEjecucionIA,
  MapaClavesIA,
  ProveedorIA,
  ResultadoDeteccionIA,
} from "../types";
import {
  construirColaConmutacionIA,
  detectarEntidadesJuridicasEnTexto,
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

async function intentarConGemini(
  apiKey: string,
  textoDocumento: string,
  intentos: IntentoEjecucionIA[]
): Promise<{
  modelo: string;
  hallazgos: Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>;
} | null> {
  const modelos = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
  ];
  const prompt = `${construirPromptSistema()}\n\nDOCUMENTO A ANALIZAR:\n"""\n${textoDocumento}\n"""`;

  for (const modelo of modelos) {
    try {
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
        if (extraidos.length > 0) {
          intentos.push({ proveedor: "gemini", modelo, exito: true });
          return { modelo, hallazgos: extraidos };
        }
      }
      intentos.push({
        proveedor: "gemini",
        modelo,
        exito: false,
        motivo: `HTTP ${res.status}`,
      });
    } catch (err: any) {
      intentos.push({
        proveedor: "gemini",
        modelo,
        exito: false,
        motivo: err?.message || "Error de red",
      });
    }
  }

  return null;
}

async function intentarConOpenAICompatible(
  proveedor: "openai" | "groq",
  endpoint: string,
  modelos: string[],
  apiKey: string,
  textoDocumento: string,
  intentos: IntentoEjecucionIA[]
): Promise<{
  modelo: string;
  hallazgos: Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>;
} | null> {
  for (const modelo of modelos) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelo,
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

      if (res.ok) {
        const data = await res.json();
        const contenido = data?.choices?.[0]?.message?.content || "[]";
        const extraidos = extraerJsonDeRespuesta(contenido);
        if (extraidos.length > 0) {
          intentos.push({ proveedor, modelo, exito: true });
          return { modelo, hallazgos: extraidos };
        }
      }
      intentos.push({
        proveedor,
        modelo,
        exito: false,
        motivo: `HTTP ${res.status}`,
      });
    } catch (err: any) {
      intentos.push({
        proveedor,
        modelo,
        exito: false,
        motivo: err?.message || "Error de red",
      });
    }
  }

  return null;
}

async function intentarConClaude(
  apiKey: string,
  textoDocumento: string,
  intentos: IntentoEjecucionIA[]
): Promise<{
  modelo: string;
  hallazgos: Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>;
} | null> {
  const modelos = [
    "claude-3-5-haiku-latest",
    "claude-3-5-sonnet-latest",
    "claude-3-haiku-20240307",
  ];

  for (const modelo of modelos) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: modelo,
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

      if (res.ok) {
        const data = await res.json();
        const contenido = data?.content?.[0]?.text || "[]";
        const extraidos = extraerJsonDeRespuesta(contenido);
        if (extraidos.length > 0) {
          intentos.push({ proveedor: "claude", modelo, exito: true });
          return { modelo, hallazgos: extraidos };
        }
      }
      intentos.push({
        proveedor: "claude",
        modelo,
        exito: false,
        motivo: `HTTP ${res.status}`,
      });
    } catch (err: any) {
      intentos.push({
        proveedor: "claude",
        modelo,
        exito: false,
        motivo: err?.message || "Error de red",
      });
    }
  }

  return null;
}

export async function analizarVariablesDocumentoConIAAction(
  textoDocumento: string,
  clavesOApiKey?: string | MapaClavesIA,
  proveedorPreferido?: ProveedorIA
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

  // Unificar llaves enviadas desde el cliente + llaves configuradas en .env
  const mapaClaves: MapaClavesIA =
    typeof clavesOApiKey === "string"
      ? { principal: clavesOApiKey }
      : { ...(clavesOApiKey || {}) };

  if (!mapaClaves.gemini && process.env.GEMINI_API_KEY) {
    mapaClaves.gemini = process.env.GEMINI_API_KEY;
  }
  if (
    !mapaClaves.claude &&
    (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY)
  ) {
    mapaClaves.claude =
      process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  }
  if (!mapaClaves.openai && process.env.OPENAI_API_KEY) {
    mapaClaves.openai = process.env.OPENAI_API_KEY;
  }
  if (!mapaClaves.groq && process.env.GROQ_API_KEY) {
    mapaClaves.groq = process.env.GROQ_API_KEY;
  }

  const colaCandidatos = construirColaConmutacionIA(
    mapaClaves,
    proveedorPreferido
  );
  const hallazgosLocales = detectarEntidadesJuridicasEnTexto(textoLimpio);
  const intentosRealizados: IntentoEjecucionIA[] = [];

  // Recorrer la cadena de IAs en orden; si una falla, ensayar automáticamente con la siguiente
  for (const candidato of colaCandidatos) {
    let resultadoExitoso: {
      modelo: string;
      hallazgos: Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }>;
    } | null = null;

    if (candidato.proveedor === "gemini") {
      resultadoExitoso = await intentarConGemini(
        candidato.apiKey,
        textoLimpio,
        intentosRealizados
      );
    } else if (candidato.proveedor === "claude") {
      resultadoExitoso = await intentarConClaude(
        candidato.apiKey,
        textoLimpio,
        intentosRealizados
      );
    } else if (candidato.proveedor === "openai") {
      resultadoExitoso = await intentarConOpenAICompatible(
        "openai",
        "https://api.openai.com/v1/chat/completions",
        ["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"],
        candidato.apiKey,
        textoLimpio,
        intentosRealizados
      );
    } else if (candidato.proveedor === "groq") {
      resultadoExitoso = await intentarConOpenAICompatible(
        "groq",
        "https://api.groq.com/openai/v1/chat/completions",
        ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
        candidato.apiKey,
        textoLimpio,
        intentosRealizados
      );
    }

    if (resultadoExitoso) {
      const verificados = resultadoExitoso.hallazgos.filter((h) =>
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

      const fallosPrevios = intentosRealizados.filter((i) => !i.exito);
      const notaReintento =
        fallosPrevios.length > 0
          ? `Tras ${fallosPrevios.length} reintento(s) automático(s), respondió `
          : "Análisis completado con ";

      return {
        success: true,
        proveedorUsado: candidato.proveedor,
        modeloUsado: resultadoExitoso.modelo,
        intentosRealizados,
        vinculosDetectados: combinados,
        mensaje: `${notaReintento}${obtenerNombreProveedorIA(
          candidato.proveedor
        )} (${resultadoExitoso.modelo}): ${
          combinados.length
        } datos reemplazables detectados.`,
      };
    }
  }

  // Si todos los proveedores en la nube fallaron, el último eslabón garantiza el resultado sin interrumpir la tarea
  intentosRealizados.push({
    proveedor: "local",
    modelo: "motor-juridico-colombia-v1",
    exito: true,
  });

  const huboIntentosNube = colaCandidatos.length > 0;

  return {
    success: true,
    proveedorUsado: "local",
    modeloUsado: "motor-juridico-colombia-v1",
    intentosRealizados,
    vinculosDetectados: hallazgosLocales,
    mensaje: huboIntentosNube
      ? `Conmutación automática completada (${
          intentosRealizados.length - 1
        } intento(s) en nube sin respuesta → resuelto por Motor Semántico Jurídico): ${
          hallazgosLocales.length
        } datos detectados.`
      : `Análisis completado con Motor Semántico Jurídico: ${hallazgosLocales.length} datos reemplazables detectados.`,
  };
}
