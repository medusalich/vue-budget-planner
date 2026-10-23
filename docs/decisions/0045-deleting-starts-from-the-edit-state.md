# 0045 — Deleting starts from the edit state

**Status:** accepted
**Date:** 2026-10-23

## Context

[0037](0037-deleting-lives-only-in-the-dialog.md) puts deleting into the dialog, behind a
confirmation. It left open which state of the dialog offers it and where the control sits.

Two states were candidates: viewing a transaction and editing it. Three places were considered for
the control: the title bar, the left end of the button row, and a text button of its own below the
form.

## Decision

The control to delete sits in the edit state, as an icon in the title bar, to the right of the
title. It opens a fifth state of the dialog, `confirmDelete`.

The question shows the transaction as it is stored, says that deleting cannot be undone, and offers
keeping first and deleting second. The focus starts on keeping. `Escape` and a click outside go
back to the form, as in [0044](0044-escape-and-a-click-outside-go-back-one-step.md).

## Consequences

Everything that changes a transaction is in one place. Viewing stays viewing only. Deleting costs
one click more than a button in the viewing state would.

A new entry has no delete control, because there is nothing stored to delete.

Who may delete follows who may edit, because the edit state is only reachable for one's own
transactions, see [0041](0041-someone-elses-transaction-shows-no-edit-button.md).

The icon is the first tab stop of the form, because the title bar comes before the fields. That is
accepted: the icon deletes nothing, it only opens the question.

The question shows the stored values, not the form input. The stored transaction is what gets
removed. Unsaved changes in the form are lost with it.

Keeping returns to the form with its input unchanged and puts the focus back on the icon.

The left end of the button row is rejected, because it would shift the arrangement that the new
entry and the edit state share. A text button below the form is rejected, because it costs height
on a narrow screen.
