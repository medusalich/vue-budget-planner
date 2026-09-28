# 0024 — Logic leaves the component

**Status:** accepted
**Date:** 2026-09-07

## Context

This project writes no component tests and no end-to-end tests. The interface is checked in the
browser, by eye.

That answers what something looks like and whether it reacts. It does not answer whether a rule
is right: a wrong rule can look perfectly normal on screen, and interface work then has nothing
to run red and then green against.

## Decision

Everything that decides something moves out of the component file and is tested without
rendering. Components stay presentation: values in, events out.

One question decides what moves: can the answer be right or wrong? A formatted amount can be
wrong, so it moves. A dialog being open is neither right nor wrong, so it stays. Reuse is not
the criterion.

A rule without reactive state becomes a plain function. A rule with reactive state becomes a
composable. Display mechanics stay in the component: a dialog open or closed, a focused row, a
scroll position.

A composable used only once is legitimate. Moving a whole component body into a second file and
naming it after the component is not. If you cannot say in one sentence what the extracted piece
does, it is still the component.

## Consequences

No component-test library is installed. It would be a new dependency, and rendering tests break
on every markup change. It can be installed later, on the day a specific behaviour in the markup
has to be guaranteed.

Nothing verifies that a composable is actually wired into its component. Like the appearance,
that is checked in the browser.
