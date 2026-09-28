# 0017 — Live changes propagate without a reload

**Status:** proposed
**Date:** 2026-08-21

## Context

Two people keep this ledger from different devices. A change one of them makes has to appear on
the other's screen without a manual reload, or the two views disagree until somebody presses
refresh.

## Decision

Live mode subscribes to Postgres changes over Supabase Realtime. The database pushes every
insert, update and delete to the connected clients, and the row-level security policies govern
what each client may receive. Demo mode has no subscription: there is no database, and its writes
are visible immediately because they never leave the browser.

Two cases are deliberately left unsolved. When two people edit the same transaction in the same
instant, the last write wins. When both enter the same purchase independently, two genuine rows
result and both remain; they differ in author, id and usually in note or amount, so no technical
check can tell them apart. Realtime makes that duplicate visible while deleting one of the two is
still cheap.

## Consequences

A subscription turns the client into a second writer into the same list. A transaction the user
creates arrives twice, once from the call that created it and once as an echo. Whatever puts a
row into the list must therefore insert by id, replacing an entry already present rather than
appending.

That insertion is built together with the subscription, not before it. Demo mode has no second
writer and client-generated ids do not collide, so no test can reach the branch. Until then the
list appends and re-sorts.
