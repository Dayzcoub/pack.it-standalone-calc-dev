# 20. MVP Release Plan

## 1. Decision

Before writing the first real calculator code, the MVP release shape must stay clear:

```text
Task 001 foundation → first full vertical slice → staged rollout to real testers.
```

The first release is not a CRM, not a warehouse system, not a cloud platform and not a certified engineering tool.

## 2. v1.0 target

v1.0 target:

```text
fast commercial/technical reference calculators for Stage, Truss and LED.
```

Core loop:

```text
open → choose calculator → enter size/options → see scheme/BOM/price → save → PDF → share
```

## 3. Development order

Recommended implementation order after Task 001:

```text
Task 001 — Foundation
Task 002 — Shared core contracts
Task 003 — Stage core + tests
Task 004 — Stage UI connected to core
Task 005 — Stage PDF
Task 006 — LED core + tests
Task 007 — LED UI + PDF
Task 008 — Truss core + tests
Task 009 — Truss UI + PDF
Task 010 — Saved calculations + separate lists
Task 011 — Combined polish / beta hardening
```

## 4. Why Stage first

Stage is the best first full vertical slice because:

- easier to validate visually;
- easier BOM than truss;
- useful for real users;
- good test bed for core → UI → PDF → saved snapshot pipeline.

## 5. Why LED second

LED is next because:

- cabinet grid is deterministic;
- weight/power/BOM are clear;
- PDF value is obvious;
- it validates performance for visual grids.

## 6. Why Truss third

Truss is last among core calculators because:

- highest safety sensitivity;
- split/support/fastener logic is more complex;
- load wording must be careful;
- regression tests must be stronger.

## 7. v1.0 feature boundary

Include:

- Stage calculator;
- LED calculator;
- Truss calculator;
- basic presets;
- local drafts;
- local saved calculations;
- separate saved lists by calculator type;
- one PDF mode;
- native share;
- RU/EN foundation;
- disclaimer.

Exclude:

- CRM;
- cloud sync;
- accounts;
- Pro/IAP;
- ads;
- analytics;
- full custom catalog editor;
- full 3D constructor;
- online catalog marketplace.

## 8. First tester group

Target first validation group:

```text
10–20 real users
```

Prefer:

- small/medium rental operators;
- stage rental people;
- truss/stage technicians;
- LED technicians;
- production managers;
- technical directors;
- people who create quick quotes/KP.

## 9. Tester questions

Ask after use:

```text
Could you create a real calculation?
Where did you get stuck?
Would you send this PDF to a client or colleague?
What is missing before real use?
What is wrong in BOM/price/scheme?
What would you pay for in Pro?
What should stay free?
What feels unsafe or unclear?
```

## 10. Validation success criteria

Continue aggressively if:

- 5+ testers create real calculations;
- 3+ testers export/share PDF or say PDF is usable;
- 2–3 testers say they would pay for Pro/advanced features;
- repeated feedback clusters appear;
- at least some testers return after several days.

Pause/rethink if:

- users do not understand the flow;
- PDF is not useful;
- calculations do not match real workflow;
- too many assumptions block real use;
- testers prefer Excel/manual workflow with no perceived gain.

## 11. Acceptance

MVP release plan is accepted when:

- Task 001 remains foundation-only;
- Stage is first full vertical slice unless explicitly changed;
- v1.0 scope does not expand into CRM/cloud/3D/Pro;
- tester validation plan exists;
- go/no-go criteria are clear.
