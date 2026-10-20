# 0042 — Saving an edit returns to the transaction

**Status:** accepted
**Date:** 2026-10-20

## Context

After a new transaction is saved, the dialog clears its fields, stays open, confirms the save and
puts the focus back on the first field. That serves entering several transactions in a row.

Editing is a different task. It corrects one transaction that already exists, and there is no next
one to continue with. Two ends were considered: back to the viewing state of the same
transaction, or closing the dialog.

## Decision

Saving an edit returns the dialog to the viewing state of the transaction, which now shows the
saved values.

## Consequences

The result of a correction is visible at once and can be checked where it was made. The list
behind the dialog shows it as well.

Closing takes one more click than it would have.

The form fields are cleared on the way back. Otherwise the next new entry would open filled with
the values of the transaction just edited.
