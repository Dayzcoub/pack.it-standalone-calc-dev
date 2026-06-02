# 06. Missing Data Policy

## 1. Purpose

Calculators must handle incomplete catalog/custom data safely and predictably.

## 2. General rule

Missing data must never produce fake confidence.

Use warnings and partial results where safe.

## 3. Missing dimensions

If required physical dimensions are missing:

```text
block calculation
```

Examples:

- LED cabinet width/height missing;
- truss part length missing;
- stage module dimensions missing.

## 4. Missing weight

If weight is missing:

- calculation may continue;
- BOM can be shown;
- total weight must show warning or partial state;
- PDF must mark weight as incomplete.

## 5. Missing power

For LED:

- cabinet grid may calculate;
- power summary is incomplete;
- power warnings cannot claim OK;
- PDF marks power as incomplete.

## 6. Missing price

If price is missing:

- BOM can be shown;
- price total may be partial;
- show warning;
- allow user to enter price override.

## 7. Missing source verification

If `sourceStatus` is `user-defined`, `estimated` or `needs-check`:

- show subtle info/warning;
- include note in technical PDF;
- do not mark calculation as certified or verified.

## 8. Custom LED cabinet missing module/power/control data

Blocking:

- missing module layout;
- invalid module rows/columns;
- invalid cabinet dimensions.

Warnings:

- missing weight;
- missing power;
- missing control kit;
- missing mounting kit;
- user-defined values.

## 9. Custom truss catalog missing data

Blocking:

- missing part length for straight truss;
- missing connection compatibility where required;
- no valid split.

Warnings:

- missing weight;
- estimated values;
- unknown manufacturer/legal display status.

## 10. Acceptance

Accepted when:

- missing required dimensions block calculation;
- missing optional weight/power/price creates structured warnings;
- PDF reflects incomplete data;
- no UI shows OK when key safety data is missing.
