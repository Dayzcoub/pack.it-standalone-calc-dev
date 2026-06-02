# CODEX START HERE

This repository is currently a documentation-first pre-code repository for **PACK.IT Calculators / ПАК.ИТ Калькуляторы**.

Do not start coding by copying the old FEG standalone app.

## 1. Read first

Read in this order:

1. `README.md`
2. `docs/INDEX.md`
3. `docs/DECISIONS.md`
4. `docs/OPEN_QUESTIONS.md`
5. `docs/engineering/04_PRE_CODE_GATE.md`
6. `docs/06_CODEX_TASKS.md`
7. `docs/02_ARCHITECTURE_CONTRACT.md`
8. `docs/design/00_VISUAL_DIRECTION.md`
9. `docs/product/00_PRODUCT_SCOPE_V1.md`
10. `docs/engineering/00_IMPLEMENTATION_GUARDRAILS.md`

## 2. Product summary

Build a new mobile-first app:

```text
PACK.IT Calculators / ПАК.ИТ Калькуляторы
```

Calculators:

- Stage;
- Truss;
- LED.

v1.0 direction:

- offline-first;
- no account;
- no backend;
- no ads;
- no analytics;
- no tracking;
- local saved calculations;
- PDF/share;
- RU/EN foundation;
- future Pro/entitlements ready.

## 3. Critical rules

Never do this:

- do not copy old `index.html` as foundation;
- do not copy old runtime CSS patch cascade;
- do not use `window.FEGModules`;
- do not add visible FEG brand;
- do not add Supabase/backend/auth;
- do not add ad/tracking/analytics SDK;
- do not add calculation formulas inside React components;
- do not generate PDF from uncontrolled full-screen UI screenshot;
- do not include test fixtures in production;
- do not silently recalculate old saved snapshots.

## 4. Architecture target

Use:

```text
React + TypeScript + Vite + Capacitor
```

Main layers:

```text
src/core       pure calculation logic
src/features   screens/features
src/ui         shared UI kit
src/renderer   SVG/canvas renderers from DrawingModel
src/pdf        PdfModel and generation
src/storage    local storage repositories
src/native     Capacitor wrappers
src/i18n       RU/EN dictionaries
src/brand      PACK.IT brand source
```

## 5. First allowed task

Only first allowed code task:

```text
Task 001 — Foundation
```

Do:

- initialize clean React + TypeScript + Vite + Capacitor project;
- create routes;
- create app shell;
- create PACK.IT brand layer;
- create design tokens;
- create empty Home / Stage / Truss / LED / Saved / Settings / Help / About screens;
- create i18n foundation RU/EN;
- create placeholder core contracts only;
- create build/check/test scripts.

Do not:

- implement calculations;
- implement PDF;
- implement storage;
- port old FEG code;
- add native plugins beyond base Capacitor config;
- add backend/auth/analytics/ads.

## 6. If documents conflict

Priority order:

1. `docs/DECISIONS.md`
2. `docs/engineering/04_PRE_CODE_GATE.md`
3. `docs/02_ARCHITECTURE_CONTRACT.md`
4. `docs/product/*`
5. `docs/calculators/*`
6. `docs/design/*`
7. other docs

If still unclear, do not invent behavior. Add to `docs/OPEN_QUESTIONS.md` or ask for decision.

## 7. Definition of done

A task is not done unless:

- TypeScript/build pass;
- tests/checks pass;
- no FEG visible brand;
- no forbidden SDKs;
- no old architecture patterns;
- docs updated if behavior changes.
