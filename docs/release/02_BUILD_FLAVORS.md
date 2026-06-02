# 02. Build Flavors

## 1. Purpose

Separate dev/internal/beta/production behavior.

## 2. Flavors

```text
dev
internal
beta
production
```

## 3. dev

Allowed:

- test fixtures;
- debug routes;
- verbose console logs;
- missing translation markers;
- experimental flags.

## 4. internal

Allowed:

- limited debug diagnostics;
- feature flags;
- internal QA labels.

## 5. beta

Near production:

- no visible debug panel;
- no test fixtures in UI;
- no FEG brand;
- production privacy behavior.

## 6. production

Forbidden:

- test fixtures;
- demo data imports;
- debug panels;
- console spam;
- hidden unfinished routes;
- ad/tracking SDK;
- unexpected permissions;
- external CDN dependency.

## 7. Acceptance

Production build must fail checks if forbidden dev artifacts are included.
