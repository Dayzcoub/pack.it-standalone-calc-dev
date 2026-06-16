# ADR 0004 — Blender Pipeline, Not Runtime

## Status

Accepted.

## Context

PACK.IT needs high-quality 3D assets for a mobile-first technical event constructor.

Blender is powerful for modeling, cleanup, optimization and GLB export.

Embedding Blender as the mobile app runtime would be too heavy and would conflict with the mobile-first offline app direction.

## Decision

Use Blender as an asset authoring and preparation tool.

Do not use Blender as the runtime 3D engine inside the PACK.IT mobile app.

Runtime architecture remains:

- ProjectModel
- SceneModel
- SceneObject system
- Three.js renderer
- GLB / GLTF runtime assets

## Consequences

- `.blend` files are source assets only
- `.glb` / `.gltf` files are runtime assets
- Blender can be used in desktop or server-side tooling later
- Task 001 must not attempt Blender integration
- Three.js remains the mobile renderer direction
