# 04. Pre-Code Gate

## 1. Purpose

This is the final checklist before starting actual application code.

Do not start Task 001 Foundation until this gate is accepted.

## 2. Documentation ready

Required docs must exist:

```text
README.md
Master plan
Source audit
Architecture contract
Core logic extraction
Mobile UI contract
Design docs
Product scope
Data model rules
Validation/warnings
PDF/export modes
Legal/safety notes
QA matrix
Regression scenarios
Calculator specs
Engineering guardrails
```

## 3. Visual direction accepted

Required:

- approved dark premium technical direction;
- home/calculator/saved mockups accepted as target;
- design tokens documented;
- component rules documented;
- asset requirements documented;
- icon style guide documented;
- PDF style documented.

## 4. Product decisions accepted

Required:

- one app, not three separate apps for v1;
- Stage / Truss / LED in v1.0;
- offline-first;
- no account;
- no backend;
- no analytics;
- no ads;
- no tracking;
- local storage only;
- PDF/share included;
- disclaimer included.

## 5. Architecture accepted

Required:

- React + TypeScript + Vite + Capacitor direction accepted;
- pure `core/` accepted;
- shared calculation result shape accepted;
- DrawingModel as single scheme source accepted;
- PdfModel as structured PDF source accepted;
- storage snapshot rule accepted;
- engine versioning accepted.

## 6. Calculator rules accepted

Required:

- Stage systems listed;
- Truss max 9 m unsupported span rule fixed;
- Truss U017 intermediate support rule fixed;
- Truss split behavior documented;
- LED cabinet model documented;
- LED hanging/standing/power rules documented;
- regression scenarios listed.

## 7. Store/release constraints accepted

Required:

- app name direction accepted;
- bundle/package id direction accepted;
- privacy position accepted;
- permission restrictions accepted;
- disclaimer accepted;
- trademark check marked as pre-public-release requirement.

## 8. Asset plan accepted

Required:

- app icon requirements;
- splash requirements;
- home card illustration requirements;
- SVG icon list;
- empty states;
- PDF assets;
- store screenshot plan.

Assets do not all need to be final before foundation code, but requirements must be fixed.

## 9. Prohibited before explicit decision

Do not add before explicit decision:

- login/account;
- cloud sync;
- subscriptions;
- analytics;
- crash reporting;
- ads;
- push notifications;
- external CDN assets;
- camera/location/contacts;
- old FEG shell;
- old FEG runtime modules;
- old service worker;
- old responsive patch cascade.

## 10. First allowed code task

Only after this gate:

```text
Task 001 — Foundation
```

Allowed:

- create clean React + TypeScript + Vite + Capacitor foundation;
- create routes;
- create app shell;
- create PACK.IT brand layer;
- create tokens;
- create empty screens;
- create type placeholders.

Forbidden in Task 001:

- no calculation logic;
- no PDF;
- no storage;
- no native plugin behavior except Capacitor config;
- no source FEG code copy.

## 11. Gate acceptance

Pre-code gate is accepted when user explicitly confirms:

```text
готово, начинаем Task 001
```

Until then, continue improving docs/assets/specs only.
