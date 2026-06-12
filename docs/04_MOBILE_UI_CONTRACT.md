# 04. Mobile UI Contract

## Status

```text
PACK.IT Alpha 0.1.0
Project Scene First
```

This document replaces the old calculator-first mobile UI contract.

## 1. UI goal

The interface must be a true mobile-first application for building a technical event package in one shared 3D scene.

It must not feel like adapted desktop web UI.

It must also not feel like three separate calculators placed behind three menu cards.

## 2. Main user flow

```text
open app → create/open project → work in 3D scene → add objects → inspect/edit objects → generate BOM/price/PDF → save/share/export
```

## 3. Screen map

Canonical Alpha screen map:

```text
/
/projects
/project/:id
/project/:id/add-stage
/project/:id/add-truss
/project/:id/add-led
/project/:id/asset-library
/project/:id/summary
/project/:id/pdf
/settings
/help
/about
```

The main working screen is `/project/:id`.

Stage, Truss and LED are guided builder flows inside a project, not standalone calculator destinations.

## 4. Home screen

Home screen should focus on projects, not calculators.

Recommended blocks:

```text
PACK.IT
Technical package constructor

[New project]
[Open project]

Recent projects
Examples / templates
Settings
Help
```

## 5. Project Scene screen

The project scene is the main product screen.

Mobile layout:

```text
Top app bar
3D Scene View
Floating add button / bottom action bar
Object selection state
Bottom sheet inspector
Scene / Summary / Export actions
```

Primary actions:

- Add Stage;
- Add Truss;
- Add LED;
- Asset Library;
- Summary;
- PDF / Share;
- Save.

## 6. Guided builder UX

Guided builders open as modal flows or bottom-sheet flows above the scene.

They collect only the parameters needed to create or update a scene group.

After completion, the user returns to the shared project scene.

Guided builders:

- Add Stage;
- Add Truss;
- Add LED.

They must not own final isolated tabs such as calculator-only BOM or calculator-only price.

## 7. Object Inspector

After selecting an object, the user edits it through Object Inspector.

Inspector content depends on object type:

- name;
- dimensions;
- position;
- rotation;
- builder parameters if generated;
- catalog link if available;
- BOM mode;
- warnings;
- delete/duplicate actions.

Mobile inspector should be a bottom sheet.

Desktop/tablet may use a side panel later.

## 8. Summary and outputs

BOM, price, weight, power and PDF are project-level outputs.

They belong to the whole ProjectModel, not to separate calculator screens.

Summary screen sections:

- project overview;
- objects list;
- BOM;
- weight;
- price if enabled;
- warnings;
- PDF/export actions.

## 9. Asset Library UX

Asset Library allows manual placement of objects in the scene.

Initial categories:

- Audio;
- Light;
- Power;
- Rigging;
- Decor;
- Generic 3D.

Object modes:

- visualOnly;
- catalogLinked.

The library can start as a simple list/grid with placeholders in Task 001.

## 10. Breakpoints

Keep the breakpoint strategy simple.

Recommended rule:

```text
mobile: <= 767px
tablet/desktop: >= 768px
```

Do not introduce a breakpoint zoo.

Do not restore old patch chains such as 860 / 900 / 1024 / 1179 / 1180 / 1280.

## 11. Scene interaction on mobile

The scene must support touch-first interaction:

- orbit/pan/zoom;
- select object;
- move object through controlled handles or simplified controls;
- rotate object through inspector or transform controls;
- fit view;
- switch view: perspective, iso, top, front, side.

No hover-only interactions.

All controls must respect safe areas.

## 12. Design system

Use shared components:

- AppShell;
- ScreenHeader;
- SceneViewport;
- BottomActionBar;
- FloatingActionButton;
- BottomSheet;
- ObjectInspector;
- BuilderSheet;
- Button;
- IconButton;
- Input;
- Select;
- Checkbox;
- SegmentedControl;
- Card;
- SummaryCard;
- WarningBanner.

Old `CalculatorTabs` is not canonical anymore.

Tabs may be used inside sheets if useful, but the primary app structure is scene-first.

## 13. Visual direction

Visual direction remains valid:

- professional;
- calm;
- technical;
- dusty gray-blue / graphite direction;
- readable in dark backstage and bright outdoor conditions;
- no visible FEG branding.

## 14. What remains useful from old UI docs

Keep:

- mobile-first discipline;
- touch-friendly sizing;
- safe areas;
- shared components;
- no horizontal overflow;
- no breakpoint chaos;
- concise field-friendly copy.

Replace:

- calculator cards as the main product model;
- independent Stage/Truss/LED routes as final screens;
- calculator-only tabs;
- calculator-only save/PDF/result model.
