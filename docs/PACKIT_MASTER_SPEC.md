# PACK.IT Master Spec

## 0. Document status

This document is the canonical high-level specification for PACK.IT standalone calculators.

Detailed documents remain the source for deep implementation details. If there is a conflict, prefer this order:

1. `docs/DECISIONS.md`
2. `docs/PACKIT_MASTER_SPEC.md`
3. `docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md`
4. `docs/product/17_FEATURE_MATRIX.md`
5. focused documents under `docs/*`
6. older planning notes

Do not use this document to silently override calculation details. Calculation-affecting changes still require version bump, tests and changelog.

## 1. Product overview

Product name:

```text
ПАК.ИТ Калькуляторы / PACK.IT Calculators
```

Product type:

```text
standalone/offline calculator for fast Stage / Truss / LED construction calculations
```

Core v1.0 workflow:

```text
calculate → save → PDF → share
```

The product is a practical field/office utility for quick technical calculations, schemes, BOM and PDF output.

It is not a CRM, ERP, warehouse system, cloud workspace, CAD system or certified engineering tool.

## 2. Final decisions

Final product-line decisions:

```text
No backend
No cloud sync
No accounts
No workspace administration
No remote config
No server-side catalog management
No analytics dashboard
No ads
No tracking
```

Administration is local or release-based:

- local settings;
- local price profiles;
- local saved calculations;
- built-in versioned catalogs;
- app updates through App Store / Google Play;
- changelog/docs/engineVersion/catalogVersion.

If backend/cloud/workspace is ever desired, it must become a separate product decision and likely a separate product line.

## 3. v1.0 scope

In v1.0:

- Stage calculator;
- Truss calculator;
- LED calculator;
- local drafts;
- local saved calculations;
- separate saved lists by calculator type;
- combined Saved screen;
- PDF export;
- native share;
- RU/EN foundation;
- price settings;
- disclaimers;
- demo examples and presets;
- no backend.

Out of v1.0:

- account/login;
- cloud sync;
- CRM;
- warehouse;
- workspace roles;
- analytics;
- ads;
- remote config;
- full 3D constructor;
- production IAP/Pro decision;
- UI editor for custom catalogs unless explicitly moved later.

## 4. Architecture

Target stack:

```text
React + TypeScript + Vite + Capacitor
```

Architecture principle:

```text
input → pure core result → UI / saved snapshot / PDF
```

Recommended structure:

```text
src/
  app/
  brand/
  core/
  features/
  i18n/
  native/
  pdf/
  renderer/
  storage/
  ui/
  utils/
```

Rules:

- calculation logic lives in pure `core/`;
- React components do not own formulas;
- PDF uses `PdfModel`, not uncontrolled full-screen screenshots;
- storage stores versioned snapshots;
- native code is wrapped behind small adapter modules;
- no backend dependencies.

## 5. Source strategy

Reference repository:

```text
Dayzcoub/Feg_Calc_Stage
```

Use it as logic/scenario reference only.

Do not copy:

- old `index.html` shell;
- legacy CSS/runtime cascade;
- `window.FEGModules`;
- Supabase/backend hooks;
- CRM/warehouse/smetчик logic;
- mini-game;
- old service worker/manifest as foundation;
- visible FEG branding.

## 6. Screens

v1.0 route/screen set:

- Home;
- Stage;
- Truss;
- LED;
- Saved;
- Settings;
- PDF Preview.

Home should not be only a menu. It should include:

- PACK.IT brand/header;
- Stage / Truss / LED cards;
- recent calculations;
- demo/examples entry;
- settings/support access.

## 7. UX principles

The app must be fast and field-friendly.

Target UX:

```text
new user: typical calculation in 30–60 seconds
experienced user: typical calculation in 15–30 seconds
PDF/share reachable quickly after result
```

Field-use requirements:

- readable in dark backstage and bright outdoor conditions;
- touch-friendly;
- no hover-only behavior;
- safe areas respected;
- no horizontal overflow;
- works offline;
- quickly opens recent calculations;
- empty states provide action, not only “empty”.

Useful flows:

- duplicate calculation;
- create from example;
- open last calculation;
- PDF with prices / without prices;
- local price settings;
- local help/about.

## 8. Calculators

### 8.1 Shared rules

All calculators must return structured result models with:

- input summary;
- result values;
- BOM rows;
- warnings;
- version metadata;
- PDF-ready fields.

Rules:

- no raw `NaN`, `undefined`, `Infinity`;
- no silent mutation of user dimensions;
- impossible inputs must produce blocking errors;
- suspicious inputs must produce warnings;
- BOM quantities that affect completeness should not be rounded down.

### 8.2 Stage

Stage calculator covers:

- dimensions;
- height;
- modules/decks;
- legs/supports;
- frames/rails where applicable;
- stairs;
- side/end closure;
- BOM;
- price;
- scheme;
- PDF.

Planned systems include:

- Imlight Copy;
- PKC / ШИП-ПАЗ;
- PKC / ПАЗ-ПАЗ.

