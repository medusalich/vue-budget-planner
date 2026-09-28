# 0001 — Money is stored as integer cents

**Status:** accepted
**Date:** 2026-08-12

## Context

Amounts are summed across many rows and shown to the cent. JavaScript numbers are binary
floating point and cannot represent most decimal fractions exactly: `0.1 + 0.2` evaluates
to `0.30000000000000004`. Across a month of transactions that error accumulates into totals
that are off by a cent.

## Decision

Amounts are stored as whole cents in an integer (`1250`), never as a decimal (`12.50`).
The conversion happens at the edges: `parseAmountToCents` when reading input,
`formatCentsAsEuro` when writing output.

## Consequences

Integer arithmetic has no rounding failure mode. A total is exact however many rows it spans.

Every value crossing between interface and storage has to be converted. A raw `amount_cents`
rendered by mistake reads as a hundredfold amount. `app/utils/money.ts` is the only place where
the factor 100 appears.
