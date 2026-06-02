# 01. Source Audit — Feg_Calc_Stage

## 1. Источник

Исходный репозиторий:

```text
Dayzcoub/Feg_Calc_Stage
```

Назначение текущей версии:

```text
FEG Stage PRO standalone quick constructors
```

Фактический состав:

- быстрый конструктор сцены;
- быстрый конструктор ферм;
- быстрый конструктор LED-экранов;
- local drafts;
- quick ideal catalog;
- BOM logic;
- quick pricing;
- PDF export;
- responsive/mobile field adaptations;
- light/dark theme work;
- PWA manifest/service worker;
- smoke tests.

## 2. Что переносим

### 2.1 Stage

Перенести в новый `core/stage`:

- систему `Imlight Copy` как сохранённую старую логику;
- систему `PKC / ШИП-ПАЗ`;
- систему `PKC / ПАЗ-ПАЗ`;
- правила подсчёта модулей;
- правила подсчёта ног;
- правила подсчёта коннекторов;
- лестницы;
- закрытие торцов;
- высоту сцены;
- quick pricing: модуль/прокат, монтаж, доставка;
- stage BOM;
- stage summary;
- stage drawing model;
- stage PDF строки;
- эталонные сценарии расчёта.

### 2.2 Truss

Перенести в новый `core/truss`:

- прямые фермы 0.5 / 1 / 1.5 / 2 / 2.5 / 3 м;
- 2D узлы;
- 3D узлы;
- размеры узлов;
- веса;
- pricing rules;
- портал;
- рама;
- табуретка;
- ручной конструктор, если его логика стабильна;
- split по длинам;
- правило избегать лишних мелких модулей;
- auto support rule: пролёт не больше 9 м;
- U017 как промежуточный T-node;
- базы/блины;
- C2 fasteners;
- вес;
- load warnings;
- truss BOM;
- truss summary;
- truss drawing model;
- truss PDF строки;
- эталонные сценарии расчёта.

### 2.3 LED

Перенести в новый `core/led`:

- cabinet catalog;
- размеры кабинетов;
- вес кабинета;
- потребление;
- inrush, если используется;
- multi-construction model;
- active construction;
- цветовую идентификацию конструкций как UI concept;
- hanging logic;
- standing logic;
- Hanging Bar;
- spanset/shackle;
- cookies/bolts;
- power rules;
- aspect ratio;
- LED BOM;
- LED summary;
- LED drawing model;
- LED PDF строки;
- эталонные сценарии расчёта.

### 2.4 Shared

Перенести концептуально, но переписать архитектурно:

- BOM row model;
- summary model;
- pricing model;
- warning model;
- PDF model;
- saved draft model;
- default pricing;
- unit formatting;
- rounding rules;
- Russian field labels;
- local-only storage behavior.

## 3. Что НЕ переносим

Не переносить в новый проект:

- `FEG Stage PRO` brand;
- `FEGModules` global namespace;
- runtime CSS injection as architecture;
- старый `index.html` как shell;
- старый PWA manifest как продуктовый manifest;
- старый service worker as-is;
- legacy/v3 fallback;
- Supabase/backend code;
- auth/workspace/roles;
- warehouse movements;
- CRM/smetчик;
- dev/test panels;
- hidden admin buttons;
- mini runner game;
- old responsive patch cascade;
- old breakpoints churn;
- inline styles;
- one-off CSS hacks;
- code that mixes calculation, DOM, localStorage and PDF side effects.

## 4. Риски текущей базы

### 4.1 Глобальные runtime модули

Старый проект использует глобальные модули через `window.FEGModules`. В новом проекте всё должно быть ES modules + typed imports.

### 4.2 Responsive CSS debt

В текущей версии много поздних слоёв, которые стабилизируют viewport, overflow, grid and canvas behavior. В новом проекте layout должен быть спроектирован изначально mobile-first.

### 4.3 Brand debt

FEG-бренд встречается в:

- AppVersion;
- title;
- manifest;
- PDF labels;
- CSS class naming;
- localStorage keys;
- filenames;
- screenshots/assets.

Новый проект должен использовать PACK.IT naming с первого commit.

### 4.4 PDF coupling

Текущий PDF основан на `jsPDF + html2canvas`. Для v1.0 допустимо использовать jsPDF, но PDF должен строиться из structured `PdfModel`, а не из случайного DOM-состояния экрана.

### 4.5 Storage coupling

Текущий localStorage drafts нужно не копировать напрямую, а мигрировать в новый typed storage layer.

## 5. Обязательные regression scenarios

### Stage

- Imlight Copy сцена 7.2 × 4.8 × 0.8;
- PKC ШИП-ПАЗ сцена 7.2 × 4.8 × 0.8;
- PKC ПАЗ-ПАЗ сцена 7.2 × 4.8 × 0.8;
- сцена с лестницей;
- сцена с закрытием торцов;
- изменение цен модуля/монтажа/доставки.

### Truss

- портал 8 × 4;
- рама 8 × 4;
- табуретка 12 м с auto legs;
- табуретка 24 м с auto legs;
- 4.5 м split without bad small-module bias;
- ручная схема с U012/U017/base;
- C2 fastener count;
- load warning states.

### LED

- LED 5.12 × 2.56 на 640 мм кабинетах;
- hanging only;
- standing only;
- hanging + standing;
- несколько конструкций;
- power cable count;
- Hanging Bar count;
- pricing монтаж/доставка.

## 6. Вывод

Старый репозиторий — это источник логики, а не фундамент нового Store-приложения.

Новый проект должен стартовать как clean-room rewrite с переносом проверенной бизнес-логики через typed core contracts и regression tests.
