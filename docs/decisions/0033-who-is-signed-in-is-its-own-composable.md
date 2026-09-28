# 0033 — Who is signed in is its own composable

**Status:** accepted
**Date:** 2026-09-09

## Context

Rows may only be edited by the member who entered them, so the interface has to know who that is.
The cheap route is to hand the id out of the composable that already loads transactions.

## Decision

A composable of its own holds the id of the signed-in member, and the data layer reads it from
there instead of from a module constant of its own.

The permission rule is a plain function taking a transaction and a member id, not component
logic. Editing is allowed only for whoever entered the row, a comparison of one field.

## Consequences

Identity stays out of the data-access layer. Otherwise authentication would later sit in the same
file as the database queries, which is the mixing this project separates everywhere else.

What exists today is a constant behind a function name. No branch, no mode switch. The branch
arrives later in one single place, and the components never knew where the id came from, so they
do not change.

The interface hides exactly what the database will refuse anyway, rather than holding a second
opinion about it.

Two tests cover the rule: whoever entered it may, whoever did not may not. The function is not
reactive, so it carries no `use` prefix. See
[0034](0034-calculation-is-separated-from-input-and-output.md).
