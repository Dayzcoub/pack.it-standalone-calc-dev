# PACK.IT Standalone Calculators

Документационный и ассетный pre-code репозиторий для переписывания standalone-калькуляторов Stage / Truss / LED под новый бренд **ПАК.ИТ / PACK.IT** и будущий выпуск в App Store / Google Play.

Исходная логика переносится из текущего рабочего репозитория:

- `Dayzcoub/Feg_Calc_Stage`
- текущая рабочая ветка логики: standalone quick constructors Stage / Truss / LED
- текущая цель: не переносить технический долг старого веб/PWA слоя, а вынести расчётное ядро и собрать новое mobile-first приложение.

## Главная цель

Создать новое приложение:

**ПАК.ИТ Калькуляторы / PACK.IT Calculators**

Состав первой версии:

- калькулятор сцены;
- калькулятор ферм;
- калькулятор LED-экранов;
- локальное сохранение расчётов;
- настройки цен;
- PDF/export/share;
- standalone/offline;
- RU/EN foundation;
- без рекламы;
- без аккаунтов, backend, cloud sync, remote config, аналитики и трекинга.

## Быстрый старт для Codex / разработчика

Перед кодом читать:

1. [`CODEX_START_HERE.md`](CODEX_START_HERE.md)
2. [`docs/PACKIT_MASTER_SPEC.md`](docs/PACKIT_MASTER_SPEC.md)
3. [`docs/DECISIONS.md`](docs/DECISIONS.md)
4. [`docs/DOCUMENTATION_RULES.md`](docs/DOCUMENTATION_RULES.md)
5. [`docs/INDEX.md`](docs/INDEX.md)
6. [`docs/codex/TASK_001_FINAL_HANDOFF.md`](docs/codex/TASK_001_FINAL_HANDOFF.md)
7. [`docs/codex/TASK_001_FOUNDATION_PROMPT.md`](docs/codex/TASK_001_FOUNDATION_PROMPT.md)

## Основные документы

- [`docs/PACKIT_MASTER_SPEC.md`](docs/PACKIT_MASTER_SPEC.md) — единая каноническая сводка проекта.
- [`docs/DOCUMENTATION_RULES.md`](docs/DOCUMENTATION_RULES.md) — правила ведения документации.
- [`docs/00_MASTER_PLAN.md`](docs/00_MASTER_PLAN.md) — общий план rewrite и релизная стратегия.
- [`docs/01_SOURCE_AUDIT.md`](docs/01_SOURCE_AUDIT.md) — что переносим из `Feg_Calc_Stage`, что не переносим.
- [`docs/02_ARCHITECTURE_CONTRACT.md`](docs/02_ARCHITECTURE_CONTRACT.md) — новая архитектура, папки, слои, правила зависимостей.
- [`docs/03_CORE_LOGIC_EXTRACTION.md`](docs/03_CORE_LOGIC_EXTRACTION.md) — как выносить Stage / Truss / LED core.
- [`docs/04_MOBILE_UI_CONTRACT.md`](docs/04_MOBILE_UI_CONTRACT.md) — правила mobile-first интерфейса.
- [`docs/05_STORE_RELEASE_CHECKLIST.md`](docs/05_STORE_RELEASE_CHECKLIST.md) — подготовка к App Store и Google Play.
- [`docs/06_CODEX_TASKS.md`](docs/06_CODEX_TASKS.md) — порядок задач для Codex.
- [`docs/07_BRAND_CONTRACT.md`](docs/07_BRAND_CONTRACT.md) — переход с FEG на ПАК.ИТ / PACK.IT.
- [`docs/08_DEFINITION_OF_DONE.md`](docs/08_DEFINITION_OF_DONE.md) — критерии готовности задач и baseline.

Полный индекс: [`docs/INDEX.md`](docs/INDEX.md)

## Ассеты

Ассетная структура уже создана в [`assets/`](assets/).

Ключевые файлы:

- [`docs/assets/03_PRODUCTION_ASSET_MANIFEST.md`](docs/assets/03_PRODUCTION_ASSET_MANIFEST.md) — production asset manifest.
- [`docs/assets/04_ASSET_GENERATION_PLAN.md`](docs/assets/04_ASSET_GENERATION_PLAN.md) — поэтапный план генерации ассетов.
- [`assets/README.md`](assets/README.md) — структура ассетов.
- [`assets/BINARY_UPLOAD_TODO.md`](assets/BINARY_UPLOAD_TODO.md) — что позже загрузить из raster ZIP.
- [`assets/design-tokens/packit-asset-colors.css`](assets/design-tokens/packit-asset-colors.css) — спокойная PACK.IT palette.

Raster PNG/WebP ассеты подготовлены в архиве `packit_production_assets_v0_1.zip`, но загрузку бинарников можно отложить до desktop workflow.

## Базовый принцип разработки

Не переписываем старый standalone целиком. Используем его как эталон логики, расчётов и проверенных пользовательских сценариев.

Новая кодовая база должна быть:

- typed;
- mobile-first;
- standalone/offline;
- Capacitor-ready;
- с чистым `core/` без DOM и UI-зависимостей;
- с отдельными renderer/pdf/storage/native слоями;
- с RU/EN i18n foundation;
- без FEG-бренда в пользовательском интерфейсе;
- без backend/cloud sync/remote config;
- без рекламы, трекинга и аналитики.

Правильная цепочка:

```text
source audit → core contracts → core tests → stage core → truss core → led core → mobile UI → storage → PDF/share → store release
```

Неправильная цепочка:

```text
скопировать старый index.html → завернуть в Capacitor → чинить overflow/CSS/runtime баги бесконечно
```

## Первый разрешённый кодовый шаг

Только после явной команды:

```text
готово, начинаем Task 001
```

Первый шаг:

```text
Task 001 — Foundation
```

Он создаёт только чистую основу приложения: React + TypeScript + Vite + Capacitor, маршруты, PACK.IT brand layer, i18n, design tokens, пустые экраны и placeholder core contracts. Без расчётов, PDF, storage schema, backend, ads, analytics и старого FEG-кода.
