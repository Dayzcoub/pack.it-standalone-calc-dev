# Decision Log

## 2026-06-02 — New product direction

Decision: rewrite standalone calculators as **ПАК.ИТ Калькуляторы / PACK.IT Calculators**.

## 2026-06-02 — Source strategy

Decision: use `Dayzcoub/Feg_Calc_Stage` as logic/reference source, not as codebase foundation.

## 2026-06-02 — Architecture

Decision: React + TypeScript + Vite + Capacitor direction, with pure `core/` separated from UI/PDF/storage/native layers.

## 2026-06-02 — v1.0 privacy

Decision: v1.0 is offline-first, no account, no backend, no analytics, no tracking.

## 2026-06-02 — Standalone app line / no backend

Decision: this app line remains a standalone/offline calculator for fast Stage/Truss/LED constructions.

No backend, cloud admin panel, accounts, workspace administration, remote config, server-side catalog management or analytics should be added to this repository/product line.

Administration is local or release-based: local price/settings/saved calculations for the user, and versioned app/catalog/engine/PDF updates through releases.

If cloud/workspace/backend is ever considered, it must be a separate product decision and likely a separate product line.

## 2026-06-02 — System backup, not product cloud

Decision: important local app data should be stored in backup-friendly app storage where platform rules allow, so iCloud Backup / Android or Google Backup may restore it if enabled by the user.

PACK.IT still has no own backend and does not guarantee cloud sync. Help/privacy wording must say system backup may restore data, but PACK.IT does not provide direct cross-device synchronization.

Temporary files, PDF cache, render screenshots and debug logs should not be included in backup where possible.

## 2026-06-02 — Local import/export future

Decision: future backup/restore may be implemented as local user-controlled JSON import/export with schema/version metadata.

No server import/export and no automatic upload.

## 2026-06-02 — Ads

Decision: no ads in v1.0; no ad SDK; future monetization through Pro/entitlements.

## 2026-06-02 — Languages

Decision: RU/EN multilingual foundation required.

## 2026-06-02 — Saved calculations

Decision: saved calculations are separated by Stage/Truss/LED and also available in a combined Saved screen.

## 2026-06-02 — Combined PDF

Decision: architecture must support selecting multiple saved calculations and merging them into one combined PDF.

## 2026-06-02 — Truss catalogs

Decision: truss systems must be extensible for future manufacturer/catalog sets.

## 2026-06-02 — LED catalogs

Decision: LED must support future custom modules and self-built cabinets.

## 2026-06-02 — Snapshots

Decision: saved calculations store input and resultSnapshot. Old snapshots are not recalculated silently.

## 2026-06-02 — Safety

Decision: calculations are reference-only and require disclaimer in app/PDF/store materials.
