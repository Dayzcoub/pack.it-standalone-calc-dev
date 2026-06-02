# 00. Device Test Matrix

## 1. Goal

The app must work reliably on real phone sizes, not only on generated iPhone mockups.

## 2. Required viewport tests

Minimum web/e2e viewport matrix:

```text
360 × 740 — small Android
390 × 844 — common iPhone/Android
393 × 852 — iPhone 15 style
414 × 896 — larger iPhone
430 × 932 — Pro Max / large Android
768 × 1024 — tablet portrait
1024 × 768 — tablet landscape
```

## 3. iOS physical/simulator targets

Test at least:

- small iPhone profile, similar to iPhone SE;
- standard current iPhone;
- Pro Max size;
- iPad/tablet later if tablet support is considered.

## 4. Android targets

Test at least:

- 360 px wide device;
- 390 px wide device;
- 430 px wide device;
- device with gesture navigation;
- device with classic navigation bar if possible.

## 5. Screens to test

For each viewport/device:

- Home;
- Stage Parameters;
- Stage Scheme;
- Stage BOM;
- Stage Price;
- Truss Parameters;
- Truss Scheme;
- Truss BOM;
- Truss Price;
- LED Parameters;
- LED Scheme;
- LED BOM;
- LED Price;
- Saved calculations;
- Empty saved state;
- Settings;
- PDF preview;
- native share flow if possible.

## 6. Safe area checks

Check:

- Dynamic Island/notch does not overlap header;
- bottom action bar respects iPhone home indicator;
- Android navigation bar does not hide bottom actions;
- keyboard does not permanently hide active numeric input;
- modal/sheet closes correctly.

## 7. Android Back behavior

Rules:

- if modal/bottom sheet open: Back closes it first;
- if on calculator screen with unsaved changes: Back asks confirmation;
- if no unsaved changes: Back returns to previous screen;
- Back should not accidentally close app from deep calculator state.

## 8. Orientation

v1.0 primary orientation:

```text
portrait
```

Landscape is not a primary optimized mode, but app must not crash.

Future feature:

```text
expanded scheme landscape mode
```

## 9. Offline tests

Test:

- first launch after install;
- launch without internet;
- create calculation without internet;
- save calculation without internet;
- reopen saved calculation without internet;
- generate PDF without internet;
- share PDF without internet where OS allows.

## 10. Performance tests

Check heavy cases:

- large LED screen grid;
- long truss span;
- large stage area;
- many saved calculations;
- PDF generation from each calculator.

No screen should freeze noticeably on normal modern phones.

## 11. Acceptance

Device QA passes only when:

- no page-level horizontal overflow;
- bottom actions remain reachable;
- numeric input works;
- PDF/share works;
- saved data persists;
- app does not require internet;
- warnings are visible and readable;
- no FEG brand appears.
