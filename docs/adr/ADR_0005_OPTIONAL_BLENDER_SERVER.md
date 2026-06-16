# ADR 0005 — Optional Blender Server

## Status

Accepted as future optional architecture.

## Context

PACK.IT is a mobile-first offline-first 3D constructor.

The app needs fast interactive scene editing on phones and tablets.

At the same time, high-quality rendering, texture baking and heavy model optimization are better suited for server-side processing.

Blender can run in background mode on a server and process or render files using scripts.

## Decision

Blender may be used as an optional server-side processing and rendering backend.

Blender must not become the mobile runtime engine.

The mobile runtime remains:

- ProjectModel
- SceneModel
- SceneObject system
- Three.js renderer
- GLB / GLTF runtime assets

## Allowed future server jobs

- uploaded model cleanup
- scale and origin normalization
- texture baking
- GLB optimization
- preview image generation
- high-quality scene rendering
- PDF-ready image generation

## Offline-first constraint

Core PACK.IT functionality must work without Blender Server.

If the server is unavailable, the user must still be able to create, edit, save and preview projects locally.

## Security constraint

Uploaded files must be validated and processed in sandboxed workers.

The server must not execute arbitrary uploaded scripts.

## Consequences

- Blender Server is not part of Task 001
- Blender Server can become a later premium or online feature
- app architecture should keep Render Job Client and ActionSystem extension points possible
- server outputs are imported back into the app through controlled project actions
