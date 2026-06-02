# 03. Calculator Screen Rules

## 1. Shared calculator contract

All calculators use the same screen contract:

```text
Header
Calculation identity
Metric cards
Tabs
Active tab content
Sticky action bar
```

Tabs:

```text
Параметры
Схема
BOM
Цена
```

Bottom actions:

```text
Сохранить
PDF
Поделиться
```

## 2. Header

Header contains:

- back arrow;
- calculator title;
- current calculation name;
- edit icon;
- optional info/help icon.

Examples:

```text
Сцена
Сцена 7.2×4.8
```

```text
Фермы
Портал 8×4
```

```text
LED
Экран 5.12×2.56
```

## 3. Metric cards by calculator

### Stage

Recommended metrics:

```text
Размер
Высота
Модули / элементы
Итого
```

### Truss

Recommended metrics:

```text
Пролёт / размер
Вес
Точки подвеса / стойки
Итого
```

### LED

Recommended metrics:

```text
Размер
Кабинеты
Вес
Итого
```

## 4. Stage parameters

Required controls:

- system selection;
- width;
- depth;
- height;
- deck/stage type if needed;
- stairs yes/no;
- end closure/skirt yes/no;
- skirt type;
- module/rental price;
- mounting mode;
- delivery mode.

Stage screen may show scheme preview on Parameters tab to make the result visible immediately.

## 5. Stage scheme

Required:

- top view;
- dimensions;
- grid/modules;
- stairs marker;
- optional closure indication;
- zoom controls;
- fit/center controls.

## 6. Truss parameters

Required controls:

- truss system/catalog;
- construction mode: portal / frame / stool / manual;
- width/span;
- height;
- depth;
- leg count if applicable;
- base type;
- rental;
- mounting;
- delivery;
- load check status.

## 7. Truss scheme

Required:

- front view for portal/frame;
- top view or plan mode if needed later;
- real-looking aluminum truss visual, but generated from DrawingModel;
- dimensions;
- bases;
- supports/legs;
- load status chip;
- zoom controls.

## 8. LED parameters

Required controls:

- cabinet type;
- width;
- height;
- pixel pitch;
- construction selector;
- hanging yes/no;
- standing yes/no;
- leg type if standing;
- pricing.

## 9. LED scheme

Required:

- cabinet matrix;
- dimensions;
- active construction chip;
- cabinet count;
- Hanging Bar count;
- power;
- voltage;
- weight;
- zoom controls.

## 10. BOM tab

BOM tab must not be a desktop table squeezed into mobile.

Use grouped cards:

```text
Основное оборудование
Соединители / крепёж
Подвес / опоры
Питание
Дополнительно
```

Each row:

```text
Name
Quantity
Unit
Weight/price if available
Notes
```

## 11. Price tab

Price tab must show:

- total price hero;
- rental/modules;
- mounting;
- delivery;
- extras;
- optional discount later;
- notes;
- PDF/share shortcut.

## 12. Warning behavior

Warnings are visible near the affected area.

Examples:

- Truss load warning appears near load check and scheme.
- Missing dimensions appear near fields.
- PDF generation errors appear near bottom action bar or toast.
- Saved status appears as success toast/chip.

## 13. Editing and reset

Each calculator should support:

- rename calculation;
- reset current calculation;
- duplicate from saved screen;
- save current state.

Reset must require confirmation.

## 14. Production simplification

Mockups show highly polished imagery and details. Real implementation can use cleaner SVG-based line art if performance or maintainability requires it.

Do not sacrifice:

- readability;
- shared structure;
- calculation clarity;
- tab stability;
- bottom actions.
