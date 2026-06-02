# 00. No Ads and Future Pro Strategy

## 1. Decision

PACK.IT v1.0 must not include advertising.

Decision:

```text
No ads in v1.0.
No ad SDK.
No tracking SDK.
No analytics SDK.
No ad banners.
No interstitials.
No rewarded ads.
```

Reason:

PACK.IT is a professional technical calculator for field work. Advertising would reduce trust, complicate privacy/store review and damage the premium technical product feeling.

## 2. v1.0 monetization position

v1.0 can be released as:

```text
free app without ads
```

or internal/beta before monetization.

The goal of v1.0 is:

- validate calculations;
- validate UX;
- validate PDF/export;
- get early professional users;
- avoid privacy complexity;
- build trust.

## 3. Future monetization direction

Future releases may introduce:

```text
PACK.IT Pro
```

Possible model:

- one-time purchase;
- subscription;
- Pro unlock package;
- business license later.

Final payment model is not decided yet.

## 4. Free version principle

Free version should remain useful and professional.

Possible Free features:

- basic Stage calculator;
- basic Truss calculator;
- basic LED calculator;
- limited saved calculations if needed;
- single PDF mode;
- local-only operation;
- RU/EN language;
- no ads.

## 5. Pro feature candidates

Possible Pro features:

- unlimited saved calculations;
- combined PDF;
- client and technical PDF modes;
- PDF without PACK.IT footer/watermark if watermark is used;
- custom truss catalogs;
- custom LED modules/cabinets;
- JSON import/export;
- BOM CSV export;
- advanced price profiles;
- project packages;
- professional mode;
- advanced warnings/checks;
- cloud sync in future if implemented.

## 6. Entitlements foundation

Architecture must allow future Pro features without rewriting core.

Recommended model:

```ts
type EntitlementKey =
  | 'unlimitedSavedCalculations'
  | 'combinedPdf'
  | 'technicalPdf'
  | 'customTrussCatalogs'
  | 'customLedCabinets'
  | 'jsonImportExport'
  | 'bomCsvExport'
  | 'advancedPriceProfiles'
  | 'projectPackages'
  | 'proMode';
```

```ts
type Entitlements = Record<EntitlementKey, boolean>;
```

## 7. Feature gates

Feature gates must be user-friendly.

Do not hide unavailable Pro features in a confusing way.

Preferred:

- show Pro badge;
- explain value;
- allow preview where safe;
- do not block basic calculation workflow.

## 8. Store privacy impact

No ads means privacy remains simpler:

- no ad SDK;
- no advertising ID;
- no tracking prompt;
- no ad network data disclosures;
- no third-party ad consent UI.

If Pro purchases are added later, privacy/store forms must be updated to include purchase-related data handled by App Store/Google Play and any backend if introduced.

## 9. IAP timing

Do not add in-app purchases in Task 001 foundation.

Future phase:

```text
Monetization Phase / Pro Entitlements
```

Before adding IAP:

- define Free/Pro matrix;
- define prices;
- define product ids;
- update Store docs;
- update QA tests;
- update privacy/support docs.

## 10. Product ids draft

Possible future ids:

```text
packit.pro.monthly
packit.pro.yearly
packit.pro.lifetime
packit.remove_limitations
```

Not final.

## 11. Acceptance

Monetization strategy is accepted when:

- no ads are included;
- no ad SDK exists;
- no tracking is added;
- free app remains usable;
- Pro is represented only as future-ready entitlement architecture;
- any future IAP work is isolated from core calculators.
