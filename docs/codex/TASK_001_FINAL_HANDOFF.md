# Task 001 Final Handoff — Project Scene Shell MVP

## 1. Purpose

This is the final handoff for starting implementation of PACK.IT Alpha 0.1.0.

Task 001 must create the clean foundation for the Project Scene First architecture.

Do not implement production Stage/Truss/LED calculators as separate apps.

## 2. Product identity

Product:

```text
ПАК.ИТ / PACK.IT
```

Status:

```text
Alpha 0.1.0
Architecture Freeze #1
Project Scene First
```

Type:

```text
standalone/offline mobile-first 3D constructor for technical event packages
```

## 3. Core architecture

The foundation must be prepared around:

```text
ProjectModel → SceneModel → SceneObject / SceneGroup
```

Final BOM, weight, price, PDF and export must be generated from ProjectModel/SceneModel.

## 4. Required Task 001 scope

Create only foundation-level pieces:

- React + TypeScript + Vite foundation;
- Capacitor-ready shell;
- PACK.IT brand layer;
- RU/EN i18n foundation;
- design tokens;
- app routes/shell;
- ProjectModel contracts;
- SceneModel contracts;
- SceneObject contracts;
- empty Three.js renderer shell;
- Asset Library contracts;
- placeholder guided builder entry points: Add Stage, Add Truss, Add LED;
- local offline storage adapter interface;
- basic tests/type checks.

## 5. Out of scope

Do not implement in Task 001:

- final Stage formulas;
- final Truss formulas;
- final LED formulas;
- production PDF;
- production GLB import UI;
- backend;
- accounts;
- analytics;
- ads;
- old FEG runtime;
- old standalone HTML/CSS shell.

## 6. Guided builders rule

Stage, Truss and LED entry points are guided builders only.

They must create or update scene groups later:

- `StageGroup`;
- `TrussGroup`;
- `LedGroup`.

They must not become independent calculator screens with final isolated results.

## 7. Success criteria

Task 001 is complete when the app can open a clean PACK.IT shell with a placeholder project scene, typed ProjectModel/SceneModel contracts, renderer placeholder and visible entry points for Add Stage / Add Truss / Add LED / Asset Library.

All final calculations can remain placeholders.
