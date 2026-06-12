# PDF Template Versioning

## Purpose

PDF layout and content will change over time.

Templates need versioning so old project exports remain understandable.

## Required metadata

PDF output should include later:

- product version
- project schema version
- PDF template version
- generated date

## Rule

PDF must be generated from ProjectModel and generated project snapshots.

Do not build PDF from isolated calculator screens.

## Task 001

Task 001 should reserve PDF template version metadata.
