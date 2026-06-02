# 01. Pre-Mortem

## 1. Scenario

Imagine PACK.IT development failed or became endless. This document lists likely causes and prevention rules.

## 2. Failure: scope exploded

Cause:

- CRM/project/team/cloud features added before calculator release.

Prevention:

- v1.0 remains offline calculator.
- Future features are documented but gated.

## 3. Failure: old technical debt returned

Cause:

- old standalone was copied and patched.

Prevention:

- use old app only as logic/reference source.
- no old shell, runtime CSS or globals.

## 4. Failure: calculations became untrustworthy

Cause:

- UI, PDF and saved output used different calculation paths.

Prevention:

- one core result powers UI, saved snapshot and PDF.
- regression tests for accepted cases.

## 5. Failure: mobile UX looked good but was hard to use

Cause:

- mockup aesthetics were implemented without field usability.

Prevention:

- touch targets, safe areas, keyboard behavior, BOM cards, scheme zoom rules.

## 6. Failure: Store release blocked

Cause:

- privacy claims did not match implementation.
- extra permissions or SDKs were added.

Prevention:

- no ads/analytics/tracking/backend in v1.0.
- CI checks for forbidden dependencies and network patterns.

## 7. Failure: saved user data broke after update

Cause:

- schema/catalog/formula migration modified old calculations.

Prevention:

- store snapshots.
- old snapshots open as saved documents.
- recalculation creates copy.

## 8. Failure: visual identity drifted

Cause:

- new assets generated with random palette/styles.

Prevention:

- use approved PACK.IT source docs and calm dusty palette.
- asset manifest and source audit.

## 9. Failure: Codex overbuilt the foundation

Cause:

- Task 001 included calculations, PDF, storage and old code.

Prevention:

- CODEX_START_HERE and Task 001 restrictions.
