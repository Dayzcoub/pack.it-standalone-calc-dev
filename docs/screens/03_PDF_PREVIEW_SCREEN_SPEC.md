# 03. PDF Preview Screen Spec

## 1. Purpose

PDF Preview lets user review generated PDF before saving/sharing.

## 2. Required modes

```text
single calculation PDF
combined PDF
client PDF
technical PDF
```

Some modes may be future-gated.

## 3. Required actions

- back;
- regenerate if input changed;
- share;
- save/export;
- switch mode if available.

## 4. States

```text
loading
ready
share in progress
share cancelled
share failed
blocking errors
old snapshot notice
```

## 5. Acceptance

- PDF uses PACK.IT brand;
- PDF includes disclaimer;
- share works through native share;
- PDF is generated from PdfModel, not random UI screenshot.
