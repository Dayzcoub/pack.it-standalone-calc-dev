# 09. Help and Tooltips

## 1. Purpose

The app must explain technical terms without turning the UI into a long manual.

Use short contextual help near fields and warnings.

## 2. Help patterns

Allowed patterns:

- small info icon near field;
- bottom sheet with explanation;
- inline helper text;
- Help/About screen with glossary;
- PDF disclaimer notes.

## 3. Required glossary topics

### General

- reference calculation;
- BOM / комплектность;
- client PDF;
- technical PDF;
- saved snapshot;
- price profile.

### Stage

- stage system;
- deck/module;
- stairs;
- end closure/skirt;
- height;
- module grid.

### Truss

- portal;
- frame;
- stool / табуретка;
- span / пролёт;
- unsupported span;
- intermediate support;
- U017;
- base plate;
- C2 fasteners;
- load check.

### LED

- cabinet;
- LED module;
- self-built cabinet;
- pixel pitch;
- Hanging Bar;
- standing mode;
- hanging mode;
- power cable rule;
- total power;
- custom BOM.

## 4. Tooltip examples

```text
Пролёт — расстояние между опорами. Если пролёт больше допустимого значения, приложение добавит промежуточные опоры или покажет предупреждение.
```

```text
Hanging Bar — верхняя планка/элемент для подвеса LED-кабинетов. Количество зависит от числа верхних кабинетов и выбранной системы подвеса.
```

```text
Сохранённый снимок — расчёт с результатами на момент сохранения. Он не пересчитывается автоматически после обновления формул.
```

## 5. Localization

All help content must exist in RU/EN dictionaries.

## 6. Acceptance

Accepted when:

- every technical field has either clear label or help entry;
- glossary exists;
- help text is localizable;
- safety disclaimer is available from Help/About.
