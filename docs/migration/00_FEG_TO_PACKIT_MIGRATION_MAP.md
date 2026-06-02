# 00. FEG to PACK.IT Migration Map

## 1. Purpose

This document maps old source concepts from `Dayzcoub/Feg_Calc_Stage` to the new PACK.IT architecture.

## 2. Migration principle

Use old project as:

- logic source;
- regression source;
- catalog source;
- UI reference where approved.

Do not use old project as:

- app shell;
- CSS foundation;
- brand layer;
- module architecture;
- PWA/service worker foundation.

## 3. Naming migration

```text
FEG Stage PRO → PACK.IT Calculators / ПАК.ИТ Калькуляторы
FEGModules → typed ES modules
quickStandalone → packit mobile app shell
localStorage feg keys → packit.* keys
FEG PDF header → PACK.IT PDF header
```

## 4. Architecture migration

```text
old global modules → src/core + src/features + src/ui
old DOM-coupled calculations → pure core functions
old runtime CSS fixes → design tokens and shared layout
old PDF screenshot flow → structured PdfModel
old localStorage drafts → typed storage repos
```

## 5. Logic migration

```text
Stage old logic → core/stage
Truss old logic → core/truss
LED old logic → core/led
BOM shared logic → core/shared
PDF rows → pdf/PdfModel
```

## 6. Do not migrate

- old `index.html` as product shell;
- old service worker;
- old manifest as product metadata;
- runner game;
- Supabase/backend hooks;
- CRM/warehouse/smetчик;
- debug/dev panels;
- responsive CSS patch cascade;
- visible FEG brand.

## 7. Migration acceptance

Accepted when:

- old source behavior is covered by regression tests;
- new code has no old globals;
- brand is PACK.IT;
- calculations match accepted scenarios;
- old UI debt is not copied.
