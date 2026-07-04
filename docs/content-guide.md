# Content Authoring Standards

All markdown resources must adhere to these quality checks to ensure clean indexing and parsing.

## Common Frontmatter Fields

Every content collection document must define these:

```yaml
version: 1
created: 2026-07-04
updated: 2026-07-04
reviewed: 2026-07-04
revision: 1
status: Published # Draft | Review | Scheduled | Published | Archived | Deprecated
```

## Directory Assets Naming Conventions

For flagship case studies inside `src/content/projects/`:
1. Use a dedicated folder, e.g. `src/content/projects/dailydine/`.
2. Name the primary entrypoint `index.md`.
3. Standardize image filenames:
   - `cover.webp` (primary card background)
   - `hero.webp` (page header illustration)
   - `architecture.svg` (infrastructure flow diagrams)
   - `thumbnail.webp` (search modal thumbnail)
