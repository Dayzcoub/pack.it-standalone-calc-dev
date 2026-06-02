# 01. Saved Screen Spec

## 1. Purpose

Saved screen manages saved calculations by type and supports combined PDF selection.

## 2. Filters

```text
Все
Сцены
Фермы
LED
```

## 3. Card actions

- open;
- duplicate;
- PDF;
- delete;
- select for combined PDF.

## 4. States

```text
empty all
has records
filtered empty
selection mode
combined PDF ready
old snapshot notice
delete confirmation
```

## 5. Acceptance

- separate type filters work;
- selected calculations can be combined;
- old snapshots are marked;
- delete requires confirmation;
- no silent recalculation.
