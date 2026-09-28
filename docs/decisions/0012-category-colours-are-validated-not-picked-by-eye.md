# 0012 — Category colours are validated, not picked by eye

**Status:** accepted
**Date:** 2026-08-20

## Context

A breakdown by category is read by colour. Colours chosen by taste tend to collapse into each
other for a reader with a colour-vision deficiency, and the failure is invisible to whoever
picked them.

## Decision

Colours come from a categorical palette checked for separation, and the check is mechanical
rather than a judgement. The nine expense hues in use clear the separation floors in light mode:
the worst adjacent pair measures ΔE 15.3 for normal vision and 9.1 simulated. Ten hues do not
clear them and eleven fail badly, which is why the list has the length it has. A new colour is
validated before it is added.

## Consequences

The number of categories that can be distinguished at a glance is bounded by the palette, not by
the data. A chart showing more than that aggregates the remainder.

The two catch-all categories are grey, deliberately outside the palette. A muted bar shows at a
glance how much is still unsorted.

Identity is carried by the icon, not the colour. Nine colours are more than one chart can
separate, and in lists the icon does the recognising. Icon names are verified against the
installed icon font before use, because a mistyped one renders as an empty box and nothing warns.
