# 04. Mobile UI Contract

## 1. Цель UI

Новый интерфейс должен быть не адаптированным desktop-web, а настоящим mobile-first приложением для работы на площадке.

Основной пользовательский сценарий:

```text
открыть приложение → выбрать калькулятор → быстро ввести параметры → увидеть схему/BOM/стоимость → сохранить/отправить PDF
```

## 2. Базовая карта экранов

```text
/
/stage
/truss
/led
/saved
/settings
/help
/about
```

## 3. Главный экран

Главный экран:

```text
ПАК.ИТ Калькуляторы
Быстрые расчёты сцены, ферм и LED

[Сцена]
[Фермы]
[LED]

Последние расчёты
Настройки
Справка
```

Три основных карточки должны быть крупными, понятными и удобными для тача.

## 4. Общий экран калькулятора

Каждый калькулятор имеет одинаковый UX-каркас:

```text
Header
Calculator title
Current calculation name
Tabs / sections
Primary result summary
Actions
```

Внутренние вкладки:

```text
Параметры | Схема | BOM | Цена
```

Дополнительно:

```text
PDF / Share
Save
Duplicate
Reset
```

## 5. Почему вкладки, а не длинное полотно

На телефоне нельзя показывать сразу все панели desktop-версии.

Нужно разделить:

- ввод параметров;
- визуальную схему;
- комплектацию;
- стоимость;
- экспорт.

Так интерфейс будет управляемым и не начнёт разваливаться на маленьких экранах.

## 6. Breakpoints

Основное правило:

```text
mobile: <= 767px
desktop/tablet: >= 768px
```

Не вводить промежуточный breakpoint zoo без необходимости.

Запрещено возвращать старую цепочку:

```text
860 / 900 / 1024 / 1179 / 1180 / 1280 with patch layers
```

Если desktop/tablet версия будет нужна позже, она должна быть отдельным устойчивым layout, а не набором override-костылей.

## 7. Design system

Все экраны строятся из общих компонентов:

- AppShell;
- ScreenHeader;
- CalculatorTabs;
- Button;
- IconButton;
- Input;
- Select;
- Checkbox;
- SegmentedControl;
- Card;
- SummaryCard;
- BomTable;
- PriceSummary;
- BottomActionBar;
- Sheet;
- Modal;
- EmptyState;
- ErrorState;
- LoadingState.

## 8. Touch rules

Минимальные размеры:

```text
primary button height: 44–52 px
input height: 44–52 px
icon button: 44 × 44 px
card tap zone: >= 56 px
```

Запрещено:

- мелкие кнопки рядом без отступа;
- таблицы без горизонтального scroll wrapper;
- поля, где текст обрезается до нечитаемого;
- hover-only states;
- действия, доступные только через mouse.

## 9. Stage UI

### Parameters tab

Поля:

- stage system;
- width;
- depth;
- height;
- deck type;
- post/rail type if needed;
- stairs;
- end closure/skirt;
- skirt type;
- module/rental price;
- mounting;
- delivery.

### Scheme tab

- SVG/canvas scheme;
- zoom;
- fit;
- center;
- edit tools if needed.

### BOM tab

- grouped BOM;
- quantities;
- units;
- total weight if available.

### Price tab

- rental/modules;
- mounting;
- delivery;
- total;
- notes.

## 10. Truss UI

### Parameters tab

- mode: portal / frame / stool / manual;
- width;
- height;
- depth;
- manual leg count;
- pricing;
- load check entry point.

### Scheme tab

- truss drawing;
- zoom;
- fit;
- center;
- selected part details;
- add/remove tools if manual mode is enabled.

### BOM tab

- straight trusses;
- nodes;
- bases;
- fasteners;
- weights.

### Price tab

- rental;
- mounting;
- delivery;
- total;
- warnings.

## 11. LED UI

### Parameters tab

- cabinet type;
- construction name;
- width;
- height;
- hanging;
- standing;
- leg type;
- pricing.

### Scheme tab

- cabinet grid;
- construction selector;
- active construction indication;
- zoom;
- fit;
- center.

### BOM tab

- cabinets;
- Hanging Bars;
- spansets/shackles;
- legs;
- cookies/bolts;
- power cables.

### Price tab

- cabinets/rental;
- mounting;
- delivery;
- total;
- power/weight summary.

## 12. Tables

Mobile tables must be inside scroll wrappers.

Rows should be readable:

```text
Name
Qty / Unit
Weight / Price if available
Notes
```

For mobile, card-list BOM view may be better than full table.

## 13. Bottom action bar

Calculator screens can use sticky bottom bar:

```text
[Save] [PDF] [Share]
```

But it must respect safe-area insets on iPhone.

## 14. Themes

Both themes allowed:

- dark default;
- light optional.

Theme must be token-based.

Запрещено:

- hard-coded theme colors inside features;
- duplicate dark overrides;
- theme guard loops;
- runtime mutation observers for theme correction.

## 15. UI acceptance

UI task is accepted only when:

- no horizontal page overflow on 360/390/430 widths;
- touch targets are usable;
- text is readable;
- tabs do not jump;
- buttons stay in stable positions;
- scheme can be zoomed/fitted/centered;
- BOM is readable;
- price is clear;
- no FEG brand visible;
- no inline styles;
- no one-off hacks for a single block.
