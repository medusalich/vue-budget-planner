# 0034 — Calculation is separated from input and output

**Status:** accepted
**Date:** 2026-09-10

## Context

A function that loads data and computes a figure has to be surrounded by network stubs before it
can be examined at all. A pure calculation is verified in a few lines.

## Decision

Anything that talks to the outside world — network, errors, loading state — lives in a
composable under `app/composables/`. Anything that takes values and returns a value lives in
`app/utils/` and has no `use` prefix, because `use` announces a reactivity such a function does
not have.

Both folders are auto-imported, so the choice says nothing about how a function is reached. It
says what a reader may expect inside.

## Consequences

Moving a file between the two folders costs a rename, because no call site names the path.
`money.ts` made that move on 2026-09-11 from `app/composables/useMoney.ts`. The prefix had
announced a reactivity it never had.

What leaves a component in the first place is decided in
[0024](0024-logic-leaves-the-component.md).
