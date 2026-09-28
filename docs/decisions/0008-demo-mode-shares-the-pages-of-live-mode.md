# 0008 — Demo mode shares the pages of live mode

**Status:** proposed
**Date:** 2026-08-12

## Context

A visitor can explore the application fully without an account and without any data being stored.
That demo needs the same pages as the real thing.

## Decision

Demo mode has no separate routes. A mode flag in shared state selects the data source. The pages
and components are the same in both modes. Demo writes are held in memory and lost on reload, and
no request reaches a database.

## Consequences

Pages duplicated under a prefix would drift apart as soon as one copy is changed. Shared pages
are exercised twice by every change.

The ownership rule is only simulated in demo mode. It can hide the edit button on another
author's row, but nothing is enforced, because there is no database to enforce it. The rule
becomes a real guarantee once the row-level security policies exist. The demo is not evidence
that permissions work.
