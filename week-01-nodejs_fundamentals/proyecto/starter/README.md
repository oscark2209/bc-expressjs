# Catálogo con Reporte de Inventario — Escuela de Música

Entrega de ejemplo para el proyecto de la **semana 01** (ver especificación de la actividad).

### Dominio asignado

**Escuela de Música** — recurso `Instrument` (`name`, `category`, `stock`, `monthlyFee`).

### Cómo correr

```bash
pnpm install
pnpm dev                  # resumen + alertas con umbral por defecto (5)
pnpm dev -- --umbral 3    # con umbral propio
pnpm build                # verifica TypeScript estricto