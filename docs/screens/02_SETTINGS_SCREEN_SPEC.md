# 02. Settings Screen Spec

## 1. Purpose

Settings controls local app preferences, price profiles, language, theme, PDF settings and safety/legal information.

## 2. Required sections

```text
Language
Theme
Price profiles
PDF/export
Storage
Safety disclaimer
About
```

## 3. Required controls

- language: system / RU / EN;
- theme: system / dark / light;
- active price profile;
- edit price defaults;
- clear drafts;
- clear saved calculations with strong confirmation;
- view disclaimer;
- app version and engine versions.

## 4. States

```text
normal
invalid price profile
language changed
theme changed
clear confirmation
about open
```

## 5. Acceptance

- settings persist locally;
- old snapshots are not mutated by settings changes;
- dangerous actions require confirmation;
- no account/backend required.
