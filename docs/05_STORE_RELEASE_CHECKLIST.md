# 05. Store Release Checklist

## 1. Release strategy

Первая версия должна быть максимально простой для публикации:

```text
offline-first
no account
no backend
no ads
no analytics
no tracking
no personal data collection
```

Это снижает риски App Store / Google Play review и упрощает privacy documents.

## 2. App identity

### Product name

```text
ПАК.ИТ Калькуляторы
PACK.IT Calculators
```

### Suggested bundle/package ids

```text
app.packit.calculators
```

or

```text
it.pack.calculators
```

Важно: не использовать `feg` в bundle/package id.

## 3. iOS checklist

Нужно подготовить:

- Apple Developer Account;
- App Store Connect app record;
- Bundle ID;
- signing certificates/profiles;
- iOS app icon set;
- splash screen;
- screenshots for required devices;
- app description;
- keywords;
- support URL;
- privacy policy URL;
- App Privacy answers;
- TestFlight build;
- release notes.

## 4. Android checklist

Нужно подготовить:

- Google Play Console account;
- Android package name;
- signing key;
- Android App Bundle `.aab`;
- app icon;
- adaptive icon;
- splash screen;
- screenshots;
- short description;
- full description;
- privacy policy URL;
- Data Safety form;
- content rating;
- internal testing;
- production release notes.

## 5. Privacy baseline for v1.0

В v1.0 приложение должно:

- хранить расчёты только локально;
- не отправлять данные на сервер;
- не использовать analytics SDK;
- не использовать ads SDK;
- не использовать crash reporting SDK without explicit decision;
- не использовать location/contact/camera/microphone permissions;
- не требовать аккаунт;
- не собирать имя, email, телефон пользователя.

## 6. Required legal/support pages

Минимально нужны публичные страницы:

```text
Privacy Policy
Support / Contact
Terms or Disclaimer
```

Privacy Policy должна честно описывать:

- приложение работает локально;
- расчёты хранятся на устройстве;
- PDF создаются локально;
- данные не передаются разработчику, если в v1.0 нет backend/analytics;
- пользователь сам отвечает за проверку расчётов перед монтажом/эксплуатацией.

## 7. Safety disclaimer

Так как приложение считает сценические конструкции, фермы и LED, нужен disclaimer:

```text
Расчёты в приложении являются справочными и не заменяют инженерную проверку, паспортные данные оборудования, требования производителя, нормы безопасности и ответственность квалифицированного специалиста на площадке.
```

В PDF также добавить короткую версию disclaimer.

## 8. App permissions

Для v1.0 желательно не запрашивать dangerous permissions.

Допустимые действия:

- сохранить PDF в файл;
- поделиться PDF через системный share sheet.

Не использовать без отдельного решения:

- camera;
- microphone;
- contacts;
- location;
- bluetooth;
- push notifications;
- background services.

## 9. Assets

Нужно подготовить:

- app icon 1024×1024;
- iOS icon set;
- Android adaptive icon foreground/background;
- splash art;
- store screenshots;
- feature graphic for Google Play;
- optional promo images;
- PDF logo/header.

Все assets должны быть PACK.IT, без FEG.

## 10. Pre-release QA

Перед отправкой:

- clean install test;
- offline launch test;
- save calculation test;
- reopen app test;
- PDF generation test;
- native share test;
- iPhone small screen test;
- iPhone large screen test;
- Android small screen test;
- Android large screen test;
- dark/light theme test;
- no horizontal overflow test;
- no hidden FEG branding test;
- no unexpected network calls test.

## 11. Store release acceptance

Release candidate accepted only when:

- iOS build installs via TestFlight;
- Android build installs via internal testing;
- no crash on first launch;
- all three calculators work;
- PDF works;
- share works;
- data persists locally;
- privacy forms are truthful;
- screenshots match actual UI;
- no FEG visible brand remains.
