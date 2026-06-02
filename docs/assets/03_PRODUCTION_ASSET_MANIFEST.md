# 03. Production Asset Manifest

## 1. Purpose

This is the working checklist for the first PACK.IT standalone calculator production asset set.

Visual basis:

- approved large-program PACK.IT UI direction;
- calm graphite / dusty gray-blue / professional technical style;
- no acidic/neon colors;
- no visible FEG branding.

## 2. Export rules

### Naming

Use lowercase kebab-case:

```text
packit-app-icon-1024.png
packit-splash-dark-portrait.png
packit-home-stage-card.webp
```

### Formats

Use:

```text
PNG — icons, transparent raster assets, app icon source
WebP — app illustrations where alpha/quality/size are needed
SVG — UI icons, logo marks, PDF vector elements
PDF — reference boards only, not app runtime assets
```

### Transparency

Required for card illustrations and reusable UI illustrations:

```text
transparent background / alpha channel
```

Not required for full-screen splash or store screenshots.

### Source preservation

Keep source prompt/reference for every generated asset:

```text
assets/source/prompts/*.md
assets/source/references/*
```

## 3. Brand identity assets

### 3.1 App icon source

```text
assets/app-icons/source/packit-app-icon-1024.png
```

Size:

```text
1024 × 1024 px
```

Format:

```text
PNG, no transparency for store source unless platform-specific export requires it
```

Usage:

- App Store icon source;
- Google Play icon source;
- internal app icon exports.

Status:

```text
candidate generated, needs final export/approval
```

### 3.2 App icon small exports

```text
assets/app-icons/ios/
assets/app-icons/android/
```

Generated later by tooling from 1024 source.

Required later:

- iOS icon set;
- Android adaptive icon foreground/background;
- favicon/web preview if web build exists.

## 4. Splash assets

### 4.1 Dark splash portrait

```text
assets/splash/packit-splash-dark-portrait.png
```

Recommended size:

```text
1290 × 2796 px or scalable source large enough for current iPhones
```

Usage:

- iOS/Android splash reference;
- launch screen background;
- store mockups if needed.

Status:

```text
candidate generated, needs platform-safe export
```

### 4.2 Light splash portrait

```text
assets/splash/packit-splash-light-portrait.png
```

Recommended size:

```text
1290 × 2796 px
```

Usage:

- light theme launch/splash reference;
- optional store screenshot.

Status:

```text
candidate generated, needs platform-safe export
```

### 4.3 Splash logo mark

```text
assets/splash/packit-splash-logo.svg
```

Usage:

- Capacitor splash generation;
- launch screen composition;
- fallback vector.

Status:

```text
needs vector extraction/manual creation
```

## 5. Home calculator card illustrations

These are the most important first runtime illustrations.

They must be separate assets, not a combined board.

### 5.1 Stage card illustration

```text
assets/home/packit-home-stage-card.webp
assets/home/packit-home-stage-card.png
```

Recommended source size:

```text
1600 × 1200 px or larger
```

Runtime display target:

```text
~320–520 px wide depending screen density
```

Background:

```text
transparent preferred
```

Content:

- modular stage platform;
- deck modules;
- legs/supports;
- braces;
- stairs;
- realistic but not noisy;
- dark technical lighting.

Current candidate:

```text
модульная_сценическая_платформа_в_студии.png
```

Action needed:

- cut/remove background or export alpha version;
- crop with safe margins;
- produce PNG/WebP.

### 5.2 Truss card illustration

```text
assets/home/packit-home-truss-card.webp
assets/home/packit-home-truss-card.png
```

Recommended source size:

```text
1600 × 1200 px or larger
```

Background:

```text
transparent preferred
```

Content:

- straight aluminum truss segment;
- round cylindrical tubes;
- diagonal bracing;
- metallic silver/gray;
- no square scaffold look.

Current candidate:

```text
металлическая_треугольная_конструкция_на_фоне_темн.png
```

Action needed:

- verify round tubes;
- remove/crop background;
- export alpha PNG/WebP.

### 5.3 LED card illustration

```text
assets/home/packit-home-led-card.webp
assets/home/packit-home-led-card.png
```

Recommended source size:

```text
1600 × 1200 px or larger
```

Background:

```text
transparent preferred
```

