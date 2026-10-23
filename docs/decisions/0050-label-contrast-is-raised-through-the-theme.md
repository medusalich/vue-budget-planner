# 0050 — Label contrast is raised through the theme

**Status:** accepted
**Date:** 2026-10-23

## Context

[0031](0031-accessibility-targets-wcag-2-2-level-aa.md) sets the target at WCAG 2.2 Level AA. Normal
text needs a contrast of at least 4.5:1.

The framework draws labels with two opacities on top of each other: a text colour at 87 % and an
element opacity of 60 %. Together they give about 52 % black. That is about 4.3:1 on white and
about 4.2:1 on the grey background of a field. An automated check reported every label in the
transaction dialog.

The 60 % is a theme variable of the framework, `medium-emphasis-opacity`. A style rule on the label
class would reach the same result.

## Decision

The light theme sets `medium-emphasis-opacity` to 0.7 in `nuxt.config.ts`. Labels then reach about
5.9:1 on white and 5.8:1 inside a field.

## Consequences

One value in the configuration fixes every label. No style rule depends on the framework's class
names, which may change in an update.

Everything else that uses the variable becomes darker as well. Text marked as medium emphasis rises
from about 5.7:1 to about 8.5:1. The difference between secondary and primary text shrinks, and
that is accepted.

The value holds for the light theme only. A dark theme would need its own check.
