# 00. Manufacturer Names Policy

## 1. Purpose

Manufacturer names and product names may create legal/trademark risks in a public Store app.

## 2. Default policy

Until names are verified, public UI should prefer generic names.

Examples:

```text
Система настила A
Система ШИП-ПАЗ
Система ПАЗ-ПАЗ
Ферма 29Q Generic
LED cabinet 640×640
```

## 3. Internal mapping

Internal/dev docs may keep mapping to known source references for migration and verification.

Do not show unverified manufacturer names in public-facing UI, PDF or Store screenshots.

## 4. Catalog fields

```ts
type ManufacturerDisplay = {
  manufacturerId?: string;
  internalName?: string;
  publicName: string;
  legalDisplayAllowed: boolean;
};
```

## 5. PDF rule

PDF uses public names by default.

Technical PDF may include manufacturer name only if legalDisplayAllowed is true or user explicitly entered it in custom catalog.

## 6. Acceptance

Accepted when:

- public UI can use generic names;
- internal mapping is separate;
- manufacturer names are not hardcoded in UI;
- trademark verification remains open before release.
