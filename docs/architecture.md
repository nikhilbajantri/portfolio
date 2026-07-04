# System Architecture Reference

This document maps the layout boundaries of nikhilbajantri.dev.

## Directory Structure

- `src/components/`: Modular React-like Astro UI components.
  - `ui/`: Design system primitives (Buttons, Cards, Chips).
- `src/content/`: Flat folders representing data collections.
  - `schemas/`: Self-contained Zod validators.
- `src/lib/`: Reusable runtime behavior (e.g. content queries, URL formats).
- `src/plugins/`: Build-time generation extensions (RSS, Search, Images).
- `scripts/build/`: Compilation pipeline scripts.
- `public/`: Public-facing static resources (images, feeds, downloads).

## Build Pipeline Flow

```
Raw Markdown Assets
       │
       ▼
pre-build scripts (scripts/build/index.cjs)
  - Generate RSS feeds
  - Compile search-v1.json
  - Export quality-report.md & content-report.md
       │
       ▼
Astro build compiler
       │
       ▼
Static production HTML page bundle
```
