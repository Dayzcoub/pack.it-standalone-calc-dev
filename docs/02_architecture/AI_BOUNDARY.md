# AI Boundary

## Purpose

Future AI features must not bypass the app architecture.

## Rule

AI must not write directly to renderer state.

AI must not mutate ProjectModel or SceneModel directly.

AI can only propose or execute controlled actions through the ActionSystem boundary.

## Examples

Allowed future flow:

- user asks to build a stage setup
- AI proposes actions
- user confirms or app applies controlled actions
- ActionSystem updates SceneModel

## Safety

AI suggestions are planning assistance only.

They do not replace qualified technical review.

## Task 001

Task 001 should keep ActionSystem explicit enough for future AI-driven actions.
