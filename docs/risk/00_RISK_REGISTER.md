# 00. Risk Register

## 1. Purpose

This register lists the main risks for PACK.IT standalone calculators before code begins.

## 2. Product risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| v1.0 grows into mini CRM | delayed release, unstable scope | keep v1.0 as calculate → save → PDF → share |
| Pro features leak into v1.0 | unfinished UX | feature flags and entitlements foundation only |
| Combined PDF turns into full project system | scope creep | treat as local package/export, not CRM |

## 3. Architecture risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| old FEG code copied as foundation | technical debt returns | Task 001 foundation only, no old code |
| calculations mixed into UI | hard to test, PDF mismatches | pure core functions only |
| renderer calculates BOM/price | inconsistent outputs | DrawingModel is visual only |
| PDF uses separate calculations | mismatch with UI/saved data | PdfModel consumes CalculationResult snapshot |

## 4. Data risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| old saved calculation changes after update | user trust loss | store resultSnapshot and engine version |
| price profile changes mutate old records | wrong quotes/PDFs | snapshots remain stable |
| storage migration changes results | silent data corruption | migrations do not recalculate snapshots |

## 5. UI risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| CSS hacks return | fragile UI | design tokens and shared components |
| mobile overflow | unusable on phones | viewport QA matrix |
| bottom bar hidden by safe area | blocked actions | safe-area rules |
| BOM table too wide | unreadable mobile UI | card/list mobile BOM |

## 6. Store/privacy risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| accidental analytics/tracking SDK | privacy mismatch | no SDK policy + CI checks |
| extra permissions | review/user trust issue | minimal permissions policy |
| external CDN dependency | offline/privacy issue | local assets only |

## 7. Asset risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| runtime images too heavy | slow app | optimize PNG/WebP |
| neon palette returns | brand inconsistency | calm dusty palette documented |
| raster candidates not uploaded | missing visuals | BINARY_UPLOAD_TODO and manifest |
| logo placeholder becomes final accidentally | weak brand | mark placeholders as replaceable |

## 8. Acceptance

Each major task must check this register and add new risks when discovered.
