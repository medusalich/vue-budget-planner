# 0056 — The view follows a saved transaction into its month

**Status:** accepted
**Date:** 2026-11-20

## Context

Since [0051](0051-the-list-shows-one-month-at-a-time.md) the page shows one month. A transaction
saved with a date in another month disappears from the list behind the dialog. That happens when
last month's receipts are entered in the new month, and when the date of an existing transaction
is corrected.

The dialog stays open after saving. A new entry clears the form for the next one. An edit returns
to the transaction, as [0042](0042-saving-an-edit-returns-to-the-transaction.md) decides.

Three answers were open. The view stays and a notice names the month. The view stays and the notice
offers a button to go there. The view switches to the month and the notice says so.

## Decision

After saving, new or edited, the view switches to the month of the transaction. The dialog's notice
names that month whenever it differs from the one shown before.

A new entry in the month already shown keeps the plain confirmation. An edit within the same month
shows no notice, as before.

The notice disappears as soon as the dialog changes its state.

## Consequences

The saved transaction always stands in the list behind the dialog. Where it landed is visible at
once, and 0042 stays true.

The switch happens behind the dialog. A screen reader learns of it only through the notice, which
is why it names the month. As the result of a deliberate action it does not break WCAG 3.2.2.

Whoever moves a date out of a month while checking it against a bank statement has to step back
once.

A button in the notice was rejected. Whether the keyboard reaches it before the notice disappears
was open.

In the viewing state the notice briefly covers part of the transaction. This is accepted.
