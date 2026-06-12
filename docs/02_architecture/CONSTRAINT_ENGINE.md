# Constraint Engine

## Purpose

Constraint Engine checks the project scene for suspicious or invalid technical situations.

It does not replace qualified engineering review.

## Examples

- LED object has no visible support
- object floats above ground without support mode
- objects intersect unexpectedly
- truss span exceeds configured warning limit
- catalog-linked object misses required metadata

## Output

Constraints produce warnings or blocking issues.

Each issue should include:

- id
- severity
- object references
- message
- suggested action

## Task 001

Task 001 only needs contracts and placeholder pipeline.

Real rules are later tasks.
