# 0011 — Category ids are chosen, never derived from the name

**Status:** accepted
**Date:** 2026-08-20

## Context

A slug generated from the entered name is tempting. Names are editable, though: one member
corrects the other's typo. An identifier derived from editable data has only bad options when the
name changes. It moves with the name and orphans every transaction pointing at the old id, or it
stays and silently contradicts the name it claims to describe.

## Decision

Seeded category ids are chosen by hand, not computed from the name. Nothing recomputes them, and
`name` above them is free to change. Categories created later carry a database-generated id, so
the column holds both kinds.

## Consequences

The mixed id shapes are harmless here because no source code ever names a category by id. Where
source code does have to name one specific row, a different rule applies. See
[0014](0014-account-ids-are-stable-slugs-not-uuids.md).
