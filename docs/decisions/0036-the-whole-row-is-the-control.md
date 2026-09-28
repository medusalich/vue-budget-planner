# 0036 — The whole row is the control

**Status:** accepted
**Date:** 2026-09-14

## Context

A transaction has more fields than a row shows, so there has to be a way to see the rest. Three
arrangements were considered: expand the row in place, put everything in the row, or open the
dialog that already exists.

## Decision

Tapping anywhere on the row opens the dialog. The row carries no buttons of its own.

The dialog gains a third state beside new and edit: viewing, with read-only fields and no save
button. Whether editing is allowed is answered by the permission function from
[0033](0033-who-is-signed-in-is-its-own-composable.md).

## Consequences

One tab stop per row instead of three, and the minimum touch target is met by the row itself
rather than by sizing a small button.

The dialog stays the single place where all fields of a transaction appear. No third layout
beside the list and the form.

The price is that the dialog covers the list, which expanding in place would not have done. The
framework returns focus to the row it came from when the dialog closes.

The dialog shows a member's name rather than an id, so profiles have to be loadable too.
