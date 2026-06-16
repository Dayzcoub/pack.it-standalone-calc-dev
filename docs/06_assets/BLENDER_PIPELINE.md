# Blender Pipeline

## Decision

Blender is part of the PACK.IT asset pipeline, not the mobile runtime engine.

## Role of Blender

Blender can be used for:

- creating and editing source 3D models
- cleaning imported manufacturer models
- setting real-world scale
- setting object origin and orientation
- reducing geometry for mobile use
- baking or simplifying materials
- exporting GLB / GLTF assets
- preparing reusable asset families
- generating preview renders for documentation later

## Runtime rule

The PACK.IT mobile app must not embed Blender as its 3D engine.

The mobile runtime remains SceneModel plus Three.js renderer.

Blender source files are authoring files, not app scene data.

## File roles

- `.blend` is source authoring data
- `.glb` / `.gltf` is runtime asset data
- SceneModel is project data
- CatalogModel links runtime assets to equipment metadata

## Recommended asset flow

1. Create or import model in Blender.
2. Clean geometry.
3. Set scale in meters.
4. Set origin and orientation.
5. Simplify for mobile.
6. Assign simple materials.
7. Export GLB.
8. Register asset in Asset Library and CatalogModel.
9. Test in Three.js viewport.

## Future optional automation

Later, Blender may be used in a desktop or server-side toolchain for batch conversion or procedural asset generation.

That automation must remain outside the mobile runtime.

## Task 001

Task 001 should not integrate Blender.

Task 001 only needs to keep the architecture compatible with a GLB-first asset pipeline.
