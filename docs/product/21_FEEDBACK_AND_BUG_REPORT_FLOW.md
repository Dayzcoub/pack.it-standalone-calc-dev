# 21. Feedback and Bug Report Flow

## 1. Purpose

The MVP must make it easy for early testers to report calculation mistakes and UX problems without adding backend or analytics.

## 2. v1.0 principle

No backend feedback system in v1.0.

Use user-triggered channels:

- email;
- Telegram/community message later;
- manual tester feedback;
- attached PDF or copied calculation JSON.

## 3. In-app entry point

Recommended button:

```text
Сообщить об ошибке
Report a problem
```

Locations:

- About/Help;
- PDF preview;
- calculator result menu;
- warning block if useful later.

## 4. What to include

When user reports a calculation issue, prepare a message draft with:

```text
appVersion
calculationEngineVersion
catalogVersion
calculator type
input JSON
result summary
warnings
user note placeholder
```

Do not send automatically.

The user must explicitly choose to send through email/share.

## 5. Example email body

```text
PACK.IT bug report

Calculator: Stage / Truss / LED
App version: {appVersion}
Engine version: {engineVersion}
Catalog version: {catalogVersion}

Problem description:
[User writes here]

Input:
{inputJson}

Warnings:
{warnings}
```

## 6. Privacy rule

Do not include personal data unless user adds it manually.

Do not upload reports automatically.

## 7. Tester validation use

For closed MVP testing, ask testers to use this flow when:

- BOM looks wrong;
- price is wrong;
- PDF is unclear;
- input is confusing;
- warning is missing or too aggressive.

## 8. Future option

Future versions may add structured feedback backend, but only after privacy policy and store declarations are updated.

## 9. Acceptance

Accepted when early builds can generate a user-controlled report containing enough technical context to reproduce calculation issues.
