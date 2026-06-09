# 07. Calculation Change and Safety Policy

## 1. Purpose

PACK.IT calculations are reference calculations, not certified engineering approvals.

This document defines how calculation safety wording and calculation changes must be handled.

## 2. Forbidden claims

Do not use wording that implies certification or guaranteed safety:

```text
Расчёт безопасен
Можно монтировать
Конструкция выдержит
Допустимо к эксплуатации
Certified / approved / guaranteed safe
```

## 3. Preferred wording

Use cautious wording:

```text
По введённым данным
Справочный расчёт
Требует проверки
Проверьте паспорт оборудования
Проверьте требования производителя
Требует проверки квалифицированным специалистом
```

## 4. Calculation changes

Any change that can affect output is a calculation change:

- BOM row count;
- fastener count;
- weight;
- power;
- price calculation;
- validation/warnings;
- span/support logic;
- PDF technical values.

## 5. Required process for calculation changes

Every calculation change must include:

- engine/catalog version bump where relevant;
- changelog entry;
- regression test update/addition;
- saved snapshot behavior preserved;
- no silent recalculation of old saved results.

## 6. Breaking calculation change

Breaking calculation change examples:

- new truss split algorithm;
- corrected fastener formula;
- changed LED power cable formula;
- changed stage support count;
- changed catalog weight/source values.

Behavior:

```text
Old saved calculation stays as saved snapshot.
User may create copy and recalculate with new engine/catalog.
```

## 7. User notification

If old saved calculation uses older engine/catalog:

```text
Этот расчёт создан в старой версии расчётного ядра. Можно создать копию и пересчитать по текущим правилам.
```

## 8. Acceptance

Accepted when every calculation-affecting change is versioned, tested, documented and does not overpromise safety.
