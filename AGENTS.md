<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas Obligatorias de Trabajo y Arquitectura

Todo asistente y desarrollador que opere en este repositorio DEBE seguir estricta e indefectiblemente las siguientes directrices:

---

## 1. Proyecto Separado por Funcionalidades / Características (Feature-Driven Architecture)

El código de negocio NUNCA debe agruparse por tipo técnico global (no crear carpetas monolíticas globales como `components/` o `hooks/` con código de toda la app), sino mediante **módulos por característica (Vertical Slices)**.

### Estructura de carpetas obligatoria:
```text
src/
├── app/                        # Rutas de Next.js (App Router: páginas, layouts, route handlers)
│   ├── (auth)/...
│   ├── (dashboard)/...
│   └── api/...
├── features/                   # Módulos organizados por característica de negocio
│   ├── [nombre-feature]/       # Ej: tutelas, expedientes, resoluciones, radicacion
│   │   ├── components/         # Componentes visuales específicos de la funcionalidad
│   │   ├── hooks/              # Custom hooks con la lógica y estado de la funcionalidad
│   │   ├── actions/ o services/# Server Actions, llamadas a DB y lógica de persistencia
│   │   ├── types/              # Interfaces, esquemas y tipos de datos del feature
│   │   └── utils/              # Validaciones y funciones auxiliares del feature
│   └── ...
├── components/                 # Componentes compartidos globales y agnósticos
│   └── ui/                     # Botones, inputs, modales, tablas genéricas
├── lib/                        # Configuraciones de librerías globales (Prisma, auth, etc.)
├── types/                      # Tipos globales compartidos transversalmente
└── utils/                      # Funciones utilitarias transversales agnósticas al negocio
```

### Directrices:
- Cada funcionalidad debe ser autónoma.
- Lo que pertenezca exclusivamente a un flujo de trabajo (ej. "Tutelas") debe residir dentro de `src/features/tutelas/`.
- La capa `src/app/` solo debe ocuparse del enrutamiento, actuando como orquestador que importa e integra las vistas/componentes desde `src/features/`.

---

## 2. Prohibición Estricta de Componentes Monolíticos

Ningún componente debe concentrar múltiples responsabilidades ni convertirse en un archivo extenso e inmanejable.

### Criterios y límites:
- **Principio de Responsabilidad Única (SRP):** Cada componente debe resolver una única tarea visual o de interacción.
- **Tamaño controlado:** Si un archivo de componente supera las **100 - 150 líneas** o contiene múltiples subsecciones visuales, debe fragmentarse en subcomponentes más pequeños y específicos.
- **Componibilidad:** Favorecer componentes pequeños que se combinen entre sí (patrón de composición) en lugar de componentes gigantescos llenos de condicionales y parámetros booleanos de configuración.
- **Descomposición jerárquica:**
  - Componente de página / vista principal (ensambla piezas).
  - Subcomponentes de sección (formulario, panel de vista previa, barra de acciones).
  - Componentes atómicos de elemento (filas, campos, tags, badges).

---

## 3. Separación Estricta de Lógica y UI

Está terminantemente prohibido mezclar la lógica de negocio, validaciones complejas o gestión pesada de estados dentro de los componentes visuales de presentación.

### Directrices:
- **Componentes Visuales (Presentacionales / Dummy):**
  - Solo reciben datos y callbacks vía props o mediante un custom hook dedicado.
  - Su única responsabilidad es renderizar HTML/JSX con sus clases de estilo y propagar eventos del usuario (`onClick`, `onSubmit`).
  - No deben contener llamadas directas a APIs, cálculos de reglas de negocio ni transformaciones extensas de datos.
- **Lógica en Custom Hooks y Capa de Dominio:**
  - Toda la gestión de estado (`useState`, `useReducer`, `useEffect`) y flujos de interacción debe residir en **Custom Hooks** (ej. `useTutelaForm.ts`, `useDocumentPreview.ts`).
  - El componente solo consume el hook:
    ```tsx
    // Correcto:
    export function TutelaForm() {
      const { values, errors, isSubmitting, handleSubmit, handleFieldChange } = useTutelaForm();
      return (
        <form onSubmit={handleSubmit}>
          {/* Solo UI y enlace a handlers */}
        </form>
      );
    }
    ```
- **Persistencia y Consultas:**
  - Las consultas a la base de datos (Prisma), Server Actions o peticiones HTTP deben estar encapsuladas en `actions/` o `services/`, nunca ejecutadas inline dentro del render de la interfaz.

---

## 4. Respetar Siempre el Principio DRY (Don't Repeat Yourself)

No duplicar código, lógica, estilos ni definiciones de tipos en ningún lugar de la aplicación.

### Directrices:
- **Componentes Reutilizables:** Si un patrón de interfaz se repite dos o más veces (un botón con spinner de carga, un card de estado procesal, un banner de alerta), debe extraerse a `src/components/ui/` o al `components/` compartido correspondiente.
- **Lógica y Utilidades Compartidas:** Si una regla de cálculo, validación de radicado, formateo de fechas colombianas o normalización de texto se requiere en más de un sitio, debe centralizarse en una función pura en `utils/`.
- **Tipado Único:** Los contratos de datos, enums y tipos generados por Prisma o TypeScript deben ser la única fuente de verdad. No duplicar interfaces que representen la misma entidad.
- **Constantes Centralizadas:** Cero valores mágicos en el código (cadenas de texto repetidas, códigos de despacho, estados del proceso, URLs de endpoints); todo debe definirse en archivos de constantes o enums dedicados.

---

## 5. Sistema de Diseño Visual: Brutalismo con Colores Sobrios

El diseño base y principal de la aplicación DEBE implementar el **estilo Brutalista / Neo-brutalismo** con colores sobrios:
- **Paleta sobria:**
  - **Negro (`#000000` / `#121212`):** Bordes gruesos sólidos, sombras duras (*hard shadows*), textos de alto contraste.
  - **Blanco / Hueso (`#FFFFFF` / `#F8F9FA`):** Fondos limpios, tarjetas y paneles de trabajo judicial.
  - **Amarillo sobrio (`#FFE500` / `#F5C518` / `#FACC15`):** Acento primario, botones de acción destacados, badges de estado y focus states.
- **Rasgos visuales obligatorios:**
  - Bordes definidos y oscuros (`border-2 border-black`).
  - Sombras duras de bloque sin difuminado (ej. `shadow-[3px_3px_0px_#000]`).
  - Tipografía contundente, jerarquía clara y alta legibilidad.
  - Cero degradados artificiales o vidrios difusos (*no glassmorphism*); transmitir formalidad, solidez y contundencia institucional.

---

## 6. Prohibición Absoluta de Ejecución en el Navegador por el Asistente

El asistente de IA NUNCA debe ejecutar herramientas de navegador (`browser_subagent`, clics, navegación automatizada o apertura de navegador).
- Toda la ejecución y prueba visual en el navegador es potestad **exclusiva del USUARIO**.
- La verificación de código por parte del asistente debe realizarse estrictamente mediante compilación (`npm run build`), TypeScript y comandos de consola.

> Documentación de referencia:
> - Arquitectura y código: `docs/reglas-de-trabajo.md`
> - Sistema de diseño visual: `docs/reglas-de-diseno.md`


