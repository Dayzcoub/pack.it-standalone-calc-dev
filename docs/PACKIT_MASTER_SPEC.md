# PACK.IT Master Spec

## 0. Document status

This document is the canonical high-level specification for **PACK.IT Alpha 0.1.0**.

Status:

```text
Architecture Freeze #1
Project Scene First
```

If this document conflicts with older calculator-first notes, this document wins.

PACK.IT has not been publicly released yet. All versions before `1.0.0` are Alpha/Beta. `1.0.0` is reserved for the first public release.

## 1. Product overview

Product name:

```text
ПАК.ИТ / PACK.IT
```

Product type:

```text
standalone/offline mobile-first 3D constructor for technical event packages
```

Core workflow:

```text
create project → build 3D scene → add technical objects → generate BOM / weight / price / PDF → share/export
```

PACK.IT is not a set of three separate calculators. It is a single project-scene application.

## 2. Final strategic decision

The old standalone calculators direction is archived.

New direction:

```text
Project Scene First
```

Stage, Truss and LED are not independent applications. They are scene object groups created through guided builders inside one shared project scene.

## 3. Source of truth

The source of truth is:

```text
ProjectModel
  → SceneModel
    → SceneObject / SceneGroup
```

All derived outputs must come from this source:

- 3D visualization;
- BOM;
- weight;
- price;
- power;
- PDF;
- saved project;
- export/share.

Do not generate final BOM, price or PDF from isolated calculator forms.

## 4. ProjectModel

`ProjectModel` stores the whole event package:

```ts
ProjectModel = {
  id: string;
  version: string;
  title: string;
  eventMeta: EventMeta;
  scene: SceneModel;
  bom: BomSnapshot;
  pricing: PricingSnapshot;
  documents: DocumentSnapshot[];
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
}
```

`bom`, `pricing` and `documents` are generated snapshots. They must be reproducible from `scene` and project settings.

## 5. SceneModel

`SceneModel` stores the 3D world:

```ts
SceneModel = {
  units: 'm';
  origin: Vec3;
  objects: SceneObject[];
  groups: SceneGroup[];
  layers: SceneLayer[];
  selection: SelectionState;
  camera: CameraState;
  environment: SceneEnvironment;
}
```

Supported operations:

- add object;
- select object;
- move;
- rotate;
- scale where allowed;
- duplicate;
- group;
- delete;
- edit parameters;
- regenerate object from builder parameters.

## 6. Object system

All technical elements must inherit from a common object contract.

Object types:

```text
stage
truss
led
audio
light
power
rigging
decor
generic3d
```

Groups:

- `StageGroup`;
- `TrussGroup`;
- `LedGroup`;
- future audio/light/power groups.

Each object has:

- id;
- type;
- name;
- transform;
- dimensions;
- children;
- asset reference if needed;
- catalog reference if linked;
- BOM mode;
- metadata;
- warnings.

## 7. Guided builders

Guided builders replace standalone calculators.

Their job is to create or update scene groups.

### Add Stage

Creates `StageGroup` from dimensions, deck type, height, stairs and closure options.

### Add Truss

Creates `TrussGroup` from portal/frame/stool/manual presets and truss rules.

### Add LED

Creates `LedGroup` from screen dimensions, cabinet size, rigging/standing options and power rules.

After creation, the object lives in the scene and is edited through Object Inspector.

## 8. Asset Library and 3D import

PACK.IT must include an Asset Library for manual placement of event equipment.

Examples:

- speakers;
- subwoofers;
- line array elements;
- lighting fixtures;
- stands;
- cases;
- generators;
- decor;
- generic imported models.

Primary asset format:

```text
GLB / GLTF
```

Future optional formats:

```text
OBJ / FBX
```

Imported objects may be:

```text
visualOnly
catalogLinked
```

`visualOnly` objects affect only the scene.

`catalogLinked` objects participate in BOM, weight, price, power and documents.

## 9. Renderer strategy

Recommended MVP renderer stack:

```text
Three.js
GLTFLoader
OrbitControls
TransformControls
```

Renderer modes:

- perspective;
- isometric;
- top;
- front;
- side.

Renderer is a view of `SceneModel`. Renderer state must not become the project data source.

## 10. BOM / pricing / power strategy

BOM Engine reads `ProjectModel` / `SceneModel` and produces normalized rows.

Each scene object defines how it contributes:

- equipment rows;
- accessories;
- fasteners;
- power rows;
- weight;
- warnings;
- price rows.

Manual imported objects can be excluded or linked to catalog data.

## 11. PDF strategy

PDF is generated from `ProjectModel`, not from separate calculator screens.

MVP PDF should include:

- project title;
- event metadata;
- 3D/isometric snapshot;
- top view;
- BOM;
- weight;
- price if enabled;
- warnings;
- disclaimer;
- app/version metadata.

## 12. Offline first

PACK.IT must work without internet.

Allowed local storage foundation:

- IndexedDB;
- local app storage;
- local JSON import/export later.

No backend, cloud sync, accounts, analytics, ads or tracking in Alpha 0.1.0.

## 13. Mobile first

Main target: phone and tablet.

Desktop is an expanded workspace, not the primary product assumption.

Mobile scene UX must support:

- touch navigation;
- safe areas;
- object selection;
- transform handles or simplified move/rotate controls;
- bottom sheets;
- guided builders;
- object inspector;
- quick PDF/export access.

## 14. Source strategy

Reference repository:

```text
Dayzcoub/Feg_Calc_Stage
```

Use it only as a source of proven domain rules and calculation references.

Do not copy:

- old `index.html` shell;
- legacy CSS cascade;
- `window.FEGModules`;
- Supabase/backend hooks;
- CRM/warehouse/smetчик logic;
- mini-game;
- visible FEG branding.

Stage/Truss/LED logic must be ported into scene object builders and object contribution engines, not into separate calculator pages.

## 15. Task order

Current first task:

```text
Task 001 — Project Scene Shell MVP
```

Planned Alpha sequence:

1. Project Scene Shell;
2. SceneObject System;
3. Asset Library contracts;
4. Three.js renderer shell;
5. Add Stage guided builder;
6. Add Truss guided builder;
7. Add LED guided builder;
8. BOM engine from SceneModel;
9. PDF engine from ProjectModel;
10. local project save/load.

## 16. Safety wording

PACK.IT outputs are reference calculations and project planning documents.

Forbidden claims:

```text
safe
certified
guaranteed
will hold
approved for mounting
```

Required direction:

```text
reference calculation
requires verification
check manufacturer documentation
check equipment passports
qualified specialist must verify on site
```

## 17. Definition of done for architecture docs

A document is aligned with Alpha 0.1.0 only if it does not describe Stage/Truss/LED as independent final calculators and routes all final output through `ProjectModel` / `SceneModel`.
