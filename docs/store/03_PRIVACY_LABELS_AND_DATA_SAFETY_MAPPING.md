# 03. Privacy Labels and Data Safety Mapping

## 1. Purpose

This document maps the intended v1.0 privacy behavior to future App Store Privacy Labels and Google Play Data Safety answers.

It is not a legal filing. It is an implementation-control checklist.

## 2. v1.0 baseline

v1.0 target:

```text
no account
no backend
no ads
no analytics
no tracking
local storage only
```

## 3. Data handling matrix

| Data / behavior | Stored locally | Sent off-device by PACK.IT | Notes |
| --- | --- | --- | --- |
| Saved calculations | Yes | No | Local device storage |
| Draft calculations | Yes | No | Local device storage |
| Price profile settings | Yes | No | Local device storage |
| Theme/language settings | Yes | No | Local device storage |
| Generated PDF | Only if user saves/shares | No automatic upload | Shared only through OS share action |
| User name/email/phone | No | No | No account in v1.0 |
| Location | No | No | No location permission |
| Contacts | No | No | No contacts permission |
| Camera/photos | No | No | No camera/photo permission in v1.0 |
| Analytics events | No | No | No analytics SDK |
| Crash diagnostics | No | No | No crash reporting SDK in v1.0 |
| Advertising ID | No | No | No ad SDK |
| Tracking | No | No | No tracking SDK |

## 4. Store disclosure implications

If implementation matches this document, v1.0 should be able to use a minimal privacy posture.

Before submission, verify actual build:

- dependencies;
- native permissions;
- network calls;
- third-party SDK behavior;
- platform-generated metadata;
- PDF/share behavior.

## 5. If future features are added

Update this document and privacy policy before adding:

- accounts;
- cloud sync;
- analytics;
- crash reporting;
- ads;
- tracking;
- subscriptions/IAP with backend receipt handling;
- push notifications;
- camera/photo attachments;
- location;
- contacts.

## 6. Release checklist

Before Store release:

- App Store Privacy Labels prepared;
- Google Play Data Safety prepared;
- privacy policy URL live;
- support URL live;
- implementation verified against this mapping;
- no hidden SDK contradicts this mapping.

## 7. Acceptance

Accepted when privacy/store declarations match the production build, not just product intent.
