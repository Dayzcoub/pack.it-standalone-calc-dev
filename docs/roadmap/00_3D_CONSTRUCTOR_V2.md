# 00. 3D Constructor Roadmap — v2.0

## 1. Decision

PACK.IT must leave a clear roadmap for a future **v2.0 3D constructor**.

This is not part of v1.0 MVP.

v1.0 remains:

```text
fast 2D/reference calculators → scheme → BOM → price → PDF
```

v2.0 direction:

```text
interactive 3D constructor for Stage + Truss + LED from real/catalog 3D models
```

## 2. Why v2.0, not v1.0

A 3D constructor is valuable, but it can easily delay the first useful release.

Reasons to postpone to v2.0:

- 3D assets need preparation and optimization;
- mobile performance risk is high;
- model compatibility and snapping are complex;
- Stage/Truss/LED must share one scene model;
- 3D UI/gestures require separate design and testing;
- v1.0 market validation must not depend on 3D.

## 3. v2.0 goal

Create one unified 3D construction environment where the user can build or preview:

- stage platforms;
- truss portals/frames/stools/ground support later;
- LED screens and mounting/standing hardware;
- combined scene packages.

## 4. v2.0 principle

3D must not become a separate fake visual toy.

The model must stay connected to calculation logic:

```text
catalog item → 3D model → scene object → BOM row → weight/price/PDF
```

The 3D scene must be a visual/editor layer over the same structured calculation/catalog system.

## 5. Scope layers

### v2.0 phase A — 3D viewer

- load GLB models;
- show Stage/Truss/LED result in 3D;
- orbit/pan/zoom;
- fit/center;
- dark/light scene background;
- no full editing yet.

### v2.0 phase B — template-based 3D constructor

- build stage presets in 3D;
- build truss portal/frame/stool presets in 3D;
- build LED wall from cabinet grid;
- update BOM from scene/result;
- export 3D screenshot into PDF.

### v2.0 phase C — interactive 3D assembly

- select objects;
- drag/snap parts;
- rotate where allowed;
- add/remove catalog parts;
- validate compatibility;
- auto-connect fasteners where needed;
- warnings from invalid assemblies.

### v2.0 phase D — advanced 3D project package

- combined Stage + Truss + LED scene;
- saved project packages;
- client/technical 3D PDF/images;
- optional AR/preview later if ever justified.

## 6. Model sources

Known future source inventory already exists in user files:

- MDM CAD/STP/DWG inventory for truss models;
- non-MDM truss 3D availability analysis;
- future separate compatibility groups for MDM/IMLIGHT/etc.

These are source inventories, not runtime-ready assets.

Needed pipeline:

```text
CAD/STP/DWG source → clean mesh → GLB → optimize → metadata → app asset manifest
```

## 7. 3D asset requirements

Every 3D asset must have:

```ts
type ModelAssetMeta = {
  id: string;
  catalogItemId: string;
  assetPath: string;
  format: 'glb';
  unit: 'm' | 'mm';
  scale: number;
  origin: 'center' | 'bottom-center' | 'connector-defined';
  bounds: { x: number; y: number; z: number };
  connectionPoints?: ModelConnectionPoint[];
  sourceStatus: 'verified' | 'converted' | 'estimated' | 'user-defined';
  lod?: 'low' | 'medium' | 'high';
};
```

## 8. Connection points

3D assembly requires explicit connection points.

For truss:

- tube/node connector positions;
- orientation;
- compatibility group;
- allowed rotations;
- fastener rule link.

For stage:

- module corners;
- legs/support positions;
- stair attachment points;
- closure/skirt edges.

For LED:

- cabinet grid connections;
- hanging bar connection;
- leg/stand connection;
- power/signal conceptual links if displayed.

## 9. Shared SceneModel

Future 3D should use a shared scene model:

```ts
type SceneModel = {
  id: string;
  units: 'm';
  objects: SceneObject[];
  connections: SceneConnection[];
  warnings: CalculationWarning[];
  camera?: SceneCameraState;
};
```

```ts
type SceneObject = {
  id: string;
  kind: 'stage' | 'truss' | 'led' | 'rigging' | 'support' | 'accessory';
  catalogItemId: string;
  modelAssetId?: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
  metadata?: Record<string, unknown>;
};
```

## 10. Renderer technology direction

Possible web/mobile stack:

```text
Three.js / React Three Fiber / raw Three.js wrapper
```

Decision is not final.

Do not add 3D dependencies in Task 001 or v1.0 unless explicitly approved.

## 11. Mobile performance requirements

3D must be optimized for phones:

- GLB assets compressed/optimized;
- use LOD where needed;
- avoid huge CAD meshes directly in app;
- lazy-load 3D assets;
- unload unused models;
- cap scene complexity;
- keep 2D fallback available.

## 12. UX requirements

3D constructor must not replace fast calculators.

Users should be able to:

- calculate quickly in 2D/form mode;
- optionally open 3D preview/constructor;
- return to simple calculator without losing data.

3D is a Pro/advanced layer, not a blocker for basic calculations.

## 13. PDF integration

v2.0 PDFs may include:

- 3D screenshot/render;
- 2D scheme;
- BOM;
- warnings;
- price;
- disclaimer.

PDF must still use structured calculation data, not visual-only 3D scene assumptions.

## 14. Risks

Major risks:

- mobile performance;
- asset conversion time;
- inaccurate model origins/scales;
- snapping complexity;
- catalog compatibility mistakes;
- 3D delaying core calculator release.

Mitigation:

- keep v1.0 2D-first;
- build 3D as separate roadmap;
- start with viewer before editor;
- use metadata and connection points;
- preserve 2D/PDF fallback.

## 15. Acceptance for v2.0 planning

v2.0 3D roadmap is accepted when:

- v1.0 remains unblocked;
- 3D data model is planned;
- model asset pipeline is documented;
- Stage/Truss/LED all fit into one future SceneModel;
- 3D is connected to BOM/catalog logic;
- no 3D dependency is added to v1.0 foundation without decision.
