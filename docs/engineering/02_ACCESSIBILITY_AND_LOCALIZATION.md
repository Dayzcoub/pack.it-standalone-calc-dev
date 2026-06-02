# 02. Accessibility and Localization

## 1. Goal

PACK.IT is a professional tool used in the field. It must be readable, touch-friendly and prepared for future localization.

## 2. Accessibility basics

Required:

- readable contrast;
- touch targets at least 44 px;
- icons with text labels where important;
- warnings not based on color only;
- inputs with visible labels;
- buttons with accessible labels;
- no critical hover-only controls.

## 3. Contrast

Dark theme must maintain readable contrast for:

- labels;
- field values;
- metric cards;
- warning text;
- inactive tabs;
- bottom actions.

Light theme must not become low-contrast pale gray UI.

## 4. Screen reader basics

Important elements should have accessible labels:

- Save;
- PDF;
- Share;
- Back;
- Delete;
- Duplicate;
- Zoom in/out;
- Fit;
- Center;
- warnings;
- selected tabs.

## 5. Numeric input

Numeric inputs must:

- open numeric keyboard on mobile;
- accept comma and dot decimals;
- show units;
- preserve cursor behavior as much as possible;
- not auto-reformat while typing in a way that fights the user.

## 6. Localization strategy

v1.0 language:

```text
Russian
```

But architecture must be localization-ready.

Do not hardcode UI strings directly inside core logic.

Use copy dictionaries:

```text
src/i18n/ru.ts
src/i18n/en.ts later
```

## 7. Units and locale

Default locale:

```text
ru-RU
```

Default units:

```text
m, mm, kg, kW/W, RUB
```

Internal values are numeric and unit-normalized.

## 8. Text length

Russian labels are often longer than English. UI must allow:

- wrapping where acceptable;
- compact labels where needed;
- no clipped critical text;
- no single-letter broken words.

## 9. Accessibility acceptance

Accepted when:

- all primary controls are touch-friendly;
- warnings have icon + text;
- inputs have labels and units;
- dark/light contrast is acceptable;
- no critical action is icon-only without accessible label;
- UI strings are prepared for localization.
