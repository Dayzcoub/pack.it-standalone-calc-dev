# Task 001 Final Handoff — Foundation

## 1. Purpose

This is the final handoff for starting implementation of PACK.IT standalone calculators.

Task 001 must create only the application foundation.

Do not implement calculators, PDF generation, storage, backend, or old FEG logic in this task.

## 2. Product identity

Product:

```text
ПАК.ИТ Калькуляторы / PACK.IT Calculators
```

Type:

```text
standalone/offline calculator for fast Stage / Truss / LED construction calculations
```

Core workflow for future v1.0:

```text
calculate → save → PDF → share
```

## 3. Read first

Before coding, read:

```text
README.md
CODEX_START_HERE.md
docs/DECISIONS.md
docs/INDEX.md
docs/00_MASTER_PLAN.md
docs/02_ARCHITECTURE_CONTRACT.md
docs/product/00_PRODUCT_SCOPE_V1.md
docs/product/17_FEATURE_MATRIX.md
docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md
docs/engineering/00_IMPLEMENTATION_GUARDRAILS.md
docs/engineering/04_PRE_CODE_GATE.md
docs/engineering/11_DEVELOPMENT_WORKFLOW.md
docs/design/00_VISUAL_DIRECTION.md
docs/design/01_UI_KIT_RULES.md
docs/design/02_LAYOUT_RULES.md
docs/design/09_MOBILE_REFERENCE_SCREENS.md
docs/codex/TASK_001_FOUNDATION_PROMPT.md
```

If any instruction conflicts, prefer:

1. `docs/DECISIONS.md`;
2. `docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md`;
3. `docs/product/17_FEATURE_MATRIX.md`;
4. `docs/engineering/00_IMPLEMENTATION_GUARDRAILS.md`;
5. this handoff.

## 4. Stack

Use:

```text
React
TypeScript
Vite
Capacitor
```

Do not add unnecessary runtime dependencies in Task 001.

## 5. Required foundation structure

Create a clean app structure similar to:

```text
src/
  app/
  brand/
  core/
  features/
    home/
    stage/
    truss/
    led/
    saved/
    settings/
    pdf-preview/
  i18n/
  native/
  pdf/
  renderer/
  storage/
  ui/
  utils/
```

Task 001 may keep many folders empty except for placeholders/contracts.

## 6. Required screens in Task 001

Create route/screen placeholders for:

```text
Home
Stage
Truss
LED
Saved
Settings
PDF Preview
```

Screens should be visually usable placeholders, not blank pages.

Each screen should show:

- PACK.IT header/brand context;
- page title;
- short placeholder message;
- navigation back/home where appropriate.

## 7. Required UI foundation

Implement:

- app shell;
- basic routing;
- dark theme default;
- design tokens foundation;
- basic reusable Button/Card/Header primitives;
- mobile-first layout;
- safe-area support;
- no horizontal overflow;
- accessible tap targets.

Light theme may be scaffolded but does not need full polish in Task 001 unless trivial.

## 8. Required i18n foundation

Add RU/EN foundation:

```text
ru default/fallback
en ready
```

Task 001 may include only key shell/screen strings.

Do not hardcode all UI text directly in components if i18n utility exists.

## 9. Assets in Task 001

Use committed SVG/placeholders where available.

Raster production assets are not required for Task 001.

Do not block foundation on app icon/splash/home-card final exports.

Use placeholders for Stage/Truss/LED home cards if needed.

## 10. Explicitly forbidden in Task 001

Do not add:

- backend;
- Supabase/Firebase/custom server API;
- accounts/login;
- cloud sync;
- remote config;
- analytics;
- ads;
- tracking SDK;
- CRM/warehouse/team features;
- old FEG runtime/shell/CSS;
- `window.FEGModules`;
- production TestFixtures;
- mini-game;
- PDF generation engine;
- real calculator formulas;
- local storage schema/migrations beyond placeholders;
- 3D dependencies.

## 11. Old FEG source rule

`Dayzcoub/Feg_Calc_Stage` is reference only.

Do not copy old shell/CSS/runtime.

Do not import legacy code directly.

Calculation logic extraction begins in later tasks, not Task 001.

## 12. Acceptance checks

Task 001 is accepted when:

```text
npm install works
npm run dev works
npm run build works
typecheck passes if script exists
lint passes if script exists
Home/Stage/Truss/LED/Saved/Settings/PDF Preview routes open
UI is PACK.IT-branded
no visible FEG brand
no backend deps
no analytics/ad deps
no remote config
no old FEG runtime
mobile layout has no obvious overflow
```

## 13. Recommended final response after Task 001

After implementation, report:

- files created;
- commands run;
- checks passed/failed;
- known limitations;
- next recommended task.

Do not claim tests passed if they were not run.

## 14. Next task after acceptance

After Task 001 is accepted, proceed to:

```text
Task 002 — Shared core contracts
```

Task 002 should define calculation data contracts before implementing Stage/LED/Truss formulas.
