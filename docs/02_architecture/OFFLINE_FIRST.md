# Offline First

## Rule

PACK.IT must work without internet.

The project file and user settings must be available locally.

## Storage foundation

Initial storage direction:

- IndexedDB for projects and larger structured data;
- local app storage for small settings;
- future JSON import/export for user-controlled backup.

## No remote dependency in Alpha 0.1.0

Alpha 0.1.0 must not require:

- account;
- workspace;
- server sync;
- remote catalog;
- remote configuration.

## Project save unit

Save `ProjectModel`, not isolated calculator snapshots.
