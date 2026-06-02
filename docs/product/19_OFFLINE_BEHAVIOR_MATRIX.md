# 19. Offline Behavior Matrix

## 1. Purpose

v1.0 is offline-first. This matrix defines what must work without internet.

## 2. Matrix

| Area | Offline in v1.0 | Notes |
| --- | --- | --- |
| App launch | Yes | No account required |
| Home | Yes | Local recent calculations only |
| Stage calculator | Yes | Core local calculation |
| Truss calculator | Yes | Core local calculation |
| LED calculator | Yes | Core local calculation |
| Saved calculations | Yes | Local storage |
| Drafts | Yes | Local storage |
| Settings | Yes | Local storage |
| PDF generation | Yes | Local PDF generation |
| Share PDF | OS-dependent | Native share sheet; no app server |
| Privacy/support links | No/optional | Links require internet if opened |
| Store purchase / Pro later | May require internet | Future only |
| Cloud sync later | No in v1.0 | Future feature |

## 3. Forbidden offline blockers

v1.0 must not require:

- login;
- remote config;
- CDN fonts;
- CDN assets;
- online PDF service;
- backend license check;
- analytics connection.

## 4. Acceptance

Accepted when app can perform core workflow in airplane mode:

```text
open → calculate → save → reopen → PDF → share through OS where available
```
