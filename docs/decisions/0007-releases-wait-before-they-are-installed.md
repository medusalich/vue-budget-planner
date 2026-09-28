# 0007 — Releases wait before they are installed

**Status:** accepted
**Date:** 2026-08-12

## Context

A compromised package version is typically detected and withdrawn within hours of publication.
The exposure window is short and it sits right at the start of a version's life.

## Decision

Versions published less than fourteen days ago are not installed. The rule is a number in the
workspace configuration, not a judgement about individual packages.

## Consequences

The window is removed without anyone having to assess a package they have no way of assessing.

Genuine security patches also arrive late. When a fix has to be taken early, the cooldown is
bypassed as a conscious one-off rather than lowered permanently.

A compromise that stays undetected beyond the cooldown passes through, and a package poisoned
long ago is unaffected. The rule does not eliminate risk.
