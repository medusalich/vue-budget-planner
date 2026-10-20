# 0044 — Escape and a click outside go back one step

**Status:** accepted
**Date:** 2026-10-20

## Context

The dialog can be left without a button in two ways: the `Escape` key and a click outside it. In
the form both mean closing, which leads to the discard question when input would be lost, see
[0043](0043-the-discard-question-compares-entered-text.md).

Inside the discard question their meaning was open. A click outside there was considered for
three meanings: back to the form, nothing, or discard and close.

## Decision

`Escape` and a click outside both go back one step. From the form that is towards closing. From
the discard question it is back to the form, in the state the question was asked from, new or
edit.

## Consequences

Both ways of leaving mean the same thing everywhere in the dialog, and a stray click loses
nothing.

The question remembers the state it was asked from. Returning to a fixed state would turn an edit
into a new entry, and saving would then create a second transaction.

Each switch puts the focus on a button inside the dialog: in the question on continuing to edit,
back in the form on closing. A repeated `Enter` therefore never discards. It also keeps one
`Escape` from being handled twice, because the framework listens for it both on the dialog and on
the window, and the second listener only answers while the focus is outside the dialog.

A click outside that does nothing is rejected, because it looks broken. Discarding on a click
outside is rejected, because a stray click would delete input.
