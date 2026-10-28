import { CampoBaseDatosId, MapaClavesIA, ProveedorIA } from "../types";

/**
 * Detecta automáticamente el proveedor de IA a partir del formato de la API Key ingresada.
 */
export function detectarProveedorPorApiKey(apiKey: string): ProveedorIA {
  const limpia = apiKey.trim();
  if (!limpia) return "local";

  if (limpia.startsWith("AIza")) {
    return "gemini";
  }
  if (limpia.startsWith("sk-ant-")) {
    return "claude";
  }
  if (limpia.startsWith("gsk_")) {
    return "groq";
  }
  if (limpia.startsWith("sk-")) {
    return "openai";
  }

  return limpia.length > 45 ? "openai" : "gemini";
}

export function obtenerNombreProveedorIA(proveedor: ProveedorIA): string {
  switch (proveedor) {
    case "gemini":
      return "Google Gemini";
    case "claude":
      return "Anthropic Claude";
    case "openai":
      return "OpenAI ChatGPT";
    case "groq":
      return "Groq Cloud (Llama 3.3)";
    case "local":
    default:
      return "Motor Semántico Jurídico Local";
  }
}

/**
 * Construye la cola ordenada de intentos (Proveedor + API Key) para que, si falla
 * la primera IA (ej. Gemini), el sistema salte automáticamente a la siguiente IA
 * (Claude -> OpenAI -> Groq) sin detener la tarea hasta lograr el resultado.
 */
export function construirColaConmutacionIA(
  claves: MapaClavesIA,
  proveedorInicialPreferido?: ProveedorIA
): Array<{ proveedor: Exclude<ProveedorIA, "local">; apiKey: string }> {
  const cola: Array<{
    proveedor: Exclude<ProveedorIA, "local">;
    apiKey: string;
  }> = [];
  const agregados = new Set<string>();

  const agregarCandidato = (
    proveedor: Exclude<ProveedorIA, "local">,
    key?: string
  ) => {
    const k = key?.trim();
    if (!k) return;
    const firma = `${proveedor}:${k}`;
    if (agregados.has(firma)) return;
    agregados.add(firma);
    cola.push({ proveedor, apiKey: k });
  };

  // 1. Si hay un proveedor preferido explícito, ponerlo de primero
  const keyPrincipal = claves.principal?.trim();
  const provDetectadoPrincipal = keyPrincipal
    ? detectarProveedorPorApiKey(keyPrincipal)
    : "local";

  if (
    proveedorInicialPreferido &&
    proveedorInicialPreferido !== "local"
  ) {
    const keyEspecifica = claves[proveedorInicialPreferido] || keyPrincipal;
    agregarCandidato(proveedorInicialPreferido, keyEspecifica);
  } else if (keyPrincipal && provDetectadoPrincipal !== "local") {
    agregarCandidato(provDetectadoPrincipal, keyPrincipal);
  }

  // 2. Agregar todas las demás llaves configuradas en orden de conmutación (Gemini -> Claude -> OpenAI -> Groq)
  agregarCandidato("gemini", claves.gemini);
  agregarCandidato("claude", claves.claude);
  agregarCandidato("openai", claves.openai);
  agregarCandidato("groq", claves.groq);

  // 3. Si el usuario ingresó una llave principal genérica y falló en su proveedor detectado,
  // ensayar esa misma llave contra los demás proveedores compatibles antes de rendirse
  if (keyPrincipal) {
    agregarCandidato("gemini", keyPrincipal);
    agregarCandidato("openai", keyPrincipal);
    agregarCandidato("claude", keyPrincipal);
    agregarCandidato("groq", keyPrincipal);
  }

  return cola;
}

/**
 * Analizador semántico jurídico de respaldo y complemento que detecta entidades
 * reemplazables reales dentro del texto de un documento judicial sin usar {{}}.
 */
