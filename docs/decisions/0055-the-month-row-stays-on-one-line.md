# 0055 — The month row stays on one line

**Status:** accepted
**Date:** 2026-11-20

## Context

One row above the totals holds four controls: the arrow back, the month name, the arrow forward
and a button that returns to the current month. The month name is itself a button. It opens the
menu for picking a month.

At the framework's default sizes the row does not fit a phone. At 360 pixels the month name broke
onto two lines. At 320 pixels the last button reached past the content into the page margin.

Three ways out were open: let the last button wrap onto a second row, show it as an icon instead of
a word, or make the row smaller on narrow screens.

[0030](0030-four-device-sizes-not-mobile-first.md) keeps touch targets large on every device.

The month names differ in width. With each step the arrows to the right of the name moved.

## Decision

The row stays on one line.

Below the framework's `sm` width of 600 pixels the month name uses smaller type, and the button for
the current month uses the small size. The arrows are a step smaller at every width.

The month name has a minimum width: that of the widest name, September with a four-digit year. It
is set in `em`, so one value serves both type sizes.

## Consequences

This row is an exception to 0030. On a phone the button for the current month is 28 pixels high and
the arrows are 40 pixels. Both stay above the 24 pixels WCAG 2.5.8 asks for, and both were tried
with a finger on a phone.

The button's size depends on the screen width, through the framework's display helper. That is the
second size 0030 wanted to avoid maintaining, accepted for one button.

A phone loses no line of the list to a second row.

The arrows and the button stay in place while stepping through the months. A repeated click lands
on the same spot.

Wherever September fits, every month fits. At 320 pixels the row fits with nothing to spare. A
wider label, such as a month name in another language, would break it again.

An icon would have needed an accessible name of its own. The word already is one.
