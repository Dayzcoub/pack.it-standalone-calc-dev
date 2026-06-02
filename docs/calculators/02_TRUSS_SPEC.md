# 02. Truss Calculator Specification

## 1. Purpose

Truss calculator computes truss structures, BOM, fasteners, supports, load warnings, pricing, drawing model and PDF-ready result.

## 2. Supported modes

Required modes:

```text
portal
frame
stool\manual
```

User-facing labels:

```text
Портал
Рама
Табуретка
Ручной
```

## 3. TrussInput

```ts
type TrussInput = BaseCalculationInput & {
  system: string;
  mode: 'portal' | 'frame' | 'stool' | 'manual';
  widthM?: number;
  heightM?: number;
  depthM?: number;
  manualLegCount?: number | null;
  baseType?: string;
  placedParts?: TrussPlacedPart[];
  loadCheck?: TrussLoadInput;
  pricing: TrussPricingInput;
};
```

## 4. TrussPricingInput

```ts
type TrussPricingInput = {
  straightTrussPricePerMeter: number;
  nodePricePerPiece: number;
  basePricePerPiece: number;
  mountingPrice: number;
  deliveryPrice: number;
};
```

## 5. Catalog requirements

Required straight truss lengths:

```text
0.5 m
1.0 m
1.5 m
2.0 m
2.5 m
3.0 m
```

Required known nodes:

```text
U012 — default stool corner node
U017 — T-node for intermediate supports
U016
U020
U024
U022
```

Required base/support:

```text
base plate / блин / опорная площадка
```

Required fasteners:

```text
C2-88
C2-67
C2-2-48
half-cones / pins / cotters for bases if source logic requires
```

## 6. Critical accepted rules

### Max unsupported span

```text
Max unsupported span: 9 m
```

If a span exceeds 9 m:

- auto supports must be added if possible;
- U017 is used for intermediate legs/supports;
- user must see warning/info that supports were added;
- unsafe manual configuration must not silently pass.

### Stool auto-support

If `manualLegCount` is empty/null:

- add legs/supports so every top-frame span is <= 9 m;
- add intermediate support pairs;
- include U017;
- include legs/posts;
- include bases.

Examples:

```text
12 m → 2 extra legs/supports as accepted rule
24 m → 4 extra legs/supports as accepted rule
30 m → 6 extra legs/supports as accepted rule
```

### Manual legs

Manual leg count is respected only if it keeps all spans safe.

If unsafe:

- either auto-protect with warning;
- or block with danger warning depending on final UX decision.

Default preference:

```text
auto-protect and warn
```

## 7. Split logic

Split must avoid bad small fragments where a better exact combination exists.

Accepted example:

```text
4.5 m → 2.5 + 2.0
```

Do not prefer:

```text
3.0 + 1.5
```

if accepted project rule says balanced/larger usable pieces are preferred.

Need deterministic algorithm and tests.

## 8. Fastener logic

Fastener counts must come from actual joints, not hand-entered values.

Required:

- truss-truss connection;
- truss-node connection;
- node-node connection if relevant;
- base connection;
- support/leg connection.

Existing accepted rule from FEG project should be preserved during extraction.

## 9. Load check

Load check input example:

```ts
type TrussLoadInput = {
  appliedLoadKg?: number;
  allowedLoadKg?: number;
  spanM?: number;
  points?: number;
};
```

Load status:

```text
success — reserve OK
warning — close to limit
 danger — overload
info — not enough data
```

Wording must be careful: reference calculation only, not certified approval.

## 10. Required summary metrics

```text
Пролёт / размер
Вес
Точки подвеса / стойки
Итого
```

For stool, metrics may include:

```text
Размер
Опоры
Вес
Итого
```

## 11. Required BOM groups

```text
Прямые фермы
Узлы
Опоры / базы
Ноги / стойки
Крепёж
Дополнительно
```

## 12. Drawing model requirements

Truss drawing must support:

- front view for portal/frame;
- top/front for stool where needed;
- dimensions;
- bases;
- legs/supports;
- aluminum truss visual style;
- labels;
- PDF export.

Important visual rule:

```text
Truss tubes must look round/cylindrical in illustrations where detailed.
```

## 13. Validation

Blocking:

- missing mode;
- invalid width/span <= 0;
- invalid height for portal/frame;
- no valid split;
- negative prices;
- unsafe truss with no auto-protection possible.

Warnings:

- auto supports added;
- weight partially unknown;
- load check missing;
- overload;
- high weight;
- manual legs adjusted/ignored for safety.

## 14. PDF behavior

Truss PDF must include:

- mode;
- dimensions;
- scheme;
- BOM;
- fasteners;
- bases/supports;
- weight;
- load warnings;
- price;
- disclaimer.

## 15. Regression tests

Required:

```text
Truss / portal 8 × 4
Truss / frame 8 × 4
Truss / stool 12 m auto supports
Truss / stool 24 m auto supports
Truss / stool 30 m auto supports
Truss / manual legs safe
Truss / manual legs unsafe
Truss / split 4.5 m = 2.5 + 2.0
Truss / fasteners count
Truss / base count
Truss / load OK
Truss / load overload
Truss / invalid zero span
```

## 16. Acceptance

Truss core accepted only when:

- portal/frame/stool/manual contracts exist;
- max 9 m rule works;
- U017 intermediate supports work;
- split tests pass;
- fasteners derive from joints;
- load warnings are structured;
- drawingModel renders scheme;
- PDF consumes TrussResult;
- no UI formulas are needed.
