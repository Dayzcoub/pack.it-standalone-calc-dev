# 01. Versioning Policy

## 1. Version types

PACK.IT must track multiple versions independently:

```text
appVersion
calculationEngineVersion
catalogVersion
storageSchemaVersion
pdfTemplateVersion
```

## 2. appVersion

User-visible app version.

Example:

```text
1.0.0
```

## 3. calculationEngineVersion

Version of formula logic.

Recommended per module:

```text
stage-core@1.0.0
truss-core@1.0.0
led-core@1.0.0
```

## 4. catalogVersion

Version of built-in catalogs.

Example:

```text
truss-catalog@1.0.0
led-catalog@1.0.0
stage-catalog@1.0.0
```

## 5. storageSchemaVersion

Version of local storage schema.

Used for migrations.

## 6. pdfTemplateVersion

Version of PDF layout/template.

Stored in generated PDF metadata if possible.

## 7. Saved calculation requirement

SavedCalculation stores:

- appVersion;
- calculationEngineVersion;
- catalogVersion;
- storageSchemaVersion if relevant.

## 8. Acceptance

Accepted when all saved snapshots and PDFs can be traced to versions used to create them.
