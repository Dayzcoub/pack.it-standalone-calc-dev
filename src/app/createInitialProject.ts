import { createLocalMdmCatalogModel } from "../catalog/localMdmCatalog";
import type { ProjectFoundationContracts, ProjectModel, ProjectSettings } from "../project/contracts";
import { createCameraStateFromPreset } from "../renderer/cameraPresets";
import type { SceneModel, SceneObject } from "../scene/contracts";
import { createBuiltInLayers } from "../scene/layerSystem";
import { PRODUCT_VERSION, PROJECT_SCHEMA_VERSION } from "./constants";
import { createId } from "./id";

const defaultSettings = (): ProjectSettings => ({
  locale: {
    locale: "en",
    measurementSystem: "metric",
    currency: "USD"
  },
  units: {
    sceneUnit: "m",
    displayUnit: "m",
    precision: 2
  },
  snap: {
    enabled: true,
    gridSize: 0.25
  },
  privacy: {
    offlineOnly: true,
    telemetryEnabled: false
  },
  featureFlags: {
    blenderServer: false,
    connectedCrmWarehouse: false,
    aiAssistant: false,
    runtimeGlbLoading: false
  }
});

const defaultFoundationContracts = (): ProjectFoundationContracts => ({
  venue: {
    status: "not-configured",
    coordinateSystem: "scene-origin-meters-y-up"
  },
  constraints: {
    status: "contracts-only",
    version: "constraint-placeholder-0.1.0",
    enabled: false
  },
  collisionClearance: {
    status: "contracts-only",
    clearanceUnit: "m",
    enabled: false
  },
  measurements: {
    status: "contracts-only",
    storedUnit: "m",
    formattedUnit: "m",
    accuracyPolicy: "stored-values-are-authoritative"
  },
  power: {
    status: "contracts-only",
    enabled: false,
    circuits: []
  },
  rigging: {
    status: "contracts-only",
    enabled: false,
    points: []
  },
  domainRules: {
    status: "contracts-only",
    calculationEngineVersion: "domain-rules-placeholder-0.1.0",
    registeredDomains: ["stage", "truss", "led"]
  },
  annotations: {
    status: "contracts-only",
    notes: []
  },
  importExportSafety: {
    status: "contracts-only",
    projectFileKind: "packit.project",
    backupPolicy: "local-user-controlled",
    externalImportEnabled: false
  },
  assetLicenses: {
    status: "contracts-only",
    entries: []
  },
  performanceBudget: {
    maxInteractiveObjects: 300,
    maxCatalogItemsBeforeSearch: 50,
    notes: "Task 001 mobile-first placeholder budget; optimize before increasing scene density."
  }
});

export const createTestSceneObject = (index = 1): SceneObject => ({
  id: createId("object"),
  type: "generic3d",
  name: index === 1 ? "Test scene cube" : `Test scene cube ${index}`,
  transform: {
    position: { x: (index - 1) * 1.35, y: 0.5, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 }
  },
  dimensions: {
    width: 1,
    height: 1,
    depth: 1
  },
  bomMode: "visualOnly",
  capabilities: {
    canStandOnFloor: true,
    has3dAsset: false,
    transformRules: {
      canMove: true,
      canRotate: true,
      canScale: false,
      lockY: true
    }
  },
  meta: {
    task001: true
  },
  warnings: []
});

export const createInitialScene = (): SceneModel => {
  const testObject = createTestSceneObject();

  return {
    id: createId("scene"),
    units: "m",
    origin: { x: 0, y: 0, z: 0 },
    objects: [testObject],
    groups: [],
    layers: createBuiltInLayers([testObject]),
    selection: {
      selectedObjectIds: [testObject.id],
      activeInspectorTargetId: testObject.id,
      mode: "object"
    },
    camera: createCameraStateFromPreset("perspective"),
    environment: {
      gridVisible: true,
      connectionPortsVisible: true,
      background: "dark"
    }
  };
};

export const createInitialProject = (title = "Untitled PACK.IT project"): ProjectModel => {
  const now = new Date().toISOString();

  return {
    id: createId("project"),
    schemaVersion: PROJECT_SCHEMA_VERSION,
    productVersion: PRODUCT_VERSION,
    title,
    eventMeta: {},
    scene: createInitialScene(),
    catalog: createLocalMdmCatalogModel(PROJECT_SCHEMA_VERSION),
    settings: defaultSettings(),
    foundation: defaultFoundationContracts(),
    generated: {
      pdfTemplateVersion: "placeholder-0.1.0",
      warnings: []
    },
    history: {
      pastActionIds: [],
      futureActionIds: [],
      canUndo: false,
      canRedo: false
    },
    createdAt: now,
    updatedAt: now
  };
};
