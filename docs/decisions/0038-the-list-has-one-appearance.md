# 0038 — The list has one appearance

**Status:** accepted
**Date:** 2026-09-14

## Context

The conventional answer to the four device sizes of
[0030](0030-four-device-sizes-not-mobile-first.md) is a table with columns on the wide screens
and cards on the narrow one.

## Decision

One appearance for all widths, and the phone row is the basis. A plain list of ordinary elements
rather than a data table.

Width is limited by a property on the enclosing component rather than by a stylesheet rule.

## Consequences

Four items do not justify a table, and one of the four columns would often be empty.

Two appearances mean two markups, not two stylings. Both have to be correct for assistive
technology and both have to be maintained. A table needs real table markup with column headers,
and the same data as cards is a list, so the semantics would change with the viewport.

A row that is itself a control fits badly into a table row and naturally into a list item, which
is what [0036](0036-the-whole-row-is-the-control.md) requires.

The width limit is a number chosen in the browser rather than on paper. The framework's container
alone is not enough: its built-in limits are meant for page layouts and run far wider than a row
of four items can survive.
