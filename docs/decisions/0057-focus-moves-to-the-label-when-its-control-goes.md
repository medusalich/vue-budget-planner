# 0057 — Focus moves to the label when its control goes

**Status:** accepted
**Date:** 2026-11-20

## Context

A disabled button can not hold the focus. When a button is disabled while it has the focus, the
focus falls back to the page itself. The same happens when a focused element is removed.
[0047](0047-after-a-delete-the-focus-moves-to-the-new-entry-button.md) met this after a delete.

The month row and its menu have four such moments. The arrow forward is disabled on reaching the
current month. The button for the current month is disabled once it has been used. A month picked
in the menu disappears with the menu. The menu's arrow to the next year is disabled on reaching
the current year.

Other targets were the neighbouring arrow, or keeping the button reachable with `aria-disabled`
instead of disabling it.

## Decision

Before a focused control is disabled or removed, the focus moves to the label that control changes.
In the row that is the month name. In the menu it is the year.

## Consequences

Someone using the keyboard stays where they were working. The next `Tab` continues from there.

A screen reader reads the new month or year at the place the focus lands.

The neighbouring arrow would have held the focus, but a screen reader would announce "previous
month" there instead of the new month. The framework does not set `aria-disabled` itself, and
blocking the click would be code of our own.

The month name is a button, so the focus is visible on it and `Enter` opens the menu again. The
year is plain text. It takes the focus only from the script and is not a stop for `Tab`.

The month name is found by its id. The menu passes a template ref of its own to the button that
opens it, and that ref replaces any other set on the button.

Every new control that can be disabled under the focus needs the same step, and no test notices
when it is missing.
