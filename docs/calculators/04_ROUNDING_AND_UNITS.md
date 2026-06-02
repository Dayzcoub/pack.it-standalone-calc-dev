# 04. Rounding and Units

## 1. Purpose

Rounding must be deterministic and documented. Calculators must not silently change dimensions without warning.

## 2. Internal units

Internal storage:

```text
length: meters or millimeters depending on model, documented per field
weight: kilograms
power: watts
money: numeric major currency unit for v1.0 unless minor units are adopted later
quantity: number, integer where countable
```

## 3. Input parsing

Accept:

```text
7.2
7,2
```

Normalize internally to number.

## 4. Display formatting RU

```text
7,2 м
640 мм
142,6 кг
10,24 кВт
312 500 ₽
```

## 5. Display formatting EN

```text
7.2 m
640 mm
142.6 kg
10.24 kW
RUB 312,500
```

## 6. Money rounding

v1.0 default:

```text
round total money to whole RUB
```

Do not show fractional rubles unless future currency rules require it.

## 7. Weight rounding

Recommended:

```text
< 100 kg: 1 decimal
>= 100 kg: whole kg or 1 decimal depending context
PDF technical: 1 decimal if available
```

## 8. LED cabinet rounding

Do not silently create fractional cabinets.

If requested size is not divisible by cabinet size:

Options:

```text
block and ask user to adjust
suggest nearest valid size
explicitly snap with warning if UI offers that action
```

Default preferred UX:

```text
show nearest valid sizes and let user choose
```

## 9. Stage module rounding

If stage dimensions do not align to selected module grid:

- show warning;
- suggest nearest valid dimensions;
- do not silently change unless user taps suggested value.

## 10. Truss split rounding

Truss lengths must be exact from available segments or return noValidSplit warning.

Tolerance:

```text
Use small numeric tolerance for floating point only, not physical mismatch.
```

Do not treat 4.999999 as invalid if intended 5.0.

## 11. Cable/count rounding

Countable hardware always rounds up when based on capacity:

```text
power cables = ceil(totalPower / capacity)
hanging bars = integer rule
fasteners = integer joint rule
```

## 12. Acceptance

Accepted when:

- input parsing supports comma/dot;
- all rounding is deterministic;
- LED/stage invalid grid dimensions do not silently mutate;
- counts are integers;
- money/weight/power formatting is locale-aware.
