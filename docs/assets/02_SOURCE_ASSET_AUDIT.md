# 02. Source Asset Audit from Previous PACK.IT Files

## 1. Purpose

This document records what was found in the user File Library for previous PACK.IT / large-app visual assets and related source files.

The goal is to base standalone calculator assets on already-approved PACK.IT direction instead of inventing a new unrelated style.

## 2. Most important visual source

Primary visual source found:

```text
PACK.IT_UI_Hard_Rebuild_TZ_v2_1.docx
```

This document explicitly states that the visual sources of truth are:

- Brand board PACK.IT / ПАК.ИТ;
- Desktop UI Kit 1280 px;
- Mobile UI Kit;
- rules and restrictions from the TZ.

For the standalone calculators, this must be treated as the main visual reference from the large PACK.IT program.

## 3. Key visual decisions inherited from large PACK.IT program

Use:

- PACK.IT / ПАК.ИТ brand;
- graphite/dark gray-blue foundation;
- calm dusty blue/gray accent;
- no acidic bright colors;
- no random bright blue/purple accents;
- token-based light/dark themes;
- reusable components;
- mobile app bar / bottom navigation pattern;
- cards, forms, chips, tabs, status pills;
- clean SaaS / technical professional style.

Do not use:

- old FEG public branding;
- old legacy CSS as active style source;
- random hardcoded colors;
- one-off component styling;
- bright neon green/acid palette from experimental generated board;
- uncontrolled overrides.

## 4. Additional UI implementation source

Secondary source found:

```text
FEG_Stage_PRO_UI_Kit_Implementation_TZ_v1_0.docx
```

Useful inherited requirements:

- central token layer for light/dark themes;
- Inter or system fallback typography;
- spacing scale 4/8/12/16/20/24/32/40/48;
- radii 4/8/12/16/20/full;
- button states and sizes;
- mobile touch target minimum 44 px;
- mobile long tables should become cards/list or controlled scroll;
- constructor canvas must be scrollable/zoomable and not covered by toolbar.

## 5. 3D/truss source inventory

Found:

```text
FEG_MDM_3D_models_inventory_and_constructor_plan.xlsx
```

Useful for future 3D/visual asset pipeline:

- many MDM truss/corner/block CAD sources are tracked;
- file formats include STP/DWG;
- many items are marked as `master_source` and `convert_to_glb`;
- import priority exists;
- this is a CAD/3D source inventory, not ready UI raster assets.

Use this later for:

- GLB conversion pipeline;
- 3D constructor asset planning;
- accurate truss illustrations;
- source status metadata.

Do not treat raw STP/DWG as direct mobile app UI assets.

## 6. Non-MDM truss source analysis

Found:

```text
FEG_RU_truss_3D_model_availability_non_MDM_analysis.xlsx
```

Important inherited rule:

- IMLIGHT should be treated as a separate 3D source pipeline and separate compatibility group;
- do not mix MDM and IMLIGHT in the same automatic compatibility group;
- CAD/SAT sources are geometry only and do not equal load certification;
- model manifests must be separate from load tables.

This supports the previously documented extensible truss systems strategy.

## 7. Actual asset pack status

Search did not reveal a ready standalone asset archive with individually exported transparent PNG/SVG/WebP files for PACK.IT calculators.

Found mainly:

- embedded brand board and UI kit references inside DOCX files;
- CAD/3D inventory spreadsheets;
- a separate GitHub tech cube avatar image that may inspire style but is not the approved PACK.IT brand asset.

Therefore, next step is not to invent a brand from scratch, but to produce a new standalone asset pack derived from the approved PACK.IT UI Kit.

## 8. Standalone asset direction after audit

For standalone calculators, use the approved large-program visual base:

```text
calm graphite / dusty gray-blue / professional technical / no acidic colors
```

Do not use the recent neon-green generated board as final direction.

The calmer generated board is closer, but still must be adjusted to the official PACK.IT brand board and dusty gray-blue UI kit from the large-program docs.

## 9. Required next asset work

Create real separate assets:

- app icon;
- splash dark/light;
- stage card illustration;
- truss card illustration with round tubes;
- LED card illustration;
- SVG action icons;
- empty states;
- PDF logo/header;
- store screenshots.

All exported individually, not only as a combined design board.

## 10. Acceptance

Standalone asset work is accepted when:

- it follows PACK.IT Hard Rebuild TZ visual source;
- it uses calm dusty tones;
- no acid colors remain;
- assets are individual files;
- transparent backgrounds exist where required;
- no FEG brand remains;
- truss detailed illustrations show round tubes;
- sources/prompts are documented.
