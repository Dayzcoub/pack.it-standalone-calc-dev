# PACK.IT Assets

This folder contains the working asset structure for PACK.IT standalone calculators.

Visual direction:

```text
calm graphite / dusty gray-blue / professional technical / no acidic colors
```

## Folders

```text
app-icons/        App icon source and platform exports
splash/           Splash and launch assets
brand/            Logo, wordmark, mark, key visuals
home/             Stage / Truss / LED home card illustrations
icons/            SVG UI icon system
empty-states/     Empty state illustrations
pdf/              PDF logo, header pattern, watermark
design-tokens/    Palette and asset tokens
source/           prompts, references, editable sources
store-screenshots/ future Store screenshots
```

## Current status

Text/vector assets are committed directly.

Raster candidates generated in the chat must be exported as individual PNG/WebP files and uploaded later according to:

```text
docs/assets/03_PRODUCTION_ASSET_MANIFEST.md
```

## Rules

- no FEG brand;
- no acidic/neon colors;
- use calm dusty tones;
- transparent PNG/WebP for card illustrations where needed;
- SVG icons use `currentColor` where possible;
- keep source prompts and references.
