# Import Export Safety

## Purpose

Import and export must be safe and predictable.

## Project import checks

When opening a project file later, validate:

- file format
- schema version
- required fields
- asset references
- unsupported features
- corrupted data

## Asset import checks

For 3D model import later, validate:

- supported format
- file size
- parse success
- model scale warning
- missing textures

## Rule

Never execute imported content as code.

## Task 001

Task 001 should keep project serialization explicit and versioned.
