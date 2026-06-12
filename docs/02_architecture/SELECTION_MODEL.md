# Selection Model

## Purpose

Selection Model defines how users select and edit scene objects.

## Selection types

- no selection
- single object selection
- group selection
- multi selection later
- box selection later

## Selection state

Selection state should include:

- selected object ids
- selected group id if any
- active inspector target
- selection mode

## Rule

Selection is UI state, but it references stable SceneObject IDs.

## Task 001

Task 001 should define selection state in SceneModel or app scene state.
