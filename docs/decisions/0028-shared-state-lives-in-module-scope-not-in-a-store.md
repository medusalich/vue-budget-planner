# 0028 — Shared state lives in module scope, not in a store

**Status:** accepted
**Date:** 2026-09-07

## Context

Shared application state is conventionally kept in a store library. This project keeps it in
module-scope refs inside composables instead.

The question was raised again on 2026-09-16 and the decision re-checked rather than assumed.

## Decision

No store library. Reactive state that must outlive a component is declared outside the exported
function, so the module holds it.

This is sound here because the application renders in the browser only. With server-side
rendering the state would live in the server process and be shared between visitors, and the
framework offers its own tool for that case.

## Consequences

A store library would solve problems this project does not have: many stores with cross access,
an enforced structure for a team. It would also place a second pattern beside the existing
composables, for a new dependency.

Of the advantages usually claimed for it, the composable pattern already provides composition,
actions and derived values. What is genuinely missing is time-travel devtools.

The distinction that matters is not store against no store. It is a ref outside the function,
which survives a route change because a module is loaded once, against a ref inside a component,
which dies with the component. Both exist here on purpose.

If a store is ever introduced, it is introduced as a decision about learning and named as such,
so that nobody later searches for the technical problem it solved.
