# Raster Asset Upload TODO

The first raster asset pack has been prepared as:

```text
packit_production_assets_v0_1.zip
```

Chat download link:

```text
sandbox:/mnt/data/packit_production_assets_v0_1.zip
```

## Why this TODO exists

The current GitHub tool can reliably write text/vector files such as:

- `.md`
- `.svg`
- `.css`
- `.json`
- `.ts`

Raster assets such as PNG/WebP should be uploaded later through:

- GitHub web upload;
- local git;
- or a desktop workflow.

## Files to upload later

From the ZIP, upload raster files into:

```text
assets/app-icons/
assets/splash/
assets/brand/
assets/home/
assets/empty-states/
assets/pdf/
assets/source/references/
```

Most important first files:

```text
assets/app-icons/source/packit-app-icon-1024.png
assets/splash/packit-splash-dark-portrait.png
assets/splash/packit-splash-light-portrait.png
assets/brand/packit-brand-key-dark.png
assets/brand/packit-brand-key-light.png
assets/home/packit-home-stage-card.png
assets/home/packit-home-stage-card.webp
assets/home/packit-home-truss-card.png
assets/home/packit-home-truss-card.webp
assets/home/packit-home-led-card.png
assets/home/packit-home-led-card.webp
```

## Later desktop command

From local repository root:

```bash
unzip packit_production_assets_v0_1.zip
cp -R packit_production_assets_v0_1/assets/* ./assets/
git add assets
git commit -m "Add PACK.IT production raster assets v0.1"
git push
```

## Mobile note

Uploading this from a phone is inconvenient and can be postponed.

The repository already contains:

- docs;
- structure;
- SVG placeholders;
- CSS color tokens;
- asset manifest;
- upload mapping.

So development planning can continue without the raster upload being completed immediately.
