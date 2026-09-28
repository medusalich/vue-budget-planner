# 0016 — Money moving inside the household is not recorded

**Status:** accepted
**Date:** 2026-08-20

## Context

Withdrawing cash moves money from one pot into another. It does not spend it. Recording both the
withdrawal and the purchase made from it afterwards counts the same money twice.

Saving is the same movement. A hundred euros paid into a savings account has not been spent, but
booked as an expense it would stand beside groceries as though both were consumption, and shrink
every other share in the breakdown.

## Decision

Only money leaving the household is recorded, never money moving inside it. The model has no
transfer concept at all. A savings account is an ordinary pot, and the payment into it is not a
transaction.

Interest is the same rule read forwards. The bank pays money that was not the household's before,
so it is ordinary income whose pot is the savings account.

## Consequences

The application cannot say how much is in a pot. After years of unrecorded transfers it has never
seen a single one of them.

Balances would need an opening balance per pot and every transfer recorded, and those are one
feature rather than two: a second row type excluded from every aggregate, plus reconciliation
against the real account.

The savings rate stays visible without any of it. It is income minus expenses for the period, a
figure computed rather than a row anybody types.

Should the real accounts ever be linked, the statement will contain every movement, including the
ones this record excludes. What happens to them is then its own decision.
