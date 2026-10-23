# Sistema y Reglas de Diseño Visual: Brutalismo Sobrio

Este documento establece las directrices estéticas y los estándares de interfaz de usuario (UI) para la plataforma judicial. Todo componente, vista y elemento visual desarrollado en la aplicación debe adherirse estrictamente a estas especificaciones.

---

## 1. Filosofía del Estilo: Brutalismo / Neo-Brutalismo Institucional

La interfaz adopta los principios del **Neo-Brutalismo**, adaptados a un contexto judicial de alta seriedad, autoridad y precisión:
- **Claridad y jerarquía sin ambigüedad:** La información legal y los expedientes procesales deben tener la máxima legibilidad.
- **Solidez y contundencia:** Formas geométricas definidas, bordes negros marcados y sombras sólidas de bloque.
- **Cero adornos superfluos:** Se prohíbe el uso de degradados difusos, transparencias excesivas o efectos de vidrio borroso (*glassmorphism*). La interfaz debe transmitir formalidad, solidez y contundencia institucional.

---

## 2. Paleta Cromática Oficial

El esquema de color se basa en un contraste riguroso con tres tonos fundamentales:

| Rol | Nombre | HEX | Tailwind / Utilidad | Uso principal |
|---|---|---|---|---|
| **Estructura & Texto** | Negro Puro / Carbón | `#000000` / `#121212` | `bg-black`, `text-black`, `border-black` | Bordes gruesos de elementos, sombras duras, textos de alto contraste, encabezados y barras principales. |
| **Superficie & Base** | Blanco / Hueso | `#FFFFFF` / `#F8F9FA` | `bg-white`, `bg-[#F8F9FA]` | Fondos de la aplicación, paneles de trabajo, tarjetas de expedientes y lectura de providencias. |
| **Acento Primario** | Amarillo Sobrio | `#FFE500` / `#F5C518` / `#FACC15` | `bg-amber-400`, `bg-[#F5C518]` | Botones de acción primaria, badges de urgencia/medidas cautelares, focus states y resaltados clave. |

### Colores de Apoyo Semántico Procesal (Uso Restringido):
- **Alerta / Rechazo / Vencimiento:** Rojo sobrio de alto contraste (`#DC2626` con borde negro).
- **Éxito / Aprobado / Radicado:** Verde sobrio (`#16A34A` con borde negro).
- **Informativo / En Trámite:** Azul sobrio neutro (`#2563EB` con borde negro).

---

## 3. Elementos y Rasgos Visuales Obligatorios

### A. Bordes Definidos (Bold Borders)
- Todos los contenedores principales (cards, modales, tablas, botones, inputs) deben usar bordes negros definidos:
  - Estándar: `border-2 border-black`
  - Paneles destacados o modales: `border-3 border-black` o `border-[2.5px] border-black`

### B. Sombras Duras de Bloque (Hard / Box Shadows)
- Prohibidas las sombras difuminadas con desenfoque (*blur* gaussiano).
- Usar siempre sombras sólidas con desplazamiento neto:
  - Tarjetas y paneles: `shadow-[4px_4px_0px_#000000]`
  - Botones y badges: `shadow-[2px_2px_0px_#000000]` o `shadow-[3px_3px_0px_#000000]`
  - Modales o elementos elevados: `shadow-[6px_6px_0px_#000000]`

### C. Micro-interacción Táctil (Press-Down Effect)
- Los elementos interactivos (botones, pestañas, selectores) deben reaccionar con desplazamiento físico hacia la sombra al interactuar:
  ```css
  /* Efecto al hacer clic / active */
  hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000]
  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
  ```

### D. Tipografía y Jerarquía
- **Familias tipográficas:** Fuentes sans-serif o monoespaciadas limpias, modernas y legibles (Inter, Roboto, Geist o monospace para radicados/códigos).
- **Pesos:**
  - Títulos y encabezados: Peso marcado (`font-bold` o `font-black`).
  - Metadatos (radicado, despacho, estado): Mayúsculas sostenidas (`uppercase tracking-wider text-xs font-semibold`).
  - Cuerpo de texto y autos procesales: Peso regular (`font-normal`), alto contraste sobre fondo blanco y espaciado de línea amplio para lectura cómoda.

---

## 4. Guía de Componentes Básicos (UI)

### Botón Primario (Acción Destacada)
- Fondo: Amarillo sobrio (`bg-[#FACC15]` o `#F5C518`)
- Borde: `border-2 border-black`
- Texto: `text-black font-bold`
- Sombra: `shadow-[3px_3px_0px_#000]`
- Interacción: `active:shadow-none active:translate-x-[2px] active:translate-y-[2px]`

### Botón Secundario / Neutro
- Fondo: Blanco (`bg-white`)
- Borde: `border-2 border-black`
- Texto: `text-black font-semibold`
- Sombra: `shadow-[2px_2px_0px_#000]`

### Tarjetas (Cards) de Trabajo Judicial
- Fondo: `bg-white`
- Borde: `border-2 border-black`
- Sombra: `shadow-[4px_4px_0px_#000]`
- Esquinas: Angulares o esquinas ligeramente redondeadas uniformes (`rounded-none` o `rounded-md`).

### Campos de Entrada (Inputs / Textareas)
- Fondo: `bg-white`
- Borde: `border-2 border-black`
- Focus: `focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-black`
- Sombra sutil de bloque: `shadow-[2px_2px_0px_#000]`
