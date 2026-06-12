# 02. Architecture Contract

## Status

PACK.IT Alpha 0.1.0.

Project Scene First.

## Goal

The new codebase must support a single standalone/offline mobile-first 3D project constructor.

It must not be structured as three independent calculators.

## Source of truth

The source of truth is ProjectModel, SceneModel, SceneObject and SceneGroup.

All final outputs are generated from the shared project scene.

## Main layers

- app
- brand
- core project
- core scene
- core objects
- core bom
- core pricing
- core pdf
- guided builders
- asset library
- renderer
- storage
- ui
- i18n

## Builder contract

Add Stage, Add Truss and Add LED are guided builders.

They create scene groups and must not own final isolated result models.

## Renderer contract

The renderer displays SceneModel.

Renderer state is not project data.

## Storage contract

Save ProjectModel.

Do not save separate calculator snapshots as the main persistence unit.

## Asset contract

3D assets use GLB / GLTF as the primary direction.

Manual objects may be visualOnly or catalogLinked.
