# ADR 0001 — Project Scene First

## Status

Accepted.

## Context

PACK.IT was initially documented as standalone calculators for Stage, Truss and LED.

The product direction changed before public release.

## Decision

PACK.IT uses Project Scene First architecture.

Stage, Truss and LED are guided builders that create scene objects inside one project scene.

ProjectModel and SceneModel are the source of truth.

## Consequences

- no separate calculator-first product architecture
- BOM, price, weight and PDF come from the project scene
- Task 001 becomes Project Scene Shell MVP
- old calculator documents become reference material only
