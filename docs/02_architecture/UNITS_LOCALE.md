# Units and Locale

## Purpose

Units and locale settings must be explicit from the beginning.

PACK.IT needs more than text translation.

## Units

Initial metric defaults:

- meters
- millimeters where needed
- kilograms
- watts
- kilowatts

## Locale data

Locale affects:

- language
- decimal separator
- date format
- currency symbol
- PDF formatting

## Rule

Internal calculations should use stable normalized units.

UI can format values for the selected locale.

## Task 001

Task 001 should reserve settings and formatting adapters.
