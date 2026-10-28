import PizZip from "pizzip";
import {
  CampoBaseDatosId,
  CasoTutelaDTO,
  CrearDocumentoDesdeCeroInput,
  VinculoDatoDocumento,
} from "../types";
import { SesionUsuario } from "@/features/auth/types";

export function arrayBufferABase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binario = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binario += String.fromCharCode(bytes[i]);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }
  return btoa(binario);
}

export function base64AArrayBuffer(base64: string): ArrayBuffer {
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(base64, "base64");
    return buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    ) as ArrayBuffer;
  }
  const binario = atob(base64);
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) {
    bytes[i] = binario.charCodeAt(i);
  }
  return bytes.buffer as ArrayBuffer;
}

function escaparXml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function desescaparXml(texto: string): string {
  return texto
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

/**
 * Obtiene el valor correspondiente de un campo de la base de datos
 * combinando el Caso/Cliente seleccionado y el Funcionario autenticado.
 */
export function obtenerValorCampoBD(
  campo: CampoBaseDatosId,
  caso: CasoTutelaDTO | null,
  usuario: SesionUsuario
): string | null {
  if (campo === "funcionarioNombre") return usuario.nombre;
  if (campo === "funcionarioCargo") return usuario.cargo;
  if (!caso) return null;

  const mapa: Record<Exclude<CampoBaseDatosId, "funcionarioNombre" | "funcionarioCargo">, string> = {
    radicado: caso.radicado,
    clienteNombre: caso.clienteNombre,
    clienteDocumento: caso.clienteDocumento,
    clienteEmail: caso.clienteEmail,
    clienteTelefono: caso.clienteTelefono,
    clienteDireccion: caso.clienteDireccion,
    clienteCiudad: caso.clienteCiudad,
    entidadAccionada: caso.entidadAccionada,
    derechoInvocado: caso.derechoInvocado,
    hechosResumen: caso.hechosResumen,
    fechaRadicacion: caso.fechaRadicacion,
  };

  return mapa[campo] ?? null;
}

/**
 * Extrae el texto legible de todos los párrafos de un archivo .docx
 * para que el motor de IA pueda detectar entidades reemplazables.
 */
export function extraerTextoPlanoDeDocx(buffer: ArrayBuffer): string {
  try {
    const zip = new PizZip(buffer);
    const docXml = zip.file("word/document.xml")?.asText();
    if (!docXml) return "";

    const parrafos: string[] = [];
    const regexParrafo = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
    let matchParrafo: RegExpExecArray | null;

    while ((matchParrafo = regexParrafo.exec(docXml)) !== null) {
      const contenidoP = matchParrafo[1];
      const regexTexto = /<w:t(?:\s+[^>]*)?>([\s\S]*?)<\/w:t>/g;
      let matchTexto: RegExpExecArray | null;
      let textoP = "";

      while ((matchTexto = regexTexto.exec(contenidoP)) !== null) {
        textoP += desescaparXml(matchTexto[1]);
      }

      if (textoP.trim().length > 0) {
        parrafos.push(textoP.trim());
      }
    }

    return parrafos.join("\n");
  } catch {
    return "";
  }
}

/**
 * Reemplaza textos dentro de un bloque XML de Word (<w:p>) respetando
 * absolutamente todas las etiquetas de estilo (<w:pPr>, <w:rPr>, tablas, márgenes).
 * Soporta tanto coincidencias dentro de un solo <w:t> como texto fragmentado en varios <w:t>.
 */
function reemplazarEnParrafoXml(
  parrafoXml: string,
  reemplazos: Array<{ buscar: string; nuevo: string }>
): string {
  if (reemplazos.length === 0) return parrafoXml;

  interface NodoWT {
    inicio: number;
    fin: number;
    apertura: string;
    texto: string;
    cierre: string;
  }

  const regexWT = /(<w:t(?:\s+[^>]*)?>)([\s\S]*?)(<\/w:t>)/g;
  const nodos: NodoWT[] = [];
  let match: RegExpExecArray | null;

  while ((match = regexWT.exec(parrafoXml)) !== null) {
    nodos.push({
      inicio: match.index,
      fin: match.index + match[0].length,
      apertura: match[1],
      texto: desescaparXml(match[2]),
      cierre: match[3],
    });
  }

  if (nodos.length === 0) return parrafoXml;

  // Texto plano unificado del párrafo y mapa de posiciones por carácter
  let textoUnificado = "";
  const mapaCharANodo: Array<{ idxNodo: number; idxCharEnNodo: number }> = [];

  nodos.forEach((nodo, idxNodo) => {
    for (let i = 0; i < nodo.texto.length; i++) {
      textoUnificado += nodo.texto[i];
      mapaCharANodo.push({ idxNodo, idxCharEnNodo: i });
    }
  });

  // Aplicar cada reemplazo sobre los nodos correspondientes conservando su <w:rPr>
  for (const { buscar, nuevo } of reemplazos) {
    if (!buscar || buscar === nuevo) continue;

    let posBusqueda = 0;
    while (posBusqueda <= textoUnificado.length - buscar.length) {
      const indiceEncontrado = textoUnificado.indexOf(buscar, posBusqueda);
      if (indiceEncontrado === -1) break;

      const indiceFinal = indiceEncontrado + buscar.length - 1;
      const inicioMap = mapaCharANodo[indiceEncontrado];
      const finMap = mapaCharANodo[indiceFinal];

      if (inicioMap && finMap) {
        if (inicioMap.idxNodo === finMap.idxNodo) {
          const nodo = nodos[inicioMap.idxNodo];
          nodo.texto =
            nodo.texto.slice(0, inicioMap.idxCharEnNodo) +
            nuevo +
            nodo.texto.slice(finMap.idxCharEnNodo + 1);
        } else {
          // Si Word dividió la frase en varios <w:t>, consolidamos en el primero
          const nodoInicial = nodos[inicioMap.idxNodo];
          const nodoFinal = nodos[finMap.idxNodo];

          nodoInicial.texto =
            nodoInicial.texto.slice(0, inicioMap.idxCharEnNodo) + nuevo;

          for (let k = inicioMap.idxNodo + 1; k < finMap.idxNodo; k++) {
            nodos[k].texto = "";
          }

          nodoFinal.texto = nodoFinal.texto.slice(finMap.idxCharEnNodo + 1);
        }

        // Recalcular el texto unificado tras el reemplazo
        textoUnificado = "";
        mapaCharANodo.length = 0;
        nodos.forEach((nodo, idxNodo) => {
          for (let i = 0; i < nodo.texto.length; i++) {
            textoUnificado += nodo.texto[i];
            mapaCharANodo.push({ idxNodo, idxCharEnNodo: i });
          }
        });

        posBusqueda = indiceEncontrado + nuevo.length;
      } else {
        break;
      }
    }
  }

  // Reconstruir el XML del párrafo de atrás hacia adelante para no desplazar índices
  let resultado = parrafoXml;
  for (let i = nodos.length - 1; i >= 0; i--) {
    const n = nodos[i];
    const xmlSpace =
      n.texto.startsWith(" ") || n.texto.endsWith(" ")
        ? '<w:t xml:space="preserve">'
        : n.apertura;
    const nuevoSegmento = `${xmlSpace}${escaparXml(n.texto)}${n.cierre}`;
    resultado =
      resultado.slice(0, n.inicio) + nuevoSegmento + resultado.slice(n.fin);
  }

  return resultado;
}

/**
 * Cuenta cuántas veces aparece exactamente una palabra o frase en el documento.
 */
export function contarOcurrenciasEnTexto(
  textoCompleto: string,
  fragmento: string
): number {
  const buscado = fragmento.trim();
  if (!buscado || !textoCompleto) return 0;

  let contador = 0;
  let posicion = 0;
  while (posicion <= textoCompleto.length - buscado.length) {
    const idx = textoCompleto.indexOf(buscado, posicion);
    if (idx === -1) break;
    contador++;
    posicion = idx + buscado.length;
  }
  return contador;
}

/**
 * Resuelve el valor activo que debe mostrarse en todas las menciones de una
 * palabra/variable dentro del documento:
 * 1. Si el usuario escribió un valor personalizado directo, tiene prioridad.
 * 2. Si está vinculada a un campo de BD y hay un cliente seleccionado, usa el dato de BD.
 * 3. De lo contrario, conserva intacto el texto original del documento.
 */
export function resolverValorActivoVinculo(
  vinculo: VinculoDatoDocumento,
  casoSeleccionado: CasoTutelaDTO | null,
  usuario: SesionUsuario
): string {
  // Si el usuario editó manualmente el campo (incluso si lo vació temporalmente a "" para escribir otro valor),
  // respetamos exactamente lo que tiene en el input sin reiniciar ni sobrescribir con la BD o el texto original.
  if (vinculo.valorPersonalizado !== undefined) {
    return vinculo.valorPersonalizado;
  }

  if (vinculo.campoBD && casoSeleccionado) {
    const valorBD = obtenerValorCampoBD(
      vinculo.campoBD,
      casoSeleccionado,
      usuario
    );
    if (valorBD && valorBD.trim().length > 0) {
      return valorBD;
    }
  }

  return vinculo.textoOriginal;
}

/**
 * Genera un nuevo ArrayBuffer .docx aplicando:
 * 1. Los vínculos orgánicos y palabras convertidas en variables (reemplazando en TODOS los lugares mencionados)
 * 2. Las ediciones manuales puntuales realizadas sobre el documento
 * Conservando el 100% de márgenes, encabezados, tablas y diseño original de Word.
 */
export function generarDocxConReemplazos(
  bufferOriginal: ArrayBuffer,
  vinculos: VinculoDatoDocumento[],
  casoSeleccionado: CasoTutelaDTO | null,
  usuario: SesionUsuario,
  edicionesManuales: Array<{ buscar: string; nuevo: string }>
): ArrayBuffer {
  const zip = new PizZip(bufferOriginal.slice(0));

  // Construir lista de reemplazos activos (ordenados del texto más largo al más corto)
  const listaReemplazos: Array<{ buscar: string; nuevo: string }> = [];

  for (const v of vinculos) {
    const valorActivo = resolverValorActivoVinculo(
      v,
      casoSeleccionado,
      usuario
    );
    if (v.textoOriginal !== valorActivo) {
      listaReemplazos.push({
        buscar: v.textoOriginal,
        nuevo: valorActivo,
      });
    }
  }

  for (const ed of edicionesManuales) {
    if (ed.buscar && ed.buscar !== ed.nuevo) {
      listaReemplazos.push(ed);
    }
  }

  listaReemplazos.sort((a, b) => b.buscar.length - a.buscar.length);

  if (listaReemplazos.length === 0) {
    return bufferOriginal;
  }

  const archivosXml = Object.keys(zip.files).filter(
    (nombre) =>
      nombre === "word/document.xml" ||
      /^word\/header\d*\.xml$/.test(nombre) ||
      /^word\/footer\d*\.xml$/.test(nombre)
  );

  for (const rutaXml of archivosXml) {
    const archivo = zip.file(rutaXml);
    if (!archivo) continue;

    const contenidoXml = archivo.asText();
    const xmlModificado = contenidoXml.replace(
      /<w:p\b[^>]*>[\s\S]*?<\/w:p>/g,
      (parrafoXml) => reemplazarEnParrafoXml(parrafoXml, listaReemplazos)
    );

    zip.file(rutaXml, xmlModificado);
  }

  const uint8 = zip.generate({ type: "uint8array" });
  return uint8.buffer.slice(
    uint8.byteOffset,
    uint8.byteOffset + uint8.byteLength
  ) as ArrayBuffer;
}

/**
 * Construye un archivo .docx oficial a partir de los párrafos redactados por el Jefe de Despacho
 * en el Creador de Documentos, aplicando el encabezado SIGCMA y márgenes normativos.
 */
export function construirDocxDesdeCreador(
  input: CrearDocumentoDesdeCeroInput
): ArrayBuffer {
  const zip = new PizZip();

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`
  );

  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
  );

  zip.file(
    "word/_rels/document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`
  );

  zip.file(
    "word/styles.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:lang w:val="es-CO"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`
  );

  const xmlParrafosCuerpo = input.parrafosCuerpo
    .filter((p) => p.trim().length > 0)
    .map(
      (p) => `
    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="140"/></w:pPr>
      <w:r><w:t xml:space="preserve">${escaparXml(p.trim())}</w:t></w:r>
    </w:p>`
    )
    .join("");

  const xmlParrafosResuelve = input.parrafosResuelve
    .filter((p) => p.trim().length > 0)
    .map(
      (p) => `
    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="140"/></w:pPr>
      <w:r><w:t xml:space="preserve">${escaparXml(p.trim())}</w:t></w:r>
    </w:p>`
    )
    .join("");

  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9360" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:left w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:bottom w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:right w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="0F2537"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="0F2537"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="6500" w:type="dxa"/></w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="60" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>REPÚBLICA DE COLOMBIA - RAMA JUDICIAL DEL PODER PÚBLICO</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="20" w:after="60"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>JUZGADO CUARTO DE FAMILIA DE ORALIDAD DE MEDELLÍN</w:t></w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2860" w:type="dxa"/></w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="20"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>SIGCMA - CALIDAD</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="20" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t>Código: ${escaparXml(input.codigo)}</w:t></w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <w:p><w:pPr><w:spacing w:before="180" w:after="100"/></w:pPr></w:p>

    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">RADICADO N°: </w:t></w:r>
      <w:r><w:t>05001-31-10-004-2026-00142-00</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">ACCIONANTE (CLIENTE): </w:t></w:r>
      <w:r><w:t>MARÍA EUGENIA LÓPEZ RESTREPO</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">DOCUMENTO DE IDENTIDAD: </w:t></w:r>
      <w:r><w:t>43.512.890</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">ENTIDAD ACCIONADA: </w:t></w:r>
      <w:r><w:t>EPS SURA S.A. - REGIONAL ANTIOQUIA</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="160"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">DERECHO INVOCADO: </w:t></w:r>
      <w:r><w:t>Salud Integral y Vida en Condiciones Dignas</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="140" w:after="180"/></w:pPr>
      <w:r><w:rPr><w:b/><w:u w:val="single"/></w:rPr><w:t>${escaparXml(input.tituloActoProcesal.toUpperCase())}</w:t></w:r>
    </w:p>

    ${xmlParrafosCuerpo}

    ${
      xmlParrafosResuelve
        ? `<w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="140" w:after="140"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>DISPONE / RESUELVE:</w:t></w:r>
    </w:p>
    ${xmlParrafosResuelve}`
        : ""
    }

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="240" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>NOTIFÍQUESE Y CÚMPLASE,</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="300" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>${escaparXml(input.firmanteNombre)}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:t>${escaparXml(input.firmanteCargo)}</w:t></w:r>
    </w:p>

    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`
  );

  const uint8 = zip.generate({ type: "uint8array" });
  return uint8.buffer.slice(
    uint8.byteOffset,
    uint8.byteOffset + uint8.byteLength
  ) as ArrayBuffer;
}

/**
 * Construye un documento .docx oficial real en memoria (OpenXML) con tabla de encabezado
 * SIGCMA de la Rama Judicial, márgenes normativos (Oficio/Carta) y contenido completo de un
 * Auto Admisorio y Acta de Tutela para pruebas inmediatas o plantilla base.
 */
export function generarPlantillaJudicialPorDefectoDocx(): ArrayBuffer {
  const zip = new PizZip();

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`
  );

  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
  );

  zip.file(
    "word/_rels/document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`
  );

  zip.file(
    "word/styles.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:lang w:val="es-CO"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>`
  );

  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9360" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:left w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:bottom w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:right w:val="single" w:sz="8" w:space="0" w:color="0F2537"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="0F2537"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="0F2537"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="6500" w:type="dxa"/></w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="60" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>REPÚBLICA DE COLOMBIA - RAMA JUDICIAL DEL PODER PÚBLICO</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="20" w:after="60"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="22"/></w:rPr><w:t>JUZGADO CUARTO DE FAMILIA DE ORALIDAD DE MEDELLÍN</w:t></w:r>
          </w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2860" w:type="dxa"/></w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="20"/></w:pPr>
            <w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>SIGCMA - CALIDAD</w:t></w:r>
          </w:p>
          <w:p>
            <w:pPr><w:jc w:val="center"/><w:spacing w:before="20" w:after="40"/></w:pPr>
            <w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t>Formato: F-TUT-01 V.04</w:t></w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <w:p><w:pPr><w:spacing w:before="180" w:after="120"/></w:pPr></w:p>

    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">RADICADO N°: </w:t></w:r>
      <w:r><w:t>05001-31-10-004-2026-00142-00</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">ACCIÓN CONSTITUCIONAL: </w:t></w:r>
      <w:r><w:t>ACCIÓN DE TUTELA DE PRIMERA INSTANCIA</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">ACCIONANTE (CLIENTE): </w:t></w:r>
      <w:r><w:t>MARÍA EUGENIA LÓPEZ RESTREPO</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">DOCUMENTO DE IDENTIDAD: </w:t></w:r>
      <w:r><w:t>43.512.890</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">ENTIDAD ACCIONADA: </w:t></w:r>
      <w:r><w:t>EPS SURA S.A. - REGIONAL ANTIOQUIA</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="160"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">DERECHO INVOCADO: </w:t></w:r>
      <w:r><w:t>Salud Integral y Vida en Condiciones Dignas</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="140" w:after="180"/></w:pPr>
      <w:r><w:rPr><w:b/><w:u w:val="single"/></w:rPr><w:t>AUTO INTERLOCUTORIO DE ADMISIÓN Y TRÁMITE CONSTITUCIONAL</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="140"/></w:pPr>
      <w:r><w:t xml:space="preserve">En la ciudad de </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Medellín, Antioquia</w:t></w:r>
      <w:r><w:t xml:space="preserve">, en fecha </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>28 de octubre de 2026</w:t></w:r>
      <w:r><w:t xml:space="preserve">, el Despacho procede a resolver sobre la admisibilidad de la Acción de Tutela promovida por </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>MARÍA EUGENIA LÓPEZ RESTREPO</w:t></w:r>
      <w:r><w:t xml:space="preserve">, identificada con cédula de ciudadanía N° </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>43.512.890</w:t></w:r>
      <w:r><w:t xml:space="preserve">, en contra de </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>EPS SURA S.A. - REGIONAL ANTIOQUIA</w:t></w:r>
      <w:r><w:t xml:space="preserve">, por la presunta vulneración del derecho fundamental a la </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Salud Integral y Vida en Condiciones Dignas</w:t></w:r>
      <w:r><w:t>.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="160"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">SÍNTESIS FÁCTICA Y OBJETO: </w:t></w:r>
      <w:r><w:t xml:space="preserve">Manifiesta la parte accionante que requiere con carácter urgente </w:t></w:r>
      <w:r><w:t>Autorización y entrega inmediata de medicamento biológico de alto costo y valoración prioritaria por especialista en reumatología</w:t></w:r>
      <w:r><w:t xml:space="preserve">. Para efectos de notificaciones judiciales, reporta la dirección física </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Calle 50 # 45-12, Barrio La Candelaria</w:t></w:r>
      <w:r><w:t xml:space="preserve">, abonado telefónico </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>300 412 8900</w:t></w:r>
      <w:r><w:t xml:space="preserve"> y buzón electrónico </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>maria.lopez@correo.co</w:t></w:r>
      <w:r><w:t>.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="140" w:after="140"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>RESUELVE:</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="120"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">PRIMERO: ADMITIR </w:t></w:r>
      <w:r><w:t xml:space="preserve">la presente Acción de Tutela instaurada por </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>MARÍA EUGENIA LÓPEZ RESTREPO</w:t></w:r>
      <w:r><w:t xml:space="preserve"> frente a </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>EPS SURA S.A. - REGIONAL ANTIOQUIA</w:t></w:r>
      <w:r><w:t>, de conformidad con el artículo 86 de la Constitución Política y el Decreto 2591 de 1991.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="both"/><w:spacing w:after="240"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">SEGUNDO: NOTIFICAR </w:t></w:r>
      <w:r><w:t xml:space="preserve">por el medio más expedito a la entidad accionada para que en el término improrrogable de cuarenta y ocho (48) horas ejerza su derecho de defensa y contradicción, remitiendo copia de la presente providencia al correo </w:t></w:r>
      <w:r><w:rPr><w:b/></w:rPr><w:t>maria.lopez@correo.co</w:t></w:r>
      <w:r><w:t>.</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="240" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>NOTIFÍQUESE Y CÚMPLASE,</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:before="320" w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Dr. Juan Pablo Velásquez</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr>
      <w:r><w:t>Juez Titular - Juzgado Cuarto de Familia</w:t></w:r>
    </w:p>

    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`
  );

  const uint8 = zip.generate({ type: "uint8array" });
  return uint8.buffer.slice(
    uint8.byteOffset,
    uint8.byteOffset + uint8.byteLength
  ) as ArrayBuffer;
}

