# Asistente de IA para Automatización Jurídica
### Propuesta Técnica y Simulador Interactivo // Juzgado de Familia 4 x SENA Fábrica de Software

Aplicación web interactiva desarrollada para presentar la **Propuesta Técnica Formal** de cooperación interinstitucional entre el **Juzgado Cuarto (4°) de Familia de Oralidad** y la **Fábrica de Software del SENA**, orientada a optimizar los tiempos de análisis y redacción de providencias judiciales mediante Inteligencia Artificial Generativa.

---

## 🏛️ Contexto y Justificación

Los despachos judiciales enfrentan una alta congestión procesal impulsada principalmente por el volumen constante de **Acciones de Tutela**, las cuales cuentan con plazos constitucionales improrrogables (10 días para fallo y 24 a 48 horas para medidas provisionales urgentes).

Gran parte de la labor sustanciadora consiste en tareas operativas repetitivas:
- Extracción de hechos y derechos invocados.
- Verificación formal de requisitos de admisibilidad (Decreto 2591 de 1991).
- Redacción de autos admisorios, órdenes de traslado y medidas provisionales.
- Búsqueda y estructuración de líneas jurisprudenciales aplicables (salud, niñez, adultos mayores).

Esta propuesta plantea un **Asistente de IA como copiloto técnico**, reduciendo hasta en un **60%** el tiempo de estructuración de borradores, manteniendo siempre al **funcionario judicial como único decisor final** (*Human-in-the-Loop*).

---

## 🎯 Alcance del Producto Mínimo Viable (MVP)

Para mitigar riesgos y entregar valor tangible en el corto plazo, el desarrollo inicial se acota estrictamente a **Tutelas**:

1. **Auto Admisorio con Medida Cautelar Provisional**: Detección de urgencia manifiesta y redacción de órdenes preventivas perentorias (ej. suministro de medicamentos oncológicos, tratamientos vitales).
2. **Auto Admisorio Ordinario y Traslado**: Verificación de requisitos formales, requerimiento de informes a entidades accionadas y vinculación de terceros.
3. **Proyecto de Sentencia (Fallo de Primera Instancia)**: Planteamiento del problema jurídico, síntesis fáctica, valoración probatoria y proyecto de parte resolutiva con cita de sentencias hito de la Corte Constitucional.

---

## ⚡ Simulador Interactivo Incorporado

La aplicación cuenta con un **Simulador MVP funcional en el navegador** (`/alcance-mvp`):
- **Autocompletado de Expedientes**: Selector de casos sintéticos precargados (por accionante o documento de identidad) que autocompleta instantáneamente todas las variables del caso.
- **Campos Editables en Tiempo Real**: Permite modificar radicado, accionante, demandado, derechos, pretensión, hechos y medidas cautelares.
- **Generación en Vivo**: La IA ficticia compila el borrador procesal estructurado al instante.
- **Exportación 100% en Cliente (Sin Backend)**:
  - **Word (`.doc`)**: Descarga directa con formato judicial oficial de la Rama Judicial (márgenes de 2.5 cm, membrete y estilo editable).
  - **PDF**: Generación de vista previa judicial imprimible lista para guardar como PDF.

---

## 🛡️ Protocolo de Seguridad y Aislamiento (Mocking)

En cumplimiento de la **Ley Estatutaria 1581 de 2012** (Protección de Datos Personales):

| Entorno de Desarrollo (SENA) | Entorno de Pruebas / Producción (Juzgado 4) |
| :--- | :--- |
| **100% Datos Sintéticos (Mock Data)** | **Datos Reales Exclusivos del Juzgado** |
| Se utilizan cédulas simuladas (ej. `CC. 00.000.000`) y partes procesales ficticias. | Acceso restringido exclusivamente a los funcionarios autorizados del despacho. |
| Ningún expediente real ingresa a los equipos del SENA. | Las pruebas con casos reales se ejecutan directamente en la sede judicial. |
| PostgreSQL almacena configuraciones y plantillas (cero hechos sensibles). | Los documentos generados permanecen bajo custodia del despacho. |

---

## 🛠️ Arquitectura y Stack Tecnológico

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Diseño**: Estilo Neo-Brutalismo Institucional de alto contraste con soporte completo para **Modo Claro** y **Modo Oscuro**.
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Efectos & Feedback**: Canvas Confetti y Modales Brutalistas personalizados.
- **Arquitectura Backend Propuesta**: Node.js + Express (arquitectura desacoplada y modular).
- **Ruta Dual de Motor de IA**:
  - **Opción A (Google Gemini API)**: Prototipado ágil inmediato, costo cero en fase inicial y alta capacidad multimodal para anexos en PDF.
  - **Opción B (Azure OpenAI)**: Integración corporativa alineada al tenant institucional de Microsoft de la Rama Judicial.

---

## 🤝 Metodología y Gobernanza

La propuesta establece una delimitación clara entre las dos entidades colaboradoras:

- **Fábrica de Software SENA**: Diseño de arquitectura, ingeniería de prompts, desarrollo frontend/backend, control de calidad y soporte técnico continuo.
- **Juzgado de Familia 4**: Definición de criterios sustantivos y jurídicos, validación de plantillas, pruebas operativas en despacho y recepción final del MVP.

---

## 📂 Estructura del Repositorio

```text
propuesta-juzgado/
├── public/                  # Favicons y recursos públicos
├── src/
│   ├── components/          # Componentes reutilizables (Layout y navegación)
│   ├── context/             # Contexto global (AlertContext brutalista)
│   ├── data/
│   │   ├── legalTemplates.js# Plantillas judiciales y motor de compilación
│   │   ├── navigation.js    # Definición de rutas y navegación
│   │   └── proposalData.js  # Metadatos, casos sintéticos y matriz RACI
│   ├── pages/
│   │   ├── ExecutiveOverview.jsx      # 00 // Ficha técnica y pilares
│   │   ├── ProductDefinitionPage.jsx  # 01 // Problemática y transformación
│   │   ├── ScopeMVPPage.jsx           # 02 // Simulador MVP con lector y editor de formatos
│   │   ├── ArchitecturePage.jsx       # 03 // Stack tecnológico y comparador IA
│   │   ├── SecurityPage.jsx           # 04 // Protocolo de Mocking y privacidad
│   │   └── TeamRolesPage.jsx          # 05 // Metodología y gobernanza institucional
│   ├── utils/
│   │   └── documentExporter.js        # Exportación en Word (.doc) y PDF judicial
│   ├── App.jsx              # Configuración de rutas y tema (Modo Claro por defecto)
│   ├── index.css            # Tokens de diseño neo-brutalista
│   └── main.jsx             # Punto de entrada
├── package.json
└── vite.config.js
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- `npm` o gestor de paquetes preferido

### Pasos
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jaimezzapata/propuesta-juzgado.git
   cd propuesta-juzgado
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📄 Licencia y Créditos

Proyecto desarrollado por el **Equipo de Desarrollo de la Fábrica de Software del SENA** en colaboración con el **Juzgado Cuarto (4°) de Familia de Oralidad** para fines de innovación y modernización de la gestión judicial.
