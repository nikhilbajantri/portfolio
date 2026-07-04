---
id: "note-git-dag"
title: "Git Internals: Directed Acyclic Graphs"
slug: "git-dag"
topic: "Git"
tags:
  - "git"
  - "vcs"
difficulty: "Intermediate"
estimatedTime: "4 min"
summary: "Commits, trees, and blobs modeled as a DAG."
draft: false
date: 2026-06-25
---
Git is a content-addressable database that models file revisions using a Directed Acyclic Graph (DAG). Commits point to parent commits, tree nodes structure directory routes, and blob nodes capture content payloads.
