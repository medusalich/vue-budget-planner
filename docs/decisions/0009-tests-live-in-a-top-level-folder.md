# 0009 — Tests live in a top-level folder

**Status:** accepted
**Date:** 2026-08-12

## Context

Placing a test beside the code it tests is a common arrangement. It does not work here.

## Decision

Tests live in a top-level `tests/`, never next to their subject.

## Consequences

The framework scans the composables folder for auto-imports. A test file sitting there would be
picked up as application code, and the failure would appear somewhere other than where it was
caused.
