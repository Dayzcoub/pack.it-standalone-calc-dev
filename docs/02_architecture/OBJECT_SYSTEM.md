# Object System

## Purpose

The Object System defines all physical and visual elements inside the PACK.IT scene.

Every technical element must use a shared object contract.

## Base object

```ts
export type SceneObject = {
  id: string;
  type: SceneObjectType;
  name: string;
  transform: Transform3D;
  dimensions?: Dimensions3D;
  assetRef?: string;
  catalogRef?: string;
  bomMode: 'none' | 'visualOnly' | 'catalogLinked' | 'generated';
  children?: string[];
  meta?: Record<string, unknown>;
};
```

## Object types

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

## Groups

Groups are logical assemblies of scene objects.

Initial groups:

- `StageGroup`;
- `TrussGroup`;
- `LedGroup`.

## Builder rule

Guided builders create or update scene groups.

They must not become isolated calculator applications.

## Output rule

Object data contributes later to BOM, weight, price, power and PDF through shared scene pipelines.
