# 01. Regression Scenarios

## 1. Purpose

Regression scenarios protect the app from breaking old accepted calculation behavior while rewriting the codebase.

Every important calculation rule must become a repeatable test.

## 2. Stage regression scenarios

Required:

```text
Stage / Imlight Copy / 7.2 × 4.8 × 0.8
Stage / PKC ШИП-ПАЗ / 7.2 × 4.8 × 0.8
Stage / PKC ПАЗ-ПАЗ / 7.2 × 4.8 × 0.8
Stage / with stairs
Stage / with end closure fabric
Stage / with end closure banner
Stage / pricing module + mounting + delivery
Stage / invalid zero width
Stage / invalid negative price
```

Expected outputs must include:

- summary;
- BOM;
- price;
- warnings;
- drawingModel presence.

## 3. Truss regression scenarios

Required:

```text
Truss / portal 8 × 4
Truss / frame 8 × 4
Truss / stool 12 m auto supports
Truss / stool 24 m auto supports
Truss / stool manual legs valid
Truss / stool manual legs unsafe auto-protects or warns
Truss / split 4.5 m prefers 2.5 + 2
Truss / C2 fastener count
Truss / base fastener count
Truss / load OK
Truss / load overload warning
Truss / invalid zero span
```

Important accepted rule:

```text
Max unsupported span: 9 m
```

## 4. LED regression scenarios

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
LED / invalid non-positive size
LED / size not divisible by cabinet warning/rounding behavior
```

Expected outputs must include:

- cabinet count;
- power;
- weight;
- BOM;
- price;
- warnings;
- drawingModel presence.

## 5. Saved calculation scenarios

Required:

```text
Save new calculation
Open saved calculation
Duplicate saved calculation
Delete saved calculation
Rename saved calculation
Open old engine version snapshot
Recalculate old snapshot as copy
```

## 6. PDF scenarios

Required:

```text
Generate Stage PDF
Generate Truss PDF
Generate LED PDF
PDF includes disclaimer
PDF includes PACK.IT brand
PDF has no FEG brand
PDF uses saved snapshot for old calculation
PDF share action works
```

## 7. UI regression scenarios

Required:

```text
Home no overflow
Stage no overflow
Truss no overflow
LED no overflow
Saved no overflow
Settings no overflow
Bottom action bar visible
Tabs stable
Keyboard numeric input usable
Android Back behavior
```

## 8. Brand regression scenarios

Search must not find visible user-facing old brand strings:

```text
FEG Stage PRO
FEG PRO
```

Allowed only in:

- docs about old source;
- migration/audit notes;
- explicit legacy test names if needed.

## 9. Acceptance

A milestone cannot be accepted unless its regression scenarios are either:

- implemented as automated tests; or
- explicitly documented as manual tests with expected result.
