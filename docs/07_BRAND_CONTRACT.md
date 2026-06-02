# 07. PACK.IT Brand Contract

## 1. Product name

Primary Russian name:

```text
ПАК.ИТ Калькуляторы
```

Primary English/international name:

```text
PACK.IT Calculators
```

Short name:

```text
PACK.IT
```

Working internal product id:

```text
packit-calculators
```

## 2. Brand direction

The brand concept is based on the idea of a project package:

```text
пакет проекта / project package / packed technical calculation
```

The app should feel like a clean technical tool for production teams:

- precise;
- fast;
- field-ready;
- not playful;
- not overloaded;
- reliable;
- modern technical SaaS/mobile utility.

## 3. FEG to PACK.IT replacement

### Old names to remove from visible UI

```text
FEG Stage PRO
FEG PRO
FEG
feg-stage-pro
Feg_Calc_Stage
```

### New names

```text
ПАК.ИТ Калькуляторы
PACK.IT Calculators
PACK.IT
packit-calculators
```

## 4. Code naming

Preferred code namespace:

```text
packit
PACKIT
Packit
```

Examples:

```ts
PACKIT_BRAND
packitCalculators
PackitAppShell
PackitCalculationResult
```

Do not use:

```text
FEGModules
fegDashboard
fegStagePro
quickStandalone as public/product naming
```

Internal legacy references are allowed only in migration docs and tests when explicitly referencing the old source.

## 5. App metadata

Suggested app name:

```text
ПАК.ИТ Калькуляторы
```

Suggested App Store English name:

```text
PACK.IT Calculators
```

Suggested subtitle:

```text
Stage, Truss and LED calculations
```

Russian subtitle:

```text
Расчёты сцены, ферм и LED
```

Suggested package/bundle id:

```text
app.packit.calculators
```

## 6. Brand layer

Create one brand source:

```ts
export const PACKIT_BRAND = {
  productNameRu: 'ПАК.ИТ Калькуляторы',
  productNameEn: 'PACK.IT Calculators',
  shortName: 'PACK.IT',
  version: '0.1.0',
  taglineRu: 'Быстрые расчёты сцены, ферм и LED',
  taglineEn: 'Fast stage, truss and LED calculations',
};
```

All app title, PDF title, about screen, metadata and status labels should use this source.

## 7. PDF branding

PDF must use:

```text
ПАК.ИТ Калькуляторы
```

or:

```text
PACK.IT Calculators
```

PDF must not show:

```text
FEG Stage PRO
FEG PRO
```

PDF should include:

- product name;
- calculation type;
- date/time;
- optional project/calculation name;
- summary;
- BOM;
- price;
- safety disclaimer.

## 8. Local storage keys

Do not use old FEG keys for new saved data.

Use:

```text
packit.settings.v1
packit.savedCalculations.v1
packit.stageDraft.v1
packit.trussDraft.v1
packit.ledDraft.v1
packit.priceProfiles.v1
```

If old migration is ever needed, create explicit migration code:

```text
legacy-feg-import
```

But do not mix old and new keys silently.

## 9. Visual tone

Preferred tone:

- dark technical theme by default;
- clean light theme optional;
- strong contrast;
- readable labels;
- square/rounded icons, not circular toy icons;
- technical illustrations with stage/truss/LED authenticity;
- no cartoonish UI for main app.

## 10. Language

v1.0 primary language:

```text
Russian
```

Keep English-ready architecture:

- no hardcoded strings inside core;
- UI labels through copy dictionaries;
- PDF labels through copy dictionaries;
- store metadata can be Russian first, English later.

## 11. Brand acceptance

A task is accepted only if:

- no visible FEG brand remains;
- app title uses PACK.IT;
- PDF uses PACK.IT;
- app metadata uses PACK.IT;
- localStorage keys use packit prefix;
- icons/splash do not contain old FEG logo;
- code may mention FEG only in migration/source-audit docs or explicitly named legacy tests.
