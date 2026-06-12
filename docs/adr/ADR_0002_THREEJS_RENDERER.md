# ADR 0002 — Three.js Renderer Direction

## Status

Accepted for Alpha planning.

## Context

PACK.IT needs a mobile-first 3D scene renderer for technical event packages.

## Decision

Use a Three.js-ready renderer layer for the Alpha direction.

The renderer displays SceneModel and must not become the project data source.

## Consequences

- renderer is isolated behind adapters
- SceneModel remains the source of truth
- GLB and GLTF assets are a natural fit
- performance budget must be monitored for mobile devices