export function detectarEntidadesJuridicasEnTexto(
  texto: string
): Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }> {
  const hallazgos: Array<{ textoOriginal: string; campoBD: CampoBaseDatosId }> = [];
  const yaRegistrados = new Set<string>();

  const agregar = (fragmento: string | undefined, campoBD: CampoBaseDatosId) => {
    const limpio = fragmento?.trim().replace(/[.;,]+$/, "");
    if (!limpio || limpio.length < 3 || yaRegistrados.has(limpio)) return;
    yaRegistrados.add(limpio);
    hallazgos.push({ textoOriginal: limpio, campoBD });
  };

  // 1. Radicado judicial (formato 23 dígitos con o sin guiones)
  const matchRadicado = texto.match(/\b\d{5}-\d{2}-\d{2}-\d{3}-\d{4}-\d{5}-\d{2}\b|\b\d{23}\b/);
  if (matchRadicado) agregar(matchRadicado[0], "radicado");

  // 2. Correo electrónico
  const matchEmail = texto.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  if (matchEmail) agregar(matchEmail[0], "clienteEmail");

  // 3. Teléfono móvil colombiano
  const matchTelefono = texto.match(/\b3\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/);
  if (matchTelefono) agregar(matchTelefono[0], "clienteTelefono");

  // 4. Documento / Cédula
  const matchCedulaEtiqueta = texto.match(
    /(?:DOCUMENTO DE IDENTIDAD|cédula de ciudadanía N°|C\.C\.|identificado\(a\) con)\s*:?\s*([\d.]{6,15})/i
  );
  if (matchCedulaEtiqueta) {
    agregar(matchCedulaEtiqueta[1], "clienteDocumento");
  } else {
    const matchCedulaPatron = texto.match(/\b\d{1,2}\.\d{3}\.\d{3}\b/);
    if (matchCedulaPatron) agregar(matchCedulaPatron[0], "clienteDocumento");
  }

  // 5. Nombre del Accionante / Cliente
  const matchAccionanteLinea = texto.match(
    /ACCIONANTE(?:\s*\(CLIENTE\))?\s*:\s*([^\n\r]+)/i
  );
  if (matchAccionanteLinea) {
    agregar(matchAccionanteLinea[1], "clienteNombre");
  } else {
    const matchPromovida = texto.match(
      /(?:promovida por|instaurada por|accionante)\s+([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{5,45})(?=[,.;])/
    );
    if (matchPromovida) agregar(matchPromovida[1], "clienteNombre");
  }

  // 6. Entidad Accionada
  const matchAccionadaLinea = texto.match(/ENTIDAD ACCIONADA\s*:\s*([^\n\r]+)/i);
  if (matchAccionadaLinea) {
    agregar(matchAccionadaLinea[1], "entidadAccionada");
  } else {
    const matchContra = texto.match(
      /(?:en contra de|frente a)\s+([A-ZÁÉÍÓÚÑ0-9][A-ZÁÉÍÓÚÑ0-9\s.-]{3,50})(?=[,.;])/
    );
    if (matchContra) agregar(matchContra[1], "entidadAccionada");
  }

  // 7. Derecho Fundamental Invocado
  const matchDerechoLinea = texto.match(/DERECHO INVOCADO\s*:\s*([^\n\r]+)/i);
  if (matchDerechoLinea) {
    agregar(matchDerechoLinea[1], "derechoInvocado");
  }

  // 8. Fecha formal del documento
  const matchFecha = texto.match(
    /\b\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+20\d{2}\b/i
  );
  if (matchFecha) agregar(matchFecha[0], "fechaRadicacion");

  // 9. Dirección física
  const matchDireccion = texto.match(
    /(?:dirección física|dirección)\s+((?:Calle|Carrera|Avenida|Diagonal|Transversal|Cra\.|Cll\.)[^,.;\n]{5,55})/i
  );
  if (matchDireccion) agregar(matchDireccion[1], "clienteDireccion");

  // 10. Ciudad
  const matchCiudad = texto.match(/En la ciudad de\s+([^,\n]{4,35})(?=,)/i);
  if (matchCiudad) agregar(matchCiudad[1], "clienteCiudad");

  // 11. Síntesis / Objeto
  const matchObjeto = texto.match(
    /requiere con carácter urgente\s+([^.\n]{15,180})(?=\.)/i
  );
  if (matchObjeto) agregar(matchObjeto[1], "hechosResumen");

  // 12. Juez / Funcionario y Cargo al pie de firma
  const matchDr = texto.match(/\b(?:Dr\.|Dra\.)\s+[A-ZÁÉÍÓÚÑa-záéíóúñ\s]{6,40}\b/);
  if (matchDr) agregar(matchDr[0], "funcionarioNombre");

  const matchCargo = texto.match(/Juez Titular\s*-\s*[^\n\r]+/i);
  if (matchCargo) agregar(matchCargo[0], "funcionarioCargo");

  return hallazgos;
}

