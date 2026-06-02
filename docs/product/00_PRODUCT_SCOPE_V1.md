# 00. Product Scope v1

## 1. Product

Product name:

```text
ПАК.ИТ Калькуляторы / PACK.IT Calculators
```

Purpose:

```text
Mobile offline-first calculators for stage platforms, truss structures and LED screens.
```

## 2. v1.0 scope

Included in v1.0:

- Stage calculator;
- Truss calculator;
- LED calculator;
- local saved calculations;
- price settings;
- PDF export;
- native share;
- dark theme default;
- light theme optional;
- safety disclaimer;
- local-only storage;
- no account required.

## 3. v1.0 exclusions

Excluded from v1.0:

- user accounts;
- backend;
- Supabase;
- cloud sync;
- CRM;
- warehouse movements;
- roles/workspaces;
- push notifications;
- analytics;
- ads;
- subscriptions;
- team sharing;
- camera/location/contact permissions;
- public marketplace/catalog sync.

## 4. Product mode

v1.0 is:

```text
offline-first professional utility
```

Not:

```text
cloud CRM
team platform
warehouse system
public marketplace
```

## 5. Primary user flows

### Flow 1 — Quick calculation

```text
Open app → choose Stage/Truss/LED → enter dimensions/options → see summary/scheme/BOM/price → save/share PDF
```

### Flow 2 — Reopen saved calculation

```text
Open Saved → filter type → open calculation → view snapshot → optionally duplicate/recalculate
```

### Flow 3 — Price profile setup

```text
Open Settings → choose active price profile → edit defaults → calculators use selected profile
```

## 6. Future-ready decisions

Even if not implemented in v1.0, architecture must allow:

- multiple price profiles;
- JSON export/import;
- client/technical PDF modes;
- calculation engine versioning;
- formula migrations;
- professional mode;
- cloud sync later;
- subscriptions/entitlements later.

## 7. Calculation responsibility

The app is a calculation assistant, not an engineering authority.

The product must state that calculations are reference-only and must be verified against equipment passports, manufacturer requirements, safety norms and qualified specialist responsibility.

## 8. Public release caveat

Before public Store release:

- verify PACK.IT trademark/name conflicts;
- verify app name availability;
- verify domain/support URL;
- verify asset/font/library licenses.
