# Measurement Accuracy Policy

## Purpose

Measurement storage and display must be predictable.

## Internal storage

Internal SceneModel units are meters.

Store values with enough precision for editing.

## Display

Display can round values for readability.

Examples:

- meters: 2 decimal places by default
- millimeters: integer display where needed
- kilograms: 1 or 2 decimals depending on context
- power: W or kW depending on scale

## Rule

Do not use rounded display values as calculation source.

## Task 001

Task 001 should separate stored values from formatted UI values.
