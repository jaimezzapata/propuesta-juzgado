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

## 5. Prohibición Absoluta de Ejecución en el Navegador por el Asistente

El asistente de IA NUNCA debe ejecutar herramientas de navegador (`browser_subagent`, automatizaciones de clics o navegación web interna).
- La ejecución, pruebas y validaciones visuales en el navegador las realiza **única y exclusivamente el USUARIO**.
- El asistente debe verificar su código mediante compilación (`npm run build`), pruebas de tipos de TypeScript y comandos de terminal, dejando que el usuario interactúe libremente en su propio navegador.

---

> Para las directrices visuales, componentes y paleta cromática, consulte el documento dedicado: **[docs/reglas-de-diseno.md](./reglas-de-diseno.md)**.

