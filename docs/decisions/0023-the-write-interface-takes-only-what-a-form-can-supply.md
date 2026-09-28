# 0023 — The write interface takes only what a form can supply

**Status:** accepted
**Date:** 2026-08-27

## Context

Three of a transaction's fields are never entered by anyone. `id` identifies the row,
`created_by` records who typed it, `created_at` when. All three are answered by the system that
stores the row, and none of them is a question a form may ask.

## Decision

`NewTransaction` is derived as `Omit<Transaction, 'id' | 'created_by' | 'created_at'>`, not
written out a second time. The write functions are shaped around it: one takes a
`NewTransaction`, one takes an id and a `Partial<NewTransaction>`, one takes an id.

The id of the row being changed stays a separate parameter rather than a field inside the
payload.

## Consequences

A column added to `Transaction` reaches both write functions on its own, and a field list that
exists only once cannot fall out of step with the table.

Identity is not editable. A payload that could carry an `id` would let a caller rewrite which row
it is addressing halfway through the call.

`created_by` and `created_at` stay out of the update payload for a second reason beyond being
system-supplied. They are history. Who entered a row and when does not change because the amount
was corrected afterwards.
