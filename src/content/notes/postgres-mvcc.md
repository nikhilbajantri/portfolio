---
id: "note-postgres-mvcc"
title: "Postgres: Multi-Version Concurrency Control (MVCC)"
slug: "postgres-mvcc"
topic: "Postgres"
tags:
  - "databases"
  - "concurrency"
  - "postgres"
difficulty: "Advanced"
estimatedTime: "5 min"
related:
  - "article-lessons-dailydine"
summary: "Row transaction IDs and non-blocking reads."
draft: false
date: 2026-07-04
---
PostgreSQL manages transaction visibility using Multi-Version Concurrency Control. Every row contains header metadata indicating transaction bounds (`xmin` and `xmax`). This guarantees that reads do not block writes, and writes do not block reads.
