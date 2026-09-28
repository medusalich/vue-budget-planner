# 0005 — Demo data mirrors the schema

**Status:** accepted
**Date:** 2026-08-12

## Context

The demo implementation and the live implementation return the same shapes to the same callers.
Differing field names would force a translation layer, and a translation layer is where the two
modes drift apart.

## Decision

Demo data carries identical field names and types to the eventual tables, `snake_case` included.
That runs against the JavaScript convention and is accepted for it.

Domain types live in `app/types/`, never in a data file, so that the live implementation can
describe the same shapes without importing them from a file named after the demo.

## Consequences

Neither implementation needs a translation layer, which is what keeps the later migration small.

The naming rule elsewhere in the project has to carve out an exception for these fields. They are
`snake_case` because they are column names of the database, not variables of ours.
