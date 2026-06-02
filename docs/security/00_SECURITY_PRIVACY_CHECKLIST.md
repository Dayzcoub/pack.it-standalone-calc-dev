# 00. Security and Privacy Checklist

## 1. v1.0 privacy baseline

v1.0 must be:

```text
no account
no backend
no ads
no analytics
no tracking
local storage only
```

## 2. Forbidden in v1.0

- ad SDK;
- tracking SDK;
- analytics SDK;
- remote config;
- external CDN assets;
- hidden API endpoints;
- API keys/secrets in app;
- unnecessary permissions;
- automatic PDF upload.

## 3. Permissions

Avoid:

```text
camera
microphone
contacts
location
bluetooth
push notifications
background services
```

Allowed only if later explicitly approved and documented.

## 4. Sharing

Files are shared only after user action through the native share sheet.

## 5. Acceptance

Accepted when:

- no unexpected network calls exist;
- no secrets are bundled;
- no ad/tracking code exists;
- privacy docs match implementation;
- production build permissions are minimal.
