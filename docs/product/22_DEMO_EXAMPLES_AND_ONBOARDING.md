# 22. Demo Examples and Onboarding

## 1. Purpose

The first app launch must explain value quickly. Users should not open an empty calculator and wonder what to enter.

## 2. v1.0 onboarding principle

Onboarding must be short and skippable.

Recommended message:

```text
Посчитайте сцену, ферму или LED-экран, сохраните расчёт и отправьте PDF.
```

Do not use long tutorial screens before the user can calculate.

## 3. Demo examples vs test fixtures

Demo examples are allowed in production.

They are not hidden dev/test fixtures.

Rules:

- visible to user;
- clearly marked as examples;
- safe values;
- created through normal app data path;
- can be deleted/ignored;
- no debug panels;
- no fake backend data.

## 4. Recommended demo examples

### Stage

```text
Сцена 7.2 × 4.8 м
Высота 0.8 м
Лестница: да
Закрытие торцов: ткань or none, depending default
```

### Truss

```text
Портал 8 × 4 м
29Q reference catalog
```

### LED

```text
LED 5.12 × 2.56 м
Кабинет 640 × 640 мм
Висим
```

## 5. Empty states

Empty saved list should offer:

```text
Создать расчёт
Открыть пример
```

Empty calculator should offer presets/examples, not only blank fields.

## 6. First PDF moment

The first generated PDF should show the product value:

- clean title;
- size;
- scheme;
- BOM summary;
- total price if pricing enabled;
- disclaimer;
- PACK.IT brand.

## 7. Acceptance

Accepted when first-time user can understand the app within 30 seconds and create/open a demo calculation without reading external documentation.
