# 10. CI Checks Plan

## 1. Purpose

CI checks must catch the most dangerous regressions before production builds.

## 2. Required checks eventually

```text
typecheck
tests
build
lint
format
production-safety-check
asset-size-check
translation-key-check
```

## 3. Production safety checks

Production build must fail if it finds:

- visible `FEG Stage PRO` brand in app runtime;
- `window.FEGModules`;
- `TestFixtures` in runtime bundle;
- demo/mock imports in production runtime;
- ad SDK dependency;
- analytics SDK dependency;
- tracking SDK dependency;
- external CDN references;
- raw debug panels/routes;
- unexpected permissions;
- console spam markers.

## 4. Core purity checks

Files under `src/core/**` must not import:

```text
react
react-dom
@capacitor/*
*.css
window
document
localStorage
sessionStorage
jspdf
html2canvas
```

## 5. Localization checks

Check:

- RU/EN dictionaries contain same keys;
- no missing critical translation keys;
- warnings use code/params where possible.

## 6. Saved snapshot checks

Tests should verify:

- saved calculation includes input;
- saved calculation includes resultSnapshot;
- engine version is stored;
- old snapshot is not recalculated automatically.

## 7. PDF checks

Tests should verify:

- PDF uses PdfModel;
- PDF contains disclaimer;
- PDF contains PACK.IT brand;
- PDF does not contain FEG brand;
- combined PDF uses snapshots.

## 8. UI checks

E2E/visual checks eventually:

- no horizontal overflow on target mobile widths;
- bottom bar visible;
- tabs stable;
- Android Back behavior where possible;
- PDF/share entry points visible.

## 9. Asset checks

Check:

- runtime image sizes below agreed limit;
- no source/reference giant images in production bundle;
- required assets exist or feature fallback exists;
- SVG icons are valid.

## 10. Acceptance

CI plan is accepted when Task 001 creates initial scripts and later phases add checks as modules appear.
