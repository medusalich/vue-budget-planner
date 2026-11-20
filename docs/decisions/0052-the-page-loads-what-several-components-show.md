# 0052 — The page loads what several components show

**Status:** accepted
**Date:** 2026-11-20

## Context

Until the month view, each component loaded what it showed. The list loaded its transactions.

The month view adds the totals above the list. Both need the transactions of the same month. Three
shapes were open:

- The page loads and filters once, and hands finished data to the list and the totals.
- The list and the totals each receive the month and filter for themselves.
- A composable derives the month's transactions, and both components call it.

## Decision

The page loads the transactions, filters them to the month and computes the totals. The list and
the totals receive finished data as props and load nothing themselves.

What only one component needs, it still loads itself. The dialog loads the accounts and profiles
for its own fields.

## Consequences

The month filter exists in one place. The list and the totals can not drift apart, which no test
would notice if each filtered on its own.

The page connects rather than computes. It calls the tested functions from `app/utils` inside
`computed`, as 0024 asks.

Speed is unaffected. `computed` caches its result, and a prop passes the array without copying it.

Security is unaffected as well. A filter in the browser is never a boundary. What a member may
see is decided by the database.

A composable stays the way once a second page needs the same derivation. Until then it would hold
state for a single page. Moving the code there later is cheap.

The list and the totals can not be dropped onto another page on their own. That page has to load
and filter first.
