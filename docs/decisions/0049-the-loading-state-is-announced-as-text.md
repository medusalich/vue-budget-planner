# 0049 — The loading state is announced as text

**Status:** accepted
**Date:** 2026-10-23

## Context

[0040](0040-the-special-states-come-from-the-framework.md) chose a progress indicator for the
loading state and left one question open: a spinner is visible but silent.

The framework's spinner carries `role="progressbar"` without a name. An automated accessibility
check reports a progress bar without a name as a failure.

## Decision

While the list loads, a spinner stands above the text "Buchungen werden geladen". Both sit centred
in a container with `role="status"`, in the place where the list appears. The spinner is hidden
from screen readers.

## Consequences

A screen reader announces the text on its own, without anyone navigating to it. The spinner adds
nothing a screen reader could say, so hiding it removes the nameless progress bar.

Sighted users see the same words as screen reader users hear.

Loading, empty and filled states appear in the same place. The loading state is centred like the
empty state, so nothing jumps across the page when the data arrives. The list itself still pushes
the content below it down.

A container with `role="status"` is rendered together with its text. Some screen readers announce
a live region reliably only when it already exists before its content changes. The text is
accepted as it is until a test with a screen reader shows otherwise.
