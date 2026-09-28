# 0030 — Four device sizes, not mobile-first

**Status:** accepted
**Date:** 2026-09-07

## Context

Entries are made on a phone, a tablet, a laptop and a desktop. "Mobile-first" describes a design
order, and taken as a design target it would treat the three larger sizes as afterthoughts when
all four are used daily.

## Decision

All four sizes are first-class. Concretely:

The dialog is only full-screen on narrow widths. From tablet width it is centred with a maximum
width.

Touch targets stay large everywhere, desktop included. A large target does not hurt a mouse, and
maintaining two sizes costs more than it returns.

The order of fields in the form is the same on every device. Only the number of columns changes,
one when narrow and two when wide.

## Consequences

A changing field order would cost the habit, and it is the same two people moving between four
devices.

The numeric keyboard hint on the amount field does nothing on a desktop and harms nothing.

The framework's display helper is the tool for the width branch. It has no name collision with
the framework underneath, unlike one other composable of the same name.
