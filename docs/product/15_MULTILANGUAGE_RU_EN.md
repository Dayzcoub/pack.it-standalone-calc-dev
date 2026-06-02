# 15. Multilanguage RU/EN Requirements

## 1. Purpose

PACK.IT must be designed as a multilingual app from the beginning.

Minimum required languages:

```text
Russian — ru-RU
English — en-US/en
```

Russian can be the default launch language, but English must be supported architecturally from v1.0 foundation.

## 2. Language modes

The app should support:

```text
System language
Russian
English
```

Default:

```text
System language, fallback to Russian
```

If system language is unsupported, use Russian in early builds or English if selected as global fallback later.

## 3. Where language applies

Language must apply to:

- app UI;
- calculator labels;
- validation messages;
- warnings;
- empty states;
- PDF labels;
- PDF disclaimers;
- store screenshots captions when generated;
- About/Support/Privacy text inside app;
- units formatting where locale-specific.

## 4. Architecture

No hardcoded user-facing strings inside components or core formulas.

Recommended structure:

```text
src/i18n/
  index.ts
  ru.ts
  en.ts
  types.ts
```

Example:

```ts
type LocaleCode = 'ru-RU' | 'en';
```

```ts
const copy = t('calculator.stage.title');
```

## 5. Core logic and copy separation

Core should not return final UI sentences as hardcoded text when avoidable.

Preferred warning structure:

```ts
type CalculationWarning = {
  code: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
  params?: Record<string, string | number>;
};
```

UI/PDF localizes the warning by code.

Allowed exception:

- technical item names from catalogs may include localized labels.

## 6. Catalog localization

Catalog items should support localized names:

```ts
type LocalizedLabel = {
  ru: string;
  en: string;
};
```

Example:

```ts
type CatalogItem = {
  id: string;
  label: LocalizedLabel;
  genericLabel?: LocalizedLabel;
};
```

## 7. PDF language

PDF mode should use selected app language by default.

Future option:

```text
PDF language: app language / Russian / English
```

Minimum v1.0:

- PDF labels follow app language;
- disclaimer available in Russian and English.

## 8. Store metadata

Store metadata must have draft RU and EN versions.

Already required:

- app name;
- subtitle;
- description;
- keywords;
- screenshot captions;
- release notes.

## 9. Text length handling

English and Russian text lengths differ.

UI must allow:

- wrapping;
- compact labels;
- no clipped critical text;
- no fixed-width labels that break language switch;
- metric cards with shorter fallback labels when needed.

## 10. Number/date formatting

Use locale-aware formatting:

Russian examples:

```text
7,2 м
312 500 ₽
02.06.2026
```

English examples:

```text
7.2 m
RUB 312,500
Jun 2, 2026
```

Internal storage remains numeric and locale-independent.

## 11. Units

Units may remain metric in both languages for v1.0:

```text
m, mm, kg, W, kW
```

Do not add imperial units unless a separate product decision is made.

## 12. Language setting persistence

Store in settings:

```text
packit.settings.v1.languageMode
```

Values:

```text
system
ru-RU
en
```

## 13. Fallback rules

If translation key missing:

- dev build may show obvious missing key marker;
- production must fallback gracefully;
- missing translation should be caught by tests.

## 14. Tests

Required:

- app renders Home in Russian;
- app renders Home in English;
- Stage/Truss/LED tab labels translate;
- warnings translate;
- PDF disclaimer translates;
- no layout overflow due to English/Russian switch.

## 15. Acceptance

Multilanguage foundation is accepted when:

- RU/EN dictionaries exist;
- UI uses translation keys;
- PDF labels are localizable;
- warnings use codes/params where possible;
- language setting is stored;
- no major screen hardcodes Russian-only strings outside dictionaries.
