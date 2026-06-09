# 03. Real World Test Cases

## 1. Purpose

Regression tests protect formulas, but real-world test cases validate whether the app feels useful for actual production/rental work.

## 2. Stage cases

### Small indoor event stage

```text
Stage 4.8 × 3.6 m
Height 0.4–0.8 m
Stairs: optional
Closure: optional
```

Check:

- module count;
- legs/supports;
- stairs;
- price;
- PDF readability.

### Medium concert stage

```text
Stage 7.2 × 4.8 m
Height 0.8 m
Stairs: yes
Closure: fabric/banner optional
```

Check:

- BOM completeness;
- scheme proportions;
- PDF first page useful for client.

## 3. Truss cases

### Screen portal

```text
Truss portal 8 × 4 m
```

Check:

- straight part split;
- nodes/angles;
- bases;
- fasteners;
- weight/price;
- warning/disclaimer wording.

### Truss stool/table

```text
Truss stool 12 × 6 × 4 m
```

Check:

- auto supports for spans > 9 m;
- U017/T-node logic;
- legs/posts/bases;
- BOM and drawing.

## 4. LED cases

### Wedding/event LED

```text
LED 3.84 × 2.56 m
Cabinet 640 × 640 mm
Standing or hanging depending scenario
```

Check:

- cabinet count;
- aspect ratio;
- power;
- weight;
- mounting kit;
- PDF readability.

### Concert LED

```text
LED 5.12 × 2.56 m
Cabinet 640 × 640 mm
Hanging
```

Check:

- Hanging Bar count;
- power cable count;
- total power;
- total weight;
- scheme.

## 5. Combined workflow case

```text
Stage 7.2 × 4.8
Truss portal 8 × 4
LED 5.12 × 2.56
```

Check:

- saved calculations per type;
- PDF export for each;
- future combined PDF behavior;
- user can explain result to client/colleague.

## 6. Acceptance

A beta build feels useful only when these real-world cases can be completed without developer guidance.
