# 00. Asset Production Plan

## 1. Purpose

This document defines how PACK.IT visual assets should be produced before implementation.

The goal is to avoid temporary placeholders, inconsistent icons and late visual rewrites.

## 2. Asset groups

Required groups:

```text
app identity
home screen illustrations
calculator icons
UI action icons
empty states
PDF assets
store screenshots
source prompts and references
```

## 3. Folder structure

Recommended repository structure when assets are added:

```text
assets/
  README.md
  app-icons/
    packit-app-icon-1024.png
    ios/
    android/
  splash/
    packit-splash-dark.png
    packit-splash-light.png
  home/
    packit-home-hero-dark.png
    packit-home-hero-light.png
    packit-home-stage-card.png
    packit-home-truss-card.png
    packit-home-led-card.png
  calculators/
    stage/
    truss/
    led/
  icons/
    action/
    navigation/
    calculators/
  empty-states/
  pdf/
  store-screenshots/
  source/
    prompts/
    references/
    editable/
```

## 4. Production order

Recommended order:

1. App icon direction.
2. Stage/Truss/LED home card art.
3. SVG icon system.
4. Empty states.
5. PDF logo/header assets.
6. Store screenshot boards.
7. Light-theme asset variants where needed.

## 5. App icon requirements

App icon must be:

- square source 1024×1024;
- strong PACK.IT identity;
- readable at small size;
- no tiny detailed text except stylized PACK.IT if legible;
- dark technical premium look;
- no FEG logo;
- no circular-only symbol.

Possible concepts:

```text
PACK.IT wordmark + technical cube/grid
PACK.IT mark + stage/truss/LED abstract package
teal technical package icon on graphite background
```

## 6. Home card illustration requirements

### Stage

Must show:

- platform/deck;
- legs/supports;
- braces;
- optional stairs;
- technical realism.

### Truss

Must show:

- aluminum truss;
- round tubes;
- diagonal bracing;
- metallic feel;
- no square-tube scaffold look.

### LED

Must show:

- LED screen/cabinets;
- grid/dots;
- optional rear cabinet detail;
- technical equipment feel.

## 7. SVG icon requirements

SVG icons must be:

- consistent stroke;
- currentColor-compatible where possible;
- 24×24 base grid;
- readable at mobile size;
- designed for dark/light themes.

## 8. Empty state requirements

Empty states must be:

- calm;
- technical;
- line-art based;
- not cartoonish;
- readable on dark and light themes.

Required:

```text
empty-saved-calculations
empty-stage
empty-truss
empty-led
empty-pdf
empty-price-profile
```

## 9. PDF asset requirements

Required:

```text
packit-pdf-logo.svg
packit-pdf-header-pattern.svg
packit-pdf-watermark.svg
packit-pdf-disclaimer-icon.svg
```

PDF assets should work on light paper background.

## 10. Source preservation

For each generated/edited asset, keep:

- source prompt if generated;
- editable SVG if vector;
- original high-res PNG if raster;
- export versions;
- notes about intended usage.

## 11. Naming rules

Use lowercase kebab-case:

```text
packit-home-stage-card.png
packit-icon-stage.svg
packit-empty-saved-calculations.svg
```

Do not use:

```text
imagegen.png
final.png
new-new-final.png
feg-logo.png
```

## 12. Acceptance

Asset pack is accepted when:

- all required groups have either final files or documented placeholders;
- no FEG brand remains;
- Stage/Truss/LED are recognizable;
- truss tubes are round in detailed illustrations;
- files are individually exported, not only combined boards;
- dark/light compatibility is checked.
