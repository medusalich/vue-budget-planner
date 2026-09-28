# 0029 — Named accessors instead of a general filter

**Status:** accepted
**Date:** 2026-09-07

## Context

An archived category may no longer be chosen, but it has to keep appearing on the transactions
that already use it. One filtered list cannot do both.

The obvious general solution is a filter function taking a predicate.

## Decision

Each composable exposes named accessors rather than a general filter: the raw list, a lookup by
id that finds archived entries too, and a list of what may be selected right now.

Where the answer depends on an argument the accessor is a function. Where it does not, it is a
derived value, so it is only recomputed when its source changes.

## Consequences

A general filter is rejected twice over. It already exists, because the language filters arrays,
so a wrapper only passes the call along. And it moves the rule into the caller, into every
component that needs it, so a change to the rule has to be found in all of them.

Two different things are called filtering, and only one of them is this: a rule, which always
applies and is not the user's choice, against a view filter, which is. View filters work on
transactions rather than categories. See [0039](0039-view-filters-wait.md).

Left open deliberately: whether *selectable* should also filter by owner, so that one member
cannot book from the other's cash. That needs the signed-in member's id, and it is a question
about the household rather than about code, better answered at a finished dialog than on paper.
Retrofitting costs one composable, its tests and one call site.
