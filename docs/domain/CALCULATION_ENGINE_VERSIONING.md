# Calculation Engine Versioning

## Purpose

Calculation rules need their own versioning separate from project schema version.

A project schema can stay the same while calculation logic changes.

## Required metadata

Generated outputs should later include:

- calculationEngineVersion
- catalogVersion
- schemaVersion
- productVersion

## Rule

Do not silently recalculate old saved outputs with new rules without user action.

When recalculation is needed, create a copy or show a clear warning.

## Task 001

Task 001 should reserve calculation engine version fields.
