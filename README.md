# PACK.IT Standalone Calculators

Документационный репозиторий для переписывания standalone-калькуляторов Stage / Truss / LED под новый бренд **ПАК.ИТ / PACK.IT** и будущий выпуск в App Store / Google Play.

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
- offline-first;
- без аккаунтов, backend, аналитики и сбора персональных данных в v1.0.

## Документы

- [`docs/00_MASTER_PLAN.md`](docs/00_MASTER_PLAN.md) — общий план rewrite и релизная стратегия.
- [`docs/01_SOURCE_AUDIT.md`](docs/01_SOURCE_AUDIT.md) — что переносим из `Feg_Calc_Stage`, что не переносим.
- [`docs/02_ARCHITECTURE_CONTRACT.md`](docs/02_ARCHITECTURE_CONTRACT.md) — новая архитектура, папки, слои, правила зависимостей.
- [`docs/03_CORE_LOGIC_EXTRACTION.md`](docs/03_CORE_LOGIC_EXTRACTION.md) — как выносить Stage / Truss / LED core.
- [`docs/04_MOBILE_UI_CONTRACT.md`](docs/04_MOBILE_UI_CONTRACT.md) — правила mobile-first интерфейса.
- [`docs/05_STORE_RELEASE_CHECKLIST.md`](docs/05_STORE_RELEASE_CHECKLIST.md) — подготовка к App Store и Google Play.
- [`docs/06_CODEX_TASKS.md`](docs/06_CODEX_TASKS.md) — порядок задач для Codex.
- [`docs/07_BRAND_CONTRACT.md`](docs/07_BRAND_CONTRACT.md) — переход с FEG на ПАК.ИТ / PACK.IT.
- [`docs/08_DEFINITION_OF_DONE.md`](docs/08_DEFINITION_OF_DONE.md) — критерии готовности задач и baseline.

## Базовый принцип разработки

Не переписываем старый standalone целиком. Используем его как эталон логики, расчётов и проверенных пользовательских сценариев.

Новая кодовая база должна быть:

- typed;
- mobile-first;
- offline-first;
- Capacitor-ready;
- с чистым `core/` без DOM и UI-зависимостей;
- с отдельными renderer/pdf/storage/native слоями;
- без FEG-бренда в пользовательском интерфейсе.

Правильная цепочка:

```text
source audit → core contracts → core tests → stage core → truss core → led core → mobile UI → storage → PDF/share → store release
```

Неправильная цепочка:

```text
скопировать старый index.html → завернуть в Capacitor → чинить overflow/CSS/runtime баги бесконечно
```
