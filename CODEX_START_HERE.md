# CODEX START HERE

This repository is currently a documentation-first pre-code repository for **PACK.IT Calculators / ПАК.ИТ Калькуляторы**.

Do not start coding by copying the old FEG standalone app.

## 1. Read first

Read in this order:

1. `README.md`
2. `docs/PACKIT_MASTER_SPEC.md`
3. `docs/DECISIONS.md`
4. `docs/DOCUMENTATION_RULES.md`
5. `docs/INDEX.md`
6. `docs/codex/TASK_001_FINAL_HANDOFF.md`
7. `docs/codex/TASK_001_FOUNDATION_PROMPT.md`
8. `docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md`
9. `docs/product/17_FEATURE_MATRIX.md`
10. `docs/engineering/04_PRE_CODE_GATE.md`
11. `docs/engineering/00_IMPLEMENTATION_GUARDRAILS.md`
12. `docs/design/09_MOBILE_REFERENCE_SCREENS.md`

Open focused docs only as needed after that.

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

- standalone/offline;
- no account;
- no backend;
- no cloud sync;
- no remote config;
- no ads;
- no analytics;
- no tracking;
- local saved calculations;
- PDF/share;
- RU/EN foundation;
- future local Pro/entitlements only if validated.

## 3. Critical rules

Never do this:

- do not copy old `index.html` as foundation;
- do not copy old runtime CSS patch cascade;
- do not use `window.FEGModules`;
- do not add visible FEG brand;
- do not add Supabase/Firebase/backend/auth;
- do not add cloud sync or remote config;
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
- create empty Home / Stage / Truss / LED / Saved / Settings / PDF Preview screens;
- create i18n foundation RU/EN;
- create placeholder core contracts only;
- create build/check/test scripts.

Do not:

- implement calculations;
- implement PDF;
- implement storage schema/migrations;
- port old FEG code;
- add native plugins beyond base Capacitor config;
- add backend/auth/analytics/ads.

## 6. If documents conflict

Priority order:

1. `docs/DECISIONS.md`
2. `docs/PACKIT_MASTER_SPEC.md`
3. `docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md`
4. `docs/product/17_FEATURE_MATRIX.md`
5. `docs/engineering/04_PRE_CODE_GATE.md`
6. focused docs in their domain
7. other docs

If still unclear, do not invent behavior. Add to `docs/OPEN_QUESTIONS.md` or ask for decision.

## 7. Definition of done

A task is not done unless:

- TypeScript/build pass;
- tests/checks pass;
- no FEG visible brand;
- no forbidden SDKs;
- no old architecture patterns;
- no backend/cloud dependency;
- docs updated if behavior changes.
