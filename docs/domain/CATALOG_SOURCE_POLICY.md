# Catalog Source Policy

## Purpose

Catalog data must be traceable.

Weights, sizes, power values and prices should not appear without a source status.

## Source statuses

- verified
- estimated
- needs-check
- user-defined

## Fields requiring source status

- dimensions
- weight
- power
- connector data
- rental price
- asset model reference
- compatibility tags

## Rule

If a value is not verified, UI and PDF should be able to mark it as estimated or requiring check.

## Task 001

Task 001 should include sourceStatus in catalog contracts.
