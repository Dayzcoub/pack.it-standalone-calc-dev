# Dependency Policy

## Purpose

Dependencies must be intentional and justified.

## Allowed direction

Core app stack:

- React
- TypeScript
- Vite
- Capacitor
- Three.js

## Rule

Do not add SDKs for backend, ads, analytics or tracking in Alpha 0.1.0.

Avoid large dependencies for small utilities.

## Review

Every new dependency should answer:

- why it is needed
- size/performance impact
- offline behavior
- license risk
- replacement difficulty

## Task 001

Keep dependency set minimal.
