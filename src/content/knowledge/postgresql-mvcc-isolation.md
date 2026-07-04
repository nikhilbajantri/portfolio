---
id: "postgresql-mvcc-isolation"
title: "PostgreSQL Isolation Levels Reference"
category: "Databases"
why: "Understanding read phenomena and serialized locking limits is critical for building concurrent database transactions."
bestFor: "Developers designing reservation engines, ledger systems, or ticket allocation networks."
links:
  - "https://www.postgresql.org/docs/current/transaction-iso.html"
prerequisites:
  - "Relational database basics"
relatedTopics:
  - "concurrency"
  - "mvcc"
related:
  - "note-postgres-mvcc"
updated: 2026-07-04
difficulty: "advanced"
estimatedTime: "8 min"
status: "Reference"
statusLabel: "Published"
pinned: true
---
## Read Phenomena vs Isolation Levels
- **Read Committed**: Default level. Dirty reads are blocked, but non-repeatable reads and phantom reads can occur.
- **Repeatable Read**: Repeatable reads are guaranteed. Phantom reads are prevented in PostgreSQL.
- **Serializable**: Full isolation. Prevents write skew using serialization checks.
