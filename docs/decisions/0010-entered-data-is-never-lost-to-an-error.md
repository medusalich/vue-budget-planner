# 0010 — Entered data is never lost to an error

**Status:** accepted
**Date:** 2026-08-12

## Context

A form that clears itself when the save button is pressed loses everything the user typed if the
save then fails. The moment of failure is the moment that data is hardest to reproduce.

A date in the past needs no justification either. Entries are regularly made days late, and that
is ordinary use.

## Decision

The form is cleared only after a write is confirmed, never before.

## Consequences

A failed save leaves the user where they were, with a message and a populated form.
