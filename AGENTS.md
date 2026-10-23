<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Reglas Obligatorias de Trabajo y Arquitectura

1. **Estructura por Funcionalidades/Características:** Código organizado por módulos de negocio bajo `src/features/[feature]/` (componentes, hooks, acciones, tipos, utils). Las rutas en `src/app/` solo orquestan.
2. **Prohibición de Componentes Monolíticos:** Componentes pequeños y de responsabilidad única (< 100-150 líneas). Descomponer en subcomponentes atómicos.
3. **Separación Estricta de Lógica y UI:** La UI solo renderiza y propaga eventos. La lógica de estado, cálculos y efectos debe residir en Custom Hooks (`use[Feature].ts`). Consultas a DB / Prisma y llamadas de red en Server Actions o capas de servicio.
4. **Principio DRY (Don't Repeat Yourself):** Reutilizar componentes, utilidades, esquemas de validación y constantes. Cero valores mágicos ni duplicación de contratos de tipos.
Consulte detalles completos en `docs/reglas-de-trabajo.md`.
