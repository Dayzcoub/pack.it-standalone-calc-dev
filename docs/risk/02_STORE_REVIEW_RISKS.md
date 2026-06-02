# 02. Store Review Risks

## 1. Privacy mismatch

Risk:

- App claims no data collection but includes SDK/network behavior.

Mitigation:

- no ads;
- no analytics;
- no tracking;
- no backend;
- no remote config;
- verify production network behavior.

## 2. Unexpected permissions

Risk:

- plugin adds camera/location/contacts/push permission accidentally.

Mitigation:

- review native manifests;
- minimal Capacitor plugins;
- production permission checklist.

## 3. Missing support/privacy URLs

Risk:

- Store submission blocked.

Mitigation:

- prepare Privacy Policy URL;
- prepare Support URL;
- keep drafts updated.

## 4. Misleading safety claims

Risk:

- wording suggests certified engineering approval.

Mitigation:

- use reference-only disclaimer;
- avoid words like guaranteed/safe/certified;
- include disclaimer in PDF and app.

## 5. Trademark/name issue

Risk:

- PACK.IT name conflict before public release.

Mitigation:

- keep trademark verification as release requirement.

## 6. Broken screenshots

Risk:

- Store screenshots show features not actually available.

Mitigation:

- screenshots must match implemented UI and active feature flags.