Content:

- modular LED cabinets;
- front LED matrix;
- rear cabinet detail;
- frame/standing hardware;
- dark technical look.

Current candidate:

```text
модульные_led_панели_в_студии.png
```

Action needed:

- crop safe composition;
- remove/cut background if needed;
- export alpha PNG/WebP.

## 6. Brand key visuals

### 6.1 Dark brand key visual

```text
assets/brand/packit-brand-key-dark.png
```

Usage:

- marketing reference;
- splash/store background reference;
- README/design docs.

Current candidate:

```text
графика_с_техническим_логотипом_и_чертежами.png
```

### 6.2 Light brand key visual

```text
assets/brand/packit-brand-key-light.png
```

Usage:

- light theme reference;
- store screenshot background reference;
- PDF cover reference if ever needed.

Current candidate:

```text
современный_минималистичный_логотип_и_брендинг.png
```

## 7. Logo and wordmark assets

Need vector/manual cleanup.

Required:

```text
assets/brand/packit-logo-horizontal.svg
assets/brand/packit-logo-stacked.svg
assets/brand/packit-mark.svg
assets/brand/packit-wordmark.svg
```

Themes:

```text
dark-compatible
light-compatible
mono-white
mono-dark
```

Status:

```text
not final; requires vector source or manual recreation from approved PACK.IT brand board
```

## 8. UI SVG icon set

Folder:

```text
assets/icons/ui/
```

Required first wave:

```text
packit-icon-home.svg
packit-icon-saved.svg
packit-icon-settings.svg
packit-icon-stage.svg
packit-icon-truss.svg
packit-icon-led.svg
packit-icon-save.svg
packit-icon-pdf.svg
packit-icon-share.svg
packit-icon-back.svg
packit-icon-edit.svg
packit-icon-delete.svg
packit-icon-duplicate.svg
packit-icon-info.svg
packit-icon-warning.svg
packit-icon-error.svg
packit-icon-success.svg
packit-icon-bom.svg
packit-icon-price.svg
packit-icon-scheme.svg
packit-icon-weight.svg
packit-icon-power.svg
packit-icon-fit.svg
packit-icon-center.svg
packit-icon-zoom-in.svg
packit-icon-zoom-out.svg
```

Format:

```text
SVG, 24×24 viewBox, currentColor where possible
```

Status:

```text
needs creation; use calm line icon style
```

## 9. Empty states

Folder:

```text
assets/empty-states/
```

Required:

```text
packit-empty-saved-calculations.svg
packit-empty-stage.svg
packit-empty-truss.svg
packit-empty-led.svg
packit-empty-pdf.svg
packit-empty-price-profile.svg
```

Style:

- line-art;
- technical;
- calm dusty accent;
- dark/light compatible;
- no cartoon characters.

Status:

```text
not generated yet
```

## 10. PDF assets

Folder:

```text
assets/pdf/
```

Required:

```text
packit-pdf-logo.svg
packit-pdf-header-pattern.svg
packit-pdf-watermark.svg
packit-pdf-disclaimer-icon.svg
```

Style:

- light document background;
- clean technical lines;
- dusty blue-gray accent;
- no app dark UI screenshot look.

Status:

```text
not generated yet
```

## 11. Store screenshot assets

Folder:

```text
assets/store-screenshots/
```

Required later:

```text
packit-store-01-home.png
packit-store-02-stage.png
packit-store-03-truss.png
packit-store-04-led.png
packit-store-05-saved-combined-pdf.png
packit-store-06-pdf-preview.png
```

Status:

```text
after UI mockups/foundation
```

## 12. First asset pack target

The first practical pack should contain:

```text
packit-app-icon-1024.png
packit-splash-dark-portrait.png
packit-splash-light-portrait.png
packit-brand-key-dark.png
packit-brand-key-light.png
packit-home-stage-card.png/webp
packit-home-truss-card.png/webp
packit-home-led-card.png/webp
```

## 13. Acceptance checklist for first asset pack

- calm dusty palette;
- no acid/neon colors;
- no FEG brand;
- individual files, not only combined board;
- stage/truss/LED recognizable;
- truss tubes round;
- card illustrations have transparent versions or clean cutout strategy;
- filenames match manifest;
- source prompts/references saved.
