# 0004 — `created_by` is a security field, not who paid

**Status:** accepted
**Date:** 2026-08-12

## Context

A transaction records who typed it. That looks like an answer to *who spent this*, and it is not
one: one member routinely enters a purchase the other made.

## Decision

`created_by` is the column the database compares against the authenticated user to decide whether
a write is allowed. Nothing in the subject matter is read from it.

The question of whose spending it was is answered by the pot the money came out of.

## Consequences

An evaluation built on `created_by` would measure diligence at data entry rather than spending.
The two fields disagree often enough for that to matter.

The permission rule is written against `created_by`, so no caller may set it. See
[0023](0023-the-write-interface-takes-only-what-a-form-can-supply.md).
