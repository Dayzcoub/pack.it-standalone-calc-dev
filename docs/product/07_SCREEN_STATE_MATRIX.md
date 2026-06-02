# 07. Screen State Matrix

## 1. Purpose

Every screen must have defined states before implementation.

This prevents missing empty/loading/error/old-version states and reduces UI fixes later.

## 2. Home screen states

```text
firstLaunchNotAcknowledged
normal
noRecentCalculations
hasRecentCalculations
settingsLoadError
assetLoadFallback
```

Required behavior:

- first launch shows disclaimer/onboarding;
- no recent calculations shows calm empty block;
- settings load error falls back to default theme/language/price profile;
- app must remain usable offline.

## 3. Calculator screen common states

Applies to Stage / Truss / LED:

```text
defaultDraft
validCalculation
invalidInput
nonBlockingWarnings
blockingErrors
unsavedChanges
savedClean
oldEngineSnapshot
recalculatedCopyReady
pdfGenerating
pdfPreviewReady
pdfError
saveError
storageUnavailable
```

Required behavior:

- invalid inputs show field-level messages;
- blocking errors prevent PDF/export;
- non-blocking warnings are included in PDF;
- old snapshots are not recalculated silently;
- unsaved changes trigger confirmation on leaving.

## 4. Stage-specific states

```text
systemNotSelected
dimensionsMissing
closureEnabledTypeMissing
stairsEnabledCountMissing
largeStageWarning
moduleGridMismatch
```

## 5. Truss-specific states

```text
modeNotSelected
spanMissing
heightMissing
noValidSplit
autoSupportsAdded
manualLegsUnsafe
loadCheckMissing
loadOk
loadWarning
loadDanger
```

## 6. LED-specific states

```text
cabinetMissing
noConstructions
sizeMissing
sizeNotDivisibleByCabinet
roundedToCabinetGrid
mountModeMissing
highPowerWarning
highWeightWarning
customCabinetUnverified
```

## 7. Saved screen states

```text
emptyAll
hasRecords
filterStageEmpty
filterTrussEmpty
filterLedEmpty
selectionMode
combinedPdfSelectionEmpty
combinedPdfReady
deleteConfirmation
duplicateSuccess
oldSnapshotNotice
```

## 8. Settings screen states

```text
normal
priceProfileMissing
priceProfileInvalid
languageChanged
themeChanged
clearDraftsConfirmation
clearAllSavedConfirmation
storageExportUnavailable
aboutLegalVisible
```

## 9. PDF preview states

```text
loading
ready
shareInProgress
shareCancelled
shareFailed
saveFailed
blockingErrors
oldSnapshotNotice
```

## 10. Acceptance

A screen implementation is accepted only when its relevant states are handled and no user-facing state shows raw error text, broken layout or silent empty content.
