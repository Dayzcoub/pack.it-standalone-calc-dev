# 26. Saved Calculation Naming

## 1. Purpose

Saved calculations must be easy to find and understand without forcing the user to name everything manually.

## 2. Auto naming

If user does not enter a name, generate a useful name.

Examples:

```text
Сцена 7.2×4.8 — 09.06.2026
Портал 8×4 — 09.06.2026
LED 5.12×2.56 — 09.06.2026
```

## 3. Naming pattern

Recommended:

```text
{calculator/type summary} — {date}
```

If multiple calculations are saved with same name/date, append counter:

```text
Сцена 7.2×4.8 — 09.06.2026 (2)
```

## 4. Manual rename

User can rename saved calculations.

Limits:

```text
max 80 characters
trim leading/trailing spaces
no empty final name
```

## 5. Recent calculations

Home screen may show recent calculations:

- last Stage;
- last Truss;
- last LED;
- or last 3 overall.

This supports field use.

## 6. Preset / demo / saved distinction

Definitions:

- Preset — quick starting parameters;
- Demo example — educational ready-made example;
- Saved calculation — user-created local saved result;
- Template — future reusable user-defined starting point.

Do not mix these concepts in data model names.

## 7. Acceptance

Accepted when saved calculations remain understandable even if user never manually names them.
