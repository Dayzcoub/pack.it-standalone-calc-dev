# Error Handling and Diagnostics

## Purpose

PACK.IT must handle broken projects, failed imports and export errors predictably.

## Error categories

- project load error
- schema mismatch
- missing asset
- invalid model import
- renderer error
- PDF export error
- storage error

## User-facing rule

Show clear recovery actions, not raw technical errors.

## Diagnostics

Local diagnostics can help debugging, but must not upload data automatically.

## Task 001

Task 001 should define a shared error shape and diagnostics boundary.
