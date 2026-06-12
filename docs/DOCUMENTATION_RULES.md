# Documentation Rules

## 1. Purpose

The project documentation is now intentionally modular, but it must remain navigable and consistent.

This document defines where to put new information and how to avoid documentation sprawl.

## 2. Canonical reading order

Start with:

```text
README.md
CODEX_START_HERE.md
docs/PACKIT_MASTER_SPEC.md
docs/DECISIONS.md
docs/codex/TASK_001_FINAL_HANDOFF.md
```

Then open focused documents only as needed.

## 3. Authority order

If documents conflict, prefer:

1. `docs/DECISIONS.md`
2. `docs/PACKIT_MASTER_SPEC.md`
3. `docs/admin/00_STANDALONE_ADMINISTRATION_MODEL.md`
4. `docs/product/17_FEATURE_MATRIX.md`
5. focused docs in their domain
6. older planning notes

## 4. Where to put information

### Final decisions

Use:

```text
docs/DECISIONS.md
```

For:

- product direction;
- architecture decisions;
- no-backend/no-ads/no-tracking decisions;
- scope decisions;
- release-impacting decisions.

### High-level project summary

Use:

```text
docs/PACKIT_MASTER_SPEC.md
```

For:

- canonical project overview;
- summarized scope;
- architecture summary;
- cross-section summary;
- onboarding new developer/Codex.

Do not dump every minor detail into the master spec.

### Detailed implementation specs

Use focused folders:

```text
docs/product/
docs/calculators/
docs/design/
docs/assets/
docs/engineering/
docs/storage/
docs/pdf/
docs/release/
docs/store/
docs/qa/
docs/risk/
```

### Open questions

Use:

```text
docs/OPEN_QUESTIONS.md
```

For unresolved decisions only.

### Known issues

Use:

```text
docs/KNOWN_ISSUES.md
```

For known gaps, limitations or deferred fixes.

### Task handoffs

Use:

```text
docs/codex/
```

For implementation prompts and task-specific instructions.

## 5. New document rule

Before creating a new file, ask:

```text
Can this fit into an existing focused document?
Will this be read by someone later?
Does it reduce confusion or create more places to check?
```

Create a new document only if it has a clear owner/topic and will be listed in `docs/INDEX.md`.

## 6. Update rules

When adding a new document:

- add it to `docs/INDEX.md`;
- link it from related parent docs when useful;
- update `docs/PACKIT_MASTER_SPEC.md` only if the high-level summary changes;
- update `docs/DECISIONS.md` if it records a final decision.

## 7. Avoid duplication

Avoid copying long sections between documents.

Preferred pattern:

```text
Master spec: short summary + link to detailed doc.
Detailed doc: implementation-level rules.
```

## 8. Documentation quality rules

Every document should answer:

- why it exists;
- what is decided;
- what is out of scope;
- how acceptance is checked;
- where to look for related details.

## 9. No silent changes

Do not change calculation rules, safety wording, storage behavior, privacy scope or backend/no-backend decisions without updating:

- `docs/DECISIONS.md`;
- relevant focused doc;
- changelog or task notes when implementation starts.

## 10. Acceptance

Documentation is healthy when a new developer can start from the canonical reading order and understand the project without reading every file immediately.
