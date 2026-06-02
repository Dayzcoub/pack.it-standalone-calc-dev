# 04. Legal and Safety Notes

## 1. Core disclaimer

The app calculates stage platforms, truss structures and LED screens. This requires a clear safety disclaimer.

Required Russian text:

```text
Расчёты в приложении являются справочными и не заменяют инженерную проверку, паспортные данные оборудования, требования производителя, нормы безопасности и ответственность квалифицированного специалиста на площадке.
```

Short PDF version:

```text
Справочный расчёт. Перед монтажом проверьте по паспортам оборудования, требованиям производителя и нормам безопасности.
```

## 2. Where disclaimer appears

Required locations:

- first launch/onboarding notice;
- settings/about screen;
- PDF footer or notes block;
- store description/privacy/support pages if needed.

## 3. Calculation responsibility

The app must never imply that it legally approves or certifies a construction.

Avoid wording like:

```text
безопасно
разрешено
гарантированно выдержит
можно монтировать
```

Preferred wording:

```text
расчётное значение
справочно
требует проверки
проверьте паспорт оборудования
запас по введённым данным
```

## 4. Truss/load wording

Use careful wording:

```text
Запас по введённым данным
Превышение по введённым данным
Требуется проверка специалистом
```

Do not present load check as certified engineering approval.

## 5. Store privacy position for v1.0

v1.0 should be local-only:

- no account;
- no backend;
- no analytics;
- no ads;
- no tracking;
- no personal data collection;
- no location/contact/camera/microphone access.

This must match actual implementation.

## 6. Privacy policy content

Privacy policy should state:

- calculations are stored locally on device;
- PDF files are generated locally;
- data is not sent to developer servers in v1.0;
- user controls sharing/export;
- uninstalling the app may remove local data unless exported/backed up.

## 7. Terms/support content

Support page should include:

- contact email or support form;
- app version;
- device/OS information request for bug reports;
- safety disclaimer link;
- privacy policy link.

## 8. Trademark/name check

Before public release:

- verify PACK.IT / ПАК.ИТ trademark conflicts;
- verify App Store name availability;
- verify Google Play name availability;
- verify domain/support URL;
- verify no conflict with existing apps in similar category.

This is not blocking internal development, but required before public production release.

## 9. Third-party licenses

Before release, verify licenses for:

- fonts;
- icons;
- generated/edited illustrations;
- PDF library;
- Capacitor plugins;
- any UI library;
- any chart/canvas/SVG helper.

Do not ship unknown assets.

## 10. Analytics/crash reporting decision

v1.0 default:

```text
no analytics, no crash reporting
```

If crash reporting is added later:

- update privacy policy;
- update store privacy answers;
- disclose collected technical data;
- provide opt-out if needed.

## 11. Legal/safety acceptance

Release candidate is not accepted until:

- disclaimer exists in app and PDF;
- privacy policy is prepared;
- store privacy answers match implementation;
- no unauthorized assets are used;
- PACK.IT naming risk is reviewed before public release.
