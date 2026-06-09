# 00. Local Data and Backup Policy

## 1. Purpose

PACK.IT standalone calculators have no backend and no product-owned cloud sync.

User data is stored locally on the device, but may be included in the operating system backup mechanism if the user has enabled it.

## 2. Final decision

```text
No PACK.IT backend.
No PACK.IT cloud sync.
No PACK.IT account.
Use local device storage.
Allow system-level iOS/Android backup where appropriate.
```

This is different from app-owned cloud sync.

## 3. Data that should be backup-friendly

The following data should be stored in backup-friendly app storage where platform rules allow:

- saved calculations;
- drafts;
- price profiles;
- user settings;
- language/theme settings;
- future local custom catalogs;
- future local import/export metadata.

## 4. Data that should not be backed up

The following should be stored as cache/temp and excluded from backup where possible:

- temporary PDF cache;
- renderer screenshots;
- temporary export files;
- image cache;
- debug logs;
- transient UI state.

## 5. iOS backup behavior

On iOS, app data may be included in iCloud Backup depending on:

- user iCloud Backup settings;
- where the app stores data;
- whether data is marked as excluded from backup;
- system behavior and available storage.

PACK.IT must not promise guaranteed restore.

Recommended user-facing copy:

```text
Расчёты сохраняются на устройстве. Если на iPhone включено резервное копирование iCloud, данные приложения могут восстановиться после переустановки или перехода на новый iPhone. PACK.IT не использует собственный сервер и не синхронизирует расчёты напрямую между устройствами.
```

## 6. Android backup behavior

On Android, app data may be included in Android/Google Auto Backup depending on:

- user backup settings;
- Android version;
- manifest/backup rules;
- backup size limits;
- device conditions and OEM behavior.

PACK.IT must explicitly decide backup rules before release.

Recommended technical direction:

```text
allowBackup = true, unless store/privacy/security review decides otherwise
exclude cache/temp/export folders
include saved calculations/settings if stored in backup-eligible storage
```

## 7. User-facing backup wording

Use careful wording:

```text
Ваши расчёты сохраняются на устройстве. Если на телефоне включено системное резервное копирование iCloud или Android/Google Backup, данные приложения могут восстановиться после переустановки или перехода на новый телефон. PACK.IT не использует собственный сервер и не гарантирует самостоятельную облачную синхронизацию. Для важных расчётов экспортируйте PDF или будущий JSON-архив.
```

## 8. Deletion behavior

v1.0 recommended behavior:

```text
Deleting a saved calculation after confirmation is final inside the app.
```

Future versions may add undo/trash if needed.

## 9. New phone / reinstall behavior

Without system backup or future local export/import:

- saved calculations may not appear on a new device;
- PDFs already exported by the user remain wherever the user saved/shared them;
- PACK.IT cannot restore data from its own server because no server exists.

## 10. Acceptance

Accepted when:

- important local data is not stored in temp/cache;
- temporary files are excluded from backup where possible;
- Help/Privacy wording does not overpromise restore;
- iOS/Android backup behavior is verified before release;
- no backend/cloud sync is implied.
