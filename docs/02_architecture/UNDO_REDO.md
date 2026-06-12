# Undo Redo

Undo and redo must be planned from the beginning.

Scene editing without history becomes unsafe.

## Direction

Use command-based scene actions.

Important scene edits should become actions:

- add object
- delete object
- move object
- rotate object
- edit object parameters
- group objects
- ungroup objects

## Task 001

Task 001 should define the interface and state shape.

Full history implementation can be a later task.

## Minimum state

- past actions
- future actions
- canUndo
- canRedo
