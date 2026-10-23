# 0048 — Enter in a field saves the form

**Status:** accepted
**Date:** 2026-10-23

## Context

The transaction dialog is a form with a submit button. The browser submits such a form when `Enter`
is pressed in a single-line text field. This applies to every field, the note included.

The note is the last field of the form. A press of `Enter` there can save before the note is
finished.

Two ways to stop it were open. `Enter` could be intercepted in the note field alone, or the note
could become a multi-line field, where `Enter` starts a new line.

## Decision

`Enter` in any field submits the form, as the browser provides it. Nothing intercepts it.

## Consequences

Someone using the keyboard saves from the field they are in, without tabbing to the button. Most
forms on the web behave this way, so it is what keyboard users expect.

An incomplete form is not saved. The validation stops it, as it stops a click on the button.

A complete form can be saved earlier than intended. Saving an edit returns to the transaction, see
[0042](0042-saving-an-edit-returns-to-the-transaction.md), where it can be opened for editing
again.

All fields behave alike. A note field that ignored `Enter` would be the single exception in the
form. A multi-line note would invite line breaks into a text of at most sixty characters.
