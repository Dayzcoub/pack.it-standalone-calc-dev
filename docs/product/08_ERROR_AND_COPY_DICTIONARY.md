# 08. Error and Copy Dictionary

## 1. Purpose

All user-facing messages must be consistent and localizable.

Use copy keys, not random hardcoded strings.

## 2. Message structure

```ts
type CopyMessage = {
  key: string;
  ru: string;
  en: string;
};
```

## 3. Common success messages

```text
calculation.saved
RU: Расчёт сохранён
EN: Calculation saved

calculation.deleted
RU: Расчёт удалён
EN: Calculation deleted

calculation.duplicated
RU: Создана копия
EN: Copy created

pdf.created
RU: PDF создан
EN: PDF created

settings.saved
RU: Настройки сохранены
EN: Settings saved
```

## 4. Common error messages

```text
error.generic
RU: Что-то пошло не так
EN: Something went wrong

error.saveFailed
RU: Не удалось сохранить расчёт на устройстве
EN: Could not save calculation on this device

error.pdfFailed
RU: Не удалось создать PDF
EN: Could not create PDF

error.shareFailed
RU: Не удалось открыть отправку файла
EN: Could not open file sharing

error.storageUnavailable
RU: Локальное хранилище недоступно
EN: Local storage is unavailable
```

## 5. Validation messages

```text
validation.dimensionRequired
RU: Укажите размер конструкции
EN: Enter construction size

validation.widthPositive
RU: Ширина должна быть больше 0
EN: Width must be greater than 0

validation.heightPositive
RU: Высота должна быть больше 0
EN: Height must be greater than 0

validation.depthPositive
RU: Глубина должна быть больше 0
EN: Depth must be greater than 0

validation.priceNonNegative
RU: Цена не может быть отрицательной
EN: Price cannot be negative
```

## 6. Snapshot/version messages

```text
snapshot.oldVersion
RU: Этот расчёт создан в старой версии формул
EN: This calculation was created with an older formula version

snapshot.recalculateCopy
RU: Создать копию и пересчитать
EN: Create a copy and recalculate

snapshot.openAsSaved
RU: Открыть сохранённый снимок
EN: Open saved snapshot
```

## 7. Truss messages

```text
truss.autoSupportsAdded
RU: Добавлены промежуточные опоры, чтобы пролёт не превышал 9 м
EN: Intermediate supports were added so the span does not exceed 9 m

truss.manualLegsUnsafe
RU: Ручное количество опор не обеспечивает безопасный пролёт
EN: Manual support count does not keep the span within the safe limit

truss.noValidSplit
RU: Не удалось собрать длину из доступных элементов
EN: Could not build this length from available parts

truss.loadOverLimit
RU: Нагрузка превышает значение по введённым данным
EN: Load exceeds the value based on entered data
```

## 8. LED messages

```text
led.sizeNotDivisible
RU: Размер не кратен выбранному кабинету
EN: Size is not divisible by the selected cabinet

led.highPower
RU: Высокая суммарная мощность, проверьте питание
EN: High total power, check electrical supply

led.highWeight
RU: Большой вес экрана, проверьте крепление
EN: High screen weight, check mounting

led.customCabinetUnverified
RU: Данные самосборного кабинета заданы пользователем и требуют проверки
EN: Self-built cabinet data is user-defined and must be checked
```

## 9. PDF/disclaimer messages

```text
disclaimer.full
RU: Расчёты в приложении являются справочными и не заменяют инженерную проверку, паспортные данные оборудования, требования производителя, нормы безопасности и ответственность квалифицированного специалиста на площадке.
EN: Calculations are for reference only and do not replace engineering verification, equipment documentation, manufacturer requirements, safety regulations or the responsibility of a qualified specialist on site.

disclaimer.short
RU: Справочный расчёт. Перед монтажом проверьте по паспортам оборудования, требованиям производителя и нормам безопасности.
EN: Reference calculation. Check equipment documentation, manufacturer requirements and safety regulations before installation.
```

## 10. Acceptance

Copy dictionary is accepted when:

- RU and EN values exist for all core messages;
- UI uses copy keys;
- warnings use code + params where possible;
- no raw English/Russian strings are scattered across components.
