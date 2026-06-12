# BOM Engine

## Purpose

BOM Engine generates equipment rows from ProjectModel and SceneModel.

It must not read final data from isolated calculator screens.

## Input

- ProjectModel
- SceneModel
- project settings
- catalog data later

## Output

- normalized BOM rows
- grouped equipment sections
- warnings
- version metadata

## Object contribution

Each scene object type later provides contribution logic.

Examples:

- StageGroup contributes decks, legs, stairs and closure items.
- TrussGroup contributes sections, nodes, bases and fasteners.
- LedGroup contributes cabinets and support items.
- catalogLinked imported objects contribute catalog rows.

## Rule

SceneModel is the source of truth.
