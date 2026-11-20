# 0051 — The list shows one month at a time

**Status:** accepted
**Date:** 2026-11-20

Supersedes [0039](0039-view-filters-wait.md).

## Context

0039 put off filtering the list by month, by pot and by person. It named the step that brings
evaluations as the place for them, because a time range belongs there anyway.

That step has begun with the totals of a month: income, expenses and balance. Totals over every
transaction ever entered answer no question a household asks. They need a month, and so does the
list beneath them, or the two describe different things.

A transaction can not be booked on a future day. A month after the current one is always empty.

## Decision

The page shows one calendar month, list and totals alike. It opens on the current month.

Arrows step one month back or forward. A menu on the month name picks month and year. A button
returns to the current month. No control reaches a month after the current one.

The month is not part of the address. Filters by pot and by person still wait.

## Consequences

The totals and the list always describe the same month. They are computed from the same filtered
transactions.

The list stays short, a month of entries instead of a year's.

At the start of a month the current month is nearly empty. Whoever enters last month's receipts
steps back once first. This is accepted.

Reloading the page, a bookmark and the browser's back button all return to the current month. A
month in the address would have kept it. The arrows and the menu are judged enough.

An empty month is not an empty app. The list tells the two apart: one message names the month,
the other is kept for the first use, when nothing has been entered at all.

The reasoning of 0039 still holds for pot and person. Filtering sits on the page, so adding them
later changes neither the list nor the row.
