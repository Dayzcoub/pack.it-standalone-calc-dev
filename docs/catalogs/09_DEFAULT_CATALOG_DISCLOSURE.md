# 09. Default Catalog Disclosure

## 1. Purpose

Built-in catalogs are useful, but users must understand their source, assumptions and verification status.

## 2. Catalog disclosure principle

The app must not imply that generic/default catalog values are official manufacturer guarantees unless verified and legally allowed.

Recommended user-facing copy:

```text
Справочный каталог. Проверьте размеры, вес и совместимость под своё оборудование.
```

## 3. Catalog source status

Every default/custom catalog item should support:

```ts
type SourceStatus = 'verified' | 'estimated' | 'needs-check' | 'user-defined';
```

## 4. Public naming

If manufacturer public display is not legally verified:

- use generic family name;
- keep internal id separate;
- do not print protected brand names in public PDF unless approved.

## 5. PDF disclosure

PDF should include catalog note when needed:

```text
Комплектность рассчитана по выбранному справочному каталогу. Перед монтажом проверьте паспорт оборудования и совместимость элементов.
```

## 6. Custom values

If user edits or imports catalog values later:

- mark as user-defined;
- include warning/note in technical PDF;
- do not treat as verified manufacturer data.

## 7. Acceptance

Accepted when catalog assumptions are visible and no unverified catalog value is presented as certified manufacturer data.