### 8.3 Truss

Truss calculator modes:

- Portal;
- Frame;
- Stool / truss table;
- Manual / future advanced.

Key rules:

- straight lengths: 0.5 / 1 / 1.5 / 2 / 2.5 / 3 m;
- prefer useful splits, e.g. 4.5 m → 2.5 + 2.0;
- max unsupported span baseline: 9 m;
- spans above limit require support/warning logic;
- fasteners count from real connections;
- old saved snapshots are not recalculated silently.

Known node concepts:

- U012 default stool corner node;
- U017 T-node for intermediate supports;
- U016 / U020 / U024 / U022 future compatible catalog options.

### 8.4 LED

LED calculator covers:

- screen width/height;
- cabinet/module size;
- cabinet count;
- aspect ratio;
- hanging/standing modes;
- Hanging Bar / support accessories;
- power;
- weight;
- cables;
- BOM;
- price;
- PDF.

If target size is not divisible by cabinet size:

```text
do not silently change size
show nearest smaller/larger valid variants
user chooses
```

Default cabinet values must be verified before treating as final catalog data.

## 9. Saved calculations

Each saved calculation stores:

- type: stage/truss/led;
- input;
- resultSnapshot;
- appVersion;
- calculationEngineVersion;
- catalogVersion;
- storageSchemaVersion;
- pdfTemplateVersion where needed;
- createdAt/updatedAt;
- user name/title if edited.

Old snapshots are not silently recalculated.

If newer engine/catalog exists, the app may offer:

```text
Create copy and recalculate with current rules
```

Auto naming examples:

```text
Сцена 7.2×4.8 — 09.06.2026
Портал 8×4 — 09.06.2026
LED 5.12×2.56 — 09.06.2026
```

## 10. Local storage and backup

PACK.IT has no own backend or cloud sync.

Data is local, but important app data should be stored in backup-friendly locations where platform rules allow, so system backup may restore it if enabled by the user:

- iCloud Backup on iOS;
- Android / Google Backup on Android.

Do not promise guaranteed sync/restore.

Backup-friendly data:

- saved calculations;
- drafts;
- price profiles;
- settings;
- future local custom catalogs.

Do not back up where possible:

- temporary PDF cache;
- render screenshots;
- temporary export files;
- image cache;
- debug logs.

Future local backup/restore may use user-controlled JSON import/export with schema metadata. No server import/export.

## 11. PDF export

PDF is one of the main product values.

PDF must be generated from structured `PdfModel` / saved snapshot.

PDF should include:

- date/time;
- appVersion;
- calculationEngineVersion;
- catalogVersion;
- pdfTemplateVersion;
- price profile;
- input summary;
- result summary;
- scheme;
- BOM;
- warnings;
- PACK.IT brand;
- disclaimer.

PDF is not:

- contract;
- invoice;
- engineering certificate;
- structural approval;
- safety guarantee;
- manufacturer document.

PDF options to support/plan:

- with prices;
- without prices;
- future client/technical modes.

## 12. Pricing

Pricing is local and user-controlled.

Default prices may exist, but must be clearly marked as examples.

Recommended copy:

```text
Цены примерные. Настройте свои ставки в разделе «Настройки цен».
```

v1.0 should keep pricing simple:

- one default price profile;
- price visibility can be turned off;
- no backend prices;
- no currency conversion.

Currency should be a local display setting or prepared for future:

```text
currencySymbol: ₽ / $ / € / custom
```

Rental-days multiplier is future, not required for v1.0.

## 13. Catalogs

Built-in catalogs are read-only in v1.0.

Catalog changes happen through app updates and version bumps.

Catalog item source status should support:

```text
verified
estimated
needs-check
user-defined
```

Manufacturer/public naming must be legally cautious. If not verified, use generic names.

Custom truss/LED catalogs are future local/Pro candidates, not backend-managed catalogs.

## 14. Safety and legal wording

Forbidden claims:

```text
safe / безопасно
can be mounted / можно монтировать
will hold / выдержит
approved / certified / guaranteed
```

Preferred wording:

```text
по введённым данным
справочный расчёт
требует проверки
проверьте паспорт оборудования
проверьте требования производителя
требует проверки квалифицированным специалистом
```

Required disclaimer idea:

```text
Расчёты в приложении являются справочными и не заменяют инженерную проверку, паспортные данные оборудования, требования производителя, нормы безопасности и ответственность квалифицированного специалиста на площадке.
```

Any calculation-affecting change requires:

- engine/catalog version bump;
- changelog entry;
- tests/regression update;
- no silent recalculation of old saved results.

## 15. i18n and terminology

RU is default/fallback.

EN foundation is required from the start.

Terminology must remain consistent:

- Сцена → Stage;
- Ферма → Truss;
- LED-экран → LED screen;
- Кабинет → LED cabinet;
- Комплектность → BOM / equipment list;
- Справочный расчёт → Reference calculation.

Avoid literal or unsafe translations for structural terms.

## 16. Brand and visual direction

Visual direction:

