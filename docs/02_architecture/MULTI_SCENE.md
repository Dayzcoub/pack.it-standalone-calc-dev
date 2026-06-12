# Multi Scene Foundation

## Purpose

PACK.IT can start with one scene per project, but the model should not block future multiple scenes.

## Future examples

- main hall
- outdoor area
- foyer
- backup setup
- rehearsal setup

## Alpha 0.1.0 rule

Implement one active scene if needed.

Keep ProjectModel compatible with future multiple scenes.

## Direction

ProjectModel may later contain scenes array and activeSceneId.

Do not hardcode assumptions that one project can only ever contain one scene.
