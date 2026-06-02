# 00. PACK.IT Mobile Calculators — Master Plan

## 1. Назначение проекта

Проект `pack.it-standalone-calc-dev` создаётся для переписывания standalone-калькуляторов Stage / Truss / LED из старого FEG-проекта в новое мобильное приложение под бренд **ПАК.ИТ / PACK.IT**.

Целевая форма продукта:

```text
ПАК.ИТ Калькуляторы / PACK.IT Calculators
```

Платформы:

- iOS — App Store;
- Android — Google Play;
- потенциально web/PWA позже, но не как основной источник архитектуры.

## 2. Исходный проект

Исходная логика переносится из:

```text
Dayzcoub/Feg_Calc_Stage
```

Этот репозиторий уже содержит standalone quick constructors:

- Stage;
- Truss;
- LED;
- local drafts;
- PDF export;
- BOM / JSON / contract snapshot;
- quick pricing.

Но старую кодовую базу нельзя просто завернуть в Capacitor. Она содержит исторические runtime-слои, PWA-обвязку, FEG-бренд, глобальные модули и responsive/CSS-фиксы.

## 3. Главная стратегия

Старый проект используется как:

- эталон расчётной логики;
- эталон проверенных пользовательских сценариев;
- источник каталогов, формул, BOM, PDF-строк и визуальных правил;
- источник regression cases.

Старый проект не используется как:

- основа нового UI;
- основа mobile shell;
- основа design system;
- основа архитектуры;
- основа Store-ready приложения.

## 4. Цель v1.0

Первая Store-версия должна быть максимально простой и безопасной:

- offline-first;
- без аккаунта;
- без backend;
- без Supabase;
- без аналитики;
- без рекламы;
- без геолокации;
- без контактов;
- без камеры/микрофона;
- без push;
- без сбора персональных данных.

Функции v1.0:

- Stage Calculator;
- Truss Calculator;
- LED Calculator;
- локальное сохранение расчётов;
- настройки цен;
- PDF export;
- native share;
- тёмная и светлая темы;
- PACK.IT brand.

## 5. Что НЕ входит в v1.0

- авторизация;
- облачная синхронизация;
- рабочие пространства;
- CRM;
- складские движения;
- сметчик большого приложения;
- роли пользователей;
- командный доступ;
- биллинг;
- подписки;
- push-уведомления;
- Supabase/backend;
- мини-игра runner;
- dev/test panels;
- старые FEG shell/manifest/service worker как продуктовая база.

## 6. Рекомендуемый стек

```text
React + TypeScript + Vite + Capacitor
```

Причина:

- можно переносить web-логику без полного переписывания на Swift/Kotlin;
- один код для iOS и Android;
- удобно отделить pure core от UI;
- подходит для SVG/canvas/rendering;
- подходит для PDF/share;
- можно позже собрать web/PWA из той же базы.

## 7. Главный архитектурный принцип

Расчёты должны быть отделены от интерфейса.

Правильно:

```ts
const result = calculateStage(input);
const result = calculateTruss(input);
const result = calculateLed(input);
```

Неправильно:

```text
кнопка → DOM → hidden input → global module → runtime CSS → localStorage side effect → PDF side effect
```

Core-логика не должна знать про:

- React;
- DOM;
- CSS;
- Capacitor;
- localStorage;
- PDF;
- canvas viewport;
- пользовательские кнопки.

## 8. Этапы разработки

### Phase 0 — Documentation and audit

- зафиксировать scope;
- выписать, что переносится из `Feg_Calc_Stage`;
- зафиксировать запреты;
- подготовить core contracts;
- подготовить первые regression cases.

### Phase 1 — Clean app foundation

- создать новый проект;
- настроить TypeScript, Vite, Capacitor;
- добавить app shell;
- добавить navigation;
- добавить пустые экраны;
- добавить PACK.IT brand layer;
- добавить design tokens;
- добавить basic UI kit.

### Phase 2 — Core contracts

- StageInput / StageResult;
- TrussInput / TrussResult;
- LedInput / LedResult;
- BomRow;
- PriceSummary;
- DrawingModel;
- Warning;
- SavedCalculation;
- Settings.

### Phase 3 — Stage core

- перенести системы сцены;
- перенести BOM;
- перенести pricing;
- перенести drawing model;
- добавить tests.

### Phase 4 — Truss core

- перенести каталог ферм/узлов;
- перенести split logic;
- перенести portal/frame/stool;
- сохранить auto support rule max 9 m;
- сохранить U017 intermediate supports;
- перенести bases/fasteners/weight/pricing;
- добавить tests.

### Phase 5 — LED core

- перенести cabinet catalog;
- перенести constructions model;
- перенести hanging/standing logic;
- перенести power/weight/BOM/pricing;
- добавить tests.

### Phase 6 — Mobile UI

- главный экран;
- Stage screen;
- Truss screen;
- LED screen;
- Saved screen;
- Settings screen;
- mobile-first layout;
- tabs/sections: Parameters / Scheme / BOM / Price.

### Phase 7 — Renderers

- Stage SVG renderer;
- Truss SVG renderer;
- LED SVG renderer;
- zoom/fit/center;
- renderer consumes only DrawingModel.

### Phase 8 — Storage

- local settings;
- last drafts;
- saved calculations;
- duplicate/delete/rename;
- price profiles.

### Phase 9 — PDF and native share

- structured PDF model;
- PDF generator;
- scheme export;
- native file save;
- native share.

### Phase 10 — Store release

- icons;
- splash;
- privacy policy;
- support page;
- App Store metadata;
- Google Play Data Safety;
- TestFlight;
- Android internal testing.

## 9. Версионирование

Новая версия начинается не с `3.x`, а с нового продукта:

```text
0.1.0 — foundation
0.2.0 — core contracts
0.3.0 — Stage core
0.4.0 — Truss core
0.5.0 — LED core
0.6.0 — mobile UI
0.7.0 — storage
0.8.0 — PDF/share
0.9.0 — release candidate
1.0.0 — first Store release
```

## 10. Главный запрет

Не переносить старый технический долг ради скорости.

Лучше медленнее на старте, но получить чистую архитектуру, чем быстро завернуть старый standalone и потом снова бесконечно править CSS, viewport, overflow, runtime-зависимости и брендовые следы FEG.
