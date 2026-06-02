# 00. Visual Direction — PACK.IT Calculators

## 1. Approved direction

The approved visual direction is:

```text
PACK.IT — premium dark technical field app
```

This is a mobile-first technical tool for production teams working with stage platforms, truss structures and LED screens.

The app must not feel like:

- a playful startup toy;
- a generic CRM dashboard;
- a desktop webpage compressed into a phone;
- a patchwork of old FEG UI layers.

The app must feel like:

- a serious on-site calculator;
- a premium technical field instrument;
- fast, readable and precise;
- modern, dark, calm and reliable.

## 2. Approved mockup set

The first approved visual target contains five core screens:

1. Home screen with large Stage / Truss / LED cards.
2. Stage calculator screen with parameters and scheme preview.
3. Truss calculator screen with portal parameters and scheme preview.
4. LED calculator screen with scheme-focused LED cabinet grid.
5. Saved calculations screen with filters, saved items and price/theme settings panel.

These screens define the real target look for implementation. The final application should be built very close to this direction, while allowing minor production adjustments for real data, accessibility and device sizes.

## 3. Core aesthetic

### Dark technical theme

Default visual mode:

```text
dark graphite / dark blue-gray / steel teal / warm amber accents
```

Mood:

- precise;
- technical;
- premium;
- restrained;
- high contrast;
- field-ready.

### Visual hierarchy

Most important information:

- dimensions;
- quantity;
- weight;
- price;
- warnings;
- selected construction mode.

Numbers must be visually stronger than long labels.

## 4. Main colors

Approximate design tokens:

```text
--color-bg: #071015
--color-bg-soft: #0B151B
--color-panel: #101B22
--color-panel-2: #13222A
--color-card: #121F27
--color-border: rgba(180, 210, 220, 0.14)
--color-border-strong: rgba(180, 230, 230, 0.24)
--color-text: #F4F7F8
--color-text-muted: #9DAAB2
--color-text-soft: #6F7E88
--color-accent: #26D6C9
--color-accent-deep: #0E7C78
--color-accent-soft: rgba(38, 214, 201, 0.16)
--color-amber: #F1A93B
--color-success: #42D89A
--color-warning: #F1A93B
--color-danger: #EF4444
```

These exact values may be tuned during implementation, but the tone must remain the same.

## 5. Shape language

Use:

- rounded cards;
- soft inner borders;
- subtle shadows;
- glassy but not blurry panels;
- technical grid backgrounds in scheme cards;
- square-rounded icons.

Avoid:

- circular toy icons;
- heavy gradients everywhere;
- neon overload;
- random shadows;
- old web-style boxes;
- excessive decorative particles.

## 6. Typography

Preferred direction:

- system font or Inter-like font;
- compact professional typography;
- strong numeric hierarchy;
- readable Russian labels.

Approximate mobile sizes:

```text
App logo/title: 28–34 px
Screen title: 26–30 px
Card title: 18–22 px
Metric value: 18–24 px
Input value: 17–22 px
Body text: 14–16 px
Small label: 11–13 px
```

## 7. Screen density

The UI should be dense but not cramped.

Approved pattern:

- top area: title + current calculation name;
- metric row;
- tab row;
- content card;
- scheme/summary card;
- sticky bottom actions.

Avoid showing the entire old desktop constructor in one long unstructured screen.

## 8. Interaction feel

All controls should feel touch-first:

- large enough tap zones;
- strong selected state;
- clear disabled state;
- no hover-only logic;
- no tiny hidden icons for critical actions.

## 9. Implementation promise

The generated mockups are a realistic visual target, not just fantasy art.

Implementation must be close to the approved direction, but production UI may simplify:

- exact 3D illustrations in cards;
- extremely detailed schematic textures;
- micro-shadows;
- text density on very small phones.

The final app must preserve:

- dark premium technical mood;
- tabbed calculator structure;
- metric cards;
- structured scheme cards;
- bottom actions;
- PACK.IT brand identity.
