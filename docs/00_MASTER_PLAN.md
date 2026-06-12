# 00. PACK.IT — Master Plan

## Status

```text
PACK.IT Alpha 0.1.0
Architecture Freeze #1
Project Scene First
```

PACK.IT is not released yet. Versions before `1.0.0` are Alpha/Beta.

## Purpose

This repository is the pre-code documentation and asset repository for a standalone/offline mobile-first 3D constructor of technical event packages.

It is not a rewrite of three separate Stage / Truss / LED calculators.

## Main architecture

The core line is ProjectModel, SceneModel, SceneObjects and generated outputs.

Generated outputs include 3D visualization, BOM, weight, price, PDF and export.

## Guided builders

Stage, Truss and LED are created through guided builders:

- Add Stage
- Add Truss
- Add LED

Builders create scene groups and then the shared scene owns them.

## Asset Library

The product includes an Asset Library direction for manual 3D placement of audio, light, power, decor and generic objects.

Primary 3D format: GLB / GLTF.

## First implementation task

Task 001 is Project Scene Shell MVP.

It creates the app foundation, typed project/scene/object contracts, renderer shell, guided builder entry points and asset library contracts.

It does not implement final calculators.
