# 25. Edge Cases and Extreme Inputs

## 1. Purpose

The app must handle strange, impossible or extreme user inputs without crashing and without silently producing misleading results.

## 2. Response types

Use these response types:

```text
blocking error — cannot calculate
warning — calculation possible but requires attention
soft warning — informational caution
auto suggestion — show alternatives, user decides
```

## 3. General rules

Never show raw values/errors like:

```text
NaN
undefined
Infinity
[object Object]
```

Never silently change user input to make the result fit.

## 4. Invalid values

Blocking:

- zero or negative dimensions;
- negative prices;
- missing required catalog dimensions;
- invalid cabinet size;
- invalid truss part length;
- impossible selected mode.

Warning or soft warning:

- unusually large dimensions;
- unusually small dimensions;
- default pricing still used;
- missing optional weight/power/price;
- unverified catalog data.

## 5. LED non-divisible sizes

If LED size does not divide by cabinet size:

```text
Do not silently mutate size.
Show nearest smaller and larger valid sizes.
Let user choose.
```

## 6. Truss unsafe/impossible spans

If truss span exceeds supported rule and cannot be solved with available supports:

- do not mark OK;
- show warning/blocking state depending severity;
- suggest adding supports or changing dimensions;
- use cautious safety wording.

## 7. Huge inputs

Huge inputs should not freeze the app.

Use limits/warnings from `docs/product/18_LIMITS_AND_CONSTRAINTS.md`.

## 8. Pricing extremes

If price total is zero because user set prices to zero, show informational note:

```text
Стоимость равна 0 по текущему профилю цен. Проверьте ставки.
```

## 9. Acceptance

Accepted when extreme inputs are handled through structured validation and user-readable messages, not crashes or fake results.
