// Utilidad para exportación y descarga de documentos judiciales en Word (.doc) y PDF
// Ejecución 100% en el cliente (Browser), sin requerir backend adicional.

export function downloadDocumentAsWord({
  filename = "Providencia_Tutela_Juzgado4.doc",
  radicado = "2026-F04-TUT-0089",
  tipoDocumento = "Auto Admisorio",
  accionante = "Accionante",
  accionado = "Accionado",
  content = ""
}) {
  const cleanFilename = filename.endsWith('.doc') || filename.endsWith('.docx') 
    ? filename 
    : `${filename}.doc`;

  // Construcción del documento con formato HTML/Word compatible con Microsoft Word
  const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${tipoDocumento} - ${radicado}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: letter;
      margin: 3.0cm 2.5cm 2.5cm 2.5cm;
      mso-header-margin: 1.5cm;
      mso-footer-margin: 1.5cm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000000;
      text-align: justify;
    }
    .judicial-header {
      text-align: center;
      margin-bottom: 24pt;
      border-bottom: 2pt solid #000000;
      padding-bottom: 12pt;
    }
    .judicial-header h2 {
      font-size: 13pt;
      font-weight: bold;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    .judicial-header h3 {
      font-size: 12pt;
      font-weight: bold;
      margin: 4pt 0;
      text-transform: uppercase;
    }
    .judicial-header p {
      font-size: 10pt;
      margin: 2pt 0;
      font-style: italic;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18pt;
      font-size: 11pt;
    }
    .meta-table td {
      padding: 3pt 6pt;
      vertical-align: top;
    }
    .meta-label {
      font-weight: bold;
      width: 25%;
    }
    .content-body {
      white-space: pre-wrap;
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      text-align: justify;
    }
    .signature-section {
      margin-top: 40pt;
      text-align: center;
    }
    .signature-line {
      width: 240pt;
      margin: 0 auto;
      border-top: 1pt solid #000000;
      padding-top: 4pt;
      font-weight: bold;
      font-size: 11pt;
    }
    .footer-judicial {
      margin-top: 30pt;
      border-top: 1pt solid #cccccc;
      padding-top: 6pt;
      font-size: 9pt;
      color: #555555;
      text-align: center;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="judicial-header">
    <h2>Rama Judicial del Poder Público</h2>
    <h3>Juzgado Cuarto (4°) de Familia de Oralidad</h3>
    <p>Distrito Judicial • Sistema de Automatización Jurídica SENA</p>
  </div>

  <table class="meta-table">
    <tr>
      <td class="meta-label">RADICADO:</td>
      <td><strong>${radicado}</strong></td>
    </tr>
    <tr>
      <td class="meta-label">TRÁMITE:</td>
      <td>ACCIÓN DE TUTELA - PRIMERA INSTANCIA</td>
    </tr>
    <tr>
      <td class="meta-label">ACCIONANTE:</td>
      <td>${accionante}</td>
    </tr>
    <tr>
      <td class="meta-label">ACCIONADO:</td>
      <td>${accionado}</td>
    </tr>
    <tr>
      <td class="meta-label">PROVIDENCIA:</td>
      <td><strong>${tipoDocumento}</strong></td>
    </tr>
  </table>

  <hr style="border: 0; border-top: 1pt solid #000000; margin-bottom: 18pt;" />

  <div class="content-body">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

  <div class="signature-section">
    <br/><br/>
    <div class="signature-line">
      JUEZ CUARTO DE FAMILIA<br/>
      <span style="font-size: 10pt; font-weight: normal;">Despacho Judicial de Oralidad</span>
    </div>
  </div>

  <div class="footer-judicial">
    Documento judicial generado mediante el Asistente IA para Automatización Jurídica (SENA x Juzgado 4 de Familia).
  </div>
</body>
</html>
  `.trim();

  // Blob con BOM UTF-8 (\ufeff) para que Microsoft Word respete acentos y caracteres latinos
  const blob = new Blob(['\ufeff', wordHtml], { 
    type: 'application/msword;charset=utf-8' 
  });
  
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = cleanFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

export function printOrSaveAsPdf({
  radicado = "2026-F04-TUT-0089",
  tipoDocumento = "Auto Admisorio",
  accionante = "Accionante",
  accionado = "Accionado",
  content = ""
}) {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert("Por favor habilita las ventanas emergentes (pop-ups) para generar la vista previa del PDF.");
    return;
  }

  const printHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${tipoDocumento} - Radicado ${radicado}</title>
  <style>
    @page {
      size: letter;
      margin: 2.5cm;
    }
    body {
      font-family: 'Times New Roman', Georgia, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #111;
      padding: 20px 40px;
      margin: 0;
      text-align: justify;
    }
    .header-judicial {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header-judicial h1 {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .header-judicial h2 {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 4px 0;
    }
    .header-judicial p {
      font-size: 10pt;
      font-style: italic;
      margin: 0;
      color: #444;
    }
    .meta-box {
      font-family: monospace;
      font-size: 11pt;
      background: #f8f8f8;
      border: 1px solid #ccc;
      padding: 10px 14px;
      margin-bottom: 20px;
    }
    .meta-box div {
      margin-bottom: 4px;
    }
    .document-body {
      white-space: pre-wrap;
      font-size: 12pt;
      line-height: 1.6;
    }
    .signature {
      margin-top: 50px;
      text-align: center;
    }
    .signature-line {
      width: 280px;
      margin: 0 auto;
      border-top: 1px solid #000;
      padding-top: 6px;
      font-weight: bold;
    }
    .no-print {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #18181b;
      color: #fff;
      padding: 10px 18px;
      font-family: sans-serif;
      font-size: 13px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .btn-print {
      background: #FFE600;
      color: #000;
      border: none;
      padding: 8px 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 2px;
      font-family: sans-serif;
    }
    @media print {
      .no-print { display: none; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <span><strong>VISTA PREVIA JUDICIAL:</strong> Haga clic en "Guardar como PDF" o Imprimir.</span>
    <button class="btn-print" onclick="window.print()">Guardar como PDF / Imprimir</button>
  </div>

  <div class="header-judicial">
    <h1>Rama Judicial del Poder Público</h1>
    <h2>Juzgado Cuarto (4°) de Familia de Oralidad</h2>
    <p>Distrito Judicial • Sistema de Automatización Jurídica SENA</p>
  </div>

  <div class="meta-box">
    <div><strong>RADICADO:</strong> ${radicado}</div>
    <div><strong>ACCIONANTE:</strong> ${accionante}</div>
    <div><strong>ACCIONADO:</strong> ${accionado}</div>
    <div><strong>ASUNTO:</strong> ${tipoDocumento}</div>
  </div>

  <div class="document-body">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

  <div class="signature">
    <br/><br/>
    <div class="signature-line">
      JUEZ CUARTO DE FAMILIA DE ORALIDAD
    </div>
  </div>
</body>
</html>
  `.trim();

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();
}
