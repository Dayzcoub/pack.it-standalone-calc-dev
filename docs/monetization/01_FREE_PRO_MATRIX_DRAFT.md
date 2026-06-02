# 01. Free / Pro Matrix Draft

## 1. Current decision

v1.0 has no ads.

Future monetization may use PACK.IT Pro, but payment model is not final.

## 2. Draft matrix

| Feature | Free | Pro candidate | Notes |
| --- | --- | --- | --- |
| Stage calculator | Yes | Yes | Basic feature remains useful |
| Truss calculator | Yes | Yes | Basic feature remains useful |
| LED calculator | Yes | Yes | Basic feature remains useful |
| Local saved calculations | Limited or unlimited TBD | Unlimited | Limit decision open |
| Single PDF | Yes | Yes | May include PACK.IT footer |
| Combined PDF | Maybe limited | Yes | Strong Pro candidate |
| Client PDF mode | Yes or limited | Yes | TBD |
| Technical PDF mode | Maybe | Yes | Strong Pro candidate |
| Custom truss catalogs | No or limited | Yes | Pro candidate |
| Custom LED cabinets | No or limited | Yes | Pro candidate |
| Price profiles | Basic | Advanced/multiple | Pro candidate |
| JSON backup/export | Maybe | Yes | Future |
| BOM CSV export | No | Yes | Future |
| Project packages | Limited | Yes | Future |
| Cloud sync | No | Future Pro | Requires backend/privacy decision |
| Ads | No | No | Fixed decision |

## 3. Free version rule

Free version must remain professional and useful.

Do not cripple basic calculations.

## 4. Pro gate rule

Use entitlements:

```text
feature exists?
user has access?
```

Feature flags and entitlements are separate concepts.

## 5. Open decisions

- Should Free have saved calculation limit?
- Should combined PDF be Free or Pro?
- Should technical PDF be Pro?
- One-time purchase or subscription?
- When to introduce IAP?
