# 01. Local Import / Export Policy

## 1. Purpose

PACK.IT has no backend, but future versions may need local backup/restore through files.

This document defines the direction for local JSON import/export.

## 2. Decision

Future import/export must be local and user-controlled.

```text
No server import/export.
No automatic upload.
No cloud sync.
```

## 3. Export contents

A future export file may include:

- saved calculations;
- price profiles;
- user-defined catalogs;
- app settings if useful;
- version metadata.

It should not include temporary PDF cache or debug logs.

## 4. Required metadata

Every export must include:

```ts
type PackitExportFile = {
  format: 'packit-local-export';
  exportVersion: string;
  appVersion: string;
  storageSchemaVersion: string;
  createdAt: string;
  data: unknown;
};
```

Saved calculations inside the export still keep:

- appVersion;
- calculationEngineVersion;
- catalogVersion;
- resultSnapshot.

## 5. Import compatibility

Rule:

```text
Newer app may import older schema through migration.
Older app should refuse newer schema with a readable message.
```

Do not partially import silently.

## 6. Conflict handling

Future import must define behavior for:

- duplicate calculation ids;
- duplicate price profile names;
- unknown catalog ids;
- older engine versions;
- missing resultSnapshot.

Recommended default:

```text
Import as copy with new local ids.
```

## 7. Privacy

Import/export is user-triggered.

The user chooses where to save/share the file through OS file/share mechanisms.

PACK.IT does not upload export files.

## 8. v1.0 status

JSON import/export is not required in v1.0.

Architecture should not block it later.

## 9. Acceptance

Accepted when future import/export remains local, versioned, migratable and user-controlled.
