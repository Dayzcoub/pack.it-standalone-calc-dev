# ADR 0006 — Optional CRM and Warehouse Connection

## Status

Accepted as future optional architecture.

## Context

PACK.IT is a standalone/offline mobile-first 3D constructor.

The product should also be able to become part of a wider production CRM system later.

Connected CRM/Warehouse mode can provide real catalog, availability, reservations, prices, clients and project records.

## Decision

PACK.IT must support future optional connection to CRM and Warehouse systems.

This connection must not be required for core offline work.

Offline-first remains the base product principle.

## Runtime rule

The constructor remains ProjectModel / SceneModel based.

CRM and Warehouse data are connected sources and synchronization layers.

They do not replace SceneModel as the source of project geometry.

## Allowed future connected features

- load real catalog
- check stock and reservations
- link to CRM project
- generate quote draft
- create reservation draft
- attach PDF and renders
- push BOM and price snapshots
- sync project metadata

## Forbidden in Task 001

- real CRM integration
- live warehouse integration
- backend auth
- sync engine
- automatic reservations

## Consequences

- CatalogModel needs source metadata
- availability is a timestamped connected snapshot
- connected outputs must expose source and sync timestamps
- conflicts must become validation or sync warnings
- future CRM integration must be explicit and permission-based
