# 03. Core Logic Extraction Plan

## 1. Цель

Перенести из `Feg_Calc_Stage` всю рабочую расчётную логику Stage / Truss / LED в новый typed `core/`, не перенося старую UI/DOM/PWA/FEG-обвязку.

Результат каждого переноса:

```text
input → pure calculation → result
```

Без DOM, localStorage, PDF, React, CSS and runtime side effects.

## 2. Общий порядок extraction

Для каждого калькулятора:

1. Найти текущие источники логики.
2. Выписать входные параметры.
3. Выписать default values.
4. Выписать каталоги.
5. Выписать формулы.
6. Выписать BOM rows.
7. Выписать pricing rules.
8. Выписать warnings.
9. Выписать drawing requirements.
10. Создать TypeScript contracts.
11. Перенести pure logic.
12. Создать regression tests.
13. Сравнить результат со старой версией вручную на эталонных сценариях.

## 3. Stage extraction

### 3.1 Stage input

Минимальный контракт:

```ts
type StageInput = {
  system: 'imlight-copy' | 'pkc-ship-paz' | 'pkc-paz-paz';
  widthM: number;
  depthM: number;
  heightM: number;
  deckType: string;
  postType?: string;
  railType?: string;
  hasStairs: boolean;
  hasSkirt: boolean;
  skirtType?: 'fabric' | 'banner';
  pricing: StagePricingInput;
};
```

### 3.2 Stage output

```ts
type StageResult = CalculationResult & {
  kind: 'stage';
  stageSystem: StageSystem;
};
```

### 3.3 Stage rules to preserve

- Imlight Copy old calculation preserved.
- PKC ШИП-ПАЗ counts SS-PS modules and shared-grid legs without Imlight crossbars.
- PKC ПАЗ-ПАЗ counts SS-PP modules, 4 legs per module, SD-LM-T, SD-LM-X, SD-LM-SS connectors.
- Stairs are optional BOM rows.
- End closure/skirt is optional BOM/pricing row.
- Height affects legs/posts and summary.
- Pricing includes module/rental + mounting + delivery.

### 3.4 Stage tests

Required tests:

```text
stage/imlight-copy-7_2x4_8x0_8
stage/pkc-ship-paz-7_2x4_8x0_8
stage/pkc-paz-paz-7_2x4_8x0_8
stage/with-stairs
stage/with-skirt-fabric
stage/with-skirt-banner
stage/pricing-mounting-delivery
```

## 4. Truss extraction

### 4.1 Truss input

```ts
type TrussInput = {
  mode: 'portal' | 'frame' | 'stool' | 'manual';
  widthM?: number;
  heightM?: number;
  depthM?: number;
  manualLegCount?: number | null;
  selectedParts?: TrussPlacedPart[];
  pricing: TrussPricingInput;
  loadCheck?: TrussLoadInput;
};
```

### 4.2 Truss catalogs

Catalogs must be static typed data:

```ts
type TrussPart = {
  id: string;
  kind: 'straight' | 'node-2d' | 'node-3d' | 'base' | 'fastener';
  name: string;
  lengthM?: number;
  widthMm?: number;
  depthMm?: number;
  heightMm?: number;
  weightKg?: number;
  rentalUnitPrice?: number;
};
```

Required straight lengths:

```text
0.5 / 1 / 1.5 / 2 / 2.5 / 3 m
```

Required known node logic:

- U012 default stool corner node;
- U017 T-node for intermediate supports;
- U016 / U020 / U024 / U022 can remain catalog entries if needed;
- node dimensions must affect linear length where applicable.

### 4.3 Truss rules to preserve

- Portal: two posts + top beam + bases.
- Frame: rectangular frame, no base default unless logic requires.
- Stool: top frame + legs + bases.
- Empty leg count means automatic support logic.
- Max unsupported span: 9 m.
- If span > 9 m, add intermediate support pairs.
- U017 is used for intermediate legs/supports.
- Manual legs are respected if they satisfy max span; otherwise auto logic must still protect unsafe spans.
- Split should prefer usable larger pieces and avoid unnecessary small fragments.
- Bases add base BOM and base fasteners.
- C2 fasteners counted from actual joints.
- Weight and price must be calculated from actual BOM.

### 4.4 Truss tests

Required tests:

```text
truss/portal-8x4
truss/frame-8x4
truss/stool-12-auto-supports
truss/stool-24-auto-supports
truss/stool-manual-legs-valid
truss/stool-manual-legs-invalid-auto-protects
truss/split-4_5-prefers-2_5-plus-2
truss/c2-fastener-count
truss/base-fastener-count
truss/weight-summary
truss/load-warning-ok
truss/load-warning-overload
```

## 5. LED extraction

### 5.1 LED input

```ts
type LedInput = {
  cabinet: LedCabinetSpec;
  constructions: LedConstructionInput[];
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

### 5.2 LED cabinet catalog

Catalog should include at minimum:

- widthMm;
- heightMm;
- weightKg;
- powerW;
- inrushW if used;
- pixelsX;
- pixelsY;
- label.

### 5.3 LED rules to preserve

- Cabinet grid calculated from width/height and cabinet size.
- Total cabinets = columns × rows.
- Aspect ratio shown per construction.
- Hanging Bar count follows top cabinet count.
- Spanset/shackle count follows bars if current logic requires.
- Standing legs affect cookies/bolts.
- Power cable count follows current power rule.
- Multi-construction totals sum across constructions.
- Active construction is UI state, not core total logic.
- Pricing includes module/cabinet rental + mounting + delivery.

### 5.4 LED tests

Required tests:

```text
led/5_12x2_56-cabinet-640
led/hanging-only
led/standing-only
led/hanging-and-standing
led/multiple-constructions-total
led/hanging-bar-count
led/power-cable-count
led/weight-summary
led/pricing-mounting-delivery
```

## 6. Shared extraction

### 6.1 BOM

Create a single BOM model that all calculators use.

Fields:

- id;
- category;
- name;
- sku;
- unit;
- quantity;
- unitWeightKg;
- totalWeightKg;
- unitPrice;
- totalPrice;
- notes;
- source calculator.

### 6.2 Pricing

Shared pricing must support:

- rental/module price;
- mounting;
- delivery;
- extra rows;
- discount later;
- currency.

### 6.3 Warnings

Warnings should be structured:

```ts
type CalculationWarning = {
  code: string;
  severity: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  relatedBomIds?: string[];
};
```

### 6.4 Drawing model

Drawing model must be shared but flexible:

```ts
type DrawingElement =
  | StageDeckElement
  | TrussPartElement
  | LedCabinetElement
  | LabelElement
  | DimensionElement;
```

Renderer consumes this model only.

## 7. Migration acceptance

Each core module is accepted only when:

- TypeScript compiles;
- tests pass;
- no UI imports exist in core;
- expected BOM matches old app on regression scenarios;
- expected price matches old app;
- expected warnings match old app;
- drawingModel contains enough information for renderer and PDF.
