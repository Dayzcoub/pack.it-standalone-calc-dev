# 17. Feature Matrix

## 1. Purpose

This matrix is the single quick reference for what belongs to v1.0, what is later, and what belongs to future Pro.

## 2. Matrix

| Feature | v1.0 | v1.1 / near future | Pro / future | Notes |
| --- | --- | --- | --- | --- |
| Stage calculator | Yes | Improve | Yes | Core release feature |
| Truss calculator | Yes | Improve | Yes | Core release feature |
| LED calculator | Yes | Improve | Yes | Core release feature |
| Local saved calculations | Yes | Improve | Yes | Separate Stage/Truss/LED lists |
| Drafts per calculator | Yes | Improve | Yes | One draft per calculator |
| Single PDF export | Yes | Improve | Yes | Uses PdfModel and snapshot |
| Native share | Yes | Improve | Yes | OS share sheet |
| RU language | Yes | Yes | Yes | Default/fallback |
| EN language foundation | Yes | Improve | Yes | Full text coverage required |
| Dark theme | Yes | Yes | Yes | Default |
| Light theme | Yes or flag | Yes | Yes | Calm light theme |
| Combined PDF | Optional/flag | Yes | Likely Pro candidate | Depends release scope |
| Technical PDF mode | Optional/flag | Yes | Likely Pro candidate | Client/technical split |
| Custom truss catalogs | Data model only | Maybe editor | Pro candidate | Built-in catalogs read-only |
| Custom LED modules/cabinets | Data model only | Maybe editor | Pro candidate | For self-built cabinets |
| JSON backup/export | Not required | Yes | Maybe Pro | Architecture-ready |
| CSV BOM export | Not required | Maybe | Pro candidate | PDF BOM in v1.0 |
| Project packages | Data model/future | Maybe | Pro candidate | Local package, not CRM |
| Cloud sync | No | No | Future only | Requires privacy/backend decision |
| Accounts | No | No | Future only | Not v1.0 |
| Ads | No | No | No | Decision: no ads |
| Analytics/tracking | No | No | No by default | Any change requires privacy update |
| Store purchases/IAP | No | Maybe | Yes | Future Pro phase |
| CRM/warehouse/team | No | No | Separate product/future | Out of v1.0 scope |
| Full 3D constructor | No | Future R&D | Future | Not first release |

## 3. v1.0 principle

```text
calculate → save → PDF → share
```

Anything outside this line must be either feature-flagged, documented as future, or excluded.

## 4. Acceptance

Task scope is accepted only if it matches this matrix or updates this matrix through an explicit product decision.
