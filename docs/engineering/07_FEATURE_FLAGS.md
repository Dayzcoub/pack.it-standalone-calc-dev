# 07. Feature Flags

## 1. Purpose

Feature flags allow future Pro/experimental features to exist without breaking v1.0.

## 2. Candidate flags

```ts
type FeatureFlag =
  | 'lightTheme'
  | 'englishLocale'
  | 'combinedPdf'
  | 'technicalPdf'
  | 'customTrussCatalogs'
  | 'customLedCabinets'
  | 'catalogImportExport'
  | 'jsonBackupRestore'
  | 'bomCsvExport'
  | 'proEntitlements'
  | 'projectPackages';
```

## 3. Rules

- unfinished features are off in production;
- hidden features must not appear as broken UI;
- flags are local/static for v1.0;
- no remote config in v1.0;
- Pro-related flags do not require backend in foundation.

## 4. Acceptance

Accepted when feature flags can hide incomplete features and production build does not expose unfinished screens.
