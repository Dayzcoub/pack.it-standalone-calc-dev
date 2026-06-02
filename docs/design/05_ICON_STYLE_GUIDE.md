# 05. Icon Style Guide

## 1. Direction

PACK.IT icons should look like a technical field tool, not a playful consumer app.

Style:

- line-based;
- geometric;
- rounded-square containers when used as app/card icons;
- clear silhouettes;
- high contrast;
- compatible with dark/light themes.

## 2. App/card icons

Large calculator card icons:

- square with rounded corners;
- dark teal/graphite base;
- teal line art;
- subtle depth;
- no circular badge style.

### Stage icon

Must show recognizable stage platform:

- deck/platform;
- legs/bracing;
- optional stairs;
- no generic cube only if used in final app card.

### Truss icon

Must show truss with round tubes:

- round cylindrical tubes;
- diagonal bracing;
- aluminum/metal feel in larger illustrations;
- line icon may simplify but must not look like square scaffolding.

### LED icon

Must show LED cabinet/grid:

- matrix/dots;
- modular screen feel;
- optional rear cabinet details in larger art.

## 3. UI action icons

Action icons must be simple and readable at 20–24 px:

```text
save
pdf
share
settings
home
saved
back
edit
info
warning
delete
duplicate
zoom-in
zoom-out
fit
center
```

Use consistent stroke width.

## 4. Stroke and sizing

Recommended:

```text
base icon canvas: 24×24
stroke: 1.8–2.2 px
large card icon: 48–64 px
home card illustration: 180–260 px wide
```

## 5. Colors

Icons should generally use:

```text
currentColor
```

or design tokens:

```text
--color-accent
--color-text
--color-muted
--color-warning
--color-danger
```

Do not hard-code random colors inside SVGs unless it is a raster/illustration asset.

## 6. Forbidden

Do not use:

- generic emoji style;
- random downloaded icon packs with inconsistent stroke;
- circular cartoon icons;
- filled icons mixed with line icons without reason;
- low-contrast icons;
- FEG logo references;
- truss icons with square tubes.

## 7. Acceptance

An icon set is accepted only when:

- all icons share stroke/radius/style;
- icons are readable at mobile size;
- active/inactive states work;
- dark/light themes work;
- Stage/Truss/LED are visually recognizable;
- no FEG brand remains.
