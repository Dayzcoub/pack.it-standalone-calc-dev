# Project File Format

## Purpose

PACK.IT needs a future user-controlled project file format for import, export and backup.

## Recommended extension

```text
.packit
```

## Direction

A `.packit` file can be a ZIP-like package later.

Possible structure:

- project.json
- metadata.json
- assets
- snapshots

## MVP rule

Task 001 does not need real file export.

It must keep ProjectModel serializable and versioned.

## Required metadata

- product version
- schema version
- created date
- updated date
- project title
- asset references
