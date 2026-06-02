# 03. PDF and Export Modes

## 1. Goal

PDF export must support professional use without mixing client-facing and technician-facing information.

Architecture must allow multiple PDF modes even if v1.0 ships one combined template first.

## 2. PDF modes

Recommended model:

```ts
type PdfMode = 'client' | 'technical';
```

## 3. Client PDF

Purpose:

```text
Send to client/manager as a clean calculation or quote-like document.
```

Contains:

- PACK.IT header;
- calculation name;
- calculator type;
- main dimensions;
- short summary;
- simplified equipment list;
- price summary;
- total;
- short disclaimer.

Avoid:

- excessive fastener details;
- internal notes;
- engineering debug data;
- formula internals.

## 4. Technical PDF

Purpose:

```text
Send to technician/internal team for preparation and checking.
```

Contains:

- full BOM;
- weights;
- fasteners;
- supports;
- power data;
- warnings;
- calculation engine version;
- detailed scheme;
- notes;
- full disclaimer.

## 5. v1.0 practical decision

v1.0 may ship a single combined PDF if needed.

However code and data model must still support:

```text
pdfMode: 'client' | 'technical'
```

This prevents refactoring later.

## 6. PDF source of truth

PDF must be generated from structured data:

```text
CalculationResult → PdfModel → PDF
```

Do not generate PDF from uncontrolled full-screen app screenshot.

## 7. Scheme source of truth

UI and PDF must share the same scheme source:

```text
core result → drawingModel → renderer → UI/PDF export
```

Do not create separate fake PDF scheme logic.

## 8. PDF traceability

PDF should include:

- app version;
- calculation engine version;
- date/time;
- calculation id or short reference;
- price profile name if relevant.

## 9. Export formats

v1.0:

- PDF;
- native share.

Future:

- JSON single calculation export;
- JSON all calculations export;
- CSV BOM export;
- image export of scheme.

## 10. File naming

Recommended PDF filename:

```text
PACKIT_STAGE_2026-06-02_7-2x4-8.pdf
PACKIT_TRUSS_2026-06-02_PORTAL_8x4.pdf
PACKIT_LED_2026-06-02_5-12x2-56.pdf
```

Use safe characters only.

## 11. PDF acceptance

PDF/export is accepted only when:

- PDF works offline;
- PDF includes PACK.IT brand;
- no FEG brand remains;
- PDF contains disclaimer;
- PDF uses structured PdfModel;
- UI and PDF use same calculation result;
- PDF can be shared through native share sheet;
- old saved calculation PDF does not silently change without recalculation.
