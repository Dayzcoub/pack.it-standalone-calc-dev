# Connected CRM and Warehouse Mode

## Status

Future optional connected mode.

## Decision

PACK.IT must remain standalone and offline-first by default, but the architecture must allow connection to a CRM and warehouse system.

When connected, the 3D constructor can use live business data and can send project outputs back to the CRM.

## Core rule

Offline local work remains the base mode.

Connected CRM/Warehouse mode is an optional enhancement.

The app must not require CRM access to create, edit, save or preview a project.

## Connected mode capabilities

When connected to CRM/Warehouse, PACK.IT may support:

- loading real equipment catalog
- loading current warehouse availability
- loading reserved quantities
- loading rental and sale prices
- loading clients and projects
- linking a PACK.IT project to CRM project
- generating quote draft from SceneModel
- pushing BOM to quote or estimate
- creating reservation draft
- checking deficits
- suggesting substitutions
- attaching PDF or renders to CRM project
- syncing project status

## Data flow

```text
CRM / Warehouse
  clients
  projects
  catalog
  prices
  stock
  reservations

PACK.IT
  ProjectModel
  SceneModel
  CatalogModel cache
  BOM / Price / PDF snapshots

CRM / Warehouse
  quote draft
  reservation draft
  documents
  project attachments
```

## Catalog strategy

CatalogModel must support two sources:

- local catalog cache
- connected CRM/Warehouse catalog

Each catalog item should keep source metadata:

- source system
- source id
- sync timestamp
- source status
- conflict status

## Availability strategy

Warehouse availability is not stored as permanent truth inside SceneModel.

Availability is a connected snapshot.

The app may store cached availability for display, but connected data must include timestamp and source.

## Reservation strategy

PACK.IT should not silently reserve equipment.

Connected mode may create reservation drafts or reservation requests.

Final reservation rules belong to CRM/Warehouse.

## Pricing strategy

Prices may come from:

- local price profile
- connected CRM price list
- project-specific override

The source must be visible in generated outputs.

## Conflict handling

Connected mode must handle:

- offline changes
- outdated catalog data
- changed prices
- changed availability
- removed equipment
- reservation conflicts

Conflicts should create ValidationIssue records or connected sync warnings.

## Privacy and permissions

CRM connection may expose client and business data.

Connected mode requires explicit user action and permission model later.

Task 001 must not implement CRM access, backend auth or live warehouse integration.

## Task 001

Task 001 should only keep architecture compatible with connected CRM/Warehouse mode.

Do not add real CRM, warehouse, backend, accounts or sync in Task 001.
