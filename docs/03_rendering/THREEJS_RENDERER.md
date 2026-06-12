# Three.js Renderer Strategy

The renderer displays SceneModel and provides interaction with scene objects.

The renderer is not the source of project data.

## MVP stack

- Three.js
- GLTFLoader-ready structure
- OrbitControls-ready structure
- TransformControls-ready structure

## Views

- Perspective
- Isometric
- Top
- Front
- Side

## Task 001 scope

Task 001 creates only a renderer shell and placeholder scene.

Production geometry, real GLB import, final object controls and export snapshots are later tasks.

## Data flow

ProjectModel and SceneModel feed the renderer. Renderer changes are written back through controlled scene actions.
