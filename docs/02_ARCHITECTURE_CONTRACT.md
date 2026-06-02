# 02. Architecture Contract

## 1. Цель архитектуры

Новая кодовая база должна быть рассчитана на выпуск в App Store и Google Play, а не быть прямой копией старого standalone-web/PWA.

Главные свойства:

- чистое расчётное ядро;
- TypeScript contracts;
- mobile-first UI;
- offline-first storage;
- Capacitor-ready native layer;
- разделение UI, renderer, PDF, storage and core;
- отсутствие FEG brand traces в пользовательском продукте.

## 2. Рекомендуемый стек

```text
React
TypeScript
Vite
Capacitor
Vitest
Playwright
```

Дополнительно по необходимости:

```text
Capacitor Preferences / SQLite
Capacitor Filesystem
Capacitor Share
jsPDF or pdf-lib
```

## 3. Предлагаемая структура

```text
src/
  app/
    App.tsx
    navigation/
    shell/
    routes/

  brand/
    packit.brand.ts
    packit.copy.ts
    packit.tokens.ts

  core/
    shared/
      bom.types.ts
      calculation-result.types.ts
      drawing-model.types.ts
      pricing.types.ts
      warnings.types.ts
      units.ts
      rounding.ts

    stage/
      stage.types.ts
      stage.catalog.ts
      stage.calculate.ts
      stage.bom.ts
      stage.drawing.ts
      stage.fixtures.ts

    truss/
      truss.types.ts
      truss.catalog.ts
      truss.split.ts
      truss.calculate.ts
      truss.bom.ts
      truss.drawing.ts
      truss.fixtures.ts

    led/
      led.types.ts
      led.catalog.ts
      led.calculate.ts
      led.bom.ts
      led.drawing.ts
      led.fixtures.ts

  features/
    home/
    stage-calculator/
    truss-calculator/
    led-calculator/
    saved-calculations/
    settings/

  renderer/
    stage-svg/
    truss-svg/
    led-svg/
    shared-svg/

  pdf/
    pdf.types.ts
    pdf-model.ts
    pdf-generator.ts
    templates/

  storage/
    storage.types.ts
    settings.repo.ts
    calculations.repo.ts
    migrations.ts

  native/
    files.ts
    share.ts
    app-info.ts
    haptics.ts

  ui/
    components/
    forms/
    layout/
    feedback/
    tables/

  styles/
    tokens.css
    themes.css
    globals.css
```

## 4. Dependency rules

### 4.1 Core

`core/` может импортировать только:

- другие core modules;
- pure utility functions;
- static catalog data.

`core/` не может импортировать:

- React;
- DOM;
- CSS;
- renderer;
- PDF;
- storage;
- Capacitor;
- app shell;
- feature components.

### 4.2 Features

`features/` может импортировать:

- core functions;
- UI components;
- storage repos;
- renderer components;
- pdf actions;
- native wrappers.

Но `features/` не должна содержать расчётные формулы. Формулы живут в `core/`.

### 4.3 Renderer

`renderer/` получает только `DrawingModel` and visual options.

Renderer не должен считать BOM, цену, количество деталей или веса.

### 4.4 PDF

`pdf/` получает только structured `PdfModel`.

PDF не должен читать DOM основного экрана как источник истины.

### 4.5 Storage

`storage/` хранит typed models:

- settings;
- drafts;
- saved calculations;
- price profiles.

Storage не должен пересчитывать бизнес-логику.

## 5. Core function contract

Каждый калькулятор должен иметь чистую функцию:

```ts
calculateStage(input: StageInput): StageResult
calculateTruss(input: TrussInput): TrussResult
calculateLed(input: LedInput): LedResult
```

Результат должен включать:

```ts
type CalculationResult = {
  summary: SummaryMetric[];
  bom: BomRow[];
  price: PriceSummary;
  warnings: CalculationWarning[];
  drawingModel: DrawingModel;
  meta: CalculationMeta;
};
```

## 6. Shared model examples

```ts
type BomRow = {
  id: string;
  category: string;
  name: string;
  sku?: string;
  unit: 'pcs' | 'm' | 'set' | 'kg';
  quantity: number;
  weightKg?: number;
  unitPrice?: number;
  totalPrice?: number;
  notes?: string[];
};
```

```ts
type PriceSummary = {
  rental: number;
  mounting: number;
  delivery: number;
  extra: number;
  discount: number;
  total: number;
  currency: 'RUB' | 'EUR' | 'USD';
};
```

```ts
type DrawingModel = {
  kind: 'stage' | 'truss' | 'led';
  units: 'm' | 'mm';
  bounds: {
    width: number;
    height: number;
  };
  elements: DrawingElement[];
};
```

## 7. State management

Для v1.0 не нужен тяжёлый глобальный state manager.

Достаточно:

- React state на экране калькулятора;
- custom hooks для form state;
- storage repositories для сохранения;
- pure core functions для расчёта.

Не добавлять Redux/Zustand без реальной необходимости.

## 8. Routing

Минимальная карта:

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

## 9. Native layer

Native layer должен быть тонким:

- save file;
- share file;
- app info;
- haptics if needed.

Вся бизнес-логика остаётся в web/core слоях.

## 10. Build targets

```text
npm run dev
npm run build
npm run test
npm run test:e2e
npm run check
npm run cap:sync
npm run ios
npm run android
```

## 11. Strict prohibitions

Запрещено:

- использовать `window.FEGModules`;
- добавлять новые глобальные side effects;
- считать BOM внутри React components;
- считать цену внутри UI;
- делать PDF из случайного DOM экрана;
- добавлять inline styles;
- добавлять CSS `!important` без отдельного justification;
- переносить старый responsive patch cascade;
- добавлять backend/auth/analytics в v1.0;
- использовать FEG как visible brand.

## 12. Architecture acceptance

Foundation считается готовым, если:

- проект собирается;
- TypeScript проходит;
- есть пустые routes;
- есть PACK.IT brand layer;
- есть `core/` contracts;
- нет FEG visible UI;
- нет runtime CSS injection;
- нет business logic в UI;
- есть базовые tests.
