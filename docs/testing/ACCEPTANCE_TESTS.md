# Acceptance Tests

## Purpose

Acceptance tests describe how the user verifies PACK.IT on a phone.

## Basic smoke scenario

1. Open preview or app build.
2. Create new project.
3. Open project scene.
4. Add a simple object or builder placeholder.
5. Select object.
6. Move or edit object if available.
7. Save project.
8. Reopen project.

## Demo project checks

Each build should provide quick demo entry points when available:

- empty scene
- stage only
- stage plus truss
- stage plus truss plus LED

## Mobile walk test

The user should test important changes on a phone, not only desktop.

The test is simple: open the app while moving around and complete the core action with touch controls.

If the UI is annoying on phone, the task is not accepted.

## Video acceptance

For meaningful UI or scene tasks, a short 30 to 60 second video is preferred.

It should show the changed behavior and basic regression path.
