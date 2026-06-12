# Task 001 — Project Scene Shell MVP

## Status

Ready for implementation after explicit command.

## Product status

PACK.IT Alpha 0.1.0.

Architecture Freeze #1.

Project Scene First.

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
- Units and Locale settings contracts
- Security and Privacy baseline
- SchemaVersion and migration placeholder
- CoordinateSystem convention
- stable Object ID and reference conventions
- ActionSystem boundary
- Autosave and Recovery storage metadata
- shared Error and Diagnostics boundary
- ProjectModel contracts
- SceneModel contracts
- CatalogModel contracts
- VenueModel placeholder contracts
- SceneGraph contracts
- SceneObject contracts
- SceneGroup contracts
- AttachmentPoint contracts
- LayerSystem contracts
- Undo Redo state contracts
- ValidationIssue shared contract
- ConstraintEngine placeholder contracts
- Collision and Clearance placeholder contracts
- SnapSystem settings contracts
- Measurements placeholder contracts
- PowerModel placeholder contracts
- RiggingModel placeholder contracts
- CameraPreset contracts
- Domain Rules Registry placeholder
- CalculationEngineVersion metadata
- Catalog source status contracts
- Project notes and annotations placeholder
- Client and Tech output mode metadata
- Project file serialization compatibility
- File-based collaboration compatibility
- Backup and Export policy compatibility
- Import and Export safety placeholders
- PluginBoundary compatibility
- Templates compatibility
- ObjectLibrary compatibility
- DemoProject fixture compatibility
- MultiScene compatibility
- PerformanceBudget notes
- placeholder Three.js renderer shell
- placeholder Asset Library entry
- placeholder Add Stage builder entry
- placeholder Add Truss builder entry
- placeholder Add LED builder entry
- offline storage adapter interface
- Accessibility baseline
- Onboarding and empty-state placeholders
- Legal disclaimer source placeholder
- PDF template version metadata
- dependency policy compliance
- basic checks and tests
- Units test direction
- minimal CI quality gate commands
- ADR awareness

## Out of scope

- final Stage formulas
- final Truss formulas
- final LED formulas
- production PDF
- production GLB import UI
- full Venue editor
- final Attachment editor
- final Undo Redo engine
- final Constraint rules
- final Collision engine
- final Snap implementation
- final measurement tools
- final Power planning UI
- final Rigging planning UI
- full object templates
- multi-scene UI
- store listing assets
- real demo catalog content
- project diff UI
- backend
- accounts
- analytics
- ads
- old FEG runtime
- old standalone shell

## Critical architecture rule

Guided builders create or update scene groups.

Final output comes from ProjectModel, SceneModel and CatalogModel links.

Scene changes should go through the ActionSystem boundary.

Saved data must be versioned and serializable.

Domain rules and calculation outputs must carry version metadata.

## Done when

A developer can open the app shell, see a placeholder project scene, and see entry points for Add Stage, Add Truss, Add LED and Asset Library.

The codebase has typed contracts that make the Project Scene First direction explicit.

The architecture leaves extension points for catalog, venue, scene graph, attachment points, actions, autosave, validation, constraints, collision checks, snapping, layers, measurements, power, rigging, camera presets, units/locale, domain rules, calculation engine versions, output modes, project notes, templates, object library, project file export, file-based collaboration, plugin modules, diagnostics, performance budget and future multi-scene projects.

Task 001 must follow `docs/engineering/PRE_CODE_GATE.md`.
