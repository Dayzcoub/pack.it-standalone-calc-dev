# Blender Server Pipeline

## Status

Future optional online layer.

## Decision

Blender may be used on PACK.IT servers as an optional processing and rendering backend.

This does not replace the mobile runtime.

The mobile app remains:

- ProjectModel
- SceneModel
- Three.js renderer
- GLB / GLTF runtime assets
- offline-first local workflow

## Core idea

PACK.IT mobile app works locally for interactive scene construction.

When online processing is available, the app may submit jobs to a Blender processing server.

The server runs Blender in background mode and returns processed assets or rendered images.

## High-level architecture

```text
PACK.IT App
  local ProjectModel
  local SceneModel
  local Three.js preview
  Render Job Client

PACK.IT Server
  Render API
  Job Queue
  Blender Worker
  Asset Processor
  Scene Render Processor
  Result Storage
```

## Job type: Asset Processing

Used when a user uploads or imports a model.

Input may include:

- GLB
- GLTF
- OBJ later
- FBX later
- BLEND later, if allowed

Processing may include:

- validation
- geometry cleanup
- real-world scale normalization
- origin and orientation correction
- material simplification
- texture baking
- mobile optimization
- GLB export
- preview image generation

Output may include:

- optimized GLB
- preview WebP
- asset report JSON
- validation issues

## Job type: Scene Render

Used when a user wants a high-quality image of the project scene.

Input:

- ProjectModel
- SceneModel
- asset references
- camera preset
- render preset

Processing:

- reconstruct scene in Blender
- load referenced assets
- apply materials and lights
- apply camera preset
- render image

Output:

- client render image
- isometric image
- top view image
- PDF-ready image later

## Job type: PDF Beauty Pack

Future job for generating high-quality images for project documents.

Output may include:

- hero render
- technical top view
- isometric view
- thumbnails

## Offline-first rule

Blender Server must never be required for the core product.

If no server is available, PACK.IT must still support:

- local scene editing
- local Three.js preview
- local save/load
- basic screenshots or local export where available
- basic PDF later

Server-side Blender features are premium or optional online enhancements.

## Security and privacy

Uploaded models and project scenes may contain client data.

Server pipeline must be designed with:

- explicit user action before upload
- clear upload status
- job status and cancellation where possible
- file size limits
- type validation
- sandboxed workers
- no arbitrary script execution from uploaded files
- automatic cleanup policy
- access control before production use

## Runtime boundary

Blender does not mutate the live mobile scene directly.

The server returns processed outputs.

The app imports results through controlled ActionSystem flows.

## Task 001

Task 001 must not implement Blender Server.

Task 001 should only keep the architecture compatible with future server-side render and processing jobs.
