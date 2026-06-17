import type { CatalogModel } from "../catalog/contracts";
import type { SceneModel, ValidationIssue } from "../scene/contracts";

export type EventMeta = {
  clientName?: string;
  venueName?: string;
  eventDate?: string;
  notes?: string;
};

export type LocaleSettings = {
  locale: "en" | "ru";
  measurementSystem: "metric";
  currency: "USD" | "EUR" | "RUB" | "AED";
};

export type UnitsSettings = {
  sceneUnit: "m";
  displayUnit: "m" | "cm" | "mm";
  precision: number;
};

export type ProjectSettings = {
  locale: LocaleSettings;
  units: UnitsSettings;
  snap: {
    enabled: boolean;
    gridSize: number;
  };
  privacy: {
    offlineOnly: true;
    telemetryEnabled: false;
  };
  featureFlags: {
    blenderServer: false;
    connectedCrmWarehouse: false;
    aiAssistant: false;
    runtimeGlbLoading: boolean;
  };
};

export type GeneratedProjectSnapshots = {
  bomVersion?: string;
  pricingVersion?: string;
  pdfTemplateVersion?: string;
  warnings: ValidationIssue[];
};

export type VenueModelPlaceholder = {
  status: "not-configured";
  coordinateSystem: "scene-origin-meters-y-up";
  notes?: string;
};

export type ConstraintEnginePlaceholder = {
  status: "contracts-only";
  version: string;
  enabled: false;
};

export type CollisionClearancePlaceholder = {
  status: "contracts-only";
  clearanceUnit: "m";
  enabled: false;
};

export type MeasurementsPlaceholder = {
  status: "contracts-only";
  storedUnit: "m";
  formattedUnit: UnitsSettings["displayUnit"];
  accuracyPolicy: "stored-values-are-authoritative";
};

export type PowerModelPlaceholder = {
  status: "contracts-only";
  enabled: false;
  circuits: [];
};

export type RiggingModelPlaceholder = {
  status: "contracts-only";
  enabled: false;
  points: [];
};

export type DomainRulesRegistryPlaceholder = {
  status: "contracts-only";
  calculationEngineVersion: string;
  registeredDomains: Array<"stage" | "truss" | "led">;
};

export type ProjectNote = {
  id: string;
  createdAt: string;
  body: string;
};

export type AnnotationPlaceholder = {
  status: "contracts-only";
  notes: ProjectNote[];
};

export type ImportExportSafetyPlaceholder = {
  status: "contracts-only";
  projectFileKind: "packit.project";
  backupPolicy: "local-user-controlled";
  externalImportEnabled: false;
};

export type AssetLicenseRegistryPlaceholder = {
  status: "contracts-only";
  entries: [];
};

export type PerformanceBudgetPlaceholder = {
  maxInteractiveObjects: number;
  maxCatalogItemsBeforeSearch: number;
  notes: string;
};

export type ProjectFoundationContracts = {
  venue: VenueModelPlaceholder;
  constraints: ConstraintEnginePlaceholder;
  collisionClearance: CollisionClearancePlaceholder;
  measurements: MeasurementsPlaceholder;
  power: PowerModelPlaceholder;
  rigging: RiggingModelPlaceholder;
  domainRules: DomainRulesRegistryPlaceholder;
  annotations: AnnotationPlaceholder;
  importExportSafety: ImportExportSafetyPlaceholder;
  assetLicenses: AssetLicenseRegistryPlaceholder;
  performanceBudget: PerformanceBudgetPlaceholder;
};

export type UndoRedoState = {
  pastActionIds: string[];
  futureActionIds: string[];
  canUndo: boolean;
  canRedo: boolean;
};

export type ProjectModel = {
  id: string;
  schemaVersion: string;
  productVersion: string;
  title: string;
  eventMeta: EventMeta;
  scene: SceneModel;
  catalog: CatalogModel;
  settings: ProjectSettings;
  foundation: ProjectFoundationContracts;
  generated: GeneratedProjectSnapshots;
  history: UndoRedoState;
  createdAt: string;
  updatedAt: string;
};

export type ProjectListItem = {
  id: string;
  title: string;
  updatedAt: string;
  schemaVersion: string;
};

export type ProjectMigration = {
  fromSchemaVersion: string;
  toSchemaVersion: string;
  migrate(project: unknown): ProjectModel;
};

export type ProjectFileEnvelope = {
  kind: "packit.project";
  schemaVersion: string;
  productVersion: string;
  exportedAt: string;
  project: ProjectModel;
};

export type RecoveryDraftEnvelope = {
  kind: "packit.recovery-draft";
  schemaVersion: string;
  productVersion: string;
  savedAt: string;
  reason: "manual-checkpoint" | "autosave-placeholder";
  project: ProjectModel;
};
