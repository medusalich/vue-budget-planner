# 0032 — Appearance comes from props

**Status:** accepted
**Date:** 2026-09-08

## Context

Every visual adjustment can be made in at least three ways: a property of the component, a
utility class the framework ships, or a stylesheet rule of our own.

## Decision

In that order. A property first. A utility class where no property exists. Own CSS only where
neither can do it.

## Consequences

Properties and utility classes know the theme, so a dark mode switched on later follows them
automatically. Own CSS with fixed colour values does not. It would have to be adjusted by hand,
in every place, each of which has to be found first.

The warning sign that the rule has been broken is `!important` used to override the framework. At
that point one is working against it rather than with it, and usually there is a property that
was missed.

Borne out by the tree: the project's stylesheet holds exactly one rule, for figures that line up
in a column, which is precisely the case the framework has no property for.
