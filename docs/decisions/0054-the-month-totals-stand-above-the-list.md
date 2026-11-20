# 0054 — The month totals stand above the list

**Status:** accepted
**Date:** 2026-11-20

## Context

The page shows the income, the expenses and the balance of the displayed month. They can stand
below the list, like the sum under the lines of a cash book, or above it, as an overview before the
details.

Below suits someone looking for a single entry. Above suits someone asking how the month stands.

On a phone 360 pixels wide, three boxes side by side leave about 105 pixels each. An amount such
as `−12.480,00 €` does not fit and breaks onto a second line.

## Decision

The three totals stand above the list. From the framework's `sm` width of 600 pixels they are
three boxes side by side. Below it they are three rows, the label on the left and the amount on the
right.

Expenses carry a minus, as in the list. A negative balance carries its minus and turns red as well,
through the theme colour `error`.

## Consequences

The page answers how the month stands before anything else. Whoever looks for one entry scrolls
past three lines first.

On a phone the amounts line up on the right, one beneath the other. Income minus expenses equals
the balance, readable from top to bottom.

Colour is never the only sign, as 0031 asks. The minus is always there. The red was checked
against the box's background by an automated contrast check. Coming from the theme, it follows a
dark theme added later.

An empty month shows three times `0,00 €`. That is a correct answer, not a missing value, and the
page keeps the same shape in every month. A total of zero never shows a minus.

The three boxes have the same width whatever their amounts.

Label and amount form a pair in a description list, which a screen reader reads together. The
boxes are plain sheets. A card would put elements of its own inside the list, where only the pair
is allowed.
