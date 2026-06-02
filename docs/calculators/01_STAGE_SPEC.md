# 01. Stage Calculator Specification

## 1. Purpose

Stage calculator computes stage platform configuration, BOM, pricing, drawing model and PDF-ready result.

## 2. Stage modes/systems

Required systems from source project:

```text
Imlight Copy
PKC / ШИП-ПАЗ
PKC / ПАЗ-ПАЗ
```

Internal ids:

```text
imlight-copy
pkc-ship-paz
pkc-paz-paz
```

## 3. StageInput

```ts
type StageInput = BaseCalculationInput & {
  system: 'imlight-copy' | 'pkc-ship-paz' | 'pkc-paz-paz';
  widthM: number;
  depthM: number;
  heightM: number;
  deckType: string;
  postType?: string;
  railType?: string;
  stairs: {
    enabled: boolean;
    count: number;
    widthM?: number;
  };
  closure: {
    enabled: boolean;
    type?: 'fabric' | 'banner';
    sides?: StageClosureSide[];
  };
  pricing: StagePricingInput;
};
```

## 4. StagePricingInput

```ts
type StagePricingInput = {
  moduleRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  skirtPricePerMeter?: number;
  stairsPrice?: number;
};
```

## 5. Required summary metrics

```text
Размер
Высота
Модули / элементы
Вес, если доступен
Итого
```

## 6. Required BOM groups

```text
Настил
Ноги / опоры
Рамы / балки
Соединители
Лестницы
Закрытие / юбка
Дополнительно
```

## 7. System-specific rules

### Imlight Copy

Preserve existing old stage calculation behavior from source.

Must count:

- stage modules/decks;
- legs/posts;
- rails/crossbars if applicable;
- stairs;
- closure;
- price.

### PKC / ШИП-ПАЗ

Must count:

- SS-PS modules;
- shared-grid legs;
- no Imlight crossbars where source logic excludes them;
- relevant connectors.

### PKC / ПАЗ-ПАЗ

Must count:

- SS-PP modules;
- 4 legs per module;
- SD-LM-T;
- SD-LM-X;
- SD-LM-SS connectors;
- relevant accessories.

## 8. Drawing model requirements

Stage drawing must support:

- top view;
- deck/module grid;
- dimensions width/depth;
- stairs marker;
- optional closure marker;
- labels;
- export to PDF.

Future optional:

- front view;
- height visualization;
- isometric view.

## 9. Validation

Blocking:

- width <= 0;
- depth <= 0;
- height <= 0;
- missing system;
- invalid negative price.

Warnings:

- unusually large stage area;
- closure enabled but type missing;
- stairs enabled but count <= 0;
- dimensions not aligned to module grid if relevant;
- missing weights for some parts.

## 10. Default values

Initial defaults may follow accepted standalone behavior, but must be documented once extracted from source.

Required defaults to define during extraction:

- default width;
- default depth;
- default height;
- default system;
- default deck type;
- default pricing;
- default stairs state;
- default closure state.

## 11. UI behavior

Stage calculator uses shared tabs:

```text
Параметры / Схема / BOM / Цена
```

Parameters tab may include scheme preview because stage result is strongly visual.

## 12. PDF behavior

Stage PDF must include:

- dimensions;
- system;
- height;
- BOM;
- stairs/closure if enabled;
- price;
- scheme;
- disclaimer.

## 13. Regression tests

Required:

```text
Stage / Imlight Copy / 7.2 × 4.8 × 0.8
Stage / PKC ШИП-ПАЗ / 7.2 × 4.8 × 0.8
Stage / PKC ПАЗ-ПАЗ / 7.2 × 4.8 × 0.8
Stage / stairs enabled
Stage / closure fabric
Stage / closure banner
Stage / invalid zero width
Stage / negative price warning
```

## 14. Acceptance

Stage core accepted only when:

- systems are implemented;
- BOM matches accepted source scenarios;
- price is stable;
- drawingModel renders scheme;
- PDF consumes StageResult;
- invalid input returns structured warnings, not broken UI.
