# 0025 — Routing is introduced before it is needed

**Status:** accepted
**Date:** 2026-09-07

## Context

With a single screen, file-based routing buys nothing today. Introducing it later, when a second
screen arrives, means touching every component and producing a large move commit in which the
actual work disappears.

## Decision

The root component becomes a shell and the booking screen becomes a real page. Routing is in
place before there is a second page to route to.

Only pages that have content are created. No empty sign-in page, no dashboard placeholder: the
structure is prepared, the files are not.

## Consequences

The later move never happens.

Explicitly outside this step: the sign-in page and a mode switch, both of which only make sense
once there is something to sign in to, and a navigation bar, which has nothing to navigate while
there is one page.

The cost is a directory and an indirection that earn nothing until the second page exists.
