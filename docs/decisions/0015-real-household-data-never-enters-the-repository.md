# 0015 — Real household data never enters the repository

**Status:** accepted
**Date:** 2026-08-20

## Context

The repository is public. What the household's pots are actually called, the bank and the product
name, is real-world data about the people who use the application, and so is a category that
records something private.

Such a line gets published out of habit rather than intent. If pots are edited in a file,
categories get edited in a file too, and one day the committed line is a private one.

## Decision

Files named `mock*` carry demo data and may not seed anything real. Files named `default*` carry
seed data that is legitimately public: a category called *Lebensmittel* is nobody's secret.

Account labels exist only as demo labels in the repository. The real rows are created once by
hand in the database. Categories are created through the application, and the seed file is frozen
once the database exists. Every further category is added through the interface, where it cannot
reach the repository at all.

## Consequences

Version 1 has no screen for managing pots, so adding or renaming one means editing the table
directly. Accounts change every few years, so that is cheap. The label is an ordinary column, so
a rename screen stays a small addition later rather than a migration.

The naming rule has to be visible in the filename. The distinction is invisible in the content:
both files are arrays of plausible-looking rows.
