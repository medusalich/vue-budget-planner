# 0027 — Categories and accounts are reached through composables

**Status:** accepted
**Date:** 2026-09-07

## Context

Every component that displays a category needs the category list. The direct route is to import
the data file.

That import would name a file marked as demo data, in every row of the list and every select
field. Each of those places would have to be found again when a real database arrives.

## Decision

Categories, accounts and profiles are reached through composables built like the transaction one,
with their state in module scope so all callers share it.

Their loaders are asynchronous, with a loading flag and an error, even though the data sits in an
imported constant today.

The page starts all three loads and shows one loading state, not three spinners disappearing one
after another.

## Consequences

The switch to a real source touches the composables and nothing else.

Synchronous data is used differently from asynchronous data, so converting the signature later
would mean touching every call site. The mistake would not show at compile time. It would show as
an empty select field the first time someone opens it. That is what makes retrofitting expensive
here, which is the rule named in [0039](0039-view-filters-wait.md).
