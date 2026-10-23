# 0047 — After a delete the focus moves to the new-entry button

**Status:** accepted
**Date:** 2026-10-23

## Context

When the dialog closes, the framework returns the focus to the element that had it before. After a
delete that element is the row of the deleted transaction, which no longer exists. The focus falls
back to the page itself, and someone using the keyboard starts again from the top.

The button for a new entry always exists and sits at the top of the page.

## Decision

The dialog emits `deleted` after removing a transaction. The page answers by moving the focus to
its button for a new entry.

## Consequences

The focus lands on an element that exists, at once and without another key press. The next `Tab`
leads into the list.

The page decides where focus goes on its own page. The dialog knows nothing of the page's markup,
in the same way a row only reports a selection.

The place in the list is lost. Returning to a neighbouring row would keep it, but the dialog does
not know which row follows.

There is no message confirming the delete. The dialog's notice lives inside the dialog and closes
with it, and a notice on page level would be new code. The vanished row shows the result. A screen
reader announces nothing about it, which is accepted.
