# 01. UI Kit Rules

## 1. Goal

The UI kit exists to prevent pixel-by-pixel fixing during development.

All screens must be built from shared primitives and patterns, not one-off local CSS blocks.

## 2. Core components

Required shared components:

```text
AppShell
ScreenHeader
MetricCard
CalculatorTabs
Card
SectionCard
Button
IconButton
Input
Select
SegmentedControl
Switch
BottomActionBar
BomList
PriceSummary
SchemeViewport
ZoomControls
EmptyState
WarningChip
InfoChip
SavedCalculationCard
SettingsRow
```

## 3. Buttons

### Button variants

```text
primary
secondary
ghost
danger
success
```

### Button rules

- primary action uses accent outline/fill;
- secondary uses neutral card surface;
- danger uses red icon/text, not giant red fill by default;
- bottom actions must remain stable across calculators;
- no tiny primary buttons.

Minimum mobile height:

```text
44 px
```

Preferred bottom action height:

```text
52–58 px
```

## 4. Inputs

Input structure:

```text
Label
Field body
Value
Unit suffix
Error/helper text
```

Units must be explicit:

```text
м
мм
кг
кВт
₽
шт.
```

Do not hide units in placeholder text.

## 5. Segmented controls

Used for:

- calculator mode;
- yes/no options;
- hanging/standing;
- theme selection;
- saved filters.

Selected state:

- teal fill or strong teal border;
- clear contrast;
- no ambiguity.

## 6. Metric cards

Metric card structure:

```text
icon
label
value
optional unit/note
```

Examples:

```text
Размер — 7.2 × 4.8 м
Высота — 1.2 м
Модули — 24 шт.
Итого — 312 500 ₽
Вес — 142.6 кг
Питание — 220 В
```

Metric values should be visually stronger than labels.

## 7. Calculator tabs

Calculator screens use four tabs:

```text
Параметры
Схема
BOM
Цена
```

Rules:

- active tab uses teal underline;
- tab row position is stable;
- switching tabs does not change screen header or bottom action bar;
- tab labels must fit on 360 px width.

## 8. Cards

Standard card:

```text
background: panel/card token
border: subtle line
radius: 20–28 px
padding: 14–18 px
```

Large home cards may use:

```text
radius: 24–30 px
```

Do not use unrelated radius values for every block.

## 9. Scheme viewport

Scheme viewport must include:

- technical grid background;
- dimensions;
- structure drawing;
- zoom controls;
- fit/center controls;
- readable labels.

Renderer must receive structured `DrawingModel`, not manually drawn UI-specific values.

## 10. BOM view

On mobile, prefer cards/list over dense table.

BOM row card:

```text
Name
Category/SKU
Quantity + unit
Weight/price if available
Notes/warnings if any
```

Full tables may be used in PDF or wide/tablet views.

## 11. Price view

Price view must show:

- rental/modules;
- mounting;
- delivery;
- extra rows;
- total;
- currency;
- warnings/notes.

Total price must be visually dominant.

## 12. Bottom action bar

The bottom bar appears on calculator screens:

```text
Сохранить | PDF | Поделиться
```

Rules:

- sticky at bottom;
- respects safe-area inset;
- no layout jump between calculators;
- primary action is Save;
- PDF and Share are secondary.

## 13. Empty states

Every list-like screen needs an empty state:

- Saved calculations empty;
- BOM empty/impossible;
- PDF not generated;
- no warnings;
- no price profile.

Empty states should be technical and calm, not cartoonish.

## 14. Warnings

Warning levels:

```text
info
warning
danger
success
```

Examples:

- запас прочности OK;
- превышен пролёт;
- не хватает данных;
- PDF создан;
- расчёт сохранён.

## 15. Forbidden UI practices

Forbidden:

- inline styles;
- one-off CSS for a single block;
- arbitrary new colors;
- arbitrary radius values;
- hidden critical actions;
- page-level horizontal overflow;
- dense desktop table as primary mobile view;
- formulas inside UI components;
- old FEG class naming in new components.
