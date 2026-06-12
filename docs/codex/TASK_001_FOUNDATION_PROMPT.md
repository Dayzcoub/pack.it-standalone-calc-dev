# TASK 001 — Project Scene Shell MVP Prompt

Copy this prompt to Codex when starting the first code task.

---

Create the clean foundation for **PACK.IT Alpha 0.1.0**.

## Product

Build a new app foundation for:

```text
PACK.IT / ПАК.ИТ
```

The app is a standalone/offline mobile-first 3D constructor for technical event packages.

It must not be built as three separate calculators.

## Architecture

Use Project Scene First:

```text
ProjectModel → SceneModel → SceneObjects / Groups
```

BOM, weight, price, power, PDF and export will later be generated from the shared scene.

## Stack

Use:

- React;
- TypeScript;
- Vite;
- Capacitor-ready structure;
- Three.js-ready renderer layer.

## Implement in Task 001

Create:

- app shell;
- routing foundation;
- PACK.IT brand layer;
- design tokens;
- RU/EN i18n foundation;
- typed `ProjectModel` contracts;
- typed `SceneModel` contracts;
- typed `SceneObject` / `SceneGroup` contracts;
- placeholder Three.js scene shell;
- placeholder Asset Library module;
- placeholder guided builder entry points:
  - Add Stage;
  - Add Truss;
  - Add LED;
- offline storage adapter interface;
- simple smoke tests/type checks.

## Do not implement yet

Do not implement:

- final Stage/Truss/LED calculation engines;
- production PDF;
- production GLB import UI;
- old FEG code;
- backend;
- accounts;
- ads;
- analytics;
- tracking;
- old standalone app shell.

## Critical rule

Guided builders create scene objects. They are not independent calculator applications.

Task 001 must make this architecture hard to accidentally reverse.
