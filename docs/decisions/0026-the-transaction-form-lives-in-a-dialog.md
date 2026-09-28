# 0026 — The transaction form lives in a dialog

**Status:** accepted
**Date:** 2026-09-07

## Context

One screen holds the list, the entry form and editing, and one form serves both new entries and
edits. Where that form sits was still open.

The deciding case is editing, not entering. With a fixed form above the list, editing a row sends
the reader to the top of the screen. They lose their place, and after saving it is unclear where
the row went, because the list re-sorts by booking date.

## Decision

The form lives in a dialog. The button opens it empty, tapping a row opens it filled.

## Consequences

A dialog appears where the reader is looking and hands the context back when it closes.

The price is one more click per entry.

Inline editing, where the row itself becomes the form, is rejected. It would be a second entry
surface with its own validation, the same rule set in two places. Only some rows are editable, so
the behaviour of the list would change from row to row.
