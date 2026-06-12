# Decision Log

## 2026-06-12 — Product versioning

Decision: PACK.IT is not released yet.

Use pre-release semantic versioning:

```text
0.x — Alpha/Beta
1.0.0 — first public release
```

Old archive numbers such as `v3.1.88` and `v3.17.50` are historical checkpoints only.

## 2026-06-12 — Architecture reset

Decision: PACK.IT moves from Calculator First to Project Scene First.

The product is no longer a set of three standalone calculators for Stage / Truss / LED.

PACK.IT is a single standalone/offline mobile-first 3D constructor for technical event packages.

## 2026-06-12 — Source of truth

Decision: `ProjectModel` and `SceneModel` are the source of truth.

BOM, weight, price, power, PDF, export and visualization must be generated from the shared project scene.

Separate calculator forms may exist only as guided builders that create or update scene objects.

## 2026-06-12 — Guided builders

Decision: old quick calculators become guided builders:

- `Add Stage` creates `StageGroup`;
- `Add Truss` creates `TrussGroup`;
- `Add LED` creates `LedGroup`.

After creation, objects are edited in the common scene through Object Inspector and transform controls.

## 2026-06-12 — Asset Library and 3D import

Decision: PACK.IT must include Asset Library and manual 3D object placement.

Primary supported asset format:

```text
GLB / GLTF
```

Imported objects can be `visualOnly` or `catalogLinked`.

## 2026-06-12 — Task 001 reset

Decision: old Task 001 for PACK.IT Calculators is replaced.

New first task:

```text
Task 001 — Project Scene Shell MVP
```

It creates the app foundation, ProjectModel, SceneModel, SceneObject contracts, renderer shell, Asset Library contracts and empty guided builder entry points.

## 2026-06-02 — Source strategy retained

Decision: use `Dayzcoub/Feg_Calc_Stage` as domain logic/reference source, not as codebase foundation.

Useful Stage/Truss/LED rules should be ported into scene builders and object contribution engines.
