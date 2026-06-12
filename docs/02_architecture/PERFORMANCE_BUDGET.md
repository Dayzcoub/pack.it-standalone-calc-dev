# Performance Budget

## Purpose

PACK.IT is mobile-first, so performance limits must be visible from the beginning.

## Initial target

The architecture should be designed for scenes with approximately 300 to 500 manageable objects on mid-range phones.

This is a planning budget, not a final benchmark guarantee.

## Rules

- avoid unnecessarily heavy GLB assets
- prefer instancing where useful later
- keep textures reasonable
- avoid making the renderer the data source
- keep generated helper objects under control
- provide object count and warning diagnostics later

## Task 001

Task 001 should document the budget and avoid choices that obviously block mobile performance.
