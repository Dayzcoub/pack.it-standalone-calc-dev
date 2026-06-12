# SceneModel

## Purpose

`SceneModel` is the source of truth for the 3D technical package.

All visual objects, generated BOM, pricing, weight and PDF outputs must derive from it.

## Contract

```ts
export type SceneModel = {
  units: 'm';
  origin: Vec3;
  objects: SceneObject[];
  groups: SceneGroup[];
  layers: SceneLayer[];
  selection: SelectionState;
  camera: CameraState;
  environment: SceneEnvironment;
};
```

## Core rule

The renderer displays `SceneModel`.

The renderer must not become the project data store.

## Supported operations

- add object;
- select object;
- move object;
- rotate object;
- scale object where allowed;
- duplicate object;
- group objects;
- delete object;
- edit object parameters;
- regenerate builder-created groups.

## Object groups

Initial groups:

- `StageGroup`;
- `TrussGroup`;
- `LedGroup`;
- `ImportedModelGroup` later.

## Output pipeline

```text
SceneModel → Object contribution adapters → BOM / Price / Weight / Power / PDF
```
