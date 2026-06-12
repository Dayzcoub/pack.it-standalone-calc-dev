# Validation Levels

## Purpose

Validation levels make warnings and blocking issues predictable.

## Levels

- info
- warning
- critical
- blocking

## Meaning

info: useful note.

warning: suspicious situation, user can continue.

critical: serious issue, user should fix or confirm before export.

blocking: operation cannot continue until fixed.

## Actions

Validation should define whether the user can:

- save project
- generate PDF
- export project
- share project

## Source

Validation issues can come from:

- object data
- catalog data
- constraints
- collision checks
- power checks
- rigging checks

## Task 001

Task 001 should define the shared validation issue contract.
