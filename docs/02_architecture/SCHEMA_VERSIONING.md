# Schema Versioning and Migration

## Purpose

ProjectModel and SceneModel will change during Alpha.

Schema versioning prevents saved projects from breaking silently.

## Required fields

Every saved project must include:

- productVersion
- schemaVersion
- createdAt
- updatedAt

## Migration rule

When schema changes, add a migration path or explicitly mark old projects unsupported.

Never silently reinterpret old project data.

## Task 001

Task 001 should include schemaVersion fields and a placeholder migration interface.
