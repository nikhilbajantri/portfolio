---
id: "project-dailydine"
title: "DailyDine Reservation Queue"
slug: "dailydine"
status: "In Development"
visibility: "public"
featured: true
featuredOrder: 1
year: 2026
started: 2024-03-01
team:
  - "Nikhil Bajantri"
  - "4 Developers"
role: "Founder & CTO"
repository: "https://github.com/programmer-nick234/dailydine"
demo: "https://dailydine.demo"
languages:
  - "Go"
frameworks:
  - "React"
  - "Tailwind"
database:
  - "PostgreSQL"
infrastructure:
  - "AWS"
  - "Docker"
services:
  - "Exclusion Locks"
architecture:
  - "Event Driven"
  - "Monolith"
category: "Selected Work"
thumbnail: "/src/content/media/covers/dailydine-cover.png"
order: 1
draft: false
priority: 100
description: "A restaurant operations platform built to reduce uncertainty around table reservations and real-time seating inventory."
---
## 01. Overview
### Executive Summary
DailyDine is a restaurant operations platform built to reduce uncertainty around table reservations and real-time seating inventory. The project served as my largest experiment in database concurrency controls and operational simplicity. By coordinating real-time reservations without distributed locking layers, the system demonstrates how transactional database constraints can replace complex caching networks.

### Key Takeaways
- Built a reservation engine with transactional consistency.
- Replaced optimistic assumptions with measurable concurrency controls.
- Learned that operational simplicity scales better than premature complexity.

### Context
DailyDine was built to allow local restaurants to host direct table reservations on their own web domains, escaping directory commissions. Venues retain absolute customer database ownership while serving real customers daily.

### The Problem
Double-booking a table ruins customer confidence instantly. Restaurants experience bursts of booking requests during holiday seasons or weekend rush hours. If two customers book the same table simultaneously, the system fails.

---

## 02. Engineering
### Key Decisions
- **March 2025 · PostgreSQL over MongoDB**: Decision: PostgreSQL serialization constraints. MongoDB lacks the native exclusion locks required to validate seating overlaps at database boundary levels.
- **June 2025 · Short Polling over WebSockets**: Decision: Server-side connection simplicity. Maintaining WebSockets consumed idle memory resources on low-cost virtual private servers.

### Trade-offs
- **Serializable Isolation**: Zero duplicate bookings, but causes Transaction abort retries.
- **SQL Constraints**: Guaranteed schema state, but requires complex SQL migrations.
- **Short Polling**: Lower active RAM usage, but results in higher network log counts.

### What Didn't Work
Implementing Redis distributed locks introduced connection drop vulnerabilities and key state mismatches. If the API instance restarted during validation, the lock stayed orphaned, freezing seat inventory. We replaced this with PostgreSQL index-level exclusion bounds.

### Security
To guard user information and transactions, we set secure headers, CSRF middleware tokens, and strict authorization levels. Reservation writes are validated against active date-range limits to block boundary attacks.

---

## 03. Reflection
### Outcome
DailyDine operates across three active local venues, processing hundreds of weekly reservations without a single double-booking failure.

### Lessons
Relying on database guarantees is safer than coordinating state inside applications. Database schemas and transactional engines are designed for consensus; developers should avoid re-implementing locks.
