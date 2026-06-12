# CatalogModel

## Purpose

CatalogModel is the third core pillar next to ProjectModel and SceneModel.

SceneModel describes what is placed in the project.

CatalogModel describes what the placed item actually is.

## Core relationship

ProjectModel owns the project.

SceneModel owns object placement.

CatalogModel owns equipment definitions.

## Catalog item

A catalog item should describe:

- id
- type
- manufacturer
- model
- display name
- dimensions
- weight
- power data
- rental price data
- asset reference
- compatibility tags
- source status

## Source status

Catalog values can be:

- verified
- estimated
- needs-check
- user-defined

## Scene link

A SceneObject can reference a catalog item through catalogRef.

If catalogRef exists and bomMode allows it, the object can contribute to BOM, price, power and PDF.

## Future value

CatalogModel allows future warehouse or inventory integration without changing SceneModel.
