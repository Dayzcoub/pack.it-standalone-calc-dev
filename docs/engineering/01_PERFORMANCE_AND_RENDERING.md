# 01. Performance and Rendering Requirements

## 1. Goal

The app must remain fast on real phones while rendering technical schemes.

## 2. Performance principles

- Core calculations should be fast and deterministic.
- UI must not recalculate heavy results on every tiny render without memoization.
- Renderers must be optimized for large Stage/Truss/LED layouts.
- PDF generation can take longer, but must show progress/feedback.

## 3. LED rendering

LED screens can create large grids.

Rules:

- do not render every LED pixel as DOM node;
- do not render thousands of unnecessary SVG circles;
- cabinet grid is enough for main UI;
- use pattern/texture for LED face;
- large cabinet counts should remain smooth.

## 4. Stage rendering

Stage module grid must be efficient.

Rules:

- draw module cells with SVG paths/groups where possible;
- avoid excessive nested DOM;
- dimensions/labels remain readable;
- zoom/fit/center must not re-create full app state unnecessarily.

## 5. Truss rendering

Truss drawings may be detailed, but must be simplified enough for mobile.

Rules:

- use reusable SVG symbols/patterns for repeated truss pieces;
- avoid huge individual node counts;
- render detailed cylindrical look where useful, but not at cost of usability;
- keep load/warning labels readable.

## 6. PDF generation

PDF generation must:

- show progress or disabled state;
- not freeze UI indefinitely;
- handle errors gracefully;
- use structured PdfModel;
- reuse DrawingModel export.

## 7. Saved list performance

If many saved calculations exist:

- list should remain scrollable;
- card rendering should be efficient;
- search/filter should not lag.

v1.0 may not need virtualization, but architecture should allow it.

## 8. Startup performance

First launch should be fast.

Avoid:

- loading huge illustrations before Home is visible;
- external fonts/CDNs;
- heavy PDF libraries blocking initial UI if lazy loading is possible.

Preferred:

- lazy-load PDF generator;
- lazy-load calculator-heavy modules if needed;
- local assets only.

## 9. Memory

Avoid retaining large PDF blobs and image exports forever.

After share/export:

- release temporary object URLs;
- clear temporary in-memory previews when leaving PDF preview if safe.

## 10. Acceptance

Performance accepted when:

- Home opens quickly;
- calculators respond instantly for normal cases;
- large LED/truss/stage cases do not freeze;
- PDF shows feedback;
- no thousands of unnecessary DOM nodes are created for LED pixels;
- offline launch works without external asset loading.
