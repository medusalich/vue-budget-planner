# 0037 — Deleting lives only in the dialog

**Status:** proposed
**Date:** 2026-09-14

## Context

Deleting a transaction is irreversible. On a touch device the thumb rests over the list while
scrolling, so anything placed in a row sits directly in the swipe path.

## Decision

There is no delete control in a row. Deleting is reached through the dialog, and it asks for
confirmation before it happens.

The confirmation is the dialog changing its content: a warning, the affected transaction for
checking, the note that it cannot be undone, and exactly two buttons.

## Consequences

Deleting sits one click further away than editing.

A dialog on top of a dialog was excluded from the start. Nested dialogs are awkward about focus:
which one traps it, where `Escape` lands, what a screen reader announces.

A warning panel expanding inside the open dialog is rejected, because two buttons reading
*delete* would then be on screen at once, which is the thing a confirmation exists to prevent.

An undo message after the fact is rejected for a different reason. Restoring a deleted
transaction is trivial in memory and a database question later: create a new row, or mark rows
as deleted. Choosing an undo mechanism now would decide that blind.

The dialog therefore has four states, and needs names for them. It is the place in this step most
likely to become the hardest to follow.
