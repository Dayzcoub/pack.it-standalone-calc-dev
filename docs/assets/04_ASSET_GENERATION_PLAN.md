# 04. Asset Generation Plan

## 1. Purpose

This document defines the staged asset generation plan for PACK.IT standalone calculators.

The goal is to avoid generating presentation boards that are hard to cut and instead produce separate production-ready runtime assets.

## 2. Core rule

Generate insertable assets, not collages.

Required:

- separate files;
- transparent background where needed;
- clean alpha channel;
- safe margins;
- no FEG branding;
- no UI elements baked into illustration assets;
- no unnecessary text inside images;
- lowercase kebab-case filenames;
- saved prompts and references.

## 3. Stage 0 — Asset list lock

Before generating, confirm the needed groups:

1. App icon;
2. Splash / launch screen;
3. Home card illustrations;
4. Calculator empty states;
5. PDF assets;
6. Store screenshots / promo visuals;
7. Optional future assets.

Do not generate extra assets without assigning them to one of these groups.

## 4. Stage 1 — App icon

### Required output

```text
assets/app-icons/source/packit-app-icon-1024.png
```

### Requirements

- 1024 × 1024 px;
- PNG;
- no transparency for store source unless platform-specific tooling requires otherwise;
- readable at small sizes;
- no excessive small details;
- no FEG branding.

### Candidate directions

Generate 4–6 variants:

1. Cube + calculator;
2. Technical package / box concept;
3. Stage + Truss + LED in one symbol;
4. Abstract PACK.IT tech mark;
5. Minimal P / package / grid mark.

### After selection

- final 1024 × 1024 export;
- check safe zone;
- generate iOS/Android icon sets later via tooling.

## 5. Stage 2 — Splash / launch screen

### Required output

```text
assets/splash/packit-splash-dark-portrait.png
assets/splash/packit-splash-light-portrait.png
assets/splash/packit-splash-logo.svg
```

### Size

Recommended portrait reference:

```text
1290 × 2796 px
```

### Requirements

- important content centered;
- safe areas respected;
- no buttons;
- no small text;
- no FEG branding;
- calm graphite / dusty gray-blue technical background;
- logo/mark visible but not oversized.

### After generation

- check dark/light compatibility;
- extract or redraw logo mark as SVG;
- optimize file size.

## 6. Stage 3 — Home card illustrations

These are the most important first runtime assets for the home screen.

### Required output

Stage:

```text
assets/home/packit-home-stage-card.png
assets/home/packit-home-stage-card.webp
```

Truss:

```text
assets/home/packit-home-truss-card.png
assets/home/packit-home-truss-card.webp
```

LED:

```text
assets/home/packit-home-led-card.png
assets/home/packit-home-led-card.webp
```

### Common requirements

- one object/scene per file;
- transparent background;
- clean alpha;
- no card background baked in;
- no text;
- no UI controls;
- safe margins;
- unified style;
- readable on phone;
- not overloaded with tiny detail.

### Recommended source size

```text
1600 × 1200 px or larger
```

Runtime display target:

```text
~320–520 px wide depending device density
```

### Stage illustration content

- modular stage platform;
- visible deck modules;
- visible legs/supports;
- braces;
- small stairs allowed;
- professional technical look.

### Truss illustration content

- aluminum event truss;
- clearly round cylindrical tubes;
- diagonal bracing;
- metallic gray/silver;
- no square scaffold look;
- optional subtle warm highlights.

### LED illustration content

- LED cabinets;
- modular matrix;
- front or partial rear detail;
- frame/stand/hanging hint;
- readable cabinet grid.

### After generation

- remove/cut background;
- check alpha holes/openings;
- export PNG;
- compress WebP;
- test on dark and light cards.

## 7. Stage 4 — Empty state illustrations

Empty states are secondary runtime assets and should be simpler than home card illustrations.

### Required output

```text
assets/empty-states/empty-stage.png
assets/empty-states/empty-stage.webp
assets/empty-states/empty-truss.png
assets/empty-states/empty-truss.webp
assets/empty-states/empty-led.png
assets/empty-states/empty-led.webp
assets/empty-states/empty-saved.png
assets/empty-states/empty-saved.webp
assets/empty-states/empty-pdf.png
assets/empty-states/empty-pdf.webp
```

### Requirements

- small and lightweight;
- transparent background;
- professional, not childish;
- no cartoon style;
- minimal detail;
- works in dark/light themes.

### Usage

- no saved calculations;
- no PDF;
- empty calculator before first input;
- demo examples / onboarding;
- no user-defined profiles/catalogs in future.

## 8. Stage 5 — PDF assets

### Required output

```text
assets/pdf/packit-pdf-logo.svg
assets/pdf/packit-pdf-header-pattern.svg
assets/pdf/packit-pdf-watermark.svg
assets/pdf/packit-pdf-cover-mark.svg
```

Watermark and cover mark are optional.

### Requirements

- SVG preferred;
- mono version required;
- print-friendly;
- not dependent on dark theme;
- professional, not decorative-heavy;
- lightweight.

PDF assets should not be large raster illustrations.

## 9. Stage 6 — Store screenshots / promo visuals

Store screenshots should be created after real UI exists.

Do not generate fake UI screenshots before the app UI is implemented.

### Future required screens

- Home screen;
- Stage calculator;
- Truss calculator;
- LED calculator;
- Saved calculations;
- PDF preview;
- Settings / pricing.

### Rule

Store screenshots must show real app UI or very close captured UI, not invented screens that the app cannot reproduce.

## 10. Stage 7 — Source prompts and references

For every asset save:

- generation prompt;
- reference image if used;
- selected variant;
- final export notes;
- manual cleanup notes.

Recommended folders:

```text
assets/source/prompts/
assets/source/references/
assets/source/exports/
```

## 11. Stage 8 — Pre-upload asset QA

Before uploading final assets to repo, check:

1. No FEG branding;
2. No extra text;
3. No unwanted white/black background;
4. Clean alpha channel;
5. Object does not touch edges;
6. Reasonable file size;
7. PNG/WebP opens correctly;
8. Looks good on dark theme;
9. Looks good on light theme;
10. Filename uses lowercase kebab-case.

## 12. Stage 9 — Upload to repo

Upload only final runtime files and useful source references.

Target folders:

```text
assets/app-icons/source/
assets/splash/
assets/home/
assets/empty-states/
assets/pdf/
assets/source/prompts/
assets/source/references/
```

After upload update:

- `docs/assets/03_PRODUCTION_ASSET_MANIFEST.md`;
- `assets/README.md`;
- `docs/design/09_MOBILE_REFERENCE_SCREENS.md` if mobile references are added.

## 13. Stage 10 — App integration order

Task 001 can start with placeholders.

Final asset integration order:

1. Home card illustrations;
2. App icon;
3. Splash;
4. PDF logo/header;
5. Empty states;
6. Store screenshots after real UI.

Raster assets must not block Task 001 foundation.

## 14. Acceptance

Accepted when assets are separate, optimized, correctly named, transparent where needed, and directly usable in the app without manual cutting from large presentation boards.
