// Generador de Documentos Jurídicos Estructurados para el Simulador de Tutelas
// Cumple con la estructura procesal de la Rama Judicial de Colombia (Decreto 2591 de 1991)

export function generateLegalDocument({
  tipoDocumento,
  radicado,
  accionante,
  identificacion,
  accionado,
  derechosVulnerados,
  pretension,
  hechos,
  medidaCautelar,
  medidaCautelarTexto,
  motorIA = "Gemini 1.5 Pro (Mock Engine)"
}) {
  const fechaHoy = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const derechosFormatted = Array.isArray(derechosVulnerados) 
    ? derechosVulnerados.join(', ') 
    : derechosVulnerados;

  let cuerpoResolutivo = "";

  if (tipoDocumento.includes("Auto Admisorio") || tipoDocumento.includes("Medida Provisional")) {
    cuerpoResolutivo = `
I. ANTECEDENTES Y CONSIDERACIONES

1. Ha correspondido a este Despacho por reparto constitucional conocer de la acción de tutela promovida por el ciudadano(a) ${accionante}, identificado(a) con ${identificacion}, contra ${accionado}, por presunta vulneración de sus derechos fundamentales a: ${derechosFormatted}.

2. De los hechos expuestos se desprende sumariamente que: "${hechos}".

3. Conforme al artículo 14 del Decreto 2591 de 1991, la solicitud de amparo reúne los requisitos formales mínimos para su admisión y trámite preferente.

${medidaCautelar ? `
4. RESPECTO DE LA MEDIDA CAUTELAR PROVISIONAL (Art. 7 Decreto 2591 de 1991):
Habiéndose invocado medida provisional y evidenciándose un inminente riesgo de consumación de un perjuicio irremediable consistente en: "${medidaCautelarTexto || pretension}", este Despacho estima necesario decretar la protección provisional mientras se adopta la decisión de fondo, en salvaguarda de los derechos superiores invocados.
` : `
4. No se advierte necesidad de decretar medidas provisionales urgentes en el presente estadio procesal, sin perjuicio de lo que resulte acreditado en el trámite.
`}

II. PARTE DISPOSITIVA

En mérito de lo expuesto, el JUZGADO DE FAMILIA 4, administrando justicia en nombre de la República y por autoridad de la ley,

RESUELVE:

PRIMERO: ADMITIR la acción de tutela instaurada por ${accionante} contra ${accionado}.

SEGUNDO: CORRER TRASLADO del escrito tutelar y sus anexos a ${accionado}, para que en el término perentorio e improrrogable de CUARENTA Y OCHO (48) HORAS siguientes a la notificación de la presente providencia, ejerza su derecho de contradicción y rinda informe pormenorizado sobre los hechos materia de amparo.

${medidaCautelar ? `TERCERO: DECRETAR MEDIDA PROVISIONAL URGENTE. En consecuencia, ORDENAR a la entidad ${accionado} que, en el término de VEINTICUATRO (24) HORAS contadas a partir de la notificación de este proveído, proceda a: ${medidaCautelarTexto || pretension}, so pena de incurrir en desacato judicial.\n` : ""}
CUARTO: VINCULAR al trámite a las entidades que conforme al acervo fáctico tengan competencia directa en la garantía de los derechos aquí reclamados.

QUINTO: NOTIFÍQUESE la presente decisión por el medio más expedito y eficaz a las partes interesadas.

NOTIFÍQUESE Y CÚMPLASE.
`;
  } else {
    // Proyecto de Sentencia de Tutela
    cuerpoResolutivo = `
I. ASUNTO A DECIDIR

Procede el JUZGADO DE FAMILIA 4 a emitir sentencia de primera instancia dentro de la acción de tutela interpuesta por ${accionante} contra ${accionado}, radicada bajo el número ${radicado}.

II. PROBLEMA JURÍDICO

Corresponde al Despacho determinar si la entidad accionada ${accionado} ha vulnerado los derechos fundamentales a ${derechosFormatted} de la parte accionante, al abstenerse injustificadamente de: ${pretension}.

III. CONSIDERACIONES DE LA CORTE CONSTITUCIONAL

La jurisprudencia pacífica y reiterada de la Corte Constitucional (Sentencias T-760/08, T-023/13 y SU-508/20) ha sostenido que la salud y la vida digna constituyen derechos fundamentales autónomos. La negativa o dilación administrativa injustificada en la entrega de insumos, servicios o tratamientos prescritos por los profesionales adscritos constituye una barrera de acceso inconstitucional que activa de forma inmediata la orden de amparo tutelar.

IV. CASO CONCRETO Y VALORACIÓN PROBATORIA

Del examen del expediente fáctico se concluye que:
1. Se acredita la legitimación por activa y pasiva en el presente trámite.
2. Los hechos narrados: "${hechos}" no fueron desvirtuados oportunamente por la parte accionada.
3. Se verifica la urgencia manifiesta y la afectación directa al mínimo vital y la integridad física.

V. DECISIÓN

En mérito de lo expuesto, el JUZGADO DE FAMILIA 4,

RESUELVE:

PRIMERO: TUTELAR los derechos fundamentales a ${derechosFormatted} del ciudadano(a) ${accionante}, de conformidad con las motivaciones expuestas.

SEGUNDO: ORDENAR al Representante Legal de ${accionado}, o a quien haga sus veces, que en el término improrrogable de CUARENTA Y OCHO (48) HORAS contadas a partir de la notificación de este fallo, garantice de manera efectiva e incondicional: ${pretension}.

TERCERO: PREVENIR a la entidad accionada para que en ningún caso vuelva a incurrir en las conductas dilatorias que dieron origen a la presente acción de tutela.

CUARTO: Si el presente fallo no fuere impugnado dentro de los tres (3) días siguientes a su notificación, REMÍTASE a la Honorable Corte Constitucional para su eventual revisión.

NOTIFÍQUESE Y CÚMPLASE.
`;
  }

  return `
================================================================================
RAMA JUDICIAL DEL PODER PÚBLICO - REPÚBLICA DE COLOMBIA
JUZGADO DE FAMILIA 4 // DISTRITO JUDICIAL
================================================================================
EXPEDIENTE RADICADO: ${radicado}
DOCUMENTO GENERADO: ${tipoDocumento.toUpperCase()}
MOTOR DE ASISTENCIA IA: ${motorIA} (MODO AISLAMIENTO / MOCK VALIDATION)
FECHA DE EMISIÓN: ${fechaHoy}

ACCIONANTE:  ${accionante}
DOCUMENTO:   ${identificacion}
ACCIONADO:   ${accionado}
ASUNTO:      ACCIÓN DE TUTELA - PROTECCIÓN CONSTITUCIONAL
DERECHOS:    ${derechosFormatted}
================================================================================

${cuerpoResolutivo.trim()}

_____________________________________________
FIRMA DIGITAL DEL DESPACHO / JUEZ DE FAMILIA 4
[DOCUMENTO PRELIMINAR GENERADO POR ASISTENTE DE IA]
[NOTA DE SEGURIDAD: VERIFICADO BAJO PROTOCOLO DE AISLAMIENTO SENA - MOCK DATA]
================================================================================
`.trim();
}
