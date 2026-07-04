# Contributing Guidelines

This document outlines the workflow and quality checks for adding, updating, or reviewing content and code on nikhilbajantri.dev.

## Workflow

1. **Content Drafts**:
   - Save unfinished pages or articles in `src/content/drafts/`.
   - Set the status field to `Draft` in frontmatter.
   
2. **Review & Scheduling**:
   - Set status to `Review` to trigger automated formatting, validation, and accessibility tests in pull requests.
   - Set status to `Scheduled` with a publication date to schedule future releases.

3. **Publishing**:
   - Set status to `Published`.
   - Run `npm run build` to verify local sitemap, RSS feed, and search index compiles successfully.
