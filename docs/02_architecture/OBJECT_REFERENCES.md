# Object IDs and References

## Purpose

Scene objects must use stable IDs and safe references.

## ID rule

Every project, scene, group, object and catalog item needs a stable ID.

IDs must survive save/load.

## References

SceneObject references may point to:

- parent group
- child objects
- catalog item
- asset item
- attachment point
- validation issue

## Delete rule

Deleting an object must clean or invalidate references predictably.

## Duplicate rule

Duplicating an object must create new IDs while preserving safe catalog and asset references.

## Task 001

Task 001 should define ID and reference conventions.
