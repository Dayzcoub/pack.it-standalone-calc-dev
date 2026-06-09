# 03. Changelog Policy

## 1. Purpose

PACK.IT changelog must be useful and honest, especially when calculation logic changes.

Do not use only generic text like:

```text
Bug fixes and improvements
```

## 2. Changelog categories

Use categories:

- Added;
- Changed;
- Fixed;
- Calculation changes;
- Catalog changes;
- PDF changes;
- Known issues.

## 3. Calculation changes

Any change that affects result, BOM, weight, power, price or warnings must be explicitly listed.

Example:

```text
Calculation changes:
- Updated truss fastener counting for node-to-truss connections.
- Fixed LED power cable count based on total power.
```

## 4. Catalog changes

Catalog updates must include:

- catalog name;
- version;
- affected items;
- whether values are verified/estimated.

## 5. Saved calculation behavior

If a calculation change affects old saved calculations:

- old snapshots remain unchanged;
- user may create copy and recalculate;
- changelog must mention the engine/catalog version change.

## 6. User-facing release notes

Store release notes should be short and clear.

Technical changelog can be longer in docs/app About screen.

## 7. Acceptance

Accepted when users and testers can understand what changed, especially for calculation output changes.
