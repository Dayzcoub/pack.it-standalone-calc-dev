# Action System

## Purpose

Action System is the shared way to change ProjectModel and SceneModel.

It supports Undo/Redo, autosave, validation and predictable state updates.

## Rule

Do not mutate scene data directly from UI components.

Use actions.

## Example action types

- create project
- add object
- delete object
- move object
- rotate object
- edit object parameters
- create group
- update settings

## Task 001

Task 001 should define action interfaces and a simple dispatcher boundary.

Full command history can be implemented later.
