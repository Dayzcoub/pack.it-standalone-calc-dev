# 04. Asset Requirements

## 1. Purpose

Assets must be prepared before coding so that development does not depend on temporary placeholders or random generated images.

All assets must follow the approved PACK.IT visual direction.

## 2. Folder structure

Recommended future structure:

```text
assets/
  README.md
  app-icons/
  splash/
  home/
  calculators/
  icons/
  empty-states/
  pdf/
  store-screenshots/
  source/
```

## 3. App icons

Required:

```text
app-icon-1024.png
ios-icon-set/
android-adaptive-icon-foreground.png
android-adaptive-icon-background.png
favicon.png
```

Style:

- square rounded icon;
- PACK.IT identity;
- technical but clean;
- readable at small sizes;
- no FEG logo;
- no circular toy style.

## 4. Splash assets

Required:

```text
splash-dark.png
splash-light.png
splash-logo.svg
```

Style:

- dark technical background;
- centered PACK.IT logo;
- no detailed UI screenshot;
- fast loading impression.

## 5. Home assets

Required:

```text
home-hero-dark.png
home-hero-light.png
home-card-stage.png or svg
home-card-truss.png or svg
home-card-led.png or svg
```

Home cards need technical illustrations:

- Stage: platform with legs and stairs;
- Truss: aluminum truss segment with round tubes;
- LED: LED cabinet/screen, front and/or rear view.

These can be raster illustrations if needed, but UI icons should preferably be SVG.

## 6. Calculator icons

Required SVG icons:

```text
icon-stage.svg
icon-truss.svg
icon-led.svg
icon-save.svg
icon-pdf.svg
icon-share.svg
icon-settings.svg
icon-home.svg
icon-saved.svg
icon-warning.svg
icon-info.svg
icon-weight.svg
icon-price.svg
icon-bom.svg
icon-scheme.svg
icon-fit.svg
icon-center.svg
icon-zoom-in.svg
icon-zoom-out.svg
icon-duplicate.svg
icon-delete.svg
icon-edit.svg
icon-back.svg
```

## 7. Empty state assets

Required:

```text
empty-saved-calculations.svg
empty-stage.svg
empty-truss.svg
empty-led.svg
empty-pdf.svg
empty-price-profile.svg
```

Style:

- technical line art;
- calm;
- no cartoon characters;
- works on dark and light themes.

## 8. PDF assets

Required:

```text
pdf-logo-dark.png or svg
pdf-logo-light.png or svg
pdf-header-pattern.svg
pdf-watermark.svg
pdf-disclaimer-icon.svg
```

PDF should feel like a clean technical/commercial sheet, not a screenshot of the app.

## 9. Store screenshot assets

Required later:

```text
store-home.png
store-stage.png
store-truss.png
store-led.png
store-saved.png
store-pdf.png
```

Each screenshot should include marketing captions in Russian first.

## 10. Source files

Keep editable source files when possible:

```text
source/figma-export/
source/generation-prompts/
source/vector-originals/
```

Generated images should not be the only source of truth. The design docs define implementation rules.

## 11. File naming

Use lowercase kebab-case:

```text
packit-app-icon-1024.png
packit-home-stage-card.png
packit-icon-stage.svg
packit-empty-saved.svg
packit-pdf-logo.svg
```

Do not use:

```text
feg-logo.png
final-final.png
new-icon-copy.png
imagegen.png
```

## 12. Dark/light versions

Assets that depend on background should have dark/light versions.

Theme-independent SVG icons should use currentColor or CSS variables where possible.

## 13. Alpha channel

Interface illustrations should be prepared with transparent background if they are placed inside cards.

Required:

- PNG/WebP with alpha where raster is needed;
- SVG where possible;
- no baked-in dark rectangles unless the asset itself requires it.

## 14. Asset acceptance

An asset is accepted only when:

- it matches PACK.IT direction;
- no FEG logo/text remains;
- it works on the intended theme;
- it has correct size/export format;
- it has a stable filename;
- it is not a giant combined board when individual files are required.
