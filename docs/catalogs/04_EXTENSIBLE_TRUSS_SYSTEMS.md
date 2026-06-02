# 04. Extensible Truss Systems

## 1. Purpose

PACK.IT must be ready to support multiple truss systems and manufacturers in the future.

v1.0 may ship with one default/generic truss system, but architecture must not hardcode all logic to a single manufacturer.

## 2. Product requirement

The app must leave a foundation for adding new truss construction sets from other manufacturers:

- different straight truss lengths;
- different node dimensions;
- different weights;
- different connector systems;
- different base plates;
- different compatibility rules;
- different naming/public display rules.

## 3. TrussSystem model

Recommended model:

```ts
type TrussSystem = {
  id: string;
  catalogVersion: string;
  manufacturerId?: string;
  publicName: LocalizedLabel;
  internalName?: string;
  series: string;
  compatibilityGroup: string;
  interfaceType: string;
  default: boolean;
  parts: TrussCatalogPart[];
  rules: TrussSystemRules;
};
```

## 4. Manufacturer model

```ts
type Manufacturer = {
  id: string;
  publicName: string;
  legalDisplayAllowed: boolean;
  website?: string;
  notes?: string;
};
```

If legal display is not confirmed, use generic public name.

## 5. Public vs internal names

For public Store app, names may need to be generic.

Example:

```text
Internal: MDM 29Q
Public: Ферма 29Q Generic
```

```text
Internal: Manufacturer XYZ
Public: Система ферм A
```

Do not expose manufacturer names publicly until checked.

## 6. Truss part model

```ts
type TrussCatalogPart = {
  id: string;
  partKey: string;
  kind: 'straight' | 'node-2d' | 'node-3d' | 'base' | 'fastener' | 'leg' | 'adapter';
  label: LocalizedLabel;
  manufacturerPartNumber?: string;
  dimensions: {
    lengthM?: number;
    widthMm?: number;
    depthMm?: number;
    heightMm?: number;
  };
  weightKg?: number;
  connectionPoints?: TrussConnectionPoint[];
  rentalCategory?: string;
  compatibleWith?: string[];
  notes?: string[];
};
```

## 7. System rules

```ts
type TrussSystemRules = {
  maxUnsupportedSpanM: number;
  preferredStraightLengthsM: number[];
  splitStrategy: 'balanced-large-first' | 'longest-first' | 'custom';
  defaultCornerNodeId?: string;
  defaultIntermediateSupportNodeId?: string;
  defaultBaseId?: string;
  fastenerRules: TrussFastenerRule[];
};
```

Default current rule:

```text
maxUnsupportedSpanM = 9
```

## 8. Compatibility

Parts must be filtered by:

- truss system;
- compatibility group;
- interface type;
- series;
- connection standard.

Do not allow mixing incompatible systems silently.

If user combines incompatible parts later, show danger warning.

## 9. Adding a new truss system

Future flow:

```text
Settings → Catalogs → Truss systems → Add system
```

v1.0 does not need full user-created truss systems, but data model must allow future import/configuration.

## 10. Catalog import/export future

Future features:

- import truss system JSON;
- export custom truss system JSON;
- clone default system;
- edit prices/weights;
- disable unused parts.

## 11. Tests for multiple systems

When new systems are added, required tests:

- portal calculation for system;
- frame calculation for system;
- stool auto-support for system;
- split behavior;
- fastener count;
- compatibility warning;
- PDF catalog label.

## 12. Acceptance

Truss extensibility is accepted when:

- core accepts `trussSystemId`;
- parts are not hardcoded only by UI labels;
- split/fastener/default node rules come from system config;
- public/internal naming is supported;
- adding a new system does not require rewriting calculator UI;
- incompatible mixing can be detected.
