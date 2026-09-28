# 0006 — pnpm runs no lifecycle scripts by default

**Status:** accepted
**Date:** 2026-08-12

## Context

Installing a dependency means executing someone else's code on the development machine. Registry
worms have propagated through package installs in windows measured in hours, so dependency intake
is treated as a design concern rather than an afterthought.

## Decision

The package manager is pnpm, chosen for two defaults. It does not execute the lifecycle scripts
of dependencies. And an unreviewed build script is an installation error rather than a warning:
every package that wants to run one must be answered explicitly, with `true` or `false`.

A denial is as valid an answer as an approval, and is preferred whenever the package proves not
to need its script. Before granting permission, the question to answer is whether the artefact
the script would produce is genuinely missing. Often it is not.

## Consequences

With an opt-out flag, protection depends on remembering the flag on every command, and one
forgotten invocation is enough. With deny-by-default, forgetting is safe and permission is
deliberate.

Silence counts as an error, so a new build script stops the install until a person decides. That
also stops installs that would have been harmless, each time a dependency starts wanting a build.