```text
calm graphite
dusty gray-blue
professional technical
no acidic/neon colors
no visible FEG branding
```

Brand voice:

- professional;
- calm;
- practical;
- short;
- honest about limits;
- no scary legal tone;
- no childish tone.

## 17. Assets

Current asset strategy:

- SVG/text assets are committed directly;
- raster candidates exist but need final export/upload;
- app can start with placeholders in Task 001;
- runtime assets must be separate files, not presentation boards.

Main asset groups:

- app icon;
- splash;
- Stage/Truss/LED home card illustrations;
- empty states;
- PDF logo/header;
- store screenshots after real UI exists.

Rules:

- lowercase kebab-case;
- transparent PNG/WebP where needed;
- clean alpha;
- safe margins;
- no baked UI elements;
- prompts/references saved.

## 18. Mobile references

Mobile reference screens exist for:

- general PACK.IT smartphone screen;
- Stage calculator;
- Truss calculator;
- LED calculator;
- general technical calculator style.

They are visual/layout references, not pixel-perfect Figma screens.

They guide mood, hierarchy, density and mobile direction.

Implementation still follows written UI/product contracts.

## 19. Testing and QA

Testing strategy:

- core unit tests;
- regression/golden tests;
- renderer/model tests;
- PDF smoke tests;
- storage tests;
- UI tests;
- E2E happy paths;
- manual iOS/Android device QA.

Important real-world cases:

- Stage 7.2 × 4.8;
- Truss portal 8 × 4;
- Truss stool 12 × 6 × 4;
- LED 5.12 × 2.56;
- future combined Stage + Truss + LED workflow.

CI/checks should catch:

- FEG brand leak;
- `window.FEGModules`;
- TestFixtures in production;
- backend dependencies;
- ad/analytics/tracking SDKs;
- external CDN use;
- unexpected permissions;
- core importing React/DOM/Capacitor/localStorage;
- PDF without disclaimer;
- translation mismatches.

## 20. Release and store

Before beta:

- app icon;
- splash;
- privacy policy/support URL;
- App Store privacy labels;
- Google Play Data Safety;
- no unexpected network calls;
- no forbidden permissions;
- PDF/share works;
- offline mode works;
- iOS safe areas OK;
- Android Back behavior OK.

Store screenshots should be based on real UI, not invented screens.

## 21. Market validation

Proceed with a narrow MVP first.

Validate on 10–20 real users:

- rental/production people;
- tech directors;
- LED/truss/stage specialists;
- people making quick estimates.

Success signs:

- 5+ real calculations;
- 3+ PDF exports/shares or PDF considered usable;
- 2–3 users would pay for Pro/advanced;
- repeated feedback clusters;
- return usage after several days.

## 22. Roadmap

v1.0:

- standalone calculators;
- local saved calculations;
- PDF/share;
- no backend.

Near future:

- better presets/examples;
- local import/export;
- custom catalogs as local feature;
- client/technical PDF modes;
- CSV BOM export;
- Pro/local unlock if validated.

v2.0 roadmap:

- local 3D viewer/constructor;
- unified Stage + Truss + LED 3D scene;
- catalog item → 3D model → scene object → BOM → PDF.

3D does not block v1.0 and must not enter Task 001 without explicit decision.

## 23. Development plan

Task order:

1. Task 001 — Foundation;
2. Task 002 — Shared core contracts;
3. Task 003 — Stage core + tests;
4. Task 004 — Stage UI connected to core;
5. Task 005 — Stage PDF;
6. Task 006 — LED core + tests;
7. Task 007 — LED UI + PDF;
8. Task 008 — Truss core + tests;
9. Task 009 — Truss UI + PDF;
10. Task 010 — Saved calculations + separate lists;
11. Task 011 — polish / beta hardening.

Stage first, LED second, Truss third.

## 24. Task 001 summary

Task 001 creates foundation only:

- React + TypeScript + Vite + Capacitor;
- app structure;
- routes/screens placeholders;
- PACK.IT brand layer;
- i18n foundation;
- design tokens;
- dark theme default;
- basic UI primitives;
- placeholders for assets.

Task 001 must not implement:

- real formulas;
- PDF engine;
- storage schema/migrations beyond placeholders;
- backend/cloud;
- old FEG runtime;
- 3D dependencies.

## 25. Document map

Start here:

- `README.md`;
- `CODEX_START_HERE.md`;
- `docs/PACKIT_MASTER_SPEC.md`;
- `docs/DECISIONS.md`;
- `docs/codex/TASK_001_FINAL_HANDOFF.md`.

Detailed references:

- product: `docs/product/*`;
- architecture/engineering: `docs/engineering/*` and core planning docs;
- calculators: `docs/calculators/*`;
- design/assets: `docs/design/*`, `docs/assets/*`, `assets/README.md`;
- release/store: `docs/release/*`, `docs/store/*`;
- QA/risk: `docs/qa/*`, `docs/risk/*`;
- roadmap/market: `docs/roadmap/*`, `docs/market/*`.
