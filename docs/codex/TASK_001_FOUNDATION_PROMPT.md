# TASK 001 — Foundation Prompt

Copy this prompt to Codex when starting the first code task.

---

Create the clean foundation for PACK.IT Calculators mobile app.

## Product

Build a new app foundation for:

```text
PACK.IT Calculators / ПАК.ИТ Калькуляторы
```

The app will later contain Stage, Truss and LED calculators.

## Stack

Use:

```text
React + TypeScript + Vite + Capacitor
```

## Read before coding

Read:

- `CODEX_START_HERE.md`
- `docs/INDEX.md`
- `docs/DECISIONS.md`
- `docs/engineering/04_PRE_CODE_GATE.md`
- `docs/02_ARCHITECTURE_CONTRACT.md`
- `docs/product/17_FEATURE_MATRIX.md`
- `docs/design/00_VISUAL_DIRECTION.md`
- `docs/engineering/00_IMPLEMENTATION_GUARDRAILS.md`

## Required output

Create:

- project package setup;
- Vite React TypeScript app;
- Capacitor config;
- routes/screens:
  - Home;
  - Stage;
  - Truss;
  - LED;
  - Saved;
  - Settings;
  - Help;
  - About;
- PACK.IT brand layer;
- RU/EN i18n foundation;
- design token CSS foundation;
- shared UI placeholders;
- empty core contract folders/files only;
- basic test/check/build scripts.

## Do not implement yet

Do not implement:

- Stage calculation logic;
- Truss calculation logic;
- LED calculation logic;
- PDF generation;
- storage repositories;
- native share/filesystem;
- Pro/IAP;
- combined PDF;
- custom catalogs;
- backend/auth/analytics/ads.

## Strict prohibitions

Do not:

- copy old FEG `index.html`;
- copy old runtime CSS cascade;
- use `window.FEGModules`;
- add visible FEG brand;
- add Supabase/backend;
- add ad/tracking/analytics SDK;
- add external CDN assets;
- add TestFixtures to runtime;
- put calculation formulas in React components.

## Required checks

Add scripts so these can run:

```text
npm run build
npm run test
npm run typecheck
```

If a command cannot be fully meaningful yet, add placeholder tests that pass and document next steps.

## Acceptance

Task 001 is done only when:

- app opens;
- routes exist;
- PACK.IT brand visible;
- no FEG visible brand;
- RU/EN dictionaries exist;
- no calculation logic implemented;
- build/typecheck/test pass;
- docs are not contradicted.
