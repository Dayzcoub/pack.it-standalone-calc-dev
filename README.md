# PACK.IT

Документационный и ассетный pre-code репозиторий для нового направления **ПАК.ИТ / PACK.IT**.

## Статус продукта

```text
PACK.IT Alpha 0.1.0
Architecture Freeze #1
Project Scene First
```

PACK.IT ещё не выпущен публично. Все версии до `1.0.0` считаются Alpha/Beta. Первый публичный релиз продукта — `1.0.0`.

Старые номера архивов и веток вроде `v3.1.88`, `v3.17.50` остаются только внутренними историческими контрольными точками и не являются продуктовыми версиями PACK.IT.

## Главная цель

Создать единый **standalone/offline mobile-first 3D-конструктор технического пакета мероприятия**.

PACK.IT больше не является набором трёх отдельных калькуляторов Stage / Truss / LED.

Новая базовая модель:

```text
ProjectModel → SceneModel → SceneObjects / Groups → BOM / Weight / Price / PDF / Export
```

Stage, Truss, LED, Audio, Light, Power, Decor и пользовательские 3D-модели собираются в одном 3D-пространстве как объекты общей сцены.

## Product Scene First

Единственный источник правды проекта — `ProjectModel` и вложенная `SceneModel`.

Из `SceneModel` строятся:

- визуализация;
- BOM;
- вес;
- стоимость;
- мощность;
- PDF;
- экспорт;
- сохранённый проект.

Запрещено развивать архитектуру как три независимых калькулятора с отдельными формами и отдельными результатами.

## Guided Builders

Бывшие быстрые калькуляторы становятся мастерами создания объектов:

- `Add Stage` создаёт `StageGroup`;
- `Add Truss` создаёт `TrussGroup`;
- `Add LED` создаёт `LedGroup`.

После создания объект редактируется в общей сцене через Object Inspector, transform controls и свойства объекта.

## Asset Library и импорт 3D

В архитектуру сразу закладывается Asset Library для ручной расстановки оборудования:

- колонки;
- сабвуферы;
- световые приборы;
- стойки;
- кейсы;
- генераторы;
- декор;
- generic 3D objects.

Основной формат ассетов: `GLB / GLTF`.

Импортированные объекты могут быть:

- `visualOnly` — только для визуализации;
- `catalogLinked` — участвуют в BOM, весе, мощности, цене и документах.

## Быстрый старт для Codex / разработчика

Перед кодом читать строго в этом порядке:

1. [`CODEX_START_HERE.md`](CODEX_START_HERE.md)
2. [`docs/PACKIT_MASTER_SPEC.md`](docs/PACKIT_MASTER_SPEC.md)
3. [`docs/DECISIONS.md`](docs/DECISIONS.md)
4. [`docs/INDEX.md`](docs/INDEX.md)
5. [`docs/02_architecture/PROJECT_MODEL.md`](docs/02_architecture/PROJECT_MODEL.md)
6. [`docs/02_architecture/SCENE_MODEL.md`](docs/02_architecture/SCENE_MODEL.md)
7. [`docs/02_architecture/OBJECT_SYSTEM.md`](docs/02_architecture/OBJECT_SYSTEM.md)
8. [`docs/02_architecture/ASSET_LIBRARY.md`](docs/02_architecture/ASSET_LIBRARY.md)
9. [`docs/08_tasks/TASK_001_SCENE_SHELL.md`](docs/08_tasks/TASK_001_SCENE_SHELL.md)
10. [`docs/codex/TASK_001_FINAL_HANDOFF.md`](docs/codex/TASK_001_FINAL_HANDOFF.md)
11. [`docs/codex/TASK_001_FOUNDATION_PROMPT.md`](docs/codex/TASK_001_FOUNDATION_PROMPT.md)

## Новая документационная структура

```text
docs/
  01_product/
  02_architecture/
  03_rendering/
  04_builders/
  05_bom/
  06_assets/
  07_documents/
  08_tasks/
  09_archive/
```

Старые документы времён calculator-first не удаляются автоматически, но считаются исторической справкой, если противоречат Project Scene First.

## Первый разрешённый кодовый шаг

Только после явной команды:

```text
готово, начинаем Task 001
```

Первый кодовый шаг теперь:

```text
Task 001 — Project Scene Shell MVP
```

Он создаёт только foundation новой архитектуры: React + TypeScript + Vite + Capacitor, Three.js scene shell, ProjectModel, SceneModel, SceneObject contracts, Asset Library contracts, пустые guided builders и базовую offline storage foundation.

Task 001 не переносит старые калькуляторы, не реализует финальные расчёты, не делает production PDF, не подключает backend, ads, analytics и не копирует старый FEG-код.
