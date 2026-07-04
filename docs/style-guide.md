# Coding & Styling Standards

## JavaScript / TypeScript

- Avoid referencing `process.env` directly; instead, import validated configurations from `src/config/env.ts`.
- Prefer absolute types imports from `src/types/` rather than inline declarations.
- Enforce strict typing. Avoid `any` except where required by dynamic inputs parsers.

## CSS Tokens Usage

- Use CSS design tokens configured in `src/styles/tokens.css`.
- Avoid hardcoding arbitrary hex values inside HTML/CSS; map them back to:
  - `--bg` (Background colors)
  - `--surface` (Border and card panels)
  - `--text` (Foreground primary text)
  - `--muted` (Secondary descriptor label colors)
  - `--accent` (Interactive colors, e.g. blue highlights)
