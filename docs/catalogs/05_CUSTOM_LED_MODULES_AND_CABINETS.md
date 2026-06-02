# 05. Custom LED Modules and Self-Built Cabinets

## 1. Purpose

PACK.IT LED calculator must support not only fixed factory LED cabinets, but also future customization for self-built LED cabinets/modules and related parts.

v1.0 may include one default cabinet, but architecture must allow custom LED module/cabinet definitions.

## 2. Product requirement

The LED calculator must eventually allow the user to define:

- module size;
- cabinet size;
- module grid inside cabinet;
- pixel pitch;
- pixel resolution;
- weight;
- power;
- receiver card/control parts;
- PSU/power parts;
- frame/case parts;
- hanging/standing hardware;
- service/access side;
- custom BOM rows.

## 3. LED catalog layers

Recommended separation:

```text
LED module
LED cabinet
LED mounting kit
LED power kit
LED signal/control kit
LED custom BOM parts
```

## 4. LED module model

```ts
type LedModuleSpec = {
  id: string;
  label: LocalizedLabel;
  widthMm: number;
  heightMm: number;
  pixelPitchMm?: number;
  pixelsX?: number;
  pixelsY?: number;
  weightKg?: number;
  powerW?: number;
  notes?: string[];
};
```

Examples:

```text
P4.0 module 320×160
P3.91 module 250×250
custom module 320×320
```

## 5. LED cabinet model

```ts
type LedCabinetSpec = {
  id: string;
  label: LocalizedLabel;
  type: 'factory-cabinet' | 'self-built-cabinet';
  widthMm: number;
  heightMm: number;
  depthMm?: number;
  weightKg?: number;
  powerW?: number;
  inrushW?: number;
  pixelsX?: number;
  pixelsY?: number;
  moduleLayout?: {
    moduleId: string;
    columns: number;
    rows: number;
  };
  mountingKitId?: string;
  powerKitId?: string;
  controlKitId?: string;
  customBomRows?: LedCustomBomRow[];
  notes?: string[];
};
```

## 6. Self-built cabinet calculation

For self-built cabinet:

```text
cabinet width = module width × module columns
cabinet height = module height × module rows
cabinet pixelsX = module pixelsX × module columns
cabinet pixelsY = module pixelsY × module rows
cabinet power = module power × module count + optional PSU/control overhead
cabinet weight = module weight × module count + frame/control/power hardware
```

If any value is missing, show warning and allow partial calculation only if safe.

## 7. Mounting kit model

```ts
type LedMountingKit = {
  id: string;
  label: LocalizedLabel;
  supportsHanging: boolean;
  supportsStanding: boolean;
  hangingBarRule?: 'per-top-cabinet' | 'custom';
  spansetRule?: 'per-bar' | 'custom';
  legOptions?: LedLegOption[];
  cookieBoltRules?: LedHardwareRule[];
};
```

## 8. Power kit model

```ts
type LedPowerKit = {
  id: string;
  label: LocalizedLabel;
  maxPowerPerInputW: number;
  defaultVoltage: '220V' | '110V' | 'custom';
  cableRule: 'ceil-total-power-over-max-input' | 'custom';
  includesPowerConSchuko?: boolean;
  notes?: string[];
};
```

Known current rule to preserve as configurable:

```text
Power cable count = ceil(totalPowerW / 3400)
```

## 9. Control kit model

```ts
type LedControlKit = {
  id: string;
  label: LocalizedLabel;
  receiverCardPerCabinet?: number;
  hubCardPerCabinet?: number;
  signalCableRule?: string;
  notes?: string[];
};
```

## 10. Custom BOM rows

Users should eventually be able to add related parts:

- receiver cards;
- power supplies;
- hub cards;
- frames;
- screws;
- cables;
- processors/senders;
- rigging hardware.

```ts
type LedCustomBomRow = {
  id: string;
  label: LocalizedLabel;
  unit: 'pcs' | 'm' | 'set';
  quantityRule: 'per-cabinet' | 'per-module' | 'per-construction' | 'fixed' | 'custom';
  quantityValue?: number;
  weightKg?: number;
  unitPrice?: number;
};
```

## 11. UI requirements for custom LED

v1.0 may hide custom cabinet editor, but architecture must allow it.

Future UI flow:

```text
Settings → Catalogs → LED cabinets → Add custom cabinet
```

Custom cabinet editor sections:

```text
Basic size
Module layout
Power
Weight
Mounting
Control
Custom BOM
Preview
```

## 12. Validation

Blocking:

- module width/height <= 0;
- cabinet width/height <= 0;
- self-built cabinet without module layout;
- negative weight/power/price;
- invalid module rows/columns.

Warnings:

- missing power data;
- missing weight data;
- missing control kit;
- custom cabinet not verified;
- high power;
- high weight.

## 13. PDF behavior

PDF for custom LED must show:

- cabinet type;
- module layout;
- pixel pitch/resolution if available;
- power basis;
- weight basis;
- custom BOM rows;
- warning that custom cabinet data is user-defined if applicable.

## 14. Acceptance

Custom LED extensibility is accepted when:

- core supports `factory-cabinet` and `self-built-cabinet` types;
- module layout can derive cabinet dimensions/resolution/power/weight;
- mounting/power/control kits are configurable;
- custom BOM rows can be included;
- user-defined values are marked clearly;
- missing data produces warnings instead of broken results.
