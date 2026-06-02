# 03. Calculation Safety Risks

## 1. Principle

PACK.IT calculations are reference-only and must not be presented as certified engineering approval.

## 2. Truss risks

Risks:

- unsupported span too long;
- manual supports unsafe;
- load entered incorrectly;
- manufacturer load tables not checked;
- dynamic/wind loads ignored;
- incompatible truss systems mixed.

Mitigation:

- max unsupported span rule;
- auto-support warnings;
- compatibility groups;
- cautious load wording;
- disclaimer in UI/PDF.

## 3. Stage risks

Risks:

- stage dimensions not aligned to system;
- ground/floor capacity not checked;
- height/support stability not fully engineered;
- stairs/closure assumptions incomplete.

Mitigation:

- validation;
- suggestions instead of silent rounding;
- warnings;
- disclaimer.

## 4. LED risks

Risks:

- custom cabinet power/weight incorrect;
- high total power;
- mount mode missing;
- hanging/standing hardware incomplete;
- user-defined data not verified.

Mitigation:

- sourceStatus;
- user-defined warnings;
- high power/weight warnings;
- required mount validation.

## 5. PDF risks

Risks:

- PDF hides important warnings;
- client PDF looks like approval;
- old saved snapshot recalculated silently.

Mitigation:

- important warnings always included;
- disclaimer always included;
- snapshots used by default.
