# 0035 — A row shows four things

**Status:** accepted
**Date:** 2026-09-11

## Context

The list is read by scanning. Everything in a row competes for the same width, and on a phone
that width is small.

The guiding sentence: the list shows what is needed, the dialog shows everything.

## Decision

A row carries four things: the category as icon **and** name, the amount **with its sign**, the
booking date, and the note. The note appears only when it is filled.

Not in the row: which pot the money came from, who entered it, and when it was entered.

## Consequences

The icon makes the list scannable and the name makes it unambiguous. An icon alone is silent to a
screen reader.

The sign carries the direction, which is what makes the list readable without colour vision. See
[0031](0031-accessibility-targets-wcag-2-2-level-aa.md).

The note is often the only thing by which a transaction is recognised again.

Rows therefore differ in height. A strip kept permanently free would cost space in every row so
that the occasional filled one looks calm.
