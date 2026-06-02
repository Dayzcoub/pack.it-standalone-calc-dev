# 02. Validation and Warnings

## 1. Goal

The app must never fail silently.

If input is incomplete, impossible or risky, the user must see:

```text
what is wrong
where it is wrong
how to fix it
how serious it is
```

## 2. Warning levels

```ts
type WarningSeverity = 'info' | 'success' | 'warning' | 'danger';
```

### info

Neutral note.

### success

Everything is OK, for example load reserve is acceptable.

### warning

Needs attention but calculation can continue.

### danger

Unsafe/impossible/invalid state. PDF/export may need blocking depending on case.

## 3. General validation rules

- dimensions must be greater than 0;
- price values cannot be negative;
- counts must be whole numbers where required;
- units must be explicit;
- required catalog/system fields must be selected;
- user input accepts decimal dot and comma;
- empty optional fields must have defined behavior.

## 4. Stage warnings

Possible warnings:

- width is missing;
- depth is missing;
- height is missing;
- stage area is unusually large;
- stairs selected but impossible/missing parameters;
- end closure enabled but material/type missing;
- unsupported stage system;
- price profile has missing stage defaults.

## 5. Truss warnings

Possible warnings:

- span is missing;
- height is missing;
- unsupported span without intermediate support;
- auto-supports were added;
- manual leg count is unsafe;
- load exceeds allowed value;
- missing base/support type;
- no valid split found;
- unknown node dimensions;
- weight cannot be calculated for some parts.

Important truss rule:

```text
Max unsupported span: 9 m
```

If a span exceeds 9 m, the app must protect the user with auto-supports or a clear danger warning.

## 6. LED warnings

Possible warnings:

- width is missing;
- height is missing;
- size is not divisible by cabinet size;
- app rounded cabinet grid;
- mount mode not selected;
- hanging selected but hanging parts missing;
- standing selected but legs missing;
- high total weight;
- high power draw;
- missing cabinet specification;
- price profile has missing LED defaults.

## 7. Blocking vs non-blocking

### Blocking

- impossible dimensions;
- missing required system/catalog;
- no valid calculation result;
- invalid negative price/count;
- unsafe truss state without auto-support solution.

### Non-blocking

- high weight;
- high power;
- rounded LED size;
- formula/app version mismatch notice;
- missing optional notes.

## 8. Warning display

Warnings must appear:

- near affected field if possible;
- in summary if important;
- in Price/PDF if relevant;
- in PDF for technical/safety warnings.

Warnings must not rely only on color.

Use icon + text + severity.

## 9. Validation acceptance

Validation is accepted when:

- invalid input does not crash;
- invalid input does not create fake BOM;
- user sees exact field/problem;
- warnings are structured in core result;
- UI displays warning text;
- PDF includes important warnings;
- tests cover major invalid cases.
