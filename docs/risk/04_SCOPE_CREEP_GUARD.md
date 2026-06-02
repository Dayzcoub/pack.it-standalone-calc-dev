# 04. Scope Creep Guard

## 1. v1.0 hard scope

v1.0 is:

```text
calculate → save → PDF → share
```

Included:

- Stage calculator;
- Truss calculator;
- LED calculator;
- saved calculations;
- PDF/share;
- RU/EN foundation;
- local settings;
- no ads.

## 2. Not v1.0 unless explicitly approved

- full CRM;
- clients database;
- cloud sync;
- teams/roles;
- warehouse;
- subscriptions/IAP;
- user accounts;
- push notifications;
- camera/photo attachments;
- online catalog marketplace;
- full 3D constructor.

## 3. Future features allowed as architecture only

- Pro entitlements;
- project packages;
- custom catalogs;
- custom LED cabinets;
- JSON/CSV export;
- combined PDF;
- technical PDF.

These may have docs and types, but must not become unfinished UI in production.

## 4. Decision rule

If a feature is not needed for first useful calculator release, it goes to future docs or feature flag.

## 5. Acceptance

Any new feature request must state:

- v1.0 requirement or future;
- user value;
- implementation risk;
- privacy/store impact;
- feature flag if not complete.
