# 16. Saved Collections and Combined PDF

## 1. Purpose

Saved calculations must be organized by calculator type and also support combining selected calculations into one project-style PDF.

## 2. Separate saved lists

The app must maintain separate saved views for:

```text
Stage saved calculations
Truss saved calculations
LED saved calculations
```

The main Saved screen can show all records, but each calculator must also have its own dedicated saved list/filter.

## 3. Saved screen filters

Required filters:

```text
Все
Сцены
Фермы
LED
```

Each calculator screen may also have quick access:

```text
Мои сцены
Мои фермы
Мои LED
```

## 4. SavedCalculation type separation

Every saved calculation must include:

```ts
type: 'stage' | 'truss' | 'led'
```

This type is used for:

- filtering;
- list grouping;
- icons;
- PDF grouping;
- future project package assembly.

## 5. Saved list per calculator

### Stage list

Shows only `type = stage`.

Card examples:

```text
Сцена 7.2×4.8
Высота 0.8 м
24 модуля
67 450 ₽
```

### Truss list

Shows only `type = truss`.

Card examples:

```text
Портал 8×4
Вес 142 кг
Нагрузка OK
45 000 ₽
```

### LED list

Shows only `type = led`.

Card examples:

```text
LED 5.12×2.56
32 кабинета
10.2 кВт
82 000 ₽
```

## 6. Combined PDF concept

The user must be able to select multiple saved calculations and merge them into one PDF.

User-facing concept:

```text
Собрать общий PDF
```

Possible names:

```text
Project PDF
Combined PDF
Пакет расчётов
Сводный PDF
```

Recommended Russian UI:

```text
Сводный PDF
```

## 7. Combined PDF selection flow

Flow:

```text
Saved → Select mode → choose Stage/Truss/LED records → Сводный PDF → preview → share/export
```

Selection supports:

- one or multiple Stage;
- one or multiple Truss;
- one or multiple LED;
- any combination.

## 8. Combined PDF structure

Recommended structure:

```text
PACK.IT header
Project/package title
Date/time
Selected calculations summary

Section 1 — Stage calculations
  Stage summary
  Stage scheme
  Stage BOM
  Stage price

Section 2 — Truss calculations
  Truss summary
  Truss scheme
  Truss BOM
  Truss price

Section 3 — LED calculations
  LED summary
  LED scheme
  LED BOM
  LED price

Combined totals
Warnings
Disclaimer
```

## 9. Combined totals

Combined PDF may show:

- total rental/modules;
- total mounting;
- total delivery;
- grand total;
- total weight by section;
- combined warnings list.

Important:

If calculations use different price profiles/currencies, show warning and do not merge totals silently.

## 10. Combined PDF data model

```ts
type CombinedPdfInput = {
  id: string;
  title: string;
  calculationIds: string[];
  mode: 'client' | 'technical';
  language: 'ru-RU' | 'en';
};
```

```ts
type CombinedPdfModel = {
  title: string;
  sections: CombinedPdfSection[];
  totals: PriceSummary;
  warnings: CalculationWarning[];
  disclaimer: string;
};
```

## 11. Combined PDF snapshot rule

Combined PDF must use saved `resultSnapshot` values by default.

Do not silently recalculate old saved calculations.

If selected calculations have old engine versions, show notice:

```text
Некоторые расчёты созданы в старой версии формул. PDF будет собран по сохранённым снимкам.
```

## 12. Future project package

Combined PDF is the foundation for future project packages:

```text
Project Package / Пакет проекта
```

Do not build full CRM/project model in v1.0, but keep naming and data model compatible with future expansion.

## 13. Acceptance

This feature is accepted when:

- saved calculations are filterable by type;
- each calculator has its own saved list view/access;
- user can select multiple saved calculations;
- combined PDF uses snapshots;
- combined PDF groups Stage/Truss/LED sections;
- totals are safe and do not mix currencies silently;
- warnings and disclaimer are included.
