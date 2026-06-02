# 02. Test Strategy

## 1. Purpose

PACK.IT must be tested in layers. Do not start with only slow end-to-end tests.

The main risk is incorrect calculation output, so core unit and regression tests are the foundation.

## 2. Testing pyramid

Recommended order:

```text
core unit tests
regression/golden tests
renderer/model tests
PDF smoke tests
storage tests
UI component tests
E2E happy paths
manual device QA
```

## 3. Core unit tests

Required for:

- Stage core;
- Truss core;
- LED core;
- rounding;
- validation;
- BOM generation;
- pricing;
- warnings.

Core tests must run without browser, React, DOM or Capacitor.

## 4. Regression / golden tests

Use fixed known inputs and expected outputs.

Examples:

- Stage 7.2 × 4.8 × 0.8;
- Truss portal 8 × 4;
- Truss stool 12 m auto supports;
- LED 5.12 × 2.56 with 640 mm cabinet.

Expected outputs should include:

- summary metrics;
- BOM rows;
- price rows;
- warnings;
- drawingModel existence.

## 5. Renderer/model tests

Drawing renderer should not calculate business logic.

Tests should verify:

- drawingModel is accepted;
- bounds are valid;
- no crash on empty/large models;
- renderer output includes dimensions/labels where required.

## 6. PDF tests

PDF tests start as smoke tests:

- generate Stage PDF model;
- generate LED PDF model;
- generate Truss PDF model;
- verify disclaimer;
- verify PACK.IT brand;
- verify no FEG brand;
- verify old saved snapshot is used.

Binary PDF visual comparison is not required in early phase.

## 7. Storage tests

Test:

- save calculation;
- open calculation;
- duplicate;
- delete;
- old engine snapshot notice;
- migration does not recalculate resultSnapshot.

## 8. UI tests

UI tests should cover only important behavior first:

- navigation;
- input parse comma/dot;
- warnings visible;
- bottom actions visible;
- language switch basic check;
- no horizontal overflow in key mobile widths.

## 9. E2E tests

Early E2E happy paths:

```text
Home → Stage → enter dimensions → see result
Home → LED → enter dimensions → see result
Home → Truss → portal preset → see result
Saved → open saved calculation
PDF button visible from result
```

Do not overbuild E2E before core stabilizes.

## 10. Manual QA

Manual QA remains required for:

- real iOS safe areas;
- Android Back behavior;
- native share sheet;
- PDF opening/sharing;
- keyboard behavior;
- performance on real devices.

## 11. Acceptance

A calculator is not accepted until:

- core unit tests pass;
- regression/golden tests exist;
- UI consumes core result;
- PDF uses the same result/snapshot;
- invalid inputs return structured warnings instead of broken UI.
