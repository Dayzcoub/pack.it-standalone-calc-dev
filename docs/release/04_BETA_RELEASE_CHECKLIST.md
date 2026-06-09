# 04. Beta Release Checklist

## 1. Purpose

This checklist is for TestFlight / Google Play internal testing builds before wider MVP testing.

## 2. Product scope

- [ ] v1.0 scope respected.
- [ ] No CRM/cloud/account features.
- [ ] No ads/analytics/tracking.
- [ ] No 3D dependencies unless explicitly approved later.

## 3. Brand/assets

- [ ] PACK.IT app name visible.
- [ ] No visible FEG brand.
- [ ] App icon present.
- [ ] Splash screen present.
- [ ] Stage/Truss/LED home artwork or fallback present.
- [ ] PDF header/logo present.

## 4. Core flows

- [ ] Home opens.
- [ ] Stage calculator works.
- [ ] LED calculator works.
- [ ] Truss calculator works.
- [ ] Save calculation works.
- [ ] Open saved calculation works.
- [ ] PDF generation works.
- [ ] Native share works where platform allows.
- [ ] Offline mode works.

## 5. Mobile checks

- [ ] iOS safe areas OK.
- [ ] Android Back behavior acceptable.
- [ ] Keyboard does not hide critical actions.
- [ ] No horizontal overflow on target devices.
- [ ] Buttons are touch-friendly.
- [ ] Dark theme readable.
- [ ] Light theme decision respected.

## 6. Privacy/security

- [ ] Privacy policy draft updated.
- [ ] Privacy labels/data safety mapping reviewed.
- [ ] Support contact available.
- [ ] Permissions minimal.
- [ ] No unexpected network calls.
- [ ] No secrets/API keys in bundle.

## 7. Calculation safety

- [ ] Disclaimer visible in app/PDF.
- [ ] Warnings visible.
- [ ] Invalid inputs do not crash.
- [ ] Regression scenarios pass.
- [ ] Version metadata stored in saved calculation.

## 8. Acceptance

Beta build is accepted only when core workflow is usable on real iOS and Android devices.
