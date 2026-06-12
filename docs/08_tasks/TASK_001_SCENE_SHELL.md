# Task 001 — Project Scene Shell MVP

## Status

Ready for implementation after explicit command.

## Product status

```text
PACK.IT Alpha 0.1.0
Architecture Freeze #1
Project Scene First
```

## Goal

Create the foundation for the new PACK.IT application.

The app must be a standalone/offline mobile-first 3D constructor for technical event packages.

It must not be a bundle of three separate calculators.

## Required foundation

- React + TypeScript + Vite
- Capacitor-ready shell
- PACK.IT brand layer
- design tokens
- RU/EN i18n foundation
- Units/Locale settings contracts
- ProjectModel contracts
- SceneModel contracts
- CatalogModel contracts
- VenueModel placeholder contracts
- SceneGraph contracts
- SceneObject contracts
- SceneGroup contracts
- AttachmentPoint contracts
- LayerSystem contracts
- Undo/Redo state contracts
- ValidationIssue shared contract
- ConstraintEngine placeholder contracts
- Collision/Clearance placeholder contracts
- SnapSystem settings contracts
- Measurements placeholder contracts
- PowerModel placeholder contracts
- RiggingModel placeholder contracts
- CameraPreset contracts
- Project file serialization compatibility
- Templates compatibility
- ObjectLibrary compatibility
- MultiScene compatibility
- PerformanceBudget notes
- placeholder Three.js renderer shell
- placeholder Asset Library entry
- placeholder Add Stage builder entry
- placeholder Add Truss builder entry
- placeholder Add LED builder entry
- offline storage adapter interface
- basic checks/tests

## Out of scope

- final Stage formulas
- final Truss formulas
- final LED formulas
- production PDF
- production GLB import UI
- full Venue editor
- final Attachment editor
- final Undo/Redo engine
- final Constraint rules
- final Collision engine
- final Snap implementation
- final measurement tools
- final Power planning UI
- final Rigging planning UI
- full object templates
- multi-scene UI
- backend
- accounts
- analytics
- ads
- old FEG runtime
- old standalone shell

## Critical architecture rule

Guided builders create or update scene groups.

Final output comes from ProjectModel, SceneModel and CatalogModel links.

## Done when

A developer can open the app shell, see a placeholder project scene, and see entry points for Add Stage, Add Truss, Add LED and Asset Library.

The codebase has typed contracts that make the Project Scene First direction explicit.

The architecture leaves clear extension points for CatalogModel, VenueModel, SceneGraph, AttachmentPoints, Undo/Redo, validation, constraints, collision checks, snapping, layers, measurements, power, rigging, camera presets, units/locale, templates, object library, project file export, performance budget and future multi-scene projects.
