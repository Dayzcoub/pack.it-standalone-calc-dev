# 06. PDF Style Guide

## 1. PDF purpose

PDF export is a professional technical/commercial sheet, not a screenshot of the app.

It should be readable when sent to:

- client;
- manager;
- technician;
- supplier/subcontractor;
- internal team.

## 2. PDF tone

Style:

- clean;
- light background by default;
- technical layout;
- strong table readability;
- PACK.IT branding;
- no dark app UI screenshot look.

## 3. Required PDF sections

Each PDF should contain:

```text
Header
Calculation title
Date/time
Calculator type
Summary metrics
Scheme
BOM / комплектность
Price summary
Warnings/notes
Safety disclaimer
Footer
```

## 4. Header

Header contains:

- PACK.IT logo/name;
- document type;
- calculation name;
- date/time.

Do not show FEG Stage PRO.

## 5. Summary metrics

Use cards/blocks:

### Stage

- size;
- height;
- modules/elements;
- weight if available;
- total.

### Truss

- mode;
- span/size;
- weight;
- load status;
- total.

### LED

- screen size;
- cabinets;
- power;
- weight;
- total.

## 6. Scheme

PDF scheme should come from structured drawing export:

```text
DrawingModel → SVG/PNG export → PDF
```

Do not screenshot the whole mobile screen.

## 7. BOM table

PDF can use proper tables because it is not limited to phone width.

Columns:

```text
#
Category
Name
Qty
Unit
Weight
Price
Notes
```

Hide empty columns if not used.

## 8. Price summary

Show:

- rental/modules;
- mounting;
- delivery;
- extra;
- discount later if implemented;
- total.

Total must be visually dominant.

## 9. Safety disclaimer

Required short text:

```text
Расчёты являются справочными и не заменяют инженерную проверку, паспортные данные оборудования, требования производителя, нормы безопасности и ответственность квалифицированного специалиста на площадке.
```

## 10. PDF visual tokens

Suggested:

```text
background: #FFFFFF
text: #111827
muted: #6B7280
line: #E5E7EB
accent: #0E7C78
accent-soft: #E6F7F5
warning: #B45309
danger: #B91C1C
```

## 11. PDF acceptance

PDF task is accepted only when:

- PDF is created offline;
- PDF uses PACK.IT brand;
- PDF does not use FEG brand;
- PDF is readable on phone and desktop PDF viewers;
- PDF contains scheme, BOM, price and disclaimer;
- PDF data comes from structured result, not random UI state.
