# Development Preview Strategy

## Decision

PACK.IT uses two validation channels during development.

## Channel A — Fast Preview

Every task should provide a preview URL when UI or scene behavior changed.

The user opens the preview on a phone and checks:

- app launch
- scene screen
- touch behavior
- object selection
- builder flow
- save/load if available

This channel is for fast feedback, not final app validation.

## Channel B — Mobile App Builds

Milestones should provide real mobile builds.

Android:

- APK for internal testing

 iOS:

- TestFlight when available

This channel validates real app behavior:

- installation
- offline mode
- local storage
- file import/export
- share sheet
- PDF export later
- mobile safe areas

## Rule

A feature can be previewed through the web channel, but milestone acceptance requires real mobile app validation.

## Demo Mode

The app should include demo projects for quick checks.

Examples:

- empty scene
- stage only
- stage plus truss
- stage plus truss plus LED
- small concert later
