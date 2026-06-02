# 02. Layout Rules

## 1. Mobile-first structure

The app is designed for a phone first.

Primary screen structure:

```text
Status/safe area
Screen header
Metric summary
Tabs
Content section
Optional scheme/preview
Sticky bottom actions
Safe area bottom
```

## 2. Home layout

Home screen structure:

```text
PACK.IT logo
Subtitle
Info/settings action

Calculator card: Stage
Calculator card: Truss
Calculator card: LED

Recent calculations

Bottom navigation
```

Home card structure:

```text
Icon
Title
Short description
Technical illustration
Last calculation strip
Key result chip
Chevron
```

## 3. Calculator layout

All calculators must use the same skeleton:

```text
Back + title + info
Calculation name + edit action
Metric cards
Tabs
Active tab content
Sticky actions
```

Metric row should usually contain 4 cards:

```text
Size / Height / Quantity / Total
```

or calculator-specific equivalents.

## 4. Tabs

Tabs are stable:

```text
Параметры | Схема | BOM | Цена
```

Do not rename per calculator unless absolutely required.

## 5. Parameters layout

Parameters tab uses grouped cards:

```text
System / catalog selection
Main dimensions
Mode/options
Pricing shortcuts
Warnings/validation
Optional scheme preview
```

No giant ungrouped forms.

## 6. Scheme layout

Scheme tab uses:

```text
Scheme header
View label
Optional status chip
Drawing viewport
Zoom controls
Technical metric chips
```

Zoom controls:

```text
+
−
fit
center
```

Controls can be vertical on the right side of scheme viewport.

## 7. BOM layout

Mobile BOM uses list cards.

Suggested grouping:

```text
Main equipment
Connectors / fasteners
Mounting / rigging
Power / cables
Other
```

Each group is collapsible later if needed.

## 8. Price layout

Price screen structure:

```text
Total hero card
Rental rows
Mounting rows
Delivery rows
Extras
Notes/warnings
PDF/share shortcut
```

## 9. Saved calculations layout

Saved screen structure:

```text
PACK.IT header or compact header
Title: Сохранённые
Filter segmented control: Все / Сцена / Фермы / LED
Saved calculation cards
Profiles/settings panel
Bottom navigation
```

Saved card includes:

```text
Type icon
Type label
Title
Technical subtitle
Date/time
Metrics row
Actions: Open / PDF / Duplicate / Delete
```

## 10. Settings layout

Settings screen structure:

```text
Header
Price profiles
Default values
Theme
PDF settings
Storage/export
Legal/about
```

Settings rows must be large and readable.

## 11. Bottom navigation

Bottom navigation appears on main app-level screens:

```text
Главная
Сохранённые
Настройки
```

Calculator screens may use back navigation + sticky actions instead of bottom nav.

## 12. Safe area

All bottom bars must respect:

```text
env(safe-area-inset-bottom)
```

Top headers must respect:

```text
env(safe-area-inset-top)
```

## 13. Width constraints

Mobile content should use full width with horizontal padding:

```text
16 px default
12 px minimum on narrow screens
```

Do not create fixed 980px/1280px surfaces for mobile app screens.

## 14. Overflow rules

Allowed:

- internal scroll in BOM/table areas;
- scheme viewport pan/zoom;
- card list vertical scroll.

Forbidden:

- page-level horizontal overflow;
- hidden content cut off by fixed viewport heights;
- scroll traps;
- controls outside safe area.

## 15. Real implementation tolerance

Generated mockups are target direction. Real implementation may adjust:

- exact spacing;
- exact number of visible cards per screen;
- exact illustration detail;
- row wrapping on small phones.

But it must not change:

- overall dark technical style;
- shared calculator skeleton;
- tab structure;
- bottom action pattern;
- metric card hierarchy;
- PACK.IT brand.
