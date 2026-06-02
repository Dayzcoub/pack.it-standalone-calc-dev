# 03. Dependencies and Licenses

## 1. Goal

Before Store release, every dependency and asset must be legally safe and technically justified.

## 2. Dependency rules

Prefer:

- small dependencies;
- maintained libraries;
- permissive licenses;
- no tracking/analytics by default;
- no external CDN requirement;
- libraries that work offline.

Avoid:

- abandoned packages;
- huge UI kits that override design system;
- packages with unclear license;
- packages that phone home;
- packages that require runtime internet;
- unnecessary native permissions.

## 3. Required license review

Before release, review:

- React/Vite/TypeScript stack;
- Capacitor and plugins;
- PDF library;
- icon set;
- fonts;
- generated images;
- any SVG/illustration sources;
- any utility libraries.

## 4. Fonts

Do not bundle font files unless license allows it.

Preferred:

- system fonts;
- or properly licensed open fonts.

## 5. Icons

Preferred:

- custom generated SVG icons;
- manually edited assets;
- permissive licensed icon set if needed.

Do not mix random icon sources.

## 6. Generated images

Generated mockups are direction references.

Final assets must be:

- individually exported;
- with clear naming;
- checked for brand consistency;
- not giant combined boards when individual assets are required.

## 7. Native plugins

Every Capacitor plugin must be justified.

Allowed likely:

```text
Filesystem
Share
Preferences
App
Haptics optional
```

Avoid in v1.0:

```text
Camera
Location
Contacts
Push Notifications
Background services
Bluetooth
```

## 8. Privacy impact

Any dependency that collects data changes privacy/store answers.

Do not add:

- analytics;
- crash reporting;
- remote logging;
- ads;
- tracking SDKs;

unless product decision and privacy docs are updated.

## 9. Dependency acceptance

A dependency is accepted only when:

- it has a clear purpose;
- license is acceptable;
- bundle/performance impact is acceptable;
- it does not violate offline-first v1.0;
- it does not introduce unexpected permissions;
- it is documented if important.
