# 03. LED Calculator Specification

## 1. Purpose

LED calculator computes LED screen cabinet grid, mounting parts, power, weight, BOM, pricing, drawing model and PDF-ready result.

## 2. Supported construction concepts

Required:

```text
single LED construction
multiple LED constructions
active construction selection
hanging mode
standing mode
hanging + standing combined mode
```

Active construction is UI state. Core totals must sum all constructions.

## 3. LedInput

```ts
type LedInput = BaseCalculationInput & {
  cabinetId: string;
  constructions: LedConstructionInput[];
  activeConstructionId?: string;
  pricing: LedPricingInput;
};
```

```ts
type LedConstructionInput = {
  id: string;
  name: string;
  widthM: number;
  heightM: number;
  mountMode: {
    hanging: boolean;
    standing: boolean;
  };
  legType?: '3m' | '2_5m' | '2m';
};
```

## 4. LedPricingInput

```ts
type LedPricingInput = {
  cabinetRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  hangingBarPrice?: number;
  legPrice?: number;
};
```

## 5. Cabinet catalog

Required cabinet fields:

```ts
type LedCabinetSpec = {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  weightKg: number;
  powerW: number;
  inrushW?: number;
  pixelsX?: number;
  pixelsY?: number;
  pixelPitchMm?: number;
};
```

Known default from previous project context:

```text
640 × 640 mm cabinet
14 kg
320 W
600 W inrush if used
160 × 160 pixels if used
```

These values must be verified during source extraction before finalizing tests.

## 6. Cabinet grid rules

For each construction:

```text
columns = width / cabinetWidth
rows = height / cabinetHeight
total cabinets = columns × rows
```

If dimensions are not divisible by cabinet size:

- do not silently create impossible fractional cabinets;
- show warning;
- either round to nearest cabinet grid with clear message or block calculation depending on final UX decision.

Default preference:

```text
show warning and snap/round explicitly only if user confirms or field UI makes it clear
```

## 7. Mounting rules

### Hanging

If hanging enabled:

- Hanging Bar count follows top cabinet count or accepted source formula;
- spanset/shackle count follows bars if accepted source formula requires;
- hanging parts appear in BOM.

### Standing

If standing enabled:

- legs are included;
- leg type affects BOM;
- cookies/bolts are included according to accepted source formula.

### Hanging + Standing

If both enabled:

- both groups appear in BOM;
- warnings may be shown if combination requires checking.

## 8. Power rules

LED result must include:

- total power W/kW;
- per-square-meter estimate if used;
- power cable count by accepted source rule;
- voltage/frequency display if fixed at 220 V / 50-60 Hz;
- warnings for high power.

Known previous rule to verify:

```text
PowerCON-Schuko count = ceil(totalPowerW / 3400)
```

## 9. Required summary metrics

```text
Размер
Кабинеты
Вес
Итого
```

On scheme/price views also show:

```text
Мощность
Hanging Bar
Питание
```

## 10. Required BOM groups

```text
Кабинеты
Подвес
Напольные опоры
Крепёж
Питание
Дополнительно
```

## 11. Drawing model requirements

LED drawing must support:

- cabinet grid;
- front view;
- dimensions;
- active construction chip;
- cabinet count label;
- mount indicators;
- export to PDF.

For performance, large LED grids should not render thousands of pixel/dot DOM nodes.

Use optimized SVG pattern/canvas strategy if needed.

## 12. Validation

Blocking:

- missing cabinet;
- width <= 0;
- height <= 0;
- no constructions;
- negative prices.

Warnings:

- size not divisible by cabinet;
- high weight;
- high power;
- no mount mode selected;
- hanging selected but hanging parts unavailable;
- standing selected but leg type missing;
- unknown cabinet weight/power.

## 13. PDF behavior

LED PDF must include:

- dimensions;
- cabinet type;
- cabinet grid;
- total cabinets;
- power;
- weight;
- mounting BOM;
- price;
- warnings;
- disclaimer.

## 14. Regression tests

Required:

```text
LED / 5.12 × 2.56 / 640 mm cabinet
LED / hanging only
LED / standing only
LED / hanging + standing
LED / multiple constructions total
LED / Hanging Bar count
LED / power cable count
LED / high power warning
LED / invalid zero width
LED / non-divisible cabinet size warning
```

## 15. Acceptance

LED core accepted only when:

- cabinet grid is deterministic;
- multi-construction totals are correct;
- hanging/standing BOM is correct;
- power and weight are calculated;
- warnings are structured;
- drawingModel renders grid;
- PDF consumes LedResult;
- no UI formulas are needed.
