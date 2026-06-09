# 17. Feature Matrix

## 1. Purpose

This matrix is the single quick reference for what belongs to v1.0, what is later, and what is out of this standalone app line.

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
| Combined PDF | Optional/flag | Yes | Likely Pro candidate | Local only, from saved snapshots |
| Technical PDF mode | Optional/flag | Yes | Likely Pro candidate | Client/technical split |
| Local price profiles | Yes | Improve | Yes | User-administered locally |
| Custom truss catalogs | Data model only | Maybe local editor | Pro candidate | Built-in catalogs read-only |
| Custom LED modules/cabinets | Data model only | Maybe local editor | Pro candidate | Local/offline only |
| JSON backup/export | Not required | Yes | Maybe Pro | Local file import/export |
| CSV BOM export | Not required | Maybe | Pro candidate | Local export |
| Project packages | Data model/future | Maybe | Pro candidate | Local package, not CRM |
| Cloud sync | No | No | No | Out of standalone app line |
| Backend | No | No | No | Out of standalone app line |
| Remote config | No | No | No | No hidden server control |
| Server admin panel | No | No | No | Out of standalone app line |
| Accounts | No | No | No | Out of standalone app line |
| Workspace admin/roles | No | No | No | Out of standalone app line |
| Ads | No | No | No | Decision: no ads |
| Analytics/tracking | No | No | No | No tracking in standalone app line |
| Store purchases/IAP | No | Maybe | Yes | Only if local entitlement/unlock approach is acceptable |
| CRM/warehouse/team | No | No | Separate product only | Out of standalone calculator scope |
| Full 3D constructor | No | Future R&D | Future | v2 roadmap, still local-first |

## 3. v1.0 principle

```text
calculate → save → PDF → share
```

Anything outside this line must be either explicitly local/offline, documented as future, or excluded.

## 4. Standalone line principle

This product line is a standalone calculator.

Do not add backend/cloud/admin/workspace features to this app line.

## 5. Acceptance

Task scope is accepted only if it matches this matrix or updates this matrix through an explicit product decision.
