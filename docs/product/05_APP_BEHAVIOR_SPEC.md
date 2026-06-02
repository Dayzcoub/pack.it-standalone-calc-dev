# 05. App Behavior Specification

## 1. Purpose

This document fixes detailed app behavior before code begins.

The goal is to remove ambiguity for Codex and avoid future fixes caused by undefined flows.

## 2. First launch

On first launch, show a short onboarding/safety notice.

Required:

- PACK.IT logo;
- one-sentence app purpose;
- safety disclaimer;
- local-only privacy note;
- continue button.

Example text:

```text
ПАК.ИТ Калькуляторы помогают быстро рассчитать сцену, фермы и LED. Расчёты являются справочными и не заменяют инженерную проверку, паспорта оборудования и нормы безопасности.
```

The user must be able to continue without creating an account.

Store first-launch acceptance:

- no login required;
- no internet required;
- no permissions requested;
- disclaimer is visible;
- app opens to Home after acknowledgement.

## 3. App navigation

Main screens:

```text
Home
Saved
Settings
Help/About
```

Calculator screens:

```text
Stage
Truss
LED
```

Home bottom navigation:

```text
Главная
Сохранённые
Настройки
```

Calculator screens use back arrow and sticky bottom actions instead of main bottom nav.

## 4. Unsaved changes

Every calculator tracks dirty state.

Dirty state becomes true when:

- user changes any input;
- user changes pricing;
- user changes construction mode;
- user edits calculation name;
- user changes active construction layout.

When leaving with unsaved changes:

```text
Сохранить изменения?
[Сохранить] [Выйти без сохранения] [Отмена]
```

Android Back uses the same rule.

## 5. Save behavior

### New calculation

If current calculation has no saved id:

- pressing Save creates a new saved calculation;
- app generates default name;
- toast/chip: `Расчёт сохранён`;
- dirty state becomes false.

### Existing calculation

If current calculation was opened from Saved:

- pressing Save updates the saved record;
- resultSnapshot is updated;
- updatedAt is changed;
- engine/app version are stored.

### Save as copy

Available from menu or saved calculation actions later:

- creates duplicate;
- original remains unchanged.

## 6. Default calculation names

Autoname rules:

```text
Сцена 7.2×4.8
Портал 8×4
Рама 8×4
Табуретка 12×6×4
LED 5.12×2.56
```

If user renames calculation, never overwrite custom name automatically.

## 7. Reset behavior

Reset returns current calculator to defaults.

Reset requires confirmation:

```text
Сбросить текущий расчёт?
```

If calculation is saved, reset does not delete saved record unless user saves reset state over it.

## 8. Delete behavior

Delete exists only from Saved list/details.

Delete requires confirmation:

```text
Удалить расчёт? Это действие нельзя отменить.
```

v1.0 can permanently delete locally. Future versions may add Trash if needed.

## 9. Duplicate behavior

Duplicate action:

- creates new id;
- copies input and snapshot;
- appends suffix like `копия`;
- createdAt/updatedAt become current time;
- preserves engine version in snapshot;
- user may open and recalculate copy.

## 10. Recalculate old snapshot

When saved calculation has older `calculationEngineVersion`:

Show notice:

```text
Этот расчёт создан в старой версии формул. Его можно открыть как сохранённый снимок или пересчитать копию.
```

Actions:

```text
Открыть снимок
Создать копию и пересчитать
```

Never silently mutate old resultSnapshot.

## 11. PDF behavior

PDF button behavior:

- if calculation is valid: generate PDF preview/export;
- if non-blocking warnings exist: allow PDF and include warnings;
- if blocking errors exist: block PDF and show errors;
- if calculation is unsaved: PDF still allowed, but file name uses generated calculation name.

PDF action should not require internet.

## 12. Share behavior

Share button behavior:

- generate PDF if not already generated;
- open native share sheet;
- if share fails/cancelled, calculation remains unchanged.

Do not upload PDF to server in v1.0.

## 13. Draft behavior

Each calculator has one local draft:

```text
stageDraft
trussDraft
ledDraft
```

Draft restores last unsaved input when user returns to calculator.

Draft is not a saved calculation.

If user opens saved calculation, draft does not overwrite it.

## 14. Settings behavior

Settings v1.0 includes:

- active price profile;
- theme switch;
- units display;
- PDF mode default if implemented;
- safety/about;
- storage/export placeholders if postponed.

Changes to settings apply to new calculations and current unsaved calculations where reasonable.

Saved snapshots do not silently change when price profile defaults change.

## 15. Error handling

Errors must be user-readable.

Avoid:

```text
undefined
NaN
[object Object]
```

Use:

```text
Не удалось создать PDF
Проверьте размеры конструкции
Не удалось сохранить расчёт на устройстве
```

## 16. Toasts and feedback

Use short feedback:

- `Расчёт сохранён`;
- `PDF создан`;
- `Расчёт удалён`;
- `Создана копия`;
- `Проверьте параметры`.

Feedback must not block the main flow unless critical.

## 17. Offline behavior

v1.0 must work without internet.

Offline must support:

- launch app;
- calculate;
- save locally;
- open saved;
- generate PDF;
- share via OS if available.

## 18. No-account behavior

The app must not show login/registration in v1.0.

Future account/sync must be optional and must not be structurally required by core calculators.

## 19. Acceptance

App behavior is accepted only when:

- dirty state works;
- Android Back works;
- save/duplicate/delete/reset confirmations work;
- old snapshot rule is implemented;
- PDF/share behavior is deterministic;
- offline operation works;
- no account/backend/analytics is required.
