# 08. Definition of Done

## 1. Purpose

This document defines when a task is considered complete.

The goal is to avoid endless fixes, hidden regressions and accidental reintroduction of old technical debt.

## 2. Universal Definition of Done

Any task is done only when:

- TypeScript/build passes;
- tests pass;
- app still opens;
- no visible FEG brand appears;
- no unexpected network calls are introduced;
- no inline styles are introduced;
- no unreviewed `!important` usage is introduced;
- no calculation logic is placed in UI components;
- no old runtime CSS patch layer is copied;
- mobile layout has no page-level horizontal overflow;
- errors/loading/empty states are handled where applicable;
- changes are documented if they affect architecture, core logic, store release or brand.

## 3. Core logic task is done when

- core function is pure;
- no DOM/React/CSS/storage/PDF imports exist;
- input/output types are explicit;
- regression tests exist;
- BOM output is structured;
- pricing output is structured;
- warnings are structured;
- drawingModel exists if visual output is required;
- old app behavior is matched on accepted scenarios;
- edge cases are documented.

## 4. UI task is done when

- UI uses shared components;
- no formulas are added to UI;
- no one-off local CSS hack is added;
- mobile viewport 360/390/430 works;
- tablet/desktop do not break if present;
- touch targets are usable;
- text is readable;
- tabs/sections do not jump;
- empty/loading/error states are present;
- screen still works offline.

## 5. Renderer task is done when

- renderer consumes only DrawingModel;
- renderer does not calculate BOM/price/weight;
- renderer supports mobile viewport;
- zoom/fit/center work if required;
- scheme can be exported for PDF;
- no hidden state mutation.

## 6. Storage task is done when

- schema is typed;
- data survives app restart;
- migration path exists;
- storage keys use `packit.` prefix;
- no backend is introduced;
- no personal data collection is introduced;
- delete/rename/duplicate actions work if included.

## 7. PDF task is done when

- PDF is generated from structured PdfModel;
- PDF contains PACK.IT branding;
- PDF contains summary, BOM, price and scheme if available;
- PDF contains safety disclaimer;
- PDF can be saved/shared;
- PDF works offline;
- no FEG brand remains.

## 8. Store release task is done when

- iOS build is possible;
- Android build is possible;
- icons/splash are PACK.IT;
- app requests no unexpected permissions;
- privacy policy is prepared;
- support URL is prepared;
- screenshots are prepared;
- Data Safety/App Privacy answers match actual app behavior;
- clean install works;
- offline launch works;
- PDF/share works;
- saved calculations persist.

## 9. Baseline fixing

After each accepted milestone, create a version baseline:

```text
v0.1.0 foundation accepted
v0.2.0 core contracts accepted
v0.3.0 stage core accepted
v0.4.0 truss core accepted
v0.5.0 led core accepted
v0.6.0 mobile UI accepted
v0.7.0 storage accepted
v0.8.0 PDF/share accepted
v0.9.0 release candidate accepted
v1.0.0 store release
```

Do not start the next risky layer before the current layer is accepted.

## 10. Regression protection

When a bug is fixed:

1. Write or update a regression test.
2. Fix the bug.
3. Confirm the test fails before/fails after when possible.
4. Document the scenario if it is business-critical.

No silent fixes for calculation logic.

## 11. Forbidden “done” states

A task is not done if:

- it works only on one viewport;
- it needs a hidden manual step;
- it passes visually but breaks tests;
- it adds FEG branding;
- it adds old CSS debt;
- it introduces a calculation mismatch without explanation;
- it stores data under old keys;
- it requires internet for v1.0 core use;
- it adds permissions not approved for store release.
