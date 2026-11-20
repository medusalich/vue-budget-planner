# 0058 — The framework speaks German

**Status:** accepted
**Date:** 2026-11-20

## Context

The page declares its language as German, and every text the project writes is German.

The framework brings texts of its own: the month names in its date components, and labels for
screen readers on built-in parts, such as a button to close. Its default language is English. The
month menu showed "January", and a screen reader read English words in a German voice.

## Decision

The framework's language is set to German in `nuxt.config.ts`, and its German texts are loaded
there.

## Consequences

The framework's texts match the rest of the page, on screen and for a screen reader.

One setting covers every component. No component overrides a text of its own.

The German texts have to be loaded as well as selected. Without them the framework falls back to
English and warns in the console.

A second language is not blocked. Once an internationalisation module is added, the framework's
integration follows its language and ignores this setting. The larger part of such a step lies in
the project's own texts and formats, such as the fixed month names of
[0053](0053-a-month-is-a-yyyy-mm-string.md).
