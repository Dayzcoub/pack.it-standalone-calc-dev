# 01. Data Model Rules

## 1. Principle

Saved calculations must be predictable after app updates.

Do not store only raw input. Store both:

```text
input
resultSnapshot
```

This prevents old saved calculations from silently changing when formulas, catalogs or prices are updated.

## 2. SavedCalculation model

Recommended base model:

```ts
type SavedCalculation = {
  id: string;
  type: 'stage' | 'truss' | 'led';
  name: string;
  createdAt: string;
  updatedAt: string;
  input: StageInput | TrussInput | LedInput;
  resultSnapshot: StageResult | TrussResult | LedResult;
  priceProfileId: string;
  calculationEngineVersion: string;
  appVersion: string;
  pdfHistory?: PdfExportRecord[];
  notes?: string;
};
```

## 3. Snapshot rule

When opening an old saved calculation:

- show the saved snapshot first;
- do not silently recalculate;
- if engine version changed, show notice;
- allow user to create a recalculated copy.

Recommended action:

```text
Пересчитать по новой версии
```

Behavior:

```text
create duplicate → recalculate duplicate → keep original unchanged
```

## 4. Engine versioning

Every result must include:

```text
calculationEngineVersion
```

Example:

```text
stage-core@1.0.0
truss-core@1.0.0
led-core@1.0.0
```

This is required for:

- PDF traceability;
- regression debugging;
- future migrations;
- user trust.

## 5. Input locale

User input must accept both:

```text
7.2
7,2
```

Internal storage must use numeric SI values:

```text
meters as number
millimeters as number
kilograms as number
kilowatts/watts as number
money as number in minor/major agreed unit
```

Display uses Russian locale by default.

## 6. Price profiles

Architecture must support multiple price profiles even if v1.0 starts with one.

Recommended model:

```ts
type PriceProfile = {
  id: string;
  name: string;
  currency: 'RUB' | 'EUR' | 'USD';
  isDefault: boolean;
  stageDefaults: StagePricingDefaults;
  trussDefaults: TrussPricingDefaults;
  ledDefaults: LedPricingDefaults;
  createdAt: string;
  updatedAt: string;
};
```

Examples:

- Базовый;
- Сезонный;
- Для своих;
- Субаренда;
- Срочный монтаж.

## 7. Local storage keys

Use `packit.` prefix only:

```text
packit.settings.v1
packit.savedCalculations.v1
packit.priceProfiles.v1
packit.stageDraft.v1
packit.trussDraft.v1
packit.ledDraft.v1
```

Do not use old FEG keys for new data.

## 8. JSON import/export future

Even if JSON import/export is postponed, data models must be serializable.

Future features:

- export all calculations;
- import calculations;
- transfer between devices;
- backup before reinstall.

## 9. Drafts

Drafts are not the same as saved calculations.

Drafts:

```text
last unsaved state per calculator
```

Saved calculations:

```text
named user records with snapshot and version
```

## 10. Data acceptance

Data layer is accepted only when:

- saved calculations store input and resultSnapshot;
- engine version is stored;
- priceProfileId is stored;
- app can detect old calculation versions;
- data model is JSON-serializable;
- no silent destructive migration exists.
