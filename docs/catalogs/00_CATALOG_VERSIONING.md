# 00. Catalog Versioning

## 1. Purpose

Catalogs must be versioned separately from app and formula versions.

## 2. Version types

```text
appVersion
calculationEngineVersion
catalogVersion
storageSchemaVersion
pdfTemplateVersion
```

## 3. Catalog item fields

Every catalog item should include:

```ts
type CatalogMeta = {
  id: string;
  catalogVersion: string;
  sourceStatus: 'verified' | 'user-defined' | 'needs-check' | 'estimated';
  sourceNote?: string;
  manufacturerId?: string;
  publicDisplayAllowed?: boolean;
};
```

## 4. Source status

```text
verified — checked against reliable source
user-defined — entered by user
needs-check — imported/known but not verified
estimated — approximate value
```

UI/PDF must mark user-defined, needs-check and estimated data where relevant.

## 5. Standard vs user catalogs

Standard catalogs are read-only.

User can:

- clone standard catalog;
- create custom catalog;
- disable parts;
- edit copied/custom values.

User must not directly mutate built-in catalog definitions.

## 6. Catalog updates

When built-in catalog updates:

- old saved snapshots remain unchanged;
- new calculations use new catalog by default;
- old calculations may show old catalog version notice.

## 7. Acceptance

Accepted when:

- catalogVersion exists;
- sourceStatus exists;
- built-in catalog is immutable;
- user catalogs are separate;
- old snapshots remain stable.
