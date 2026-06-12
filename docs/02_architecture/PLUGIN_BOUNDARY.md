# Plugin Boundary

## Purpose

PACK.IT should allow future modules without rewriting the core.

Future modules can include deeper Sound, Light, Power, Logistics or Venue tools.

## Boundary

A module should integrate through:

- SceneObject types
- CatalogModel links
- object contribution adapters
- validation rules
- builder entry points
- UI panels

## Rule

Core ProjectModel and SceneModel should not depend on one feature module.

## Task 001

Task 001 should keep feature boundaries clear.
