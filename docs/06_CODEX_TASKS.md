# 06. Codex Task Plan

## 1. General rules for Codex

Codex must work in small, isolated phases.

Do not ask Codex to “build the whole app” in one pass.

Each task must include:

- goal;
- allowed files/areas;
- forbidden changes;
- acceptance checks;
- expected output.

## 2. Global prohibitions

Codex must not:

- copy old `index.html` as the app foundation;
- copy old CSS patch layers;
- use `window.FEGModules`;
- introduce visible FEG brand;
- add backend/Supabase/auth;
- add analytics/tracking;
- add ads;
- add write/network features outside scope;
- mix calculation formulas into React components;
- generate PDF directly from random visible DOM;
- add inline styles;
- use `!important` without justification;
- create multiple breakpoint hacks;
- modify core logic without tests.

## 3. Task 001 — Foundation

### Goal

Create clean PACK.IT mobile calculators foundation.

### Stack

```text
React + TypeScript + Vite + Capacitor
```

### Required

- initialize project;
- add app shell;
- add routing;
- add Home / Stage / Truss / LED / Saved / Settings / Help / About routes;
- add PACK.IT brand layer;
- add design tokens;
- add basic UI components;
- add empty core contracts folders;
- add test/check/build scripts.

### Forbidden

- do not port old FEG code;
- do not add calculation logic;
- do not add PDF;
- do not add storage;
- do not add Capacitor native calls beyond config;
- do not add server/auth/analytics.

### Acceptance

- `npm install` passes;
- `npm run build` passes;
- `npm run test` passes;
- app opens on mobile viewport;
- no visible FEG brand;
- routes exist;
- TypeScript strict mode enabled.

## 4. Task 002 — Core shared contracts

### Goal

Create shared TypeScript contracts for all calculators.

### Required

- BomRow;
- PriceSummary;
- SummaryMetric;
- CalculationWarning;
- DrawingModel;
- CalculationMeta;
- BaseCalculationResult;
- SavedCalculation;
- AppSettings.

### Forbidden

- no UI implementation;
- no formulas;
- no storage implementation;
- no PDF generator.

### Acceptance

- TypeScript compiles;
- contracts exported from stable barrel files;
- basic type tests or compile tests exist.

## 5. Task 003 — Stage core

### Goal

Port Stage calculation logic into pure core.

### Required

- StageInput;
- StageResult;
- stage systems catalog;
- Imlight Copy logic;
- PKC ШИП-ПАЗ logic;
- PKC ПАЗ-ПАЗ logic;
- Stage BOM;
- Stage pricing;
- Stage drawing model;
- Stage regression tests.

### Forbidden

- no React UI logic;
- no DOM;
- no localStorage;
- no PDF;
- no old CSS.

### Acceptance

- Stage tests pass;
- output includes summary, BOM, price, warnings, drawingModel;
- regression values documented.

## 6. Task 004 — Truss core

### Goal

Port Truss calculation logic into pure core.

### Required

- TrussInput;
- TrussResult;
- straight truss catalog;
- node catalog;
- base/fastener catalog;
- split logic;
- portal;
- frame;
- stool;
- auto supports max 9 m;
- U017 intermediate support logic;
- C2/base fastener logic;
- weight;
- pricing;
- load warnings;
- drawing model;
- regression tests.

### Forbidden

- no React UI logic;
- no DOM;
- no localStorage;
- no PDF;
- no visual-only hacks.

### Acceptance

- all Truss tests pass;
- 12 m and 24 m stool auto-support scenarios pass;
- split 4.5 m expected behavior passes;
- output includes complete BOM and drawingModel.

## 7. Task 005 — LED core

### Goal

Port LED calculation logic into pure core.

### Required

- LedInput;
- LedResult;
- cabinet catalog;
- construction model;
- hanging/standing rules;
- Hanging Bar count;
- power calculation;
- weight;
- pricing;
- LED BOM;
- drawing model;
- regression tests.

### Forbidden

- no React UI logic;
- no DOM;
- no localStorage;
- no PDF;
- no color-only state in core except stable construction identifiers.

### Acceptance

- all LED tests pass;
- 5.12 × 2.56 on 640 cabinet case passes;
- multi-construction totals pass;
- power/BOM/pricing output stable.

## 8. Task 006 — Mobile UI shell

### Goal

Implement user-facing mobile UI for all calculators using core outputs.

### Required

- Home screen cards;
- Stage screen tabs;
- Truss screen tabs;
- LED screen tabs;
- Saved placeholder;
- Settings placeholder;
- Summary/BOM/Price views;
- no horizontal overflow;
- touch-friendly controls.

### Forbidden

- no calculation formulas in UI;
- no inline styles;
- no old CSS paste;
- no desktop patch cascade.

### Acceptance

- mobile 360/390/430 widths pass;
- calculator inputs update core result;
- no page horizontal overflow;
- no FEG brand.

## 9. Task 007 — SVG renderers

### Goal

Render Stage / Truss / LED schemes from DrawingModel.

### Required

- Stage SVG renderer;
- Truss SVG renderer;
- LED SVG renderer;
- zoom;
- fit;
- center;
- export scheme SVG string for PDF.

### Forbidden

- renderer must not calculate BOM or pricing;
- renderer must not mutate core result;
- no hidden DOM dependency for calculation.

### Acceptance

- all renderers consume DrawingModel only;
- schemes visible on mobile;
- zoom/fit/center work;
- PDF export can use renderer output.

## 10. Task 008 — Storage

### Goal

Add offline local storage.

### Required

- app settings;
- last drafts;
- saved calculations;
- rename/duplicate/delete;
- price profiles if simple enough.

### Forbidden

- no backend;
- no account;
- no sync;
- no analytics.

### Acceptance

- data survives app restart;
- no network calls;
- storage schema typed;
- migration mechanism exists.

## 11. Task 009 — PDF and native share

### Goal

Add structured PDF generation and sharing.

### Required

- PdfModel;
- PDF templates;
- PACK.IT header/logo;
- calculation summary;
- BOM;
- price;
- scheme image/SVG;
- safety disclaimer;
- save file;
- native share.

### Forbidden

- no PDF from uncontrolled full-screen screenshot;
- no FEG logo/name;
- no server PDF generation.

### Acceptance

- PDF generated offline;
- PDF opens correctly;
- PDF can be shared;
- Stage/Truss/LED PDFs contain correct data.

## 12. Task 010 — Store release candidate

### Goal

Prepare iOS/Android release candidate.

### Required

- Capacitor sync;
- iOS project ready;
- Android project ready;
- icons;
- splash;
- no unexpected permissions;
- production build;
- store metadata draft.

### Acceptance

- iOS TestFlight build possible;
- Android `.aab` build possible;
- no FEG brand;
- no unexpected network calls;
- privacy checklist complete.
