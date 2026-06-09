# 00. Standalone Administration Model

## 1. Final decision

This product line remains a standalone/offline calculator app for fast construction calculations.

Decision:

```text
No backend for this app line.
No cloud admin panel.
No accounts.
No workspace administration.
No server-side catalog management.
```

The app is not a CRM, ERP, warehouse system or cloud platform.

## 2. What “administration” means in this app

Administration in this standalone calculator means:

- local user settings;
- local price profiles;
- built-in versioned catalogs;
- app releases through App Store / Google Play;
- docs/changelog/versioning;
- optional local import/export in future.

It does not mean server-side user/admin management.

## 3. v1.0 administration

v1.0 administration is local and release-based.

### Local user-controlled areas

User can manage:

- saved calculations;
- drafts;
- price settings/profiles;
- app language/theme settings;
- generated PDFs through OS file/share flows.

### Developer/release-controlled areas

Developer controls through app updates:

- calculation formulas;
- built-in catalog values;
- default presets;
- PDF templates;
- translations;
- disclaimers;
- UI changes.

## 4. Built-in catalogs

Built-in catalogs are read-only in v1.0.

Catalog changes happen through versioned app releases:

```text
stage-catalog@1.0.0
truss-catalog@1.0.0
led-catalog@1.0.0
```

If catalog values change, changelog and version metadata must be updated.

## 5. Calculation formulas

Calculation formulas are not editable from an admin panel.

Formula changes happen in code:

```text
stage-core@x.y.z
truss-core@x.y.z
led-core@x.y.z
```

Old saved snapshots must not be silently recalculated.

## 6. Future local Pro administration

Future Pro may add local-only administration features:

- multiple price profiles;
- custom LED cabinet definitions;
- custom truss catalog definitions;
- JSON import/export;
- backup/restore;
- custom PDF logo/footer if legally/product-approved.

These must remain local/offline unless a separate product line is created.

## 7. Explicitly out of scope

Do not add to this app line:

- backend;
- Supabase/Firebase/server API;
- login/account system;
- workspace roles;
- cloud sync;
- remote config;
- server admin panel;
- moderation;
- user management;
- remote catalog publishing;
- analytics dashboard.

## 8. If cloud is ever needed

If cloud/workspace/backend features are ever desired, they must become a separate product decision and likely a separate app/product line, not a hidden expansion of the standalone calculator.

This repository should continue to protect the standalone calculator scope.

## 9. Acceptance

Accepted when:

- app works fully offline;
- no backend dependency exists;
- no network is required for core workflow;
- all admin-like behavior is local or release-based;
- future cloud/admin ideas do not enter v1.0 foundation.
