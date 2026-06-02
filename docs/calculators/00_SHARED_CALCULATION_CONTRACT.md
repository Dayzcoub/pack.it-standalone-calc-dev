# 00. Shared Calculation Contract

## 1. Purpose

All calculators must return a consistent result shape.

This allows shared UI, saved calculations, PDF export and regression tests.

## 2. Base calculation input

Every calculator input should include:

```ts
type BaseCalculationInput = {
  calculationName?: string;
  priceProfileId: string;
  locale: 'ru-RU';
  currency: 'RUB' | 'EUR' | 'USD';
};
```

## 3. Base calculation result

```ts
type BaseCalculationResult = {
  id?: string;
  kind: 'stage' | 'truss' | 'led';
  title: string;
  calculationEngineVersion: string;
  createdAt?: string;
  updatedAt?: string;
  summary: SummaryMetric[];
  bom: BomGroup[];
  price: PriceSummary;
  warnings: CalculationWarning[];
  drawingModel: DrawingModel;
  meta: CalculationMeta;
};
```

## 4. SummaryMetric

```ts
type SummaryMetric = {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
};
```

Examples:

```text
Размер — 7.2 × 4.8 м
Высота — 1.2 м
Модули — 24 шт.
Вес — 142.6 кг
Итого — 67 450 ₽
```

## 5. BOM model

```ts
type BomGroup = {
  id: string;
  title: string;
  rows: BomRow[];
};
```

```ts
type BomRow = {
  id: string;
  category: string;
  name: string;
  sku?: string;
  unit: 'pcs' | 'm' | 'm2' | 'kg' | 'set';
  quantity: number;
  unitWeightKg?: number;
  totalWeightKg?: number;
  unitPrice?: number;
  totalPrice?: number;
  notes?: string[];
  source?: 'stage' | 'truss' | 'led' | 'shared';
};
```

## 6. PriceSummary

```ts
type PriceSummary = {
  currency: 'RUB' | 'EUR' | 'USD';
  rental: number;
  mounting: number;
  delivery: number;
  extras: number;
  discount: number;
  subtotal: number;
  total: number;
  rows: PriceRow[];
};
```

```ts
type PriceRow = {
  id: string;
  label: string;
  amount: number;
  category: 'rental' | 'mounting' | 'delivery' | 'extra' | 'discount';
  notes?: string[];
};
```

## 7. Warnings

```ts
type CalculationWarning = {
  id: string;
  code: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  fieldPath?: string;
  relatedBomRowIds?: string[];
  blocksExport?: boolean;
};
```

## 8. DrawingModel

```ts
type DrawingModel = {
  kind: 'stage' | 'truss' | 'led';
  units: 'm' | 'mm';
  view: 'top' | 'front' | 'side' | 'iso';
  bounds: {
    width: number;
    height: number;
  };
  elements: DrawingElement[];
  dimensions: DrawingDimension[];
  labels: DrawingLabel[];
};
```

## 9. CalculationMeta

```ts
type CalculationMeta = {
  inputHash?: string;
  sourceCatalogVersion: string;
  priceProfileId: string;
  hasBlockingErrors: boolean;
  hasWarnings: boolean;
  totalWeightKg?: number;
};
```

## 10. Formatting rules

Core returns numeric values.

UI formats values using locale helpers.

Do not return localized strings from core except labels/titles that are explicitly part of copy model.

## 11. NaN protection

Core must never return:

```text
NaN
Infinity
undefined quantity
negative impossible counts
```

Invalid inputs return structured danger warnings and safe empty/partial result where possible.

## 12. Shared contract acceptance

Accepted when:

- all calculators can return BaseCalculationResult-compatible output;
- saved calculations can store resultSnapshot;
- PDF can consume result without recalculating;
- UI can render summary/BOM/price/warnings without calculator-specific hacks.
