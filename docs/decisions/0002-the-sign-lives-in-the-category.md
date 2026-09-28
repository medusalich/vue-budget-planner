# 0002 — The sign lives in the category, not in the amount

**Status:** accepted
**Date:** 2026-08-12

## Context

A transaction carries an amount and a direction. The direction can live in the amount, as a
negative number for an expense, or it can follow from the category the transaction belongs to.

Storing it twice has to be avoided. A positive amount in an expense category would be a state
that means nothing, and no constraint in the schema could prevent it. Once such a row exists,
neither of the two fields can be trusted over the other.

## Decision

`amount_cents` is always positive. Whether a transaction adds to or subtracts from the balance
follows from the category, whose type is `income` or `expense`.

The income/expense switch in the transaction form decides which categories are offered. It is
form state and is never stored. Only `category_id` is written.

## Consequences

No row can contradict itself. A minus sign is neither typed nor stored. It appears only when an
amount is rendered.

Every calculation that sums transactions has to resolve the category to learn the direction.

`parseAmountToCents` rejects negative input, because a negative amount does not exist here.
`formatCentsAsEuro` still handles negative numbers, because a balance can be negative when no
single amount ever is.
