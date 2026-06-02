# 18. Limits and Constraints

## 1. Purpose

The app must have practical limits to protect performance, PDF generation and user experience.

Exact numeric limits may be adjusted after implementation tests.

## 2. Input text limits

Recommended:

```text
calculation name: 80 characters
notes: 1000 characters
price profile name: 40 characters
custom catalog item name: 80 characters
```

## 3. Saved calculations

v1.0 Free limit is open.

Technical architecture should support:

```text
soft limits
no limit
future Pro limit gates
```

## 4. LED limits

Initial guardrails:

```text
max cabinet columns: TBD after performance test
max cabinet rows: TBD after performance test
max total cabinets per calculation: TBD after performance test
```

Renderer must avoid per-pixel DOM rendering.

## 5. Truss limits

Initial guardrails:

```text
max generated parts per structure: TBD after performance test
max span input: warn if unusually large
```

No silent construction if no valid split exists.

## 6. Stage limits

Initial guardrails:

```text
max stage modules: TBD after performance test
warn for unusually large area
```

## 7. PDF limits

If PDF becomes too large:

- show warning;
- simplify images;
- split technical details if needed later.

## 8. Import/export future limits

For future JSON import:

```text
max file size: TBD
max records per import: TBD
conflict handling required
```

## 9. Acceptance

Accepted when:

- limits are enforced or warned;
- huge inputs do not freeze app;
- PDF generation handles large cases gracefully;
- open numeric limits are resolved before public release.
