# Reglas de Trabajo y Arquitectura del Proyecto

Este documento define las directrices arquitectónicas y estándares de desarrollo obligatorios para el proyecto. Todo el equipo y los asistentes de desarrollo deben respetar estas directrices de manera estricta y sin excepciones.

---

## 1. Proyecto Separado por Funcionalidades / Características (Feature-Driven Architecture)

El código fuente del dominio no debe organizarse por tipo técnico global (evitar agrupar todos los componentes, hooks o servicios en carpetas gigantescas globales), sino mediante **módulos por funcionalidad (Vertical Slices)**.

### Estructura de carpetas requerida:

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
│   │   ├── actions/ o services/# Llamadas a API, Server Actions y lógica de persistencia
│   │   ├── types/              # Interfaces, esquemas y tipos de datos del feature
│   │   └── utils/              # Validaciones y funciones auxiliares del feature
│   └── ...
├── components/                 # Componentes compartidos globales y agnósticos
│   └── ui/                     # Botones, inputs, modales, tablas genéricas
├── lib/                        # Configuraciones de librerías globales (Prisma, cliente HTTP, auth)
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

El diseño base y principal de toda la aplicación debe ceñirse al **estilo Brutalista (o Neo-brutalismo)** con una **paleta sobria, elegante y de alto contraste**, adecuada para una plataforma judicial y de alta precisión.

### Paleta cromática oficial:
- **Negro (`#000000` / `#121212`):** Bordes sólidos marcados, tipografía de máximo contraste, sombras duras y fondos de acento.
- **Blanco / Blanco hueso (`#FFFFFF` / `#F8F9FA`):** Fondos principales, superficies de lectura de expedientes y contraste limpio.
- **Amarillo sobrio (`#FFE500` / `#F5C518` / `#FACC15`):** Color de acento primario para botones destacados, llamados a la acción (CTAs), badges de estado urgente, resaltados procesales y focus states.

### Elementos característicos del estilo:
- **Bordes visibles y definidos:** Todos los contenedores, cards, inputs y botones deben contar con bordes negros sólidos marcados (ej. `border-2 border-black` o `border-neutral-900`).
- **Sombras duras (Hard Shadows):** Sombras de bloque sin difuminado (*drop-shadows sólidas*, ej. `box-shadow: 3px 3px 0px #000000` o `shadow-[4px_4px_0px_0px_#000]`).
- **Tipografía contundente:** Jerarquías claras, títulos con peso visual marcado (*bold* / *black*), etiquetas en mayúsculas sostenidas para metadatos y excelente legibilidad para lectura judicial.
- **Micro-interacciones táctiles:** Efecto *press/active* donde los botones y elementos interactivos se desplazan hacia la sombra al hacer clic (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).
- **Cero adornos superfluos:** Sin degradados suaves artificiales ni efectos de vidrio borroso (*glassmorphism* difuso); la estética debe proyectar firmeza, claridad, modernidad y seriedad institucional.
