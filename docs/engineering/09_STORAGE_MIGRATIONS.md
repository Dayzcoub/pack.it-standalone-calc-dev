# 09. Storage Migration Policy

## 1. Purpose

Local saved data must stay predictable after app updates.

## 2. Schema version

The app stores a local storage schema version:

```text
storageSchemaVersion
```

## 3. Migration rules

- each schema change has an explicit migration;
- migrations must preserve saved calculations whenever possible;
- current saved records should remain readable after migration;
- saved result snapshots must not be recalculated during migration;
- if migration cannot continue, the app shows a readable recovery message.

## 4. Snapshot rule

Migration may update wrapper fields, but it must not silently change calculation results.

Old result snapshots remain as they were saved.

## 5. Acceptance

Accepted when:

- storage schema version exists;
- migration path exists;
- saved calculations remain stable;
- old calculations are either readable or clearly marked as requiring recovery;
- no silent recalculation happens during schema migration.
