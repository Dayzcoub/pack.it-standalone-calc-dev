# CODEX START HERE

This repository is a documentation-first pre-code repository for **PACK.IT / ПАК.ИТ**.

## Current product status

```text
PACK.IT Alpha 0.1.0
Architecture Freeze #1
Project Scene First
```

The product is not released yet. All `0.x` versions are Alpha/Beta. The first public release is `1.0.0`.

Old internal archive numbers are historical checkpoints only. They are not product versions.

## Non-negotiable direction

Do not build three separate Stage / Truss / LED calculators.

PACK.IT is now a single standalone/offline mobile-first 3D project scene constructor.

The source of truth is:

```text
ProjectModel → SceneModel → SceneObjects / Groups
```

BOM, weight, price, power, PDF and export must be generated from `ProjectModel` / `SceneModel`, not from independent calculator result forms.

## Read first

Read in this order:

1. `README.md`
2. `docs/PACKIT_MASTER_SPEC.md`
3. `docs/DECISIONS.md`
4. `docs/INDEX.md`
5. `docs/02_architecture/PROJECT_MODEL.md`
6. `docs/02_architecture/SCENE_MODEL.md`
7. `docs/02_architecture/OBJECT_SYSTEM.md`
8. `docs/02_architecture/ASSET_LIBRARY.md`
9. `docs/08_tasks/TASK_001_SCENE_SHELL.md`
10. `docs/codex/TASK_001_FINAL_HANDOFF.md`
11. `docs/codex/TASK_001_FOUNDATION_PROMPT.md`

Older calculator-first documents may contain useful domain rules, but if they conflict with Project Scene First, this file and `PACKIT_MASTER_SPEC.md` win.

## First implementation task

The first allowed code task is:

```text
Task 001 — Project Scene Shell MVP
```

It must create only the foundation for the new architecture. It must not copy the old FEG standalone app and must not implement production Stage/Truss/LED calculators as separate apps.
