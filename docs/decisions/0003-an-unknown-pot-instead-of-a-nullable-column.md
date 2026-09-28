# 0003 — An unknown pot instead of a nullable column

**Status:** accepted
**Date:** 2026-08-12

## Context

Which pot the money came out of is easy to answer while paying and often impossible two weeks
later. Entries are frequently made late, so a required field would be answered by guessing. Once
stored, a guessed pot is indistinguishable from a known one, and the percentage view would
quietly include invented attributions.

A transaction entered quickly with an unknown pot is worth more than one that never gets entered
because something stood in the way.

## Decision

An *unknown* pot exists as an ordinary row in the account table, and it is what the transaction
form pre-selects. The column is not nullable.

## Consequences

Every aggregate query keeps the same shape. The unknown share appears in the breakdown on its
own rather than being silently dropped.

A breakdown that is thirty percent unknown states something true. The same breakdown assembled
from forced guesses looks just as convincing and is wrong.
