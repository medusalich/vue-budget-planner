# 0053 — A month is a `YYYY-MM` string

**Status:** accepted
**Date:** 2026-11-20

## Context

Since [0051](0051-the-list-shows-one-month-at-a-time.md) the page holds a month. A transaction
carries its day in `booked_on` as a string `YYYY-MM-DD`. The month is the first seven characters
of that string.

A month could also be two numbers, a year and a month, or a JavaScript `Date`. A `Date` carries a
time and a time zone. Near midnight the same moment falls on different days in different zones.

The month picker of the framework takes the year and the month as numbers. It counts the months
from 0, so October is 9.

## Decision

In the code a month is a string such as `'2026-10'`. On screen it always reads "Oktober 2026".

The page holds the month in a `ref`. Every conversion of the string is a plain function in
`app/utils/bookingMonth.ts`, with tests.

## Consequences

Whether a transaction belongs to a month is a text comparison. The check includes the hyphen after
the month, so `'2026-1'` can not match October.

Two months compare as text, because the month always has two digits. `'2026-09' < '2026-10'` holds.
Locking every month after the current one needs no arithmetic.

No `Date` is involved, and with it no time zone. A transaction entered at a quarter past midnight
lands in the month its date says.

Each step to or from the string needs its own function: to the German name, to the picker's
numbers and back, and one month back or forward with the turn of the year. The count from 0 stays
inside the picker functions and nowhere else.

The month names come from a fixed German list, not from `Intl`, which would need a `Date`. A second
language would need a second list.

Every function assumes the strict format with leading zeros. A date written as `'2026-7-1'` would
give a wrong month without an error.
