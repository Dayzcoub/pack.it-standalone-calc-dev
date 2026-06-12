# Scene Graph

## Purpose

Scene Graph defines hierarchy inside SceneModel.

A scene is not only a flat list of objects.

It must support groups, parent-child relationships and object collections.

## Initial hierarchy

Project

- Scene
  - Stage groups
  - Truss groups
  - LED groups
  - Audio groups
  - Light groups
  - Power groups
  - Decor groups
  - Generic objects

## Why it matters

Scene Graph enables:

- hide/show group
- copy group
- delete group
- move group
- export group later
- summarize group later

## Task 001

Task 001 should define contracts only.

Real nested editing can be implemented later.
