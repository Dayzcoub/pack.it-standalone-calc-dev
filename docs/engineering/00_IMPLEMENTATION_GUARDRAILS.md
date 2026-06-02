# 00. Implementation Guardrails

## 1. Purpose

This document defines strict implementation limits for the first code phases.

The goal is to keep the rewrite clean and prevent old FEG technical debt from entering PACK.IT.

## 2. Global architecture rules

Required:

- TypeScript-first;
- strict contracts;
- pure core logic;
- mobile-first UI;
- shared UI components;
- structured PDF model;
- local-only storage in v1.0;
- no visible FEG brand.

## 3. Forbidden imports in core

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
html2canvas
jsPDF
```

Core must be testable in Node without browser globals.

## 4. Forbidden old patterns

Do not port:

- old `index.html` shell;
- old `window.FEGModules` modules;
- runtime CSS injection as layout system;
- old service worker;
- old PWA manifest as product source;
- old responsive override cascade;
- old dev/demo/test panels;
- runner mini-game;
- Supabase/backend hooks;
- CRM/warehouse/smetчик code.

## 5. Styling rules

Allowed:

- design tokens;
- shared components;
- CSS modules or scoped styles if selected;
- global theme variables;
- predictable responsive rules.

Forbidden:

- inline styles;
- arbitrary colors outside tokens;
- arbitrary radii outside tokens;
- repeated one-off card styles;
- `!important` without comment and review;
- media query zoo.

## 6. State rules

Do not add heavy global state manager at foundation phase.

Allowed:

- React state;
- hooks;
- typed local repositories;
- pure calculation outputs.

Add global store only if real cross-screen state becomes hard to manage.

## 7. Network rules

v1.0 must not require network.

Forbidden:

- analytics calls;
- remote config;
- backend sync;
- external CDN assets;
- server PDF;
- third-party tracking.

If any network call is introduced later, it must be documented and reflected in privacy docs.

## 8. Error rules

No user-facing raw errors:

```text
undefined
NaN
[object Object]
TypeError
```

All errors must be mapped to readable messages.

## 9. Test rules

Every calculation rule must have tests.

Every bug fix in core must add or update regression test.

Minimum commands eventually:

```text
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## 10. Git/commit rules

Each phase should be committed separately.

Do not mix:

- foundation;
- core logic;
- UI polish;
- PDF;
- storage;
- native setup.

## 11. Acceptance

Implementation phase is accepted only when:

- guardrails are not violated;
- checks pass;
- no old brand leaks;
- no old architecture leaks;
- docs updated if behavior changes.
