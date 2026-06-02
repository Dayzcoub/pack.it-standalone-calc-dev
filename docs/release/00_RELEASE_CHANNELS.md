# 00. Release Channels

## 1. Channels

```text
local dev
internal build
beta/TestFlight/Google internal testing
closed beta
production
```

## 2. Local dev

Allowed:

- debug helpers;
- test fixtures;
- missing translation markers;
- mock data.

Not suitable for Store.

## 3. Internal build

Allowed:

- hidden debug info if clearly marked;
- internal test data only if not user-facing;
- feature flags.

## 4. Beta

Must be close to production:

- no test fixtures in main UI;
- no FEG brand;
- no debug panels;
- privacy behavior matches docs.

## 5. Production

Required:

- no debug panels;
- no test fixtures;
- no console spam;
- no hidden unfinished screens;
- no unexpected network;
- no ad/tracking SDK;
- no FEG brand.

## 6. Acceptance

A build can move to next channel only when its gate checklist passes.
