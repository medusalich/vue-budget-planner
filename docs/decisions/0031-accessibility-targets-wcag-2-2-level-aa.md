# 0031 — Accessibility targets WCAG 2.2 Level AA

**Status:** accepted
**Date:** 2026-09-07

## Context

Level AA is the reference in European legislation. AAA is not a sensible target for a household
ledger, and A is too little.

The framework brings a good deal by itself: labels bound to fields, a dialog that traps focus,
returns it to the button that opened it and closes on `Escape`. That is checked rather than
believed.

## Decision

Level AA, with four places named where this interface can actually fail:

**Icon-only buttons.** An icon has no text, so a screen reader announces only that there is a
button. Any such control needs a label naming its row.

**Feedback after saving.** That the dialog closes and a row appears is visible only to someone
who can see it. It needs a live region, an area whose changes are announced. The same holds for
an error message.

**Colour is never the only channel.** Green for income and red for an expense are identical to a
red-green colour-blind reader. The sign and the icon carry the direction; colour reinforces it.

**The semantics of the list.** The markup has to match what the data is, which is why the list
has only one appearance. See [0038](0038-the-list-has-one-appearance.md).

## Consequences

Accessibility lives almost entirely in markup, which is what
[0024](0024-logic-leaves-the-component.md) leaves untested.

Two checks are used instead, neither of which costs a dependency. The browser's built-in audit
finds the machine-detectable part, which is a part and not all of it. And a keyboard run is an
acceptance criterion rather than a good intention: put the mouse away and play the whole route
through with `Tab`, `Enter` and `Escape` — enter, edit, delete. What cannot be reached that way
is not operable.
