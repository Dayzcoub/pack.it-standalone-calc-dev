# 11. Development Workflow

## 1. Purpose

This document defines the working process for PACK.IT development after the pre-code phase.

The goal is to keep changes small, reviewable and aligned with the documented architecture.

## 2. Branching

Recommended branch naming:

```text
feature/task-001-foundation
feature/task-002-core-contracts
fix/stage-rounding
chore/update-docs
```

Do not mix unrelated tasks in one branch.

## 3. Task size

Prefer small vertical tasks.

Good:

```text
Task 003 — Stage core + tests
```

Bad:

```text
Implement Stage + LED + Truss + PDF + storage in one pass
```

## 4. Commit rules

Each commit should have one clear purpose.

Suggested prefixes:

```text
docs:
feat:
fix:
test:
chore:
refactor:
assets:
```

Examples:

```text
feat: add Stage core contracts
test: add Stage 7.2x4.8 regression fixture
docs: update open questions
```

## 5. Pull request / review checklist

Every PR should answer:

- What task does this implement?
- Which docs are source of truth?
- Which checks were run?
- Does it add or change calculations?
- Does it affect PDF/saved snapshots?
- Does it introduce dependencies or permissions?
- Does it change privacy/store behavior?
- Does it update docs when behavior changes?

## 6. Forbidden mixing

Do not mix in one task unless explicitly approved:

- foundation and calculator logic;
- core logic and unrelated UI polish;
- storage migrations and visual design;
- native plugins and calculation formulas;
- old source migration and brand work.

## 7. Documentation update rule

If behavior changes, update docs in the same PR.

Examples:

- new warning code → update copy dictionary and validation docs;
- changed rounding → update rounding doc;
- changed saved format → update data model/storage docs;
- new dependency → update dependencies/license docs.

## 8. Review priority

Review in this order:

1. Does it violate critical prohibitions?
2. Does it preserve core purity?
3. Are calculations tested?
4. Does UI follow tokens/components?
5. Does it affect privacy/store/security?
6. Are docs updated?

## 9. Acceptance

A development task is accepted only when:

- scope is limited;
- checks pass;
- no forbidden SDK/pattern is introduced;
- no old FEG architecture leaks;
- docs stay in sync;
- open questions are recorded instead of guessed.
