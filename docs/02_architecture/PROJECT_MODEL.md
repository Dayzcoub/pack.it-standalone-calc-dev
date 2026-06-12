# ProjectModel

## Purpose

`ProjectModel` is the root data model for PACK.IT.

It represents one technical event package and owns the scene, settings and generated snapshots.

## Contract

```ts
export type ProjectModel = {
  id: string;
  schemaVersion: string;
  productVersion: string;
  title: string;
  eventMeta: EventMeta;
  scene: SceneModel;
  settings: ProjectSettings;
  generated: GeneratedProjectSnapshots;
  createdAt: string;
  updatedAt: string;
};
```

## Rule

`ProjectModel` is the main persistence unit.

Saved projects must be saved as projects, not as separate Stage/Truss/LED calculations.

## Generated snapshots

Generated data can be stored for fast UI/PDF use, but it must be reproducible from scene and settings:

- BOM;
- weight;
- price;
- power;
- PDF model;
- warnings.

## Versioning

Every project must include:

- schema version;
- product version;
- engine version later;
- catalog version later;
- created/updated timestamps.
