# 09. Mobile Reference Screens

## 1. Purpose

This document records the current mobile visual/layout references for PACK.IT standalone calculators.

These references are not final pixel-perfect Figma screens. They are approved direction and layout guidance for implementing the first mobile UI.

## 2. Status

Current status:

```text
reference direction exists
raster files still need formal upload to repo as source references
not pixel-perfect production specs
use together with screen specs and UI kit rules
```

Implementation must follow:

- `docs/design/00_VISUAL_DIRECTION.md`;
- `docs/design/01_UI_KIT_RULES.md`;
- `docs/design/02_LAYOUT_RULES.md`;
- `docs/design/03_CALCULATOR_SCREEN_RULES.md`;
- `docs/product/24_FIELD_USE_REQUIREMENTS.md`;
- `docs/screens/*.md`.

## 3. Current mobile references from working session

### 3.1 General PACK.IT smartphone screen

Working file name:

```text
экран_приложения_pack.it_на_смартфоне.png
```

Future repo target:

```text
assets/source/references/mobile/mobile-home-reference.png
```

Purpose:

- general PACK.IT mobile look;
- dark technical mood;
- card rhythm;
- brand feeling;
- first-screen density.

### 3.2 Stage calculator reference

Working file name:

```text
мокап_интерфейса_калькулятора_сцены.png
```

Future repo target:

```text
assets/source/references/mobile/mobile-stage-reference.png
```

Purpose:

- Stage calculator layout direction;
- control grouping;
- visual workspace + summary relation;
- mobile density reference.

### 3.3 Truss calculator reference

Working file name:

```text
интерфейс_мобильного_приложения_с_фермой.png
```

Future repo target:

```text
assets/source/references/mobile/mobile-truss-reference.png
```

Purpose:

- Truss constructor look;
- technical dark UI direction;
- control/workspace balance;
- truss visual readability.

### 3.4 LED calculator reference

Working file name:

```text
схема_экрана_led_устройства.png
```

Future repo target:

```text
assets/source/references/mobile/mobile-led-reference.png
```

Purpose:

- LED screen grid direction;
- module/cabinet visualization;
- dark UI technical look;
- summary/card density.

### 3.5 General technical calculator style reference

Working file name:

```text
оформление_для_технического_калькулятора.png
```

Future repo target:

```text
assets/source/references/mobile/mobile-technical-style-reference.png
```

Purpose:

- general mobile technical style;
- visual hierarchy;
- graphite/dusty gray-blue mood;
- calculator control tone.

## 4. Screens still needing reference coverage

The following screens may be implemented from written specs first, but should receive visual reference later:

```text
mobile-saved-reference.png
mobile-settings-reference.png
mobile-pdf-preview-reference.png
mobile-empty-state-reference.png
```

Do not block Task 001 on these references.

## 5. Rules for using references

Use references for:

- visual mood;
- card density;
- dark technical tone;
- relative hierarchy;
- mobile spacing direction;
- readability expectations.

Do not use references as:

- exact pixel-perfect layouts;
- final copy source;
- final production asset source;
- permission to bake UI into illustrations;
- permission to add unsupported features.

## 6. Implementation constraints

Mobile UI must still respect:

- no backend;
- no FEG brand;
- no ads/analytics/tracking;
- no horizontal overflow;
- touch-friendly controls;
- safe areas;
- readable on real phones;
- offline-first field use.

## 7. Upload plan

When binary upload is available:

1. Upload the five current reference PNGs into `assets/source/references/mobile/`.
2. Rename files to lowercase kebab-case.
3. Keep originals only if needed in source archive.
4. Update this document with actual repo paths.
5. Add any new Saved / Settings / PDF Preview references later.

## 8. Acceptance

Accepted when developers can understand the mobile visual direction without guessing, while still following written product and UI contracts instead of copying mockups blindly.
