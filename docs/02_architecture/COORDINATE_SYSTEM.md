# Coordinate System

## Purpose

Coordinate rules must be fixed before 3D code.

## Units

Internal scene units are meters.

## Axes

Use a consistent 3D coordinate system across SceneModel, renderer and exports.

Recommended planning direction:

- X: width / left-right
- Y: height / up-down
- Z: depth / front-back

## Ground

Ground plane is Y = 0.

Object height is measured from ground unless explicitly stated.

## Origin

Default origin is the scene center or venue reference point.

The exact implementation must be documented in code and tests.

## Task 001

Task 001 must define the coordinate convention in types and comments.
