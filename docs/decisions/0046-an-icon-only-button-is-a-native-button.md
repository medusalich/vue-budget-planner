# 0046 — An icon-only button is a native button

**Status:** accepted
**Date:** 2026-10-23

## Context

The control to delete is an icon without text. The framework's button component can show an icon
alone, but it brings a hover surface, a ripple on click, and the rounded corners set as default for
every button. None of these were wanted here.

The ripple can be switched off by a property. The hover surface can only be removed with own CSS
aimed at the component's internals, which a framework update may change.

An icon with a click handler was also considered. The framework then gives it the role of a button
and a tab stop, but no handling for `Enter` or the space bar. It cannot be used from the keyboard.

## Decision

An icon-only control is the component `IconButton`: a native `<button type="button">` holding an
icon. The icon, a label and an optional colour come in as props. The focus ring and a slight
enlargement on hover and focus are defined in the component itself.

## Consequences

The browser supplies `Enter`, the space bar and the tab stop. Nothing has to be switched off.

The label is a required prop. It is the only thing a screen reader can announce for an icon, and a
missing one is a type error.

The button is the single root element, so an `id` or a click listener given to `IconButton` lands
on the button without being declared.

The component needs own CSS, an exception under
[0032](0032-appearance-comes-from-props.md): no property or utility class draws a focus ring or
scales an element. The ring takes its colour from a theme variable, so a dark theme follows it.

The ring is drawn at full strength, unlike the faint ring of a list row. A row also darkens its
background on focus. For the icon the ring is the only sign of focus, and a faint one would miss
the contrast [0031](0031-accessibility-targets-wcag-2-2-level-aa.md) requires.

The rounding comes from a utility class, not from the button defaults, which apply to framework
components only. A smaller radius than the rest of the app is used, because the same radius on an
element this small looks almost round.

Framework buttons show focus as a surface, icon buttons as a ring. The two are not the same.

The props describe content, not variants. Props for size, style or rounding would rebuild the
framework's button, which is what this component avoids.

A global focus rule for every native button is rejected. Every framework button is a native
`<button>` as well, and would get the ring on top of its own focus surface.
