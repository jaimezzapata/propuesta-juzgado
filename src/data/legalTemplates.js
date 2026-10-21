// Formatos y Plantillas Judiciales Base del Juzgado de Familia 4
// Permite simular la lectura de formatos base y su modificación directa por el usuario.

export const DEFAULT_LEGAL_TEMPLATES = [
  {
    id: "auto-admisorio-medida",
    nombre: "Auto Admisorio con Medida Provisional (Tutela Salud)",
    categoria: "Auto Interlocutorio",
    descripcion: "Formato estándar del juzgado para admisión de tutelas con trámite preferente y orden preventiva urgente de 24 horas.",
    formatoOriginal: `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}} ({{IDENTIFICACION}})
ACCIONADO: {{ACCIONADO}}
ASUNTO: ACCIÓN DE TUTELA - AUTO ADMISORIO Y MEDIDA PROVISIONAL

I. ANTECEDENTES Y CONSIDERACIONES

1. Ha correspondido a este Despacho por reparto constitucional conocer de la acción de tutela promovida por el ciudadano(a) {{ACCIONANTE}}, identificado(a) con {{IDENTIFICACION}}, contra {{ACCIONADO}}, por presunta vulneración de sus derechos fundamentales a: {{DERECHOS}}.

2. De los hechos expuestos se desprende sumariamente que:
"{{HECHOS}}"

3. Conforme al artículo 14 del Decreto 2591 de 1991, la solicitud de amparo reúne los requisitos formales mínimos para su admisión y trámite preferente.

4. RESPECTO DE LA MEDIDA CAUTELAR PROVISIONAL (Art. 7 Decreto 2591 de 1991):
Habiéndose invocado medida provisional y evidenciándose un inminente riesgo de consumación de un perjuicio irremediable consistente en: "{{ORDEN_MEDIDA}}", este Despacho estima necesario decretar la protección provisional mientras se adopta la decisión de fondo, en salvaguarda de los derechos superiores invocados.

II. PARTE DISPOSITIVA

En mérito de lo expuesto, el JUZGADO DE FAMILIA 4, administrando justicia en nombre de la República y por autoridad de la ley,

RESUELVE:

PRIMERO: ADMITIR la acción de tutela instaurada por {{ACCIONANTE}} contra {{ACCIONADO}}.

SEGUNDO: CORRER TRASLADO del escrito tutelar y sus anexos a {{ACCIONADO}}, para que en el término perentorio e improrrogable de CUARENTA Y OCHO (48) HORAS siguientes a la notificación de la presente providencia, ejerza su derecho de contradicción y rinda informe pormenorizado sobre los hechos materia de amparo.

TERCERO: DECRETAR MEDIDA PROVISIONAL URGENTE. En consecuencia, ORDENAR a la entidad {{ACCIONADO}} que, en el término de VEINTICUATRO (24) HORAS contadas a partir de la notificación de este proveído, proceda a: {{ORDEN_MEDIDA}}, so pena de incurrir en desacato judicial (Art. 52 Decreto 2591 de 1991).

CUARTO: VINCULAR al trámite a las entidades que conforme al acervo fáctico tengan competencia directa en la garantía de los derechos aquí reclamados.

QUINTO: NOTIFÍQUESE la presente decisión por el medio más expedito y eficaz a las partes interesadas.

NOTIFÍQUESE Y CÚMPLASE.

JUEZ CUARTO DE FAMILIA DE ORALIDAD`
  },
  {
    id: "auto-admisorio-ordinario",
    nombre: "Auto Admisorio Ordinario y Requerimiento de Informes",
    categoria: "Auto de Trámite",
    descripcion: "Formato del despacho para admisión sin medida cautelar previa, ordenando traslado y vinculación probatoria.",
    formatoOriginal: `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}} ({{IDENTIFICACION}})
ACCIONADO: {{ACCIONADO}}
ASUNTO: ACCIÓN DE TUTELA - AUTO ADMISORIO ORDINARIO

I. ANTECEDENTES Y CONSIDERACIONES

1. Procede el Despacho a pronunciarse sobre la admisión de la acción de tutela instaurada por {{ACCIONANTE}} contra {{ACCIONADO}}, por presunta conculcación de los derechos fundamentales a: {{DERECHOS}}.

2. Hechos expuestos por la parte accionante:
"{{HECHOS}}"

3. Verificados los presupuestos procesales de legitimación en la causa por activa y pasiva, inmediatez y subsidiaridad, el Despacho concluye que la demanda constitucional resulta admisible bajo el marco del Decreto 2591 de 1991.

4. No se advierte necesidad de decretar medidas provisionales urgentes en el presente estadio procesal, sin perjuicio de lo que resulte acreditado en el trámite probatorio.

II. PARTE DISPOSITIVA

RESUELVE:

PRIMERO: ADMITIR la acción de tutela promovida por {{ACCIONANTE}} contra {{ACCIONADO}}.

SEGUNDO: REQUERIR a {{ACCIONADO}} para que dentro del término de CUARENTA Y OCHO (48) HORAS contadas a partir del recibo de la respectiva comunicación, rinda informe pormenorizado sobre los hechos y pretensiones: "{{PRETENSION}}".

TERCERO: ADVERTIR a la accionada que la omisión injustificada en la rendición del informe requerido dará lugar a la aplicación de la presunción de veracidad contemplada en el artículo 20 del Decreto 2591 de 1991.

CUARTO: NOTIFÍQUESE a las partes por el medio técnico más expedito.

NOTIFÍQUESE Y CÚMPLASE.

JUEZ CUARTO DE FAMILIA DE ORALIDAD`
  },
  {
    id: "sentencia-tutela",
    nombre: "Proyecto de Sentencia / Fallo Constitucional",
    categoria: "Sentencia de Fondo",
    descripcion: "Plantilla para fallo de primera instancia con problema jurídico, jurisprudencia de la Corte Constitucional y orden resolutiva.",
    formatoOriginal: `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}} ({{IDENTIFICACION}})
ACCIONADO: {{ACCIONADO}}
ASUNTO: SENTENCIA DE TUTELA - PRIMERA INSTANCIA

I. ASUNTO A DECIDIR

Procede el JUZGADO DE FAMILIA 4 a emitir sentencia de primera instancia dentro de la acción de tutela interpuesta por {{ACCIONANTE}} contra {{ACCIONADO}}, radicada bajo el número {{RADICADO}}.

II. PROBLEMA JURÍDICO

Corresponde al Despacho determinar si la entidad accionada {{ACCIONADO}} ha vulnerado los derechos fundamentales a {{DERECHOS}} de la parte accionante, al abstenerse injustificadamente de: {{PRETENSION}}.

III. CONSIDERACIONES DE LA CORTE CONSTITUCIONAL

La jurisprudencia pacífica y reiterada de la Corte Constitucional (Sentencias T-760/08, T-023/13 y SU-508/20) ha sostenido que los derechos aquí invocados constituyen garantías fundamentales autónomas e inalienables. La negativa o dilación administrativa injustificada en la entrega de insumos, servicios o tratamientos prescritos constituye una barrera de acceso inconstitucional que activa de forma inmediata la orden de amparo tutelar.

IV. CASO CONCRETO Y VALORACIÓN PROBATORIA

Del examen exhaustivo del expediente fáctico se concluye que:
1. Se acredita plenamente la legitimación por activa y pasiva en el presente trámite.
2. Los hechos narrados: "{{HECHOS}}" no fueron desvirtuados oportunamente por la entidad accionada.
3. Se verifica la urgencia manifiesta y la afectación directa al mínimo vital y la integridad personal del accionante.

V. DECISIÓN

En mérito de lo expuesto, el JUZGADO DE FAMILIA 4 DE ORALIDAD, administrando justicia en nombre de la República de Colombia y por autoridad de la ley,

RESUELVE:

PRIMERO: AMPARAR los derechos fundamentales a {{DERECHOS}} del ciudadano(a) {{ACCIONANTE}}, de conformidad con las motivaciones expuestas.

SEGUNDO: ORDENAR al Representante Legal de {{ACCIONADO}}, o a quien haga sus veces, que en el término improrrogable de CUARENTA Y OCHO (48) HORAS contadas a partir de la notificación de este fallo, garantice de manera efectiva e incondicional: {{PRETENSION}}.

TERCERO: PREVENIR a la entidad accionada para que en ningún caso vuelva a incurrir en las conductas dilatorias que dieron origen a la presente acción de tutela.

CUARTO: Si el presente fallo no fuere impugnado dentro de los tres (3) días siguientes a su notificación, REMÍTASE el expediente a la Honorable Corte Constitucional para su eventual revisión.

NOTIFÍQUESE Y CÚMPLASE.

JUEZ CUARTO DE FAMILIA DE ORALIDAD`
  },
  {
    id: "auto-desacato",
    nombre: "Auto de Requerimiento Previo a Incidente de Desacato",
    categoria: "Incidente de Cumplimiento",
    descripcion: "Formato para conminar a la entidad accionada por incumplimiento de la orden de tutela antes de abrir incidente formal.",
    formatoOriginal: `RAMA JUDICIAL DEL PODER PÚBLICO
JUZGADO CUARTO (4°) DE FAMILIA DE ORALIDAD
Medellín, {{FECHA_ACTUAL}}

RADICADO: {{RADICADO}}
ACCIONANTE: {{ACCIONANTE}} ({{IDENTIFICACION}})
ACCIONADO: {{ACCIONADO}}
ASUNTO: REQUERIMIENTO PREVIO A APERTURA DE DESACATO

I. ANTECEDENTES Y CONSIDERACIONES

1. Mediante providencia ejecutoriada de fecha anterior dentro de la tutela con radicado {{RADICADO}}, este Despacho ordenó a la entidad {{ACCIONADO}} dar estricto cumplimiento a lo ordenado en favor de {{ACCIONANTE}}.

2. El ciudadano accionante ha informado a este despacho que la accionada ha desobedecido la orden judicial, manteniendo la omisión respecto a: "{{PRETENSION}}".

3. Conforme al artículo 27 del Decreto 2591 de 1991, el Juez de tutela está investido de facultades disciplinarias y correccionales para hacer cumplir sus órdenes de forma expedita.

II. PARTE DISPOSITIVA

RESUELVE:

PRIMERO: REQUERIR al Representante Legal y/o Funcionario Encargado del cumplimiento de tutelas en {{ACCIONADO}}, para que en el término perentorio de VEINTICUATRO (24) HORAS contadas a partir de la notificación de este auto, demuestre con pruebas idóneas el acatamiento integral de la orden judicial o informe los motivos del retardo.

SEGUNDO: ADVERTIR que en caso de renuencia o silencio administrativo, se dará apertura formal al INCIDENTE DE DESACATO sancionable con arresto hasta de seis (6) meses y multa de hasta 20 salarios mínimos legales (Art. 52 Decreto 2591 de 1991).

NOTIFÍQUESE Y CÚMPLASE.

JUEZ CUARTO DE FAMILIA DE ORALIDAD`
  }
];

// Función para compilar la plantilla reemplazando las variables dinámicas
export function compileTemplate(templateString, variables) {
  if (!templateString) return "";
  
  let result = templateString;
  const replacements = {
    "{{FECHA_ACTUAL}}": variables.fechaActual || new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
    "{{RADICADO}}": variables.radicado || "2026-F04-TUT-XXXX",
    "{{ACCIONANTE}}": variables.accionante || "[ACCIONANTE]",
    "{{IDENTIFICACION}}": variables.identificacion || "[IDENTIFICACIÓN]",
    "{{ACCIONADO}}": variables.accionado || "[ENTIDAD ACCIONADA]",
    "{{DERECHOS}}": variables.derechosVulnerados || "[DERECHOS INVOCADOS]",
    "{{HECHOS}}": variables.hechos || "[HECHOS DEL CASO]",
    "{{PRETENSION}}": variables.pretension || "[PRETENSIÓN]",
    "{{ORDEN_MEDIDA}}": variables.medidaCautelarTexto || variables.pretension || "Protección preventiva inmediata."
  };

  for (const [tag, val] of Object.entries(replacements)) {
    result = result.split(tag).join(val);
  }

  return result;
}
