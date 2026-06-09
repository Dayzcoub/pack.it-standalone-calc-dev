# 24. Field Use Requirements

## 1. Purpose

PACK.IT may be used on site, not only at a desk. The UI must work for production/rental people in field conditions.

## 2. Field context

Common conditions:

- bright daylight;
- dark backstage;
- one-handed use;
- gloves/dirty hands sometimes;
- poor or no internet;
- time pressure;
- noisy environment;
- user switching between chat, calls and app;
- need to reopen last calculation quickly.

## 3. UI requirements

Important controls must be:

- readable;
- high contrast;
- touch-friendly;
- not hidden behind keyboard;
- reachable on phone;
- tolerant to accidental taps;
- not dependent on hover.

## 4. Workflow requirements

The app should support:

```text
open recent calculation quickly
edit size quickly
save without friction
generate/share PDF without account
work offline
```

## 5. Numeric input requirements

Support:

- comma and dot decimals where appropriate;
- clear unit labels;
- validation on impossible values;
- no raw NaN/undefined.

## 6. Contrast and theme

Dark theme is default.

Light theme may exist, but must be readable outdoors.

Do not use low-contrast decorative text for critical values.

## 7. Acceptance

Accepted when key flows can be completed on real iOS/Android devices in field-like conditions without desktop assumptions.
