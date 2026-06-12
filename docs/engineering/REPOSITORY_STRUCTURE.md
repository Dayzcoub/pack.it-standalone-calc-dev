# Repository Structure

## Direction

```text
src/
  app/
  project/
  scene/
  catalog/
  builders/
  renderer/
  assets/
  validation/
  export/
  storage/
  ui/
```

## Rules

- avoid feature code in root folders
- keep scene logic separate from renderer
- keep ProjectModel separate from UI
- keep builders separate from SceneModel contracts
- keep exports separate from UI screens

## Naming

Use clear domain names.

Examples:

- ProjectModel
- SceneModel
- SceneObject
- SceneGroup
- CatalogItem
- ValidationIssue
