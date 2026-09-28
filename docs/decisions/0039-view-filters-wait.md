# 0039 — View filters wait

**Status:** accepted
**Date:** 2026-09-14

## Context

A list of transactions wants filtering by month, by pot, by person. Elsewhere in this project
structure has deliberately been built ahead of need: routing, and the asynchronous shape of the
loaders.

## Decision

View filters are not built now. The rule that decides both cases: build ahead only where
retrofitting is expensive.

## Consequences

For the composables retrofitting would have been expensive, because every call site would have
changed. For filters it is cheap. Filtering sits on the page, before the list receives its data.
The list and the row do not change at all.

The known price is that after a year the list holds roughly three hundred entries and has to be
scrolled. In the first months of real use it stays short enough.

The place for filtering later is the step that brings evaluations, where a time range belongs
anyway.
