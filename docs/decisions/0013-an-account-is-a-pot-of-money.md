# 0013 — An account is a pot of money

**Status:** accepted
**Date:** 2026-08-20

## Context

The household needs to see how spending divides between its members. Cash and current accounts
both hold money that gets spent, and treating cash as a special case outside the account table
would put that distinction into every query that touches it.

Pooling cash into one shared pot would save a row and lose exactly the figure the field exists
to produce.

## Decision

An account is a pot of money, not necessarily a bank account. A wallet holding cash is a pot in
exactly the same sense as a current account. Cash is one pot per member.

Each pot carries an `owner_id` referencing the member it belongs to, or `null` where it belongs
to no single member.

## Consequences

Each member owns two pots, a current account and their cash, and the per-member figure has to
merge them. `owner_id` states that fact once, as a reference. Grouping by name instead would make
string matching into business logic and break on the first rename.

The `null` here records knowledge rather than ignorance: this pot belongs to no single member.
That distinction is why a nullable column is rejected in
[0003](0003-an-unknown-pot-instead-of-a-nullable-column.md).
