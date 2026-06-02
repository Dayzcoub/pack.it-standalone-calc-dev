# 06. Settings and Price Profiles

## 1. Purpose

Settings must support a professional calculator workflow without becoming a full CRM.

v1.0 settings are local-only.

## 2. Settings sections

Recommended Settings screen sections:

```text
Профиль цен
Внешний вид
Единицы измерения
PDF и экспорт
Хранилище
Безопасность и дисклеймер
О приложении
```

## 3. Price profiles

Even if v1.0 starts with a single default profile, architecture must support multiple profiles.

Default profile:

```text
Базовый
```

Future examples:

```text
Сезонный
Для своих
Субаренда
Срочный монтаж
Премиум
```

## 4. PriceProfile model

```ts
type PriceProfile = {
  id: string;
  name: string;
  currency: 'RUB' | 'EUR' | 'USD';
  isDefault: boolean;
  stage: StagePriceDefaults;
  truss: TrussPriceDefaults;
  led: LedPriceDefaults;
  createdAt: string;
  updatedAt: string;
};
```

## 5. Stage price defaults

Recommended fields:

```ts
type StagePriceDefaults = {
  moduleRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  skirtPricePerMeter?: number;
  stairsPrice?: number;
};
```

## 6. Truss price defaults

Recommended fields:

```ts
type TrussPriceDefaults = {
  straightTrussPricePerMeter: number;
  nodePricePerPiece: number;
  basePricePerPiece: number;
  mountingPrice: number;
  deliveryPrice: number;
};
```

## 7. LED price defaults

Recommended fields:

```ts
type LedPriceDefaults = {
  cabinetRentalPrice: number;
  mountingPrice: number;
  deliveryPrice: number;
  hangingBarPrice?: number;
  legPrice?: number;
};
```

## 8. Currency

v1.0 default:

```text
RUB
```

Display:

```text
₽
```

Architecture should allow EUR/USD later, but v1.0 UI may expose only RUB if preferred.

## 9. Theme settings

Theme options:

```text
Системная
Тёмная
Светлая
```

v1.0 default:

```text
Тёмная
```

Theme choice stored locally.

## 10. Units

v1.0 default:

```text
метры
миллиметры
килограммы
кВт/Вт
рубли
```

Input accepts comma and dot decimals.

Display is Russian locale by default.

## 11. PDF settings

PDF settings may include:

- default PDF mode: client / technical;
- show/hide prices in technical PDF;
- include disclaimer;
- include calculation engine version;
- include company/profile data later.

v1.0 may show PDF settings as limited if only one PDF mode is implemented.

## 12. Storage settings

Possible actions:

- export all calculations JSON later;
- import calculations JSON later;
- clear drafts;
- clear all saved calculations with confirmation.

Danger actions require confirmation.

## 13. Safety/about

Settings must include:

- disclaimer;
- app version;
- calculation engine versions;
- privacy note;
- support contact/link placeholder;
- licenses page later.

## 14. Settings acceptance

Settings are accepted only when:

- changes persist locally;
- price profile is applied to new calculations;
- changing defaults does not silently mutate old saved snapshots;
- theme switch works;
- no backend/account is required;
- dangerous actions require confirmation.
